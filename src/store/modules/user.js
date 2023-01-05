import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: getToken()
  },
  mutations: {
    setTokenEl(state, token) {
      setToken(token)
      state.token = token
    },
    removeToken(state) {
      state.token = ''
      removeToken()
    }
  },
  actions: {
    async login(ctx, token) {
      const { data } = await login(token)
      ctx.commit('setTokenEl', data)
    }
  },
  getters: {}
}
