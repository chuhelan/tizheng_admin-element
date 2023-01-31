import PageTools from '@/components/pageTools'
import UploadExcel from '@/components/uploadExcel'
import ImageUpload from '@/components/imageUpload'
import Print from 'vue-print-nb'
import ThemePicker from './ThemePicker'
import lang from './lang/index.vue'
import tagsView from './TagsView/'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('ImageUpload', ImageUpload)
    Vue.use(Print)
    Vue.component('ThemePicker', ThemePicker)
    Vue.component('lang', lang)
    Vue.component('tagsView', tagsView)
  }
}
