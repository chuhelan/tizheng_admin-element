import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

const UserToken = 'userInfo'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getUserToken() {
  return Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : {}
}
export function setUserToken(token) {
  return Cookies.set(UserToken, token)
}

export function removeUserToken() {
  return Cookies.remove(UserToken)
}
