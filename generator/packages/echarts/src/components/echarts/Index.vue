<template>
  <div class="as-echarts">
    <div ref="container" :style="initStyle" class="echarts-container"></div>
  </div>
</template>

<script>
export default {
  name: 'AsEcharts',
  props: {
    height: {
      type: String,
      default: '300px'
    },
    value: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      options: this.value,
      echart: null,
      size: {
        width: 'auto',
        height: 'auto'
      }
    }
  },
  computed: {
    initStyle () {
      return {
        height: this.height
      }
    }
  },
  watch: {
    value: {
      handler (newVal) {
        this.options = newVal
        this.updateEchart()
      },
      deep: true
    },
    height: {
      handler (newVal) {
        this.size.height = newVal
        this.updateEchart()
      }
    }
  },
  created () {
    // 窗口变化更新echart视图渲染
    window.addEventListener('resize', () => {
      this.$nextTick(() => {
        this.updateEchart()
      })
    })
  },
  mounted () {
    this.initEchart()
  },
  methods: {
    // 初始化
    initEchart () {
      const el = this.$refs.container
      this.echart = this.$echarts.init(el)
      this.updateEchart()
    },
    // 渲染数据
    updateEchart () {
      this.echart.resize(this.size)
      this.echart.setOption(this.options)
    },
    /**
     * @param {String} name
     * @param {Function} handler
     */
    onChartEvent (name, handler) {
      this.echart.off(name)
      this.echart.on(name, (params) => {
        handler(params)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.as-echarts {
  background-color: #fff;
  padding-bottom: 16px;
  width: 100%;
}
</style>
