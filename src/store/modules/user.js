import { getToken, setToken, removeToken, getUserToken, setUserToken, removeUserToken, setTimeStamp } from '@/utils/auth'
import { login, getInfo, getUserDetailById } from '@/api/user'
import { resetRouter } from '@/router'
// import store from '@/store'
export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: getUserToken()
  },
  mutations: {
    // 设置token
    setTokenEl(state, token) {
      setToken(token)
      state.token = token
      setTimeStamp()
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
      return user
    },
    logout(ctx) {
      ctx.commit('removeToken')
      ctx.commit('removeUserInfo')
      resetRouter()
      ctx.commit('persimmon/setRoutes', [], { root: true })
    }
  },
  getters: {}
}
