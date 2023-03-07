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
      const msg = meta.msg
      if (code === 400 && meta?.msg.indexOf('token') !== -1) {
        store.dispatch('app/logOut')
        ElMessage.error(msg || 'token验证失效')
      } else if (code === 200 || code === 201) {
        ElMessage.success(msg || '成功')
        resolve({
          data,
          meta
        })
      } else {
        reject(ElMessage.error(meta.msg || 'fail no message'))
      }
    })
  },
  (error) => {
    ElMessage.error('请求出错：' + error)
    return Promise.reject(error)
  }
)

export default service
