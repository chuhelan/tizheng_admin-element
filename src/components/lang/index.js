import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookie from 'js-cookie'
import elementEN from 'element-ui/lib/locale/lang/en'
import elementZH from 'element-ui/lib/locale/lang/zh-CN'
import ZH from './zh'
import en from './en'
Vue.use(VueI18n)
export default new VueI18n({
  locale: Cookie.get('language') || 'zh',
  messages: {
    en: {
      ...elementEN,
      ...en
    },
    zh: {
      ...elementZH,
      ...ZH

    }
  }
})
