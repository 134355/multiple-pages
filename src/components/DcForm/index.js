import { renderForm, renderFormButton, parseParams, isObject, isArray, isUndefined } from './utils'
import './style.scss'

export default {
  name: 'DcForm',
  props: {
    form: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      formData: {},
      valueData: {},
      isKeyWords: false
    }
  },
  created () {
    if (!isObject(this.form)) {
      console.error('prop: form 必须是对象')
    }
    if (!isArray(this.form.item)) {
      console.error('prop: form[item] 必须是数组')
    }
    if (isUndefined(this.form.inline)) {
      this.form.inline = true
    }
    if (isUndefined(this.form.action)) {
      this.form.action = ['search', 'reset']
    }
    if (!isUndefined(this.form.keyWords)) {
      if (!isObject(this.form.keyWords)) {
        console.error('prop: form[item][keyWords] 必须是对象')
      }
      if (isUndefined(this.form.keyWords.placeholder)) {
        this.form.keyWords.placeholder = '请输入内容'
      }
      if (isUndefined(this.form.keyWords.style)) {
        this.form.keyWords.style = {
          width: '300px'
        }
      }
      this.isKeyWords = true
      this.$set(this.formData, this.form.keyWords.prop, this.form.keyWords.value || '')
    }
    this.form.item.map(item => {
      this.$set(this.formData, item.prop, item.value || '')
      this.valueData[item.prop] = item.value || ''
    })
  },
  methods: {
    submit () {
      const data = parseParams(this.formData)
      this.$emit('submit', JSON.parse(JSON.stringify(data)))
    },
    resetForm () {
      Object.keys(this.formData).forEach(k => {
        this.formData[k] = this.valueData[k]
      })
    },
    export () {
      const data = parseParams(this.formData)
      this.$emit('export', JSON.parse(JSON.stringify(data)))
    },
    renderForm () {
      return renderForm.call(this, this.form.item, this.formData)
    },
    renderFormButton () {
      return renderFormButton.call(this, this.form.action)
    }
  },

  render () {
    return (
      <el-row class="min-form">
        <el-form inline={this.form.inline} label-width={this.form.labelWidth}>
          {this.renderForm()}
          {this.renderFormButton()}
          {this.isKeyWords ? <div class="min-form-key-words" style="float: right;">
            <el-form-item>
              <el-input v-model={this.formData[this.form.keyWords.prop]} placeholder={this.form.keyWords.placeholder} style={this.form.keyWords.style}>
                <el-button slot="append" icon="el-icon-search" on-click={this.submit}></el-button>
              </el-input>
            </el-form-item>
          </div> : ''}
        </el-form>
      </el-row>
    )
  }
}
