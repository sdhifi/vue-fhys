<template>
  <div>
    <header-top title="提现"></header-top>
    <main class='scroll-content-2'>
      <!-- <section v-if="!balanceMoney" class="hv-cen">
                <p class="text-center">可提取福利 <span class="danger-color">0</span> 元</p>
              </section>
              <section v-else> -->
      <section>
        <p class="tips text-center">可提取福利
          <span class="danger-color">{{balanceMoney}}</span> 元
          <span class="danger-color">(提取福利扣10%手续费)</span>
        </p>
        <div class="bank-card flex align-center">
          <div v-if="defaultBankCard">
            <div class="icon" :style="{'background-image':formatBg(defaultBankCard.bankName+'.png')}"></div>
            <div class="bank-name flex-1">
              <p>{{defaultBankCard.bankName}}</p>
              <p>卡号：{{defaultBankCard.bankCard}}</p>
            </div>
          </div>
          <div v-else>
            <router-link :to="{name: 'BankCard'}">去添加</router-link>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import HeaderTop from 'components/header/index'
import { addDrawCash, myBanks } from '../../api/index'
import { mixin, getStore } from 'components/common/mixin'
export default {
  name: 'WithDrawals',
  data() {
    return {
      defaultBank: null,
    }
  },
  components: { HeaderTop },
  computed: {
    ...mapState(['balanceMoney', 'account', 'defaultBankCard'])
  },
  mixins: [mixin],
  created() {

  },
  activated() {
    this.$store.dispatch('getBankList')
  },
  methods: {

  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
.tips {
  .mg-v;
}

.bank-card {
  .pd;
  background-color: @white;
  .icon {
    .wh(.8rem, .8rem);
    background-size: cover;
  }
  .bank-name {
    margin-left: @pd;
    color: @lightgray;
    p {
      margin-bottom: .1rem;
      &:first-of-type {
        font-size: 15px;
        color: #333;
      }
    }
  }
}
</style>