import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'

Vue.config.productionTip = false

//在vue的原型上添加vue实例作为事件总线bus:防抖处理
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
