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
        <router-link v-else to="/address/index?choose">
          
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
    ...mapState(['account', 'defaultAddress', 'addressList'])
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
</style>