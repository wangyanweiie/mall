<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tabcontrol"
                :titles="['流行','新款','精选']"
                @tabClick="tabClick"></tab-control>
    <!-- <good-list :goods="goods[currentType].list"></good-list> -->
    <good-list :goods="showGoods"></good-list>
  </div>
</template>

<script>
//子组件
import HomeSwiper from './childComs/HomeSwiper.vue'
import RecommendView from './childComs/RecommendView'
import FeatureView from './childComs/FeatureView'
//公共组件
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodList from 'components/content/goods/GoodList'

//方法
import {getHomeMultidata,getHomeGoods} from 'network/home'

export default {
  name: "Home",
  components:{
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodList,
  },
  data(){
    return{
      banners: [],
      recommends:[],
      goods:{
        'pops':{page:0,list:[]},
        'news':{page:0,list:[]},
        'sells':{page:0,list:[]}
      },
      currentType:'pops'
    }
  },
  created(){
    //由于起名相同: 使用this是调用methods中封装的方法,直接调用才是调用导入的请求函数;
    //请求多个数据
    this.getHomeMultidata()
    //请求商品数据
    this.getHomeGoods('pops');
    this.getHomeGoods('news');
    this.getHomeGoods('sells');
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  methods:{
    //**************事件监听相关方法***************
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pops'
          break
        case 1:
          this.currentType = 'news'
          break
        case 2:
          this.currentType = 'sells'
          break
      }
      //新接口三页的商品数据都是重复的
      //console.log(index);
    },
    //**************网络请求相关方法****************
    getHomeMultidata(){
      //调用导入的请求函数获得的返回值是Promise对象
      getHomeMultidata().then(res => {
        //箭头函数自身没有this,它会查找离它最近的作用域的this; 即created的this,就是当前组件对象;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1;
      getHomeGoods(type,page).then(res =>{
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      })
    }


  }
}
</script>
<style scoped>
#home{
  height: 2000px;
  padding-top: 44px;
}
.home-nav{
  color: white;
  /*使用事先在base.css中设置的css变量*/
  background-color: var(--color-tint);
  position:fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
/*设置滚轮滑动到一定位置该模块停留*/
.tabcontrol{
  position: sticky;
  top: 44px;
    z-index: 888;
}
</style>
