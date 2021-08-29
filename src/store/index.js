import Vue from 'vue'
import Vuex from 'vuex'
//安装插件
Vue.use(Vuex)
//创建store实例
const store = new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations:{
    //加入到购物车列表: payload是新添加的商品
    addCart(state,payload){
      //遍历购物车列表如果新添加的商品id已经存在,则将当前商品浅拷贝到oldProduct变量中保存;
      let oldProduct = null;
      for(item of state.cartList){
        if(item.iid === payload.iid){
          oldProduct = item;
        }
      }
      
      //如果oldProduct有值,则证明该商品已经存在的,当前商品数量+1
      if(oldProduct){
        oldProduct.count ++;
      }
      //如果oldProduct没有值,证明该商品在购物车列表中没有;
      //则添加count属性记录当前商品数量为1,并且将该商品push到购物车列表中
      else{
        payload.count = 1;
        state.cartList.push(payload);
      }
    }
  },
})
//导出store实例挂载到vue实例上
export default store;
