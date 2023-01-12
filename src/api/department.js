import request from '@/utils/request'
export const getDepartment = () => {
  return request.get('/company/department')
}
export const delDepartment = (id) => {
  return request.delete(`/company/department/${id}`)
}
export const addDepartment = (from) => {
  return request.post('/company/department', from)
}
export const detailDepartment = (id) => {
  return request.get(`/company/department/${id}`)
}
export const editDepartments = (data) => {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
