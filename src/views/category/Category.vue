<template>
<div class="wrapper">
  <ul class="content">
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
    <li>分类的列表</li>
  </ul>
</div>
</template>

<script>
import BScroll from '@better-scroll/core'
export default {
  name: "Category",
  data(){
    return {
      scroll: null
    }
  },
  //要在组件模板挂载到DOM之后才能操作,故需要在mounted函数中,created函数中无效;
  mounted(){
    let wrapper = document.querySelector('.wrapper');
    this.scroll = new BScroll(wrapper,{});
  }
}
</script>

<style scoped>
.wrapper{
  height: 200px;
  background-color: pink;
  overflow: hidden;
  /*原生滚动: 高度内显示上下滚动条,溢出部分自动隐藏,滚动可显示*/
  /*overflow-y: scroll;*/
}
</style>
