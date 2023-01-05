import request from '@/utils/request'
export const login = ({ mobile, password }) => {
  return request.post('/sys/login', {
    mobile,
    password
  })
}
export function getInfo(token) {

}
export function logout() {

}
