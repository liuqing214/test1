import {request} from './request.js'

export function getUserlist(userlist) {
  return request({
    url: '/users',
    params: {
      userlist
    }
  })
}
export function changeUserstate(userrow) {
  return request({
    url: `users/{$userrow.id}/state/{$userrow.mg_state}`,
    method: 'put'
  })
}
export function addUserinfo(addinfo) {
  return request({
    url: '/user',
    method: 'post',
    data: {
      addinfo
    }
  })
}
export function editUserinfo(id) {
  return request({
    url: '/users/ '+ id,
   
  })
}
export function editUserSubmit(editFrom) {
  return request({
    url: '/users/ '+ editFrom.id,
    method: 'put',
    data: {
      email: editFrom.email,
      mobile: editFrom.mobile
    }
  })
}
export function deleteUserinfo(id) {
  return request({
    url: '/user/ '+ id,
    method: 'delete'
  })
}
