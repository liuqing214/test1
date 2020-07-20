import {request} from './request.js'

export function getMenudata() {
  return request({
    url: '/menus'
  })
}

