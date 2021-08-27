<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="titles">
        <div v-for="(item,index) in titles"
             :key="index" class="title"
             :class="{active: index === currentIndex}"
             @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'DetailNavbar',
  components:{
    NavBar
  },
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex: 0,
    }
  },
  methods:{
    titleClick(index){
      this.currentIndex = index;
    },
    backClick(){
      this.$router.back();    //没有页面状态记录？？
    }
  }
}
</script>

<style>
.titles{
  display: flex;
  font-size: 14px;
}
.title{
  flex: 1;
}
.active{
  color: var(--color-high-text);
}
.back img{
  width: 14px;
  height: 14px;
}
</style>
