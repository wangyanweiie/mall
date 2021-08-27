//防抖处理函数
export function debounce(func,delay){
  let timer = null;
  return function(...args){
    if(time) claearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this,args)
    },delay)
  }
}
