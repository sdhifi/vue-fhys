<template>
  <div>
    <header-top title="我的钱包"></header-top>
    <main class='scroll-content-2'>
      <section class="wallet-top text-center" :style="{'background-image':formatBg('banner-wallet.png')}">
        <nav class="tab-list">
          <div class="tab-item tab-active">个人福利</div>
          <div class="tab-item">商户福利</div>
        </nav>
        <div>
          今日福利
        <p>+{{info.benefitYesterdayMoney}}</p>
        </div>
      </section>
      <yd-grids-group :rows="3">
        <yd-grids-item v-for="(item,index) in menu" :key="index" :link="item.link">
          <span slot="icon" :class="['iconfont-large',item.icon]" :style="{color:item.color}"></span>
          <span slot="text">{{item.text}}</span>
        </yd-grids-item>
      </yd-grids-group>
    </main>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import { countMemberInfo } from '../../api/index'
import { mixin,getStore } from 'components/common/mixin'
export default {
  name: 'MyWallet',
  data() {
    return {
      info: {},
      type:'0',
      menu: [
        {
          icon: 'self-tiqufuli',
          text: '提取福利',
          link: '/trade/withdrawals',
          color:'#33ee44'
        },
        {
          icon: 'self-tiqulishi',
          text: '提取历史',
          link: '/trade/cashhistory',
          color:'#663355'
        },
        {
          icon: 'self-yinhangka',
          text: '银行卡',
          link: '/trade/bancard',
          color:'#ee3355'
        },
        {
          icon: 'self-fulijilu',
          text: '福利记录',
          link: '/trade/welfrecord',
          color:'#ee3355'
        },
        {
          icon: 'self-xiaofeijilu',
          text: '消费记录',
          link: '/trade/consumerecord',
          color:'#663355'
        },
        {
          icon: 'self-xiaofeiguize',
          text: '消费规则',
          link: '/trade/consumerule',
          color:'#a58a19'
        },
      ]
    }
  },
  components: { HeaderTop },
  computed: {

  },
  mixins: [mixin],
  created() {

  },
  activated() {
    this.getInfo();
  },
  methods: {
    getInfo(){
      let vm = this;
      mui.ajax({
        url: countMemberInfo,
        type: 'post',
        headers: {'app-version': 'v1.0'},
        data: {
          account:getStore('account'),
          type:this.type,
          token:md5(`countMemberInfo${getStore('account')}${this.type}`)
        },
        success(res){
          vm.info= res.result
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
.wallet-top {
  height: 5rem;
  background-size: cover;
  color: @white;
  font-size: 14px;
p{
  color:#f6ff00;
  font-size: 20px;
}
}
</style>