## conditionQuery Demo
``` html
<template>
   <as-condition-query :data="formData" :formConfig="formConfig" :buttonConfig="buttonConfig" @buttonClick="buttonClick" />
</template>
```
``` js 
export default {
  data(){
    return {
      formData: {},
      formConfig: [
        {
          type: 'inputNumber',
          label: '数字输入框',
          bindKey: 'inputNumber',
          placeholder: '请输入'
        },
        {
          type: 'input',
          label: '输入框',
          bindKey: 'input',
          placeholder: '请输入'
        },
        {
          type: 'select',
          label: '运营状态',
          bindKey: 'operationStatus',
          placeholder: '请输入',
          options: [
            {
              value: 'a',
              name: 'A'
            },
              {
              value: 'b',
              name: 'B'
            },
              {
              value: 'c',
              name: 'C'
            }
          ]
        },
        {
          type: 'date',
          label: '日期',
          bindKey: 'date',
          placeholder: '请选择日期'
        },
        {
          type: 'month',
          label: '月份',
          bindKey: 'month',
          placeholder: '请选择月份'
        },
        {
          type: 'date',
          label: '时间',
          model: 'time',
          bindKey: 'time',
          placeholder: '请选择时间'
        },
        {
          type: 'dateRange',
          label: '日期范围',
          bindKey: 'dateRange'
        },
        {
          type: 'fuzzySearch',
          fuzzyType: 'ssss',
          label: '部门名称',
          bindKey: 'ssss',
          placeholder: '请输入部门',
          options: []
        },
        {
          type: 'fuzzySearchB',
          fuzzyType: 'bbbbb',
          label: '角色名称',
          bindKey: 'bbbbb',
          placeholder: '请输入角色',
          options: []
        },
        {
          type: 'cascader',
          label: '所属部门',
          bindKey: 'department',
          fieldNames: { label: 'departmentName', value: 'departmentName', children: 'children' },
          customValue: value => {
            const len = value.length - 1
            return value[len] || ''
          },
          options: []
        },
        /** @name 联动 */
        {
          type: 'select',
          label: '设备类型',
          bindKey: 'equipmentType',
          fieldNames: { name: 'label', value: 'code' },
          change: value => {
            const equipmentPart = this.$getConstantList('equipmentPart')
            this.formConfig[4].defaultOptions = equipmentPart.filter(item => item.code.substring(0, 9) === value)
            return 'equipmentPart'
          },
          options: this.$getConstantList('equipmentType.type3')
        },
        // 如果使用defaultOptions 清空也会重置defaultOptions
        {
          type: 'select',
          label: '安装位置',
          bindKey: 'equipmentPart',
          fieldNames: { name: 'label', value: 'code' },
          defaultOptions: []
        }
      ],
      buttonConfig: [
        {
          clickType: 'search',
          type: 'primary',
          icon: 'search',
          style: {
            width: '50px',
            marginLeft: '-18px',
            padding: '0 10px'
          },
          name: ''
        },
        {
          clickType: 'search',
          type: 'primary',
          icon: 'el-icon-search',
          name: '查询'
        },
        {
          clickType: 'reset',
          type: 'primary',
          icon: 'el-icon-remove-outline',
          name: '重置'
        }
      ]
    }
  },
  methods:{
    /**
     * @params {string} 按钮的类型
     * @params {object} 条件搜索选择的参数
     */
    buttonClick({type, params}){},
    /**
     * @param {Object}
     * @param item 当前配置对象
     * @param value 当前输入文案的值用来请求list数据
     * @param {function} compolete 
     * */
    fuzzyEvent ({ item, value, compolete }) {
      const { options, fuzzyType } = item
      // 模拟异步请求
      setTimeout(() => {
        options.push(...[
          {
            value: '1',
            name: '部门一'
          },
          {
            value: '2',
            name: '部门二'
          }
        ])
        compolete()
      }, 1000)
    },
  }
}
```
