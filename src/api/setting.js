import request from '@/utils/request'
export const getRole = (data) => {
  return request.get('/sys/role', {
    params: {
      page: data.page,
      pagesize: data.pagesize
    }
  })
}
export const getCompanyList = (id) => {
  return request.get(`/company/${id}`)
}
export const delCompany = (id) => {
  // console.log(id)
  return request.delete(`/sys/role/${id}`)
}
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}
export function updateRoleDetail(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'PUT',
    data

  })
}
export function addRole(data) {
  return request({
    url: '/sys/role',
    data,
    method: 'post'
  })
}

