<template>
  <div class="page-header-wrapper">
    <a-page-header
      :title="defaultTitle"
      :breadcrumb="{ props: { routes, itemRender } }"
      :sub-title="subTitle"
      @back="$listeners.back || null"
    >
      <template #extra>
        <slot name="extra"></slot>
      </template>
    </a-page-header>
  </div>
</template>

<script>
export default {
  name: 'PageHeaderWrapper',
  props: {
    title: {
      type: String,
      default: null
    },
    subTitle: {
      type: String,
      default: null
    },
    breadcrumb: {
      type: [Array, Boolean],
      default: false
    },
    breadcrumbPush: {
      type: [Array, Object],
      default () {
        return []
      }
    },
    breadcrumbSplice: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      routes: this.breadcrumb,
      defaultTitle: this.title || this.$route.meta.title
    }
  },
  created () {
    // 面包屑
    if (!this.breadcrumb) {
      this.routes = this.$route.matched.concat().map(function (route) {
        return {
          path: route.path,
          breadcrumbName: route.meta.title
        }
      })
      this.routes.push(...this.breadcrumbPush)

      if (this.breadcrumbSplice.length) {
        this.routes.splice(...this.breadcrumbSplice)
      }
    }
  },
  methods: {
    itemRender ({ route, params, routes, paths, h }) {
      if (route.path === this.$route.path || route.path === null) {
        return route.breadcrumbName
      }
      return h('router-link', {
          attrs: {
            to: {
              path: route.path || '/',
              params: params
            }
          }
        }, [route.breadcrumbName])
    }
  }
}
</script>

<style lang="less" scoped>
.page-header-wrapper {
  background: #fff;
}
</style>
