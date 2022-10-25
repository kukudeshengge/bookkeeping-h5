import { get, post } from '@/utils'

// 记账列表
export const queryBillList = data => {
  return get('/bill/queryBillList', data)
}

// 标签列表
export const getTagList = data => {
  return get('/tag/list', data)
}

// 删除记账
export const billDelete = data => {
  return get('/bill/delete', data)
}

// 新增记账
export const billAdd = data => {
  return post('/bill/add', data)
}

// 记账详情
export const billDetail = data => {
  return get('/bill/detail', data)
}

// 获取用户信息
export const getUserInfo = data => {
  return get('/user/getUserInfo', data)
}
// 获取月份统计
export const getMonthStatistics = data => {
  return get('/bill/monthStatistics', data)
}

// 上传文件
export const uploadFile = data => {
  return post('/upload', data)
}

// 更新用户信息
export const updateUserInfo = data => {
  return post('/user/updateUserInfo', data)
}

// 修改密码
export const resetPasswordApi = data => {
  return post('/user/resetPassword', data)
}

// 更新账单
export const updateBillInfo = data => {
  return post('/bill/update', data)
}
