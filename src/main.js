import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Component from './components'
import '@/icons' // icon
import '@/permission' // permission control
import * as imageError from '@/directives'
import checkPersimmon from '@/mixin/checkPersimmon'
import i18n from '@/components/lang/index.js'
// import echarts from '@/views/dashboard/components/echarts'
// import echarts from 'echarts'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
*
* Currently MockJs will be used in the production environment,
* please remove it before going online ! ! !
*/
import moment from 'moment'
// Vue.prototype.$echarts = echarts
Vue.prototype.$moment = moment
// Vue.prototype.$echarts = echarts
Vue.mixin(checkPersimmon)
// 定义全局时间格式过滤器
Vue.filter('dateFormat', function(daraStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(daraStr).format(pattern)
})
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
Vue.use(Component)
Vue.use(VueAxios, axios)
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Object.keys(imageError).forEach(element => {
  Vue.directive(element, imageError[element])
})
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
