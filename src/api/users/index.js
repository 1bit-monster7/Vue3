import request from '@/utils/request'

export function getUsersList(params) {
  return request({
    url: 'users',
    params
  })
}

export function setUseState(uid, state) {
  return request({
    url: `users/${uid}/state/${state}`,
    method: 'put'
  })
}

export function addUser(data) {
  return request({
    url: 'users',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: `users/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: `users/${id}`,
    method: 'delete'
  })
}
