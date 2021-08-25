<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
  </div>
</template>


<script>
import NavBar from 'components/common/navbar/NavBar'
import {getHomeMultidata} from 'network/home'

export default {
  name: "Home",
  components:{
    NavBar,
  },
  created(){
    //请求多个数据:调用getHomeMultidata获得的返回值是Promise对象
    getHomeMultidata().then(res => {
      console.log(res);
    })
  }
}
</script>
<style scoped>
.home-nav{
  color: white;
  background-color: #ff8198;
}
</style>
