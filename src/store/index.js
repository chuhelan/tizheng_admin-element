import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import persimmon from './modules/persimmon'
import tagsView from './modules/tagsView'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    persimmon,
    tagsView
  },
  getters
})
export default store
