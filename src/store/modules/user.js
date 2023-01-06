import { getToken, setToken, removeToken, getUserToken, setUserToken, removeUserToken } from '@/utils/auth'
import { login, getInfo, getUserDetailById } from '@/api/user'
// import store from '@/store'
export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: getUserToken()
  },
  mutations: {
    setTokenEl(state, token) {
      setToken(token)
      state.token = token
    },
    removeToken(state) {
      state.token = ''
      removeToken()
    },
    removeUserInfo(state) {
      state.userInfo = {}
      removeUserToken()
    },
    // 设置用户信息
    setUserInfo(state, payload) {
      state.userInfo = { ...payload }
      setUserToken(JSON.stringify(payload))
    }
  },
  actions: {
    async login(ctx, token) {
      const { data } = await login(token)
      ctx.commit('setTokenEl', data)
    },
    // 获取用户信息
    async getInfo(ctx) {
      const { data } = await getInfo()
      const res = await getUserDetailById(data.userId)
      const user = { ...data, ...res.data }
      ctx.commit('setUserInfo', user)
    },
    logout(ctx) {
      ctx.commit('removeToken')
      ctx.commit('removeUserInfo')
    }
  },
  getters: {}
}
