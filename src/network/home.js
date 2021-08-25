//导入网络请求
import {request} from "network/request";

export function getHomeMultidata(){
  //返回的是request函数的返回值即Promise对象
  return request({
    url: '/home/multidata'
  })
}
