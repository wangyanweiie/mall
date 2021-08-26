<template>
  <div class="goodsitem">
    <img :src="goodsItem.show.img" alt="">
    <div class="goodsinfo">
      <p>{{goodsItem.title}}</p>
      <span class="price">￥ {{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
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
.coolect{
  position: relative;
}
.collect::before{
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background:url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
