import { login as loginApi } from '@/api/login'
import router from '@/router'

export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('token') || ''
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    }
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginApi(userInfo)
          .then((r) => {
            commit('setToken', r.token)
            router.replace('/')
            resolve(r)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
