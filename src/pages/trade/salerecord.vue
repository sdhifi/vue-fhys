<template>
  <div>
    <header-top title="销售录入"></header-top>
    <main class='scroll-content-2'>
      <yd-cell-group title="消费对象">
        <yd-cell-item>
          <span slot="left">消费金额：</span>
          <yd-input slot="right" v-model="money" placeholder="输入金额（单位：元）" type="tel"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">消费会员：</span>
          <yd-input slot="right" v-model="mobile" placeholder="请输入会员手机号" type="tel" regex="mobile" @change.native="findMember"></yd-input>
        </yd-cell-item>
        <yd-cell-item v-if="mobileName">
          <span slot="left">会员名称：</span>
          <yd-input slot="right" readonly v-model="mobileName"></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group v-if="payMoney">
        <yd-cell-item>
          <span slot="left">应付金额</span>
          <input slot="right" type="text" readonly style="text-align:right;color:#ff5350;" v-model="payMoney">
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group title="支付方式">
        <yd-cell-item type="radio">
          <span slot="icon" class="iconfont self-edu" style="color:#f9a340;"></span>
          <span slot="left">授信额度</span>
          <input slot="right" type="radio" value="4" v-model="payType" @change="setPayMoney" />
        </yd-cell-item>
        <yd-cell-item type="radio">
          <span slot="icon" class="iconfont self-weixinzhifu" style="color:#25d025;"></span>
          <span slot="left">微信支付</span>
          <input slot="right" type="radio" value="0" v-model="payType" @change="setPayMoney" />
        </yd-cell-item>
        <yd-cell-item type="radio">
          <span slot="icon" class="iconfont self-yinlianzhifu1" style="color:#077d8d;"></span>
          <span slot="left">银联在线支付</span>
          <input slot="right" type="radio" value="2" v-model="payType" @change="setPayMoney" />
        </yd-cell-item>
      </yd-cell-group>
      <div class="btn-container">
        <yd-button size="large" :type="valid?'primary':'disabled'" @click.native="save">确认录入</yd-button>
      </div>
      <yd-cell-group style="margin-top:1.5rem;">
        <yd-cell-item arrow type="link" href="/trade/salehistory">
          <span slot="left">查看更多录入记录</span>
        </yd-cell-item>
      </yd-cell-group>
    </main>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import HeaderTop from 'components/header/index'
import { findMemberByMoblie, addBenefit } from '../../api/index'
export default {
  name: 'SaleRecord',
  data() {
    return {
      money: '',
      payMoney: '',
      mobile: '',
      mobileName: '',
      payType: ''
    }
  },
  components: { HeaderTop },
  computed: {
    ...mapState(['account']),
    valid() {
      return /^(([1-9]\d*)|([0-9]+\.[0-9]{1,2}))$/.test(this.money) && /0?(13|14|15|18)[0-9]{9}/.test(this.mobile)
        && !!this.payType
    }
  },
  created() {

  },
  activated() {

  },
  methods: {
    findMember() {
      let vm = this;
      mui.ajax({
        url: findMemberByMoblie,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          account: this.account,
          mobile: this.mobile,
          token: md5(`findMemberByMoblie${this.mobile}`)
        },
        success(res) {
          vm.mobileName = res.result.name || res.result.nickName
        }
      })
    },
    setPayMoney() {
      if (this.payType == '4') {
        this.payMoney = this.money
      }
      else {
        this.payMoney = +this.money * 0.12;
      }
    },
    save() {
      let vm = this;
      mui.ajax({
        url: addBenefit,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          amount: this.money,
          mobile: this.mobile,
          payType: this.payType,
          account: this.account,
          token: md5(`addBenefit${this.account}${this.mobile}`)
        },
        success(res) {

        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
</style>