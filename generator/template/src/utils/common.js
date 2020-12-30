import * as source from '@/assets/dictionary.json'
import config from '@/config/index'
import moment from 'moment'

export default {
  $getNodeTypeList: function (type) {
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
  // 获取当前天开始的时间
  $getDaysStartTime (date = new Date()) {
    const curDate = moment(date).format('YYYY-MM-DD')
    return moment(curDate).format('YYYY-MM-DD HH:mm:ss')
  },
  // 获取当前天结束的时间
  $getDaysEndTime (date = new Date()) {
    const curDate = moment(date).format('YYYY-MM-DD')
    return moment(curDate).add('days', 1).subtract('seconds', 1).format('YYYY-MM-DD HH:mm:ss')
  },
  $access: function (permission) {
    const userPermissions = JSON.parse(window.localStorage.getItem('ROLE_PERMISSIONS_LIST') || '[]')
    return userPermissions.includes(permission.id)
  },
  $config: config
}
