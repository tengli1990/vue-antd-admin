<template>
  <div class="as-toast" :class="[initClass]" v-if="visible">
    <a-spin :spinning="visible" :tip="text"></a-spin>
  </div>
</template>

<script>
import { Spin } from 'ant-design-vue'
export default {
  name: 'AsToast',
  components: {
    [Spin.name]: Spin
  },
  data () {
    return {
      visible: false,
      text: '',
      delayTime: 2500,
      timer: null
    }
  },
  computed: {
    initClass () {
      return {
        'is-loading': this.type === 'loading' && this.visible,
        'is-info': this.type === 'info' && this.visible
      }
    }
  },
  methods: {
    init () {
      if (this.type === 'loading') {
        clearTimeout(this.timer)
        return
      }
      this.delay(this.delayTime, () => {
        this.destroy()
      })
    },
    delay (time, callback) {
      if (typeof time === 'function') {
        callback = time
        time = this.delayTime
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        callback && callback()
      }, time)
    },
    destroy () {
      this.visible = false
      this.delay(400, () => {
        document.body.removeChild(this.$el)
      })
    },
    hide () {
      this.destroy()
    }
  }
}

</script>
<style lang="less">
.as-toast{
  z-index: 1000;
  position: absolute;;
  left:0;
  top: 0;
  right: 0;
  bottom: 0;
  background:rgba(0,0,0,.01);
  display:flex;
  justify-content: center;
  align-items:center;
}
</style>
