# 星象管理后台

## 下载项目
``` shell
git clone git@gitlab.pi2star.com:software/astrology/web-astrology.git
cd web-astrology
```

## 启动

``` shell
yarn install
yarn serve
```

## 目录
```shell
├── public              # 静态页面
├── src                 
│   ├── App.vue         
│   ├── apis            # 接口目录
│   ├── assets          # 静态文件目录
│   ├── common          # 公共目录 - 主业务
│   ├── components      # 全局组件
│   ├── config          # 各种配置信息
│   ├── router          # 路由模块
│   ├── store           # vuex 模块
│   ├── utils           
│   ├── main.js         # 入口文件
│   ├── permission.js   # 登录认证及权限验证
│   └── views           # 业务模块
└── vue.config.js       # vue 配置文件 可扩展webpack配置
```
