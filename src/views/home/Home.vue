<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComs/HomeSwiper.vue'
import RecommendView from './childComs/RecommendView'
import FeatureView from './childComs/FeatureView'
import {getHomeMultidata} from 'network/home'

export default {
  name: "Home",
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  data(){
    return{
      banners: [],
      recommends:[]
    }
  },
  created(){
    //请求多个数据:调用getHomeMultidata获得的返回值是Promise对象
    getHomeMultidata().then(res => {
      //箭头函数自身没有this,它会查找离它最近的作用域的this; 即created的this,就是当前组件对象;
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
      console.log(res.data);
    })
  }
}
</script>
<style scoped>
#home{
  padding-top: 44px;
}
.home-nav{
  color: white;
  background-color: #ff8198;
  position:fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;

}
</style>
