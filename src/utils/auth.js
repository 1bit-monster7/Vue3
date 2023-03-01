import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token-V3'
// cookie 失效时间 单位 分钟
export const defaultTokenExpirationTime = 600

const millisecond = new Date().getTime()

const expiresTime = new Date(
  millisecond + 60 * 1000 * defaultTokenExpirationTime
)

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  Cookies.set(TokenKey, token, {
    expires: expiresTime
  })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
