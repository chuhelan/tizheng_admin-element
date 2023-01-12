import request from '@/utils/request'
export const getManager = () => {
  // 获取数据一定要写return，否则获取不到
  return request.get('/sys/user/simple')
}
