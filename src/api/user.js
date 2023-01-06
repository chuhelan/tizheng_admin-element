import request from '@/utils/request'
export const login = ({ mobile, password }) => {
  return request.post('/sys/login', {
    mobile,
    password
  })
}
export function getInfo() {
  return request.post('/sys/profile')
}
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
export function logout() {

}
