<template>
  <yd-tabbar active-color="#ff5350" :fixed="true">
    <yd-tabbar-item title="首页" link="/" :active="$route.path.indexOf('/') == 0">
      <span class="iconfont-large self-home" slot="icon"></span>
    </yd-tabbar-item>
    <yd-tabbar-item title="附近" link="/" :active="$route.path.indexOf('near') !== -1">
    <span class="iconfont-large self-near" slot="icon"></span>
    </yd-tabbar-item>
    <yd-tabbar-item title="商城" link="/" :active="$route.path.indexOf('shop') !== -1">
    <span class="iconfont-large self-shop" slot="icon"></span>
    </yd-tabbar-item>
    <yd-tabbar-item title="我的" link="/" :active="$route.path.indexOf('me') !== -1">
    <span class="iconfont-large self-me" slot="icon"></span>
    </yd-tabbar-item>
  </yd-tabbar>
</template>
<script>
export default {
name: 'FooterBar'
}
</script>
<style lang='' scoped>

</style>