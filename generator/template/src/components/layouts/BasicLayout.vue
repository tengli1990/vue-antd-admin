<template>
  <pro-layout
    :menus="menus"
    :collapsed="collapsed"
    :mediaQuery="query"
    :isMobile="isMobile"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
    v-bind="settings"
  >
    <template slot="menuHeaderRender">
      <div class="logo" :class="{'collapsed':collapsed}">
        <img :src="require('@/assets/images/logo.png')" />
        <h1>{{ title }} </h1>
      </div>

    </template>

    <template slot="rightContentRender">
      <right-content :topMenu="false" :theme="settings.theme" />
    </template>
    <transition name="fade">
      <a-config-provider :renderEmpty="renderEmpty">
        <keepAlive>
          <router-view v-if="$route.meta.keepAlive" class="page-main" />
        </keepAlive>
      </a-config-provider>
    </transition>

    <transition name="fade" >
      <a-config-provider :renderEmpty="renderEmpty">
        <router-view class="page-main" v-if="!$route.meta.keepAlive"/>
      </a-config-provider>
    </transition>

    <template slot="footerRender"></template>
  </pro-layout>
</template>

<script>
import { SettingDrawer } from '@ant-design-vue/pro-layout'
import settings from '@/config/settings'
import RightContent from './header/RightContent'

export default {
  name: 'BasicLayout',
  components: {
    SettingDrawer,
    RightContent
  },
  data () {
    return {
      // 侧栏收起状态
      collapsed: false,
      title: settings.title,
      settings: {
        // 布局类型
        layout: 'sidemenu', // 'sidemenu', 'topmenu'
        contentWidth: 'Fluid',
        // 主题 'dark' | 'light'
        theme: 'dark',
        // 主色调
        primaryColor: '',
        fixedHeader: true, // sticky header
        fixSiderbar: true, // sticky siderbar
        colorWeak: true
      },
      // 媒体查询
      query: {},
      // 是否手机模式
      isMobile: false
    }
  },
  computed: {
    menus () {
      const routes = this.$store.getters.addRoutes.find((item) => !!item.path)
      const newRoutes = []
      if (routes && routes.children) {
        routes.children.forEach((route) => {
          const { redirect, children, show } = route
          if (show) {
            newRoutes.push(route)
          } else if (!(redirect && !(children && children.length))) {
            newRoutes.push(route)
          }
        })
      }
      return newRoutes
    }
  },
  created () {},
  mounted () {},
  methods: {
    renderEmpty () {
      return <a-empty class="mt-24 mb-24"/>
    },
    handleMediaQuery (val) {
    },
    handleCollapse (val) {
      this.collapsed = val
    }
  }
}
</script>

<style lang="less" scoped>
@import "./BasicLayout.less";
.page-main {
  // overflow: hidden;
  transition: 0.7s;
  transform: translateX(0);
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.1s;
  transform: translateX(10px);
  opacity: 0;
}
</style>
