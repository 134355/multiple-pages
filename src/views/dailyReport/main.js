import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import DcDatePicker from '@/components/DcDatePicker'
import MinView from 'min-view'
import DcForm from '@/components/DcForm/index'
import 'min-view/dist/MinView.css'
import '@/style/index.scss'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.component('DcDatePicker', DcDatePicker)
Vue.component('MinView', MinView)
Vue.component('DcForm', DcForm)

new Vue({
  render: h => h(App)
}).$mount('#app')
