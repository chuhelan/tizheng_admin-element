import PageTools from '@/components/pageTools'
import UploadExcel from '@/components/uploadExcel'
import ImageUpload from '@/components/imageUpload'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('ImageUpload', ImageUpload)
  }
}
