import * as source from './constant/dictionary.json'
import * as constantSource from './constant'
import './extend'
import config from '@/config/settings'
import moment from 'moment'
import { message } from 'ant-design-vue'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

export default {
  /**
   * @name 获取静态字典表list
   * fn('condition')
   * */
  $getConstantList (type) {
    const typeGroup = type.split('.')
    let obj = source.default
    typeGroup.forEach((item) => {
      if (obj[item]) {
        obj = obj[item]
      }
    })
    return Object.keys(obj).map(item => {
      return {
        code: item,
        label: obj[item] && obj[item].zh
      }
    })
  },
  /**
   * @name 获取静态常量
   * fn('TEST_LIST')
   * */
  $getConstant (type) {
    return JSON.parse(JSON.stringify(constantSource[type]))
  },
  /**
   * @name 根据字典表属性以及code码查找对应的文字描述
   * fn('equipmentType.type3','0000000000')
   * */
  $getTextByCode (type, code, name = '其他') {
    if (code === 'others' && name) { return name }
    const typeGroup = type.split('.')
    let text = ''
    let obj = source.default
    typeGroup.forEach((item) => {
      if (obj[item]) {
        obj = obj[item]
      }
    })
    try {
      text = obj[code].zh
    } catch (e) {
      text = null
    }
    return text || code
  },
  /** @name 深克隆 */
  $deepClone (source) {
    if (!source && typeof source !== 'object') {
      throw new Error('error arguments', 'deepClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = this.$deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    })
    return targetObj
  },
  /**
   * @name 日期格式化
   */
  $timestamp (date) {
    if (!date) {
      return ''
    }
    return Date.parse(date)
  },
  $timestampStart (date) {
    if (!date) {
      return ''
    }
    return Date.parse(moment(date).format('YYYY/MM/DD 00:00:00'))
  },
  $timestampEnd (date) {
    if (!date) {
      return ''
    }
    return Date.parse(moment(date).format('YYYY/MM/DD 23:59:59'))
  },
  $date (date) {
    if (!date) {
      return ''
    }
    return moment(date).format('YYYY-MM-DD')
  },
  $datetime (date) {
    if (!date) {
      return ''
    }
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
  },
  /** 复制文本 */
  $copyText (text) {
    var textString = text.toString()
    var input = document.querySelector('#copy-input')

    // input自带的select()方法在苹果端无法进行选择，自己实现
    if (!input) {
      input = document.createElement('input')
      input.id = 'copy-input'
      input.readOnly = 'disabled' // 防止ios聚焦触发键盘事件
      input.style.position = 'absolute'
      input.style.left = '-1000px'
      input.style.zIndex = '-1000'
      document.body.appendChild(input)
    }

    input.value = textString

    var selectText = function (textbox, startIndex, stopIndex) {
      if (textbox.createTextRange) {
        var range = textbox.createTextRange()
        range.collapse(true)
        range.moveStart('character', startIndex) // 起始光标
        range.moveEnd('character', stopIndex - startIndex)// 结束光标
        range.select() // 不兼容苹果
      } else {
        textbox.setSelectionRange(startIndex, stopIndex)
        textbox.focus()
        message.info('复制成功')
      }
    }

    selectText(input, 0, textString.length)

    // TODO IOS UIWebView禁用复制命令
    if (document.execCommand('copy')) {
      document.execCommand('copy')
    } else {
      message.info('您当前的系统版本暂不支持剪贴功能')
      console.log('不兼容')
    }

    input.blur()
  },
  $config: config
}
