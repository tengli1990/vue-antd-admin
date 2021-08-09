module.exports = (api, options, rootOptions) => {
  console.log('rootOptions',rootOptions)
  console.log('options',options)
  options.clientId = `pi2star${Date.now()}`
  // 命令&基础信息
  api.extendPackage({
    name: rootOptions.projectName,
    version: "1.0.0",
    private: true,
    scripts: {
      "report": "cross-env use_analyzer=true vue-cli-service build --mode production",
      "serve": "vue-cli-service serve",
      "build": "vue-cli-service build",
      "lint": "vue-cli-service lint",
      "build:test": "vue-cli-service build --mode testing",
      "build:prod": "vue-cli-service build --mode production",
      "lint:nofix": "vue-cli-service lint --no-fix"
    },
  });

  // 安装一些基础公共库
  api.extendPackage({
    dependencies: {
      "@ant-design-vue/pro-layout": "^1.0.1",
      "@antv/data-set": "^0.10.2",
      "@vue/cli": "4.0.4",
      "ant-design-vue": "^1.7.2",
      "axios": "^0.19.0",
      "core-js": "^3.1.2",
      "global": "^4.4.0",
      "js-cookie": "^2.2.1",
      "md5": "^2.2.1",
      "moment": "^2.24.0",
      "nprogress": "^0.2.0",
      "store": "^2.0.12",
      "vue": "^2.6.10",
      "vue-router": "^3.1.2",
      "vue-svg-component-runtime": "^1.0.1",
      "vuex": "^3.1.1"
    },
    devDependencies: {
      "@ant-design/colors": "^3.2.1",
      "@vue/cli-plugin-babel": "^4.0.4",
      "@vue/cli-plugin-eslint": "^4.0.4",
      "@vue/cli-plugin-router": "^4.0.4",
      "@vue/cli-plugin-unit-jest": "^4.0.4",
      "@vue/cli-plugin-vuex": "^4.0.4",
      "@vue/cli-service": "^4.0.4",
      "@vue/eslint-config-standard": "^4.0.0",
      "@vue/test-utils": "^1.0.0-beta.29",
      "babel-eslint": "^10.0.1",
      "babel-plugin-import": "^1.12.2",
      "babel-plugin-transform-remove-console": "^6.9.4",
      "compression-webpack-plugin": "1.1.12",
      "cross-env": "^7.0.3",
      "eslint": "^5.16.0",
      "eslint-plugin-html": "^5.0.0",
      "eslint-plugin-vue": "^5.2.3",
      "less": "^3.0.4",
      "less-loader": "^5.0.0",
      "opencollective": "^1.0.3",
      "opencollective-postinstall": "^2.0.2",
      "vue-svg-icon-loader": "^2.1.1",
      "vue-template-compiler": "^2.6.10",
      "webpack-bundle-analyzer": "^4.2.0",
      "webpack-theme-color-replacer": "^1.3.14",
      "webpackbar": "^5.0.0-3"
    }
  });


  // 删除 vue-cli3 默认目录
  api.render(files => {
    Object.keys(files)
      .filter(path => path.startsWith('src/') || path.startsWith('public/'))
      .forEach(path => delete files[path]);
  });

  // 安装 echarts
  if (options.echarts) {
    api.extendPackage({
      dependencies: {
        "echarts": "^5.0.0",
      }
    });
    api.render('./packages/echarts')
  }


  // 项目目录
  api.render('./template',{
    ...options,
  });

  // 配置文件
  api.render({
    './README.md':'./template/README.md'
  },rootOptions);


  // 屏蔽 generator 之后的文件写入操作
  // writeFileTree 函数不写文件直接退出，这样 vue-cli3 在写 README.md 时会直接跳过
  api.onCreateComplete(() => {
    process.env.VUE_CLI_SKIP_WRITE = true;
  });
}
