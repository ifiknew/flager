import Taro from '@tarojs/taro'
import { AtMessage } from 'taro-ui'
const ServerOrigin = 'https://cangwu.art'

interface QueryParams {
  url: string,
  searchParams?: {
    [key: string]: any
  },
  success?: string
  option?: Partial<Taro.request.Param>
}
const API = {
  query: ({ url, searchParams = {}, success, option = { }}: QueryParams) => {
    url = 
      `${ServerOrigin}${url}`
    if (Object.keys(searchParams).length != 0) {
      url = url + '?'
      url = url + Object.entries(searchParams)
        .map(([k,v]) => `${k}=${v}`)
        .join('&')
    }
    const defaultHeaders = {
      'F-B-UserId': Taro.getStorageSync('userId')
    }
    
    return Taro.request({
      url,
      method: 'GET',
      ...option,
      header: {
        'content-type': 'application/json',
        ...option.header,
        ...defaultHeaders
      },
      mode: 'cors',
      dataType: 'json',
    }).then(res => {
      if (res.statusCode == 200 && success) {
        Taro.showToast({
          icon: 'success',
          title: success,
          duration: 1000
        })
      } else {
        // message({
        //   message: '服务器错误',
        //   type: 'error',
        //   duration: 1000
        // })
      }
      return res
    })
  }
}

export default API