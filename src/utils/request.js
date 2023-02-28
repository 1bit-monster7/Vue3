import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.response.use(
  (response) => {
    const { meta, data } = response.data
    if (meta.status === 200 || meta.status === 201) {
      return data
    } else {
      ElMessage.error(meta.msg)
      return Promise.reject(new Error(meta.status))
    }
  },
  (error) => {
    error.response && ElMessage.error('请求出错：' + error.response.data)
    return Promise.reject(error.response.data)
  }
)

export default service
