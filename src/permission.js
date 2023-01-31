import store from '@/store'
import router from '@/router'
import { getUserToken } from '@/utils/auth'
const write = ['/login', '/404']
// const isRefresh = false
router.beforeEach(async(to, from, next) => {
  const token = store.state.user.token
  const userInfo = getUserToken()
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // if (!userInfo.userId) {
      await store.dispatch('user/getInfo')
      const menus = store.state.user.userInfo.roles.menus
      const routes = await store.dispatch('persimmon/filterRoutes', menus)
      router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])
      // }
      // console.log(to.path)
      // next(to.path)
      next()
      // next({ ...to, replace: true })
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
