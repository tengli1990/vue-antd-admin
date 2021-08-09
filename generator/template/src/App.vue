<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
export default {
  data () {
    return {
      locale: this.$store.getters.locale
    }
  },
  methods: {
    <%_ if (options.echarts) { _%>
    // hasEchart () {}
    <%_ } _%>
  }
}
</script>
