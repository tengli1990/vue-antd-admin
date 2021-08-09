<template>
  <div class="as-echarts" :style="initStyle" ref="asEcharts">
    <div ref="container" class="echarts-container"></div>
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
      },
      erd: null
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
      this.echart.setOption(this.options)
      this.echart.resize(this.size)
    },
    setDataset (dataset) {
      this.options.dataset = dataset
    },
    setOption (options) {
      this.$emit('input', { ...this.options, ...options })
    },
    /**
     * @param {String} name
     * @param {Function} handler
     */
    onChartEvent (name, handler) {
      this.echart.off(name)
      this.echart.on(name, params => {
        handler(params)
      })
    },
    clear () {
      this.echart.setOption({ dataset: {} })
    },
    getInstance () {
      return this.echart
    }
  }
}
</script>

<style lang="less">
.as-echarts {
  padding-bottom: 16px;
  width: 100%;
  .echarts-container {
    height: 100%;
  }
}
</style>
