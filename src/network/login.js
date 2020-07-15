import {request} from './request.js'

export function getLogindata(username, password) {
  return request({
    url: 'login',
    method: 'poat',
    data: {
      username,
      password
    }
  })
}

// export function getloggin() {
//   return request({
//     url: '/home/data',
//     params: {
//       type,
//       page
//     }
//   })
// }

