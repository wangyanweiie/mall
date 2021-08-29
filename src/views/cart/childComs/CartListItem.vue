<template>
  <div id="cart-list-item">
    {{product}}
  </div>
</template>

<script>

export default {
  name: "CartList",
  //获取遍历的商品列表中的每个item
  props:{
    product:{
      type: Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
</style>
