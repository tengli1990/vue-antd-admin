import Vue from 'vue'
import ToastComponent from './Index.vue'

const defaultOptions = {
  text: '...加载中',
  delayTime: 2500,
  timer: null,
  node: null
}
const ToastConstructor = Vue.extend(ToastComponent)
let instance

function Toast (options, type) {
  instance = new ToastConstructor({
    el: document.createElement('div')
  })
  document.body.append(instance.$el)
  if (typeof options === 'object') {
    options = Object.assign({}, defaultOptions, options)
    for (const prop in options) {
      if (Object.prototype.hasOwnProperty.call(instance, prop)) {
        instance[prop] = options[prop]
      }
    }
    if (options.node) {
      document.getElementById(options.node).appendChild(instance.$el)
    }
  } else {
    for (const prop in defaultOptions) {
      if (Object.prototype.hasOwnProperty.call(instance, prop)) {
        instance[prop] = defaultOptions[prop]
      }
    }
    instance['text'] = options || defaultOptions.text
  }
  if (type) {
    instance['type'] = type
  }
  instance.visible = true
  instance.init && instance.init()
}

Toast.loading = function (options) {
  Toast(options, 'loading')
}

Toast.hide = function () {
  if (!instance) {
    return
  }
  if (instance.node) {
    instance.hide()
    document.getElementById(instance.node).removeChild(instance.$el)
    instance = null
    return
  }
  instance.hide()
}

export default Toast
export {
  Toast
}
