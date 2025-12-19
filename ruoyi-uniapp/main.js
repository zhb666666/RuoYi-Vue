import Vue from 'vue'
import App from './App'
import store from './store'
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, handleTree } from '@/utils/ruoyi'

// 全局挂载工具函数
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.handleTree = handleTree

// 全局组件 (如需使用uView UI，请先安装插件)
// import uView from '@/uni_modules/uview-ui'
// Vue.use(uView)

// 消息提示封装
Vue.prototype.$toast = function(msg) {
  uni.showToast({
    title: msg,
    icon: 'none',
    duration: 2000
  })
}

Vue.prototype.$success = function(msg) {
  uni.showToast({
    title: msg,
    icon: 'success',
    duration: 2000
  })
}

Vue.prototype.$error = function(msg) {
  uni.showToast({
    title: msg,
    icon: 'error',
    duration: 2000
  })
}

Vue.prototype.$confirm = function(content, title = '提示') {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: title,
      content: content,
      success: function(res) {
        if (res.confirm) {
          resolve()
        } else if (res.cancel) {
          reject()
        }
      }
    })
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
