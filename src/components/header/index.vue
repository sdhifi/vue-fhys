<template>
  <yd-navbar :title="title" class="position:fixed;">
    <section slot="left" @click="$router.go(-1)" v-if="back">
      <yd-navbar-back-icon>返回</yd-navbar-back-icon>
    </section>
    <router-link to="/me/login" slot="right" v-if="login" class="danger-color">
    注册|登录
    </router-link>
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
  login:{
    type: Boolean,
    default: false
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