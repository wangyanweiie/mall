<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
import DetailNavBar from './children/DetailNavBar'
import {getDetail} from 'network/detail'

export default {
  name: 'Detail',
  components:{
    DetailNavBar
  },
  data(){
    return {
      iid: 0
    }
  },
  created(){
    //1.保存传入的id
    this.iid = this.$route.params.id;
    console.log(this.iid);
    //2.根据id获取服务器数据
    getDetail(this.iid).then(res => {
      console.log(res);
    })
  }
}
</script>

<style>
</style>
