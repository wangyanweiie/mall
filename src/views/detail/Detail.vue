<template>
  <div id="detail">
    <detail-nav-bar @titleClick='titleClick'></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @goodsImageLoad='goodsImageLoad'></detail-goods-info>
      <detail-param-info :paramInfo=" paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <good-list :goods="recommendInfo" ref="recommend"></good-list>
    </scroll>
  </div>
</template>

<script>
//导入子组件
import Scroll from 'components/common/scroll/Scroll'
import DetailNavBar from './children/DetailNavBar'
import  DetailSwiper from './children/DetailSwiper'
import  DetailBaseInfo from './children/DetailBaseInfo'
import  DetailShopInfo from './children/DetailShopInfo'
import  DetailGoodsInfo from './children/DetailGoodsInfo'
import  DetailParamInfo from './children/DetailParamInfo'
import  DetailCommentInfo from './children/DetailCommentInfo'
import  GoodList from 'components/content/goods/GoodList'  //推荐页与商品页相同
//导入请求
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
//导入方法
import {debounce} from 'common/utils'

export default {
  name: 'Detail',
  components:{
    //注册子组件
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodList,
  },
  data(){
    return {
      iid: 0,
      topImages: [],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommendInfo:[],
      themeTopYs:[],
      getThemeTopY:null
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
      this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
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
    titleClick(index){
      //点击跳转到记录的offsetTop
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],0);
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
  height: calc(100% - 44px);
  /*不显示原生滚动条*/
  overflow: hidden;
  /* position:absolute;
  top: 44px;
  bottom: 60px;
  right: 0;
  left: 0; */
}
</style>
