<template>
  <div>
    <a-dropdown v-if="currentUser && currentUser.name" placement="bottomRight">
      <span class="ant-pro-account-avatar">
        <span class="mr-8">{{ currentUser.name }}</span>
        <a-avatar :src="require('@/assets/images/person-woman.png')"/>
      </span>
      <template v-slot:overlay>
        <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
          <a-menu-item v-if="menu" key="0" @click="infoVisible = true">
            <a-icon type="user"/>
            个人信息
          </a-menu-item>
          <a-menu-divider v-if="menu"/>
          <a-menu-item v-if="menu" key="1" @click="handleModifyPassword">
            <a-icon type="tool"/>
            修改密码
          </a-menu-item>
          <a-menu-divider v-if="menu"/>
          <a-menu-item key="2" @click="handleLogout">
            <a-icon type="logout"/>
            退出登录
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <span v-else>
      <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }"/>
    </span>
    <a-modal v-model="modifyVisible" title="修改密码" @ok="confirmModifyPassword">
      <a-form-model ref="form" :model="form" :rules="rules" v-bind="formLayout">
        <a-form-model-item label="旧密码" prop="password">
          <a-input v-model="form.password" type="password"></a-input>
        </a-form-model-item>
        <a-form-model-item label="新密码" help="至少6-16个字符，至少1个字母和1个数字，其他任意组合" prop="newPassword">
          <a-input v-model="form.newPassword" type="password"></a-input>
        </a-form-model-item>
        <a-form-model-item label="确认新密码" prop="confirmPassword">
          <a-input v-model="form.confirmPassword" type="password"></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <a-modal v-model="infoVisible" title="个人信息" @ok="infoVisible = false">
      <a-descriptions :column="1" class="user-info">
        <a-descriptions-item label="用户名">{{ userInfo.name }}</a-descriptions-item>
        <a-descriptions-item label="登录账号">{{ userInfo.username }}</a-descriptions-item>
        <a-descriptions-item label="手机号">{{ userInfo.mobile }}</a-descriptions-item>
        <a-descriptions-item label="邮箱">{{ userInfo.email }}</a-descriptions-item>
        <a-descriptions-item label="所属部门">{{ userInfo.department }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script>
import { modifyPassword } from '@/apis/user'

export default {
  name: 'AvatarDropdown',
  props: {
    currentUser: {
      type: Object,
      default: () => this.$store.getters.user
    },
    menu: {
      type: Boolean,
      default: true
    }
  },
  data () {
    const handleConfirmPassword = (rule, value, callback) => {
      const fn = callback
      if (value !== this.form.newPassword) {
        fn('与新密码不一致')
      }
      fn()
    }
    return {
      userInfo: {},
      infoVisible: false,
      modifyVisible: false,
      form: {
        id: this.$store.getters.user.id,
        password: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        password: [{ required: true, message: '请输入原始密码', trigger: 'blur' }],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { pattern: /^(?=.*[a-zA-Z])(?=.*\d)[^]{6,16}$/, message: '至少6-16个字符，至少1个字母和1个数字，其他任意组合', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请确认新密码', trigger: 'blur' },

          { validator: handleConfirmPassword, trigger: 'blur' }
        ]
      },
      formLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      }
    }
  },
  created () {},
  mounted () {
    this.userInfo = this.$store.getters.user
  },
  methods: {
    handleLogout (e) {
      this.$confirm({
        title: '提示',
        content: '确认退出登录吗',
        onOk: () => {
          return this.$store.dispatch('user/handleLogout').then(() => {
            this.$router.push('/user/login')
          })
        },
        onCancel () {}
      })
    },
    handleModifyPassword () {
      this.modifyVisible = true
      // this.$router.push({ path: '/account/center' })
    },
    confirmModifyPassword () {
      this.$refs.form.validate(valid => {
        if (valid) {
          const params = { ...this.form }
          delete params.confirmPassword
          this.$toast.loading()
          modifyPassword(params).then(res => {
            this.$toast.hide()
            if (res.code !== '0000') {
              this.$message.error(res.msg)
              return
            }
            this.$message.success('密码修改成功')
            this.modifyVisible = false
            this.$store.dispatch('user/handleLogout')
            setTimeout(() => {
              location.reload()
            }, 500)
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }

  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }

}

.user-info {
  padding-left: 60px;
}
</style>
