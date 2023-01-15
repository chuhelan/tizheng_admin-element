import request from '@/utils/request'
export const getManager = () => {
  // 获取数据一定要写return，否则获取不到
  return request.get('/sys/user/simple')
}
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
export const addEmployee = (data) => {
  return request({
    url: '/sys/user',
    method: 'POST',
    data
  })
}
