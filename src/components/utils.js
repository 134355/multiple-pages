const toString = Object.prototype.toString

/**
 * @description 判断是否是Object类型
 */
export function isObject (value) {
  return toString.call(value) === '[object Object]'
}

/**
 * @description 判断是否是Array类型
 */
export function isArray (value) {
  return toString.call(value) === '[object Array]'
}

/**
 * @description 判断是否是Function类型
 */
export function isFunction (value) {
  return toString.call(value) === '[object Function]'
}

/**
 * @description 判断是否是String类型
 */
export function isString (value) {
  return toString.call(value) === '[object String]'
}

/**
 * @description 判断是否是Undefined类型
 */
export function isUndefined (value) {
  return toString.call(value) === '[object Undefined]'
}

/**
 * @description 判断是否是Boolean类型
 */
export function isBoolean (value) {
  return toString.call(value) === '[object Boolean]'
}

/**
 * @description 判断是否是false
 */
export function isFalse (value) {
  return value === false
}

/**
 * @description 深度合并对象
 */
export function deepMerge (obj1, obj2) {
  let key
  for (key in obj2) {
    obj1[key] = obj1[key] && isObject(obj1[key]) ? deepMerge(obj1[key], obj2[key]) : obj1[key] = obj2[key]
  }
  return obj1
}

/**
 * @description 生成form
 * @param {*} form 配置
 * @param {*} formData 配置对应的数据
 */
export function renderForm (form, formData) {
  const h = this.$createElement
  return form.map(item => {
    const { prop, name, rules, label } = item
    const { props = {}, attrs = {}, on = {} } = item.component
    if (item.service) {
      item.service().then(res => {
        item.component.options = res
        this.$forceUpdate()
      })
      this.$delete(item, 'service', undefined)
    }
    const data = {
      ...item.component,
      attrs: {
        value: formData[prop],
        ...attrs,
        ...props
      },
      on: {
        input: val => (formData[prop] = val),
        ...on
      }
    }
    let el
    let children

    if (name) {
      switch (name) {
        case 'el-select':
          children = (item.component.options || []).map(o => {
            return <el-option label={o.label} value={o.value} key={o.value}></el-option>
          })
          el = h(name, data, children)
          break
        case 'el-radio-group':
          children = (item.component.options || []).map(o => {
            return <el-radio label={o.value} key={o.value}>{o.label}</el-radio>
          })
          el = h(name, data, children)
          break
        case 'el-checkbox-group':
          children = (item.component.options || []).map(o => {
            return <el-checkbox label={o.value} key={o.value}>{o.label}</el-checkbox>
          })
          el = h(name, data, children)
          break
        default :
          el = h(name, data)
          break
      }
    }
    return (
      <el-form-item
        class="min-form-item-label"
        prop={prop}
        rules={rules}>
        <template slot="label">
          {label}
        </template>
        {el}
      </el-form-item>
    )
  })
}

/**
 * @description 生成详情
 * @param {*} form 配置
 * @param {*} formData 配置对应的数据
 */
export function renderInfoForm (form, formData) {
  const h = this.$createElement
  return form.map(item => {
    const el = h('div', formData[item.prop])
    return (
      <el-form-item class="min-form-item-label">
        <template slot="label">
          {item.label}：
        </template>
        {el}
      </el-form-item>
    )
  })
}

/**
 * @description 参数解析
 */
export function parseParams (obj) {
  const params = {}
  Object.keys(obj).forEach(key => {
    if (key.includes('&')) {
      key.split('&').forEach((k, i) => {
        params[k] = obj[key][i] || ''
      })
    } else {
      params[key] = obj[key]
    }
  })
  return params
}

/**
 * @description 应用程序入口
 */
export const application = (self) => {
  const app = {
    set (k, v) {
      switch (k) {
        case 'searchForm':
        case 'form':
        case 'action':
        case 'layout':
          if (isArray(v)) {
            self[k] = v
          } else {
            console.error(`${k}的值不是Array类型`)
          }
          break
        case 'service':
        case 'searchData':
        case 'formData':
          if (isObject(v)) {
            self[k] = v
          } else {
            console.error(`${k}的值不是Object类型`)
          }
          break
        default:
          self[k] = deepMerge(self[k], v)
          break
      }
      return app
    },
    done () {
      self.searchForm.forEach(item => {
        self.$set(self.searchData, item.prop, item.value || '')
      })
      self.form.forEach(item => {
        self.$set(self.formData, item.prop, item.value || '')
        self.copyFormData[item.prop] = item.value || ''
      })
      self.getTableData()
      self.isDone = true
    }
  }

  return app
}
