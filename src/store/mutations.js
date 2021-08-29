//mutations修改state的唯一方式,而且方法功能要单一,方便跟踪记录到状态信息;
//导入定义的常量
import {
  ADD_COUNT,
  ADD_TO_CART
} from "./mutations-types"

export default {
  [ADD_COUNT](state,payload){
    payload.count++;
  },
  [ADD_TO_CART](state,payload){
    payload.count = 1;
    state.cartList.push(payload);
  }
}
