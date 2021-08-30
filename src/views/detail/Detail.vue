<template>
  <div id="detail">
    <detail-nav-bar @titleClick='titleClick' ref="nav"></detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            :probe-tybe='3'>
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @goodsImageLoad='goodsImageLoad'></detail-goods-info>
      <detail-param-info :paramInfo=" paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <good-list :goods="recommendInfo" ref="recommend"></good-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>  <!--.native 监听直接组件的点击-->
  </div>
</template>

<script>
//子组件
import DetailNavBar from './childComs/DetailNavBar'
import DetailSwiper from './childComs/DetailSwiper'
import DetailBaseInfo from './childComs/DetailBaseInfo'
import DetailShopInfo from './childComs/DetailShopInfo'
import DetailGoodsInfo from './childComs/DetailGoodsInfo'
import DetailParamInfo from './childComs/DetailParamInfo'
import DetailCommentInfo from './childComs/DetailCommentInfo'
import DetailBottomBar from './childComs/DetailBottomBar'
//公共组件
import Scroll from 'components/common/scroll/Scroll'
import GoodList from 'components/content/goods/GoodList'  //推荐页复用的首页的商品页
import BackTop from 'components/content/backtop/BackTop'
//请求
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
//方法与混入
import {debounce} from 'common/utils'
//import {backTopMixIn} from 'common/mixin'

export default {
  name: 'Detail',
  components:{
    //注册子组件
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodList,
    BackTop,
  },
  //mixins:[backTopMixIn],
  data(){
    return {
      iid: 0,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendInfo: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false
    }
  },
  created(){
    //1.保存传入的id
    this.iid = this.$route.params.id;
    //2.根据id获取服务器中的详情数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      //console.log(data)
      //顶部轮播图片数据
      this.topImages = data.itemInfo.topImages;
      //商品信
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //店铺信息
      this.shop = new Shop(data.shopInfo)
      //商品详情
      this.detailInfo = data.detailInfo
      //参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
      //评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
      //读取商品/参数/评论/推荐距离顶部的高度
      //直接读取会有undefined,因为虽然已经赋值完毕但浏览器需要时间进行渲染,要调用nextTick()当渲染完成执行回调函数;
      this.$nextTick(()=>{
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs)
      })
    });
    //3.根据id获取服务器中推荐数据
    getRecommend().then(res => {
      //console.log(res);
      this.recommendInfo = res.data.list;
    })
    //4.给getThemeTopY赋初值: 进行防抖
    this.getThemeTopY = debounce(()=>{
      //读取商品/参数/评论/推荐距离顶部的高度: offsizeTop
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      console.log(this.themeTopYs)
    },200)
  },
  mounted(){
    //调用防抖处理:形成闭包refresh不会消失
    //1.监听推荐页的图片加载(复用goodlistitem)
    const refresh = debounce(this.$refs.scroll.refresh,200);
    this.$bus.$on('itemImageLoad',()=>{
      refresh()
    })
  },
  methods:{
    //2.监听详情页的图片加载
    goodsImageLoad(){
      //调用防抖:此时形成没有闭包变量不会被保存,执行多次没有意义？？(xx封装mixin)
      //debounce(this.$refs.scroll.refresh,200);
      this.getThemeTopY();
      /***********************************************************************
       1.在mounted中读取会有undefined,因为虽然已经赋值完毕但浏览器需要时间进行渲染;
       2.调用nextTick()可以在DOM渲染完成执行回调函数,但依然会有图片后加载完成的问题;
       3.给getThemeTopY赋初值,在详情页图片加载完成后调用进行防抖
      ************************************************************************/
    },
    //点击跳转到各个主题的offsetTop值
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],0);
    },
    backClick(){
      //通过在子组件标签绑定:ref,访问子组件的方法
      this.$refs.scroll.scrollTo(0,0,500)
    },
    //获取Y值与各个主题的offsetTop值进行对比
    contentScroll(position){
      const positionY = -position.y;
      const length = this.themeTopYs.length
      for(let i=0; i< length; i++){
        //1.普通做法
        /***********************************************************
        if(this.currentIndex != i &&
        ((i < length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
        || (i === length-1 && positionY >= this.themeTopYs[i])))
        ************************************************************/
        //2.添加一个额外的最大值(遍历:length-1即可)
        if(this.currentIndex != i &&
        (i < length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]))
        {
          this.currentIndex = i;
          console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      //设置BackTop的显示与隐藏的位置 + mixin中的内容
      this.isShowBackTop = -(position.y) > 1000;
    },
    addToCart(){
      //1.获取购物车需要展示的商品信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.nowPrice;
      product.iid = this.iid;
      //2.将商品添加到购物车
      /*vuex修改state需要通过 mutations,不能直接修改state的值;
      当存在异步以及逻辑判断的操作时需要再经过 actions*/
      //this.$store.cartList.push(product);      xxx
      //this.$store.commit("addCart",product);   xxx
      this.$store.dispatch("addCart",product);
    }
  }
}
</script>

<style scoped>
#detail{
  height: 100vh;
  position: relative;
  z-index: 999;
  background-color: #fff;
}
.content{
  /*height: calc(100% - 93px);*/
  /*不显示原生滚动条*/
  overflow: hidden;
  position:absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>
