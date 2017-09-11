<template>
  <div>
    <header-top title="我的订单"></header-top>
    <main class='scroll-content-2'>
      <yd-tab>
        <yd-tab-panel label="全部订单" :active="$route.query.id==7"></yd-tab-panel>
        <yd-tab-panel label="待支付" :active="$route.query.id==0"></yd-tab-panel>
        <yd-tab-panel label="待发货" :active="$route.query.id==1"></yd-tab-panel>
        <yd-tab-panel label="待收货" :active="$route.query.id==2"></yd-tab-panel>
        <yd-tab-panel label="交易完成" :active="$route.query.id==3"></yd-tab-panel>
      </yd-tab>
    </main>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
export default {
  name: 'MyOrder',
  data() {
    return {

    }
  },
  components: { HeaderTop },
  computed: {

  },
  created() {

  },
  activated() {

  },
  methods: {

  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';

</style>