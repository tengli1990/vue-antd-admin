<template>
  <div class="as-condition-query">
    <a-form-model ref="ruleForm" layout="inline" :model="copyData">
      <a-form-model-item
        class="form-model-item"
        v-for="(item, index) in formConfig"
        :key="`form-${index}`"
        :prop="item.bindKey"
      >
        <span slot="label" v-html="item.label"></span>
        <!-- fuzzySearch -->
        <a-select
          v-if="item.type === 'fuzzySearch'"
          mode="default"
          v-model="copyData[item.bindKey]"
          allowClear
          show-search
          :show-arrow="false"
          :not-found-content="item.fetching ? undefined : null"
          :filter-option="false"
          @search="fuzzySearch(item, $event)"
          @change="fuzzySearchChange(item, $event)"
          @blur="fuzzyBlur(item)"
          class="w-220"
        >
          <a-spin v-if="item.fetching" slot="notFoundContent" size="small" />
          <a-select-option v-for="d in item.options" :key="d.value">
            {{ d.name }}
          </a-select-option>
        </a-select>

        <a-input-search
          v-if="item.type === 'inputSearch'"
          v-model="copyData[item.bindKey]"
          allowClear
          enter-button
          @search="buttonClick(item.clickType || 'search')"
          class="w-260"
        />
        <a-input v-if="item.type === 'input'" v-model="copyData[item.bindKey]" allowClear class="w-220" />

        <a-input-number v-if="item.type === 'inputNumber'" v-model="copyData[item.bindKey]" allowClear class="w-220" />

        <a-select
          v-if="item.type === 'select'"
          v-model="copyData[item.bindKey]"
          allowClear
          :mode="item.mode"
          :option-label-prop="item.optionLabelProp || false"
          :show-arrow="defaultTrue(item.showArrow)"
          :showSearch="item.showSearch || false"
          @change="onSelectChange(item.change, $event)"
          class="w-180"
        >
          <a-select-option
            v-for="(opt, idx) in initSelectOptions(item.defaultOptions || item.options)"
            :key="`option-${item.bindKey}-${idx}`"
            :value="opt[selectInitField(item, 'value')]"
            :label="opt[selectInitField(item, 'name')]"
          >
            {{ opt[selectInitField(item, 'name')] }}
          </a-select-option>
        </a-select>

        <a-date-picker
          v-if="item.type === 'date' && item.model !== 'time'"
          allowClear
          type="date"
          v-model="copyData[item.bindKey]"
          :model="item.model || 'date'"
          :valueFormat="dateFormat[item.model || 'date']"
          class="w-180"
        />

        <!-- date picker model time -->
        <a-date-picker
          v-if="item.type === 'date' && item.model === 'time'"
          allowClear
          v-model="datePickerData[item.bindKey]"
          @openChange="datePickerOpenChange(item, $event)"
          @ok="datePickerConfirm(item)"
          type="date"
          showTime
          :model="item.model"
          :valueFormat="dateFormat['time']"
          class="w-180"
        />

        <a-month-picker
          v-if="item.type === 'month'"
          v-model="copyData[item.bindKey]"
          :valueFormat="dateFormat[item.type]"
          class="w-180"
        />

        <a-range-picker
          v-if="item.type === 'dateRange'"
          v-model="copyData[item.bindKey]"
          :allowClear="item.clear || false"
          :valueFormat="dateFormat['date']"
          :format="dateFormat.date"
          class="w-300"
        >
          <a-icon slot="suffixIcon" type="calendar" />
        </a-range-picker>
        <a-cascader
          v-if="item.type === 'cascader'"
          v-model="copyData[item.bindKey]"
          allowClear
          placeholder=""
          :changeOnSelect="defaultTrue(item.changeOnSelect)"
          :field-names="item.fieldNames"
          :options="item.options"
        />
      </a-form-model-item>

      <a-form-model-item class="condition-query-buttons">
        <a-space size="middle">
          <a-button
            v-for="(item, index) in buttonConfig"
            :style="item.style || {}"
            :key="`button-${index}`"
            :type="item.type"
            :icon="item.icon"
            @click="buttonClick(item.clickType)"
          >
            {{ item.name }}
          </a-button>
        </a-space>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'AsConditionQuery',
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    formConfig: {
      type: Array,
      default () {
        return []
      }
    },
    buttonConfig: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      datePickerData: {},
      dateFormat: {
        date: 'YYYY-MM-DD',
        time: 'YYYY-MM-DD HH:mm:ss',
        month: 'YYYY-MM',
        year: 'YYYY'
      },
      copyData: JSON.parse(JSON.stringify(this.data))
    }
  },
  methods: {
    /**
     * @module datetime时间处理函数
     * @param {object} 时间配置对象
     * @param {boolean} 时间窗口操作状态
     */
    datePickerOpenChange (item, status) {
      const { bindKey } = item
      if (!status) {
        this.datePickerData[bindKey] = this.copyData[bindKey] || ''
      } else {
        if (!this.datePickerData[bindKey]) {
          this.$set(this.datePickerData, bindKey, moment(new Date()).format(this.dateFormat['time']))
        }
      }
    },
    /**
     * @param {object} 时间配置对象
     */
    datePickerConfirm (item) {
      const { bindKey } = item
      this.$set(this.copyData, bindKey, this.datePickerData[bindKey])
    },
    /**
     * @module 模糊搜索
     */
    fuzzyBlur (item) {
      item.fetching = false
    },
    fuzzySearch (item, value) {
      if (item.fetching) return
      item.options = []
      item.fetching = true
      const compolete = item => {
        const data = item
        return () => {
          data.fetching = false
        }
      }
      item.timer && clearTimeout(item.timer)
      item.timer = setTimeout(() => {
        this.$emit('fuzzyEvent', { item, value, compolete: compolete(item) })
      }, 500)
    },
    fuzzySearchChange (item, value) {
      this.$emit('fuzzyChange', { item, value })
    },
    /** @name 初始化select选项数据结构 */
    initSelectOptions (options) {
      if (!options || !options.length) {
        return options
      }
      if (typeof options[0] === 'string') {
        return options.map(item => {
          return {
            name: item,
            value: item
          }
        })
      }
      return options
    },
    /** @name 重定义select fieldNames */
    selectInitField (item, type) {
      if (item.fieldNames) {
        return item.fieldNames[type]
      }
      return type
    },
    /** @name 定义select事件监听 */
    onSelectChange (changeCallback, value) {
      if (!changeCallback) {
        return
      }
      if (typeof changeCallback !== 'function') {
        throw new TypeError('params:change must be a function')
      }
      const resetKey = changeCallback(value)
      if (this.copyData[resetKey]) {
        this.copyData[resetKey] = ''
      }
    },
    /**
     * @name 重置方法
     * */
    reset () {
      this.$refs.ruleForm.resetFields()
      this.$set(this, 'copyData', JSON.parse(JSON.stringify(this.data)))
      this.$set(this, 'datePickerData', {})
    },
    /**
     * @name 查询时注入处理结果的函数并获取相应的结果
     */
    injectCustomValueRule (type, key, value) {
      // eslint-disable-next-line no-undef-init
      let ret = undefined
      this.formConfig.forEach((item, index) => {
        if (item.bindKey === key && item.customValue) {
          ret = item.customValue(value)
        }
        // reset操作，清空defaultOptions的选项
        if (type === 'reset' && item.defaultOptions) {
          item.defaultOptions = []
        }
      })

      return ret
    },
    /**
     * @name 默认true的处理函数
     * @return {Boolean}
     */
    defaultTrue (bool) {
      return bool !== false
    },
    /**
     * @name 点击按钮
     * @param {string} 按钮类型
     */
    buttonClick (type) {
      const params = {}
      if (type === 'reset') {
        this.reset()
      }
      // 遍历赋值
      this.formConfig.forEach(item => {
        const key = item.bindKey
        const value = this.copyData[key] === undefined ? '' : this.copyData[key]
        // 判断是否注入了自定义函数
        const customeVal = this.injectCustomValueRule(type, key, value)
        if (typeof customeVal === 'function') {
          customeVal({ key, value, params })
        } else if (customeVal === null) {
          // 返回值为null 此字段不会添加到返回结果中
        } else if (customeVal !== undefined) {
          params[key] = customeVal
        } else {
          params[key] = value
        }
      })
      this.$emit('buttonClick', { type, params })
    }
  }
}
</script>

<style lang="less" scoped>
.w-220 {
  width: 220px;
}

.w-260 {
  width: 260px;
}

.w-180 {
  width: 180px;
}

.w-300 {
  width: 280px;
}

.condition-query-buttons {
  margin-right: 0;
}
</style>
