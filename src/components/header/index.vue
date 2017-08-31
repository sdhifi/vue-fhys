<template>
  <yd-navbar :title="title" class="position:fixed;">
    <section slot="left" @click="$router.go(-1)" v-if="back">
      <yd-navbar-back-icon>返回</yd-navbar-back-icon>
    </section>
  </yd-navbar>
</template>
<script>
export default {
name: 'HeaderTop',
props:{
  back:{
    type:Boolean,
    default:true
  },
  title: {
    type: String,
    default: "凤凰云商"
  }
}
}
</script>
<style lang='less' scoped>

</style>