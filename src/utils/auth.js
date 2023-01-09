import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

const UserToken = 'userInfo'

const timeKey = 'timeStamp'
// 用户登录token
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 用户信息
export function getUserToken() {
  return Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : {}
}
export function setUserToken(token) {
  return Cookies.set(UserToken, token)
}

export function removeUserToken() {
  return Cookies.remove(UserToken)
}

// 获取时间戳
// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(timeKey)
}
// 设置时间戳
export function setTimeStamp() {
  Cookies.set(timeKey, Date.now())
}
