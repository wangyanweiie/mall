<template>
  <div id="category">
    <nav-bar class="category-nav"><div slot="center">商品分类</div></nav-bar>
    <scroll>

    </scroll>
  </div>
</template>

<script>
//公共组件
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

export default {
  name: "Category",
  components:{
    NavBar,
    Scroll,
  },
}
</script>

<style scoped>
.category-nav{
  text-align: center;
  color: #fff;
  line-height: 44px;
  background-color: var(--color-tint);
  z-index: 999;
}
</style>
