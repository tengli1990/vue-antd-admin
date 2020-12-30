<template>
  <div id="userLayout" :class="['user-layout-wrapper', isMobile && 'mobile']">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UserLayout',
  computed: {
    ...mapState({
      isMobile: state => state.app.isMobile
    })
  },
  mounted () {
    document.body.classList.add('userLayout')
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;
  &.mobile {
    .container {
      .main {
        max-width: 368px;
        width: 98%;
      }
    }
  }

  .container {
    display:flex;
    width: 100%;
    min-height: 100%;
    background:#f7f7f7;
    // background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
    position: relative;
    justify-content:center;
    align-items: center;
    a {
      text-decoration: none;
    }
  }
}
</style>
