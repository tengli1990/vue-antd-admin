<template>
  <div class="login-index">
    <div class="banner">
      <div class="name">欢迎登录</div>
      <div class="brand">湃星象</div>
      <div class="image"></div>
    </div>
    <div class="form">
      <div class="logo"></div>
      <a-form-model class="form-model" ref="ruleForm" :model="form" :rules="rules" v-bind="layout">
        <a-form-model-item class="form-item" has-feedback prop="username">
          <a-input class="input" v-model.trim="form.username" type="text" placeholder="账号" autocomplete="off"/>
        </a-form-model-item>
        <a-form-model-item class="form-item" has-feedback prop="password">
          <a-input class="input" v-model.trim="form.password" type="password" placeholder="密码" autocomplete="off"/>
        </a-form-model-item>
        <a class="forget-password">
          忘记密码?
        </a>
        <a-button class="login-button" type="primary" size="large" block @click="submitForm('ruleForm')">登录</a-button>
      </a-form-model>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      redirect: decodeURIComponent(this.$route.query.redirect || '') || '/welcome',
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      layout: {
        labelCol: { span: 0 },
        wrapperCol: { span: 24 }
      }
    }
  },
  created () {
  },
  methods: {
    submitForm () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/handleLogin', this.form).then(res => {
            if (res.code !== '0000') {
              this.$message.error(res.msg)
              return
            }

            this.$router.replace(this.redirect)
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-index {
  display: flex;
  height: 423px;
  background: #fff;

  .banner {
    width: 421px;
    height: 100%;
    padding: 72px 0 0 36px;
    line-height: 1;
    background: linear-gradient(-20deg, #722DD2, #AB7FE8);
    color: #fff;

    .name {
      margin-left: 35px;
      font-size: 32px;
    }

    .brand {
      margin: 8px 0 0 35px;
      font-size: 16px;
    }

    .image {
      width: 333px;
      height: 182px;
      margin-top: 25px;
      background: url(~@/assets/images/login-banner.png) no-repeat left center / 100% 100%;
    }
  }

  .form {
    width: 346px;
  }

  .form-model {
    width: 255px;
    margin: 47px auto 0;
  }

  .form-item {
    margin: 15px 0 0 0;
    line-height: 40px;

    .input {
      height: 40px;
      border-radius: 6px;
      background: #fff;
      border: 2px solid #fff;
      border-color: rgba(130, 145, 169, .3);
    }

    .has-error {
      .input {
        border-color: #f5222d;
      }
    }
  }

  .logo {
    width: 129px;
    height: 47px;
    margin: 77px auto 0;
    background: url(~@/assets/images/login-logo.png) no-repeat left center / 100% 100%;
  }

  .forget-password {
    display: block;
    text-align: right;
    line-height: 1;
    margin: 10px 0 15px 0;
    color: #A8ACB2;
  }

  .login-button {
    border-radius: 4px;
  }
}
</style>
