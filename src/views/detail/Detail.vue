<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
      <detail-param-info :paramInfo=" paramInfo"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
      <good-list :goods="recommentInfo"></good-list>
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
      recommentInfo:[],
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
      //评论信息:
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    });
    //3.根据id获取服务器中推荐数据
    getRecommend().then(res => {
      //console.log(res);
      this.recommentInfo = res.data.list;
    })
  },
  mounted(){
    //调用防抖处理: 让刷新没有那么频繁
    const refresh = debounce(this.$refs.scroll.refresh,200);
    this.$bus.$on('itemImageLoad',()=>{
      refresh()
    })
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
