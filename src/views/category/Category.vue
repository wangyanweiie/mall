<template>
<div class="wrapper"  ref="wrapper">
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
//BetterScroll 2.0需要配合插件使用具体功能
import BScroll from '@better-scroll/core'
//导入BS的插件
import PullDown from '@better-scroll/pull-down'
import PullUp from '@better-scroll/pull-up'
import ScrollBar from '@better-scroll/scroll-bar'
//静态安装插件
BScroll.use(PullDown)
BScroll.use(PullUp)
BScroll.use(ScrollBar)

export default {
  name: "Category",
  data(){
    return {
      scroll: null
    }
  },
  //要在组件模板挂载到DOM之后才能操作,故需要在mounted函数中,created函数中无效;
  mounted(){
    //this.scroll = new BScroll(this.$refs.wrapper,{});
    this.scroll = new BScroll(document.querySelector('.wrapper'),{
      probeType: 3
    });
    this.scroll.on('scroll',(position) => {
      console.log(position);
    })
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
