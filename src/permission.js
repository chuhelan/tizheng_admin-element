import store from '@/store'
import router from '@/router'
import { getUserToken } from '@/utils/auth'
const write = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  const token = store.state.user.token
  const userInfo = getUserToken()
  // console.log(store.state.user.userInfo)
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // if (!userInfo.userId) {
      await store.dispatch('user/getInfo')
      // }
      next()
    }
  } else {
    if (write.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
  return userInfo
})
