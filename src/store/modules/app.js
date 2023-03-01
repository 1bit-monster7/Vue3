import { login as loginApi } from '@/api/login'
import router from '@/router'
import { getToken, removeToken, setToken } from '@/utils/auth'

export default {
  namespaced: true,
  state: () => ({
    token: getToken(),
    expires_in: null
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginApi(userInfo)
          .then((r) => {
            const { token } = r
            commit('setToken', token)
            setToken(token)
            router.replace('/')
            resolve(r)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    logOut({ commit }) {
      return new Promise((resolve, reject) => {
        commit('setToken', '')
        removeToken()
        router.replace('/login')
      })
    }
  }
}
