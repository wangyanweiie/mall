import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)

const state = {
  cartList:[]
}
//创建store实例
const store = new Vuex.Store({
  //ES6写法: 键名与键值同名时可简写
  state,
  mutations,
  actions,
  getters
})

//导出store实例挂载到vue实例上
export default store;
