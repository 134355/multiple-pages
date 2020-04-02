import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale'
import zh from './lang/zh'
import en from './lang/en'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'zh',
  messages: {
    zh,
    en
  }
})

locale.i18n((key, value) => i18n.t(key, value))

export default i18n
