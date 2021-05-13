import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './router/router-permission'
import './plugins/element.js'
import './assets/css/reset.less'
// 修改语言
import i18n from './plugins/language'

// 网络请求
import api from './api'

Vue.prototype.$api = api

Vue.config.productionTip = false

let user = localStorage.getItem('userInfo')
if (user) {
  store.commit('loginModule/setUserInfo', JSON.parse(user))
}


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
