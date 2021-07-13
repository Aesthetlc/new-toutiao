// 用户相关
import axios from '@/utils/request'

// 登录
export function login(data) {
  return axios({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 发送验证码
export function sendSms(mobile) {
  return axios({
    method: 'get',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
