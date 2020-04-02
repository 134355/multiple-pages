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
 * @description 判断是否是Undefined类型
 */
export function isUndefined (value) {
  return toString.call(value) === '[object Undefined]'
}

/**
 * @description 判断是否是String类型
 */
export function isString (value) {
  return toString.call(value) === '[object String]'
}

/**
 * @description 生成form
 * @param {*} form 配置
 * @param {*} formData 配置对应的数据
 */
export function renderForm (form, formData) {
  const h = this.$createElement
  return form.map(item => {
    if (!isUndefined(item.slot)) {
      if (!isString(item.slot)) {
        console.error('prop: form[item][slot] 必须是字符串')
      }
      return this.$scopedSlots[item.slot](formData)
    }
    const { prop, name, rules, label } = item
    const { props = {}, attrs = {}, on = {} } = item.component || {}
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
        case 'el-cascader':
          data.attrs.options = item.component.options || []
          el = h(name, data)
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
 * @description 生成form button
 * @param {*} action 配置
 */
export function renderFormButton (action) {
  const h = this.$createElement
  const el = action.map(item => {
    if (isString(item)) {
      switch (item) {
        case 'search':
          return <el-button type="primary" on-click={this.submit}>搜索</el-button>
        case 'reset':
          return <el-button on-click={this.resetForm}>重置</el-button>
        case 'export':
          return <el-button on-click={this.export}>导出</el-button>
      }
    }
    // 业务逻辑尚未完成 请不用使用
    if (isObject(item)) {
      const { name } = item
      const data = {
        ...item.componen
      }
      h(name, data)
    }
  })
  return (
    <el-form-item>
      {el}
    </el-form-item>
  )
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
