import {request} from './request.js'

export function getLogindata(form) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      form
      // username: form.username,
      // password: form.password
    }
  })
}

// export function getloggin() {
//   return request({
//     url: '/home/data',
//  get请求用params
//     params: {
//       type,
//       page
//     }
//   })
// }

