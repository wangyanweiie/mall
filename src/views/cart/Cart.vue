<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
  </div>

</template>

<script>
//公共组件
import NavBar from "components/common/navbar/NavBar"
//方法
import {mapGetters} from 'vuex'

export default {
  name: "Cart",
  components:{
    NavBar,
  },
  computed:{
    //mapGetters辅助函数: 可以将store实例中的getters映射到组件的计算属性computed中;
    //...mapGetters({length:'cartLength'})
    ...mapGetters(['cartLength']),
  }
}
</script>

<style scoped>
.nav-bar{
  color: white;
  font-size: 16px;
  background-color: var(--color-tint);
}
</style>
