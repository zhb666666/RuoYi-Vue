import store from '@/store'
import config from '@/config'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import { tansParams } from '@/utils/ruoyi'

let isRelogin = { show: false }

const request = (options) => {
  // 是否需要设置 token
  const isToken = (options.headers || {}).isToken === false
  options.header = options.header || {}
  
  if (getToken() && !isToken) {
    options.header['Authorization'] = 'Bearer ' + getToken()
  }
  
  // 默认参数
  const defaultOptions = {
    url: config.baseUrl + options.url,
    method: options.method || 'GET',
    header: {
      'Content-Type': 'application/json;charset=UTF-8',
      ...options.header
    },
    data: options.data || {},
    timeout: 10000
  }
  
  // get请求映射params参数
  if (defaultOptions.method === 'GET' && options.params) {
    let url = defaultOptions.url + '?' + tansParams(options.params)
    url = url.slice(0, -1)
    defaultOptions.url = url
  }
  
  return new Promise((resolve, reject) => {
    uni.request({
      ...defaultOptions,
      success: (res) => {
        // 未设置状态码则默认成功状态
        const code = res.data.code || 200
        // 获取错误信息
        const msg = errorCode[code] || res.data.msg || errorCode['default']
        
        if (code === 401) {
          if (!isRelogin.show) {
            isRelogin.show = true
            uni.showModal({
              title: '系统提示',
              content: '登录状态已过期，请重新登录',
              confirmText: '重新登录',
              success: function(res) {
                if (res.confirm) {
                  isRelogin.show = false
                  store.dispatch('LogOut').then(() => {
                    uni.reLaunch({
                      url: '/pages/login/login'
                    })
                  })
                } else {
                  isRelogin.show = false
                }
              }
            })
          }
          return reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
          uni.showToast({
            title: msg,
            icon: 'none',
            duration: 2000
          })
          return reject(new Error(msg))
        } else if (code === 601) {
          uni.showToast({
            title: msg,
            icon: 'none',
            duration: 2000
          })
          return reject('error')
        } else if (code !== 200) {
          uni.showToast({
            title: msg,
            icon: 'none',
            duration: 2000
          })
          return reject('error')
        } else {
          resolve(res.data)
        }
      },
      fail: (error) => {
        console.log('请求失败', error)
        let message = '网络连接异常'
        if (error.errMsg) {
          if (error.errMsg.includes('timeout')) {
            message = '系统接口请求超时'
          } else if (error.errMsg.includes('fail')) {
            message = '系统接口请求失败'
          }
        }
        uni.showToast({
          title: message,
          icon: 'none',
          duration: 2000
        })
        reject(error)
      }
    })
  })
}

export default request
