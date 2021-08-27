<template>
  <div class="goodsitem" @click="itemClick">
    <img :src="goodsItem.show.img" alt="">
    <!--<img :src="goodsItem.show.img" alt="" @load="imageLoad">-->
    <div class="goodsinfo">
      <p>{{goodsItem.title}}</p>
      <span class="price">￥ {{goodsItem.price}}</span>
      <span class="collect">
        <img src="~assets/img/common/collect.svg" alt="">
        {{goodsItem.cfav}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodListItem",
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    //1.防抖处理: 发送图片加载完成的事件
    /*imageLoad(){
      this.$bus.$emit('itemImageLoad')
    }*/
    //2.监听item点击事件: 实现路由跳转进入商品详情页
    itemClick(){
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
.goodsitem{
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goodsitem img{
  width: 100%;
  height: 100%;
  border-radius:5px;
}
.goodsinfo{
  font-size: 12px;
  text-align: center;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.goodsinfo p{
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 3px;
}
.price{
  color: var(--color-high-text);
  margin-right: 20px;
}
.collect img{
  width: 12px;
  height: 12px;
}
</style>
