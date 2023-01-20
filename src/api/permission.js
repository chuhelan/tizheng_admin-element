import request from '@/utils/request'
export const getPermission = () => {
  return request({
    method: 'GET',
    url: '/sys/permission'
  })
}
export function addPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}
// 删除权限
export function delPermission(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'delete'
  })
}
export function updatePermission(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'put',
    data
  })
}
export function getPermissionDetail(id) {
  return request({
    url: `/sys/permission/${id}`
  })
}
