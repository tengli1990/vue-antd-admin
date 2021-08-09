# Vue-cli4.x 模板
- 定制化Vue2.0 后台admin模板
- 使用antd开发 [antd 官网](https://antdv.com/docs/vue/introduce-cn/)
### 安装@vue/cli
如果安装过低版本的（vue-cli 或 @vue/cli@3.x）需要先卸载
```
npm uninstall -g vue-cli
npm install -g @vue/cli
```

### 添加Gitlab的SSH keys
生成过程中不要设置任何密码
``` shell
ssh-keygen -t rsa -C "your_email@example.com" # 更换邮箱
```
成功后将生成的 `~/.ssh/id_rsa.pub` 中的代码添加SSH keys。

### 创建项目
```
  vue create --preset gitlab:gitlab.pi2star.com:software/template/vue2-admin-template --clone my-project
```


### 配置项目信息
以下创建项目过程以湃星象为例：  
- 请输入项目名称： 湃星象  
- 请输入gitlab的remote地址: git@gitlab.pi2star.com:software/astrology/web-astrology.git  
- 是否安装echart组件：y/n  



