import { constantRoutes, asyncRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    routes: constantRoutes
  },
  mutations: {
    setRoutes(state, newRoutes) {
      state.routes = [...constantRoutes, ...newRoutes]
    }
  },
  actions: {
    filterRoutes(ctx, menu) {
      const routes = []
      menu.map(key => routes.push(...asyncRoutes.filter(item => item.name === key)))
      ctx.commit('setRoutes', routes)
      return routes
    }
  },
  getters: {}
}
