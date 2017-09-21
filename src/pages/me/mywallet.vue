<template>
  <div>
    <header-top title="我的钱包"></header-top>
    <main class='scroll-content-2'>
      <section class="wallet-top text-center" :style="{'background-image':formatBg('banner-wallet.png')}">
        <nav class="tab-list">
          <div class="tab-item" :class="{'tab-active':!type}" @click="changeTab">个人福利</div>
          <div class="tab-item" :class="{'tab-active':type}" @click="changeTab">商户福利</div>
        </nav>
        <div class="wallet-today">
          今日福利
          <p v-if="!type">+{{info0.benefitYesterdayMoney}}</p>
          <p v-else>+{{info0.benefitYesterdayMoney}}</p>
        </div>
      </section>
      <section class="wallet-tab" v-show="!type">
        <ul class="flex text-center">
          <li v-for="(item,index) in tabs0" :key="index" class="tab-item">
            <a href="" v-if="index<3" class="danger-bg">
              <p>{{item.text}}</p>
              <p>{{info0[item.param]}}</p>
            </a>
            <a href="" v-else>
              <p>{{item.text}}</p>
              <p class="danger-color">{{info0[item.param]}}</p>
            </a>
          </li>
        </ul>
      </section>
      <section class="wallet-tab" v-show="type">
        <ul class="flex text-center">
          <li v-for="(item,index) in tabs1" :key="index" class="tab-item" :class="{'tab-item2':index<2}">
            <a href="" v-if="index<2" class="danger-bg">
              <p>{{item.text}}</p>
              <p>{{info1[item.param]}}
                <span v-if="item.param=='canMoney'">%</span>
              </p>
            </a>
            <a href="" v-else>
              <p>{{item.text}}</p>
              <p class="danger-color">{{info1[item.param]}}</p>
            </a>
          </li>
        </ul>
      </section>
      <section class="operate-container" v-if="false">
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
    <yd-popup v-model="showPopup" position="center" width="90%">
      <div class="ruzhu-container">
        <h3 class="ruzhu-title">您还未入驻凤凰云商O2O</h3>
        <div class="ruzhu-content">
          <div>
            <input type="radio" name="settle-way" id="1" value="1" v-model="settleWay">
            <label class="ruzhu-item" for="1">
              <span class="iconfont self-qiye"></span>
              <p>企业入驻</p>
            </label>
          </div>
          <div>
            <input type="radio" name="settle-way" id="0" value="0" v-model="settleWay">
            <label class="ruzhu-item" for="0">
              <span class="iconfont self-geti"></span>
              <p>个体入驻</p>
            </label>
          </div>
        </div>
        <yd-button type="danger" size="large" @click.native="settle">确认</yd-button>
        <span class="close" @click="showPopup=false;"></span>
      </div>
    </yd-popup>
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
      info0: {},
      info1: {},
      type: 0,
      firstTag: false,
      showPopup: false,
      settleWay: '',
      tabs0: [
        {
          text: '可参与福利权益',
          param: 'canParticipate',
          link: '',
        },
        {
          text: '责任消费',
          param: 'saleTotalMoney',
          link: '',
        },
        {
          text: '还可获得福利',
          param: 'consumptionMoney',
          link: '',
        },
        {
          text: '销售福利',
          param: 'dividendsTotalMoney',
          link: '',
        },
        {
          text: '累计消费',
          param: 'cumulativeMoney',
          link: '',
        },
        {
          text: '余额账户',
          param: 'balanceMoney',
          link: '',
        }
      ],
      tabs1: [
        {
          text: '商户福利权益',
          param: 'canParticipate',
          link: '',
        },
        {
          text: '已领取',
          param: 'canMoney',
          link: '',
        },
        {
          text: '总销售额',
          param: 'saleTotalMoney',
          link: '',
        },
        {
          text: '累计贡献',
          param: 'cumulativeMoney',
          link: '',
        },
        {
          text: '还可获得福利',
          param: 'consumptionMoney',
          link: '',
        }
      ],
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
          color: '#663355'
        },
        {
          icon: 'self-edu',
          text: '授信额度',
          link: '/trade/shouxin',
          color: '#e7d489'
        },
        {
          icon: 'self-download',
          text: '协议下载',
          link: '/trade/download',
          color: '#663355'
        }
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
    this.type = 0;
    this.getInfo(this.type);
  },
  methods: {
    changeTab() {
      this.type = this.type == 0 ? 1 : 0;
     if(this.firstTag){
       return;
     }
      this.getInfo();
    },
    getInfo() {
      let vm = this;
      this.$dialog.loading.open('您的福利正在赶来...');
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
          vm.$dialog.loading.close();
          if (/不/.test(res.msg)) {
            vm.type = 0;
            vm.showPopup = true;
            return;
          }
          vm[`info${vm.type}`] = res.result
          if(vm.type==1){
          vm.firstTag = true
          }
        }
      })
    },
    settle() {
      if (this.settleWay == '') {
        this.$dialog.toast({
          mes: '请选择一种入驻方式后再确认',
          timeout: 1500
        })
        return;
      }
      this.showPopup = false;
      if (this.settleWay == '0') {
        this.$router.push({ path: '/store/settle' })
      }
      else {
        this.$router.push({ path: '/store/settle-1' })
      }
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
  margin-bottom: @pd;
  .tab-item {
    width: 33.3%;
    position: relative;
    a {
      .pd-v;
      display: block;
      p:last-child {
        margin-top: .1rem;
        font-size: 16px;
        height: 16px;
      }
    }
    &.tab-item2 {
      width: 50%;
    }
  }
}

.operate-container {
  .pd;
  .mg-v;
  background-color: @white;
}
</style>