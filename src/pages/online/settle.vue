<template>
  <div>
    <header-top title="下单"></header-top>
    <main class='scroll-content-2'>
      <section class="address-container">
        <yd-cell-group v-if="!addressList.length">
          <yd-cell-item arrow type="link" href="/address/new">
            <yd-icon slot="icon" name="location"></yd-icon>
            <span slot="left">收货人</span>
            <span slot="right">去添加</span>
          </yd-cell-item>
        </yd-cell-group>
        <router-link v-else to="/address/index?type=choose" class="flex align-center">
          <div v-if="defaultAddress" class="fs-14 flex-1">
            <p>收货人：
              <span style="margin-right:.2rem;font-weight:bold;">{{defaultAddress.consigneeName}}</span>
              <span>{{defaultAddress.mobile}}</span>
            </p>
            <p>收货地址：{{defaultAddress.proviceId.province}}{{defaultAddress.cityId.city}}{{defaultAddress.areaId.area}}{{defaultAddress.addressDetail}}</p>
          </div>
          <div v-else-if="addressList[0]" class="fs-14 flex-1">
            <p>收货人：
              <span style="margin-right:.2rem;font-weight:bold;">{{addressList[0].consigneeName}}</span>
              <span>{{addressList[0].mobile}}</span>
            </p>
            <p>收货地址：{{addressList[0].proviceId.province}}{{addressList[0].cityId.city}}{{addressList[0].areaId.area}}{{addressList[0].addressDetail}}</p>
          </div>
          <span class="iconfont self-right"></span>
        </router-link>
      </section>
    </main>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import HeaderTop from 'components/header/index'
import { addOrder } from '../../api/index'
export default {
  name: 'Settle',
  data() {
    return {

    }
  },
  components: { HeaderTop },
  computed: {
    ...mapState(['account', 'defaultAddress', 'addressList','settleList'])
  },
  created() {
  },
  activated() {
    this.$store.dispatch('getAddressList')

  },
  methods: {

  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
.address-container {
  background-color: @white;
  margin-bottom: @pd;
    .pd;
}
</style>