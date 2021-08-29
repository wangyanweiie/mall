//如果是复杂的逻辑判断语句需要先通过actions处理,再调用mutaitions中的方法修改state的状态;
//导入定义的常量
import {
  ADD_COUNT,
  ADD_TO_CART
} from "./mutations-types"

export default {
  //加入到购物车列表: payload是新添加的商品
  addCart(context,payload){
    //1.如果新添加的商品id已经存在,则将商品浅拷贝到oldProduct变量中保存;
    /*******************************
    //方式一:遍历购物车列表
    let oldProduct = null;
    for(item of state.cartList){
      if(item.iid === payload.iid){
        oldProduct = item;
      }
    }
    *********************************/
    //方式二:数组的find方法
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    //2.如果oldProduct有值,证明该商品已经存在的,则让当前商品的数量+1;
    if(oldProduct){
      //传递到mutations
      context.commit(ADD_COUNT,oldProduct);
    }
    //3.如果oldProduct没有值,证明该商品在购物车列表中没有;
    //则添加count属性并记录数量为1,并且将该商品push到购物车列表中;
    else{
      context.commit(ADD_TO_CART,payload);
    }
  }
}
