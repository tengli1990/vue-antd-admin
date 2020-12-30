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
      <div>
        <img :src="require('@/assets/images/logo.png')" />
        <h1>{{ title }}</h1>
      </div>
    </template>

    <template slot="rightContentRender">
      <right-content :topMenu="false" :theme="settings.theme" />
    </template>
    <router-view />
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
        colorWeak: false
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
          if (!(route.redirect && !route.children.length)) {
            newRoutes.push(route)
          }
        })
      }
      return newRoutes
    }
  },
  created () {},
  mounted () {
  },
  methods: {
    handleMediaQuery (val) {
      console.log(1111, val)
    },
    handleCollapse (val) {
      this.collapsed = val
    }
  }
}
</script>

<style lang="less" scoped>
@import "./BasicLayout.less";
</style>
