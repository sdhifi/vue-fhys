<template>
  <div>
    <header-top title="我的钱包"></header-top>
    <main class='scroll-content-2'>
      <section class="wallet-top text-center" :style="{'background-image':formatBg('banner-wallet.png')}">
        <nav class="tab-list">
          <div class="tab-item tab-active">个人福利</div>
          <div class="tab-item">商户福利</div>
        </nav>
        <div class="wallet-today">
          今日福利
          <p>+{{info.benefitYesterdayMoney}}</p>
        </div>

      </section>
      <section class="wallet-tab">
        <ul class="flex text-center">
          <li v-for="(item,index) in tabs" :key="index" class="tab-item">
            <a href="" v-if="index<3" class="danger-bg">
              <p>{{item.text}}</p>
              <p>{{info[item.param]}}</p>
            </a>
            <a href="" v-else>
              <p>{{item.text}}</p>
              <p class="danger-color">{{info[item.param]}}</p>
            </a>
          </li>
        </ul>
      </section>
      <section class="operate-container">
        <p>*转移说明：可转余额金额 ￥0.00（转余额扣除10%税费）。</p>
        <yd-button type="warning" size="large">一键转余额</yd-button>
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
import { mixin, getStore } from 'components/common/mixin'
export default {
  name: 'MyWallet',
  data() {
    return {
      info: {},
      type: '0',
      tabs: [{
        text: '可参与福利权益',
        param: 'canParticipate',
        link: '',
      }, {
        text: '责任消费',
        param: 'canMoney',
        link: '',
      }, {
        text: '还可获得福利',
        param: 'consumptionMoney',
        link: '',
      }, {
        text: '销售福利',
        param: 'dividendsTotalMoney',
        link: '',
      }, {
        text: '累计消费',
        param: 'cumulativeMoney',
        link: '',
      }, {
        text: '余额账户',
        param: 'balanceMoney',
        link: '',
      }, {
        text: '福利账户余额',
        param: 'balanceMoney',
        link: '',
      }, {
        text: '销售福利余额',
        param: 'balanceMoney',
        link: '',
      }],
      menu: [
        {
          icon: 'self-tiqufuli',
          text: '提取福利',
          link: '/trade/withdrawals',
          color: '#e7d489'
        },
        {
          icon: 'self-tiqulishi',
          text: '提取历史',
          link: '/trade/cashhistory',
          color: '#663355'
        },
        {
          icon: 'self-yinhangka',
          text: '银行卡',
          link: '/trade/bancard',
          color: '#e7d489'
        },
        {
          icon: 'self-fulijilu',
          text: '福利记录',
          link: '/trade/welfrecord',
          color: '#ee3355'
        },
        {
          icon: 'self-xiaofeijilu',
          text: '消费记录',
          link: '/trade/consumerecord',
          color: '#663355'
        },
         {
          icon: 'self-shenfenzheng',
          text: '实名认证',
          link: '/trade/certificate',
          color: '#d4e4fc'
        },
        {
          icon: 'self-xiaofeiguize',
          text: '消费规则',
          link: '/trade/consumerule',
          color: '#e7d489'
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
    getInfo() {
      let vm = this;
      mui.ajax({
        url: countMemberInfo,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          account: getStore('account'),
          type: this.type,
          token: md5(`countMemberInfo${getStore('account')}${this.type}`)
        },
        success(res) {
          vm.info = res.result
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
  .tab-list {
    .flex;
    .just-cont();
    font-size: 14px;
    padding-top: @pd * 2;
    margin-bottom: @pd * 3;
    .tab-item {
      border: 1px solid @white;
      padding: @pd 15px;
      &.tab-active {
        background-color: @white;
        color: @red;
      }
    }
    div:first-child {
      border-radius: 20px 0 0 20px;
    }
    div:last-child {
      border-radius: 0 20px 20px 0;
    }
  }
  .wallet-today {
    font-size: 16px;
    p {
      margin-top: @pd * 2;
      color: #f6ff00;
      font-size: 20px;
    }
  }
}

.wallet-tab {
  background-color: @white;
  .tab-item {
    width: 33.3%;
    a {
      .pd-v;
      display: block;
    }
  }
}

.operate-container {
  .pd;
  .mg-v;
  background-color: @white;
}
</style>