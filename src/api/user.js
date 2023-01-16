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
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

/** **
 * 获取用户的岗位信息
 *
 * ****/
export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}
export const getEmployeeSimple = () => {
  // 获取数据一定要写return，否则获取不到
  return request.get('/sys/user/simple')
}

/**
 * 保存岗位信息
 * ****/
export function updateJob(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}

