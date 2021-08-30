<template>
  <div>
       <scroll class="content" :pull-up-load='true'>
         <ul>
           <li>我的页面</li>
         </ul>
       </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
export default {
  name: "Profile",
  components:{
    Scroll
  }
}
</script>

<style scoped>
.content{
height: 200px;
background-color: pink;
overflow: hidden;
}
</style>
