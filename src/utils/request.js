import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils/auth'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    config.headers.Authorization = getToken()
    return config
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)

service.interceptors.response.use(
  (response) => {
    return new Promise((resolve, reject) => {
      const { meta, data } = response.data
      const code = meta.status || 200 // 如果没有状态码则默认200
      const msg = meta.msg || '系统未知错误，请反馈给管理员'
      if (code === 400) {
        store.dispatch('app/logOut')
        ElMessage.error(msg)
      } else if (code !== 200 || code !== 201) {
        resolve(data)
      }
    })
  },
  (error) => {
    ElMessage.error('请求出错：' + error)
    return Promise.reject(error)
  }
)

export default service
