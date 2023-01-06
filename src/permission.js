import store from '@/store'
import router from '@/router'
import Cookies from 'js-cookie'
const write = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  const token = store.state.user.token
  const userInfo = Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : ''
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // if (!userInfo.userId) {
      await store.dispatch('user/getInfo')
      // }
      console.log(userInfo)
      next()
    }
  } else {
    if (write.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
