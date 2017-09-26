<template>
  <div>
    <header-top title="添加银行卡"></header-top>
    <main class='scroll-content-2'>
      <group style="margin-bottom:.2rem;">
        <selector title="开户银行" v-model="bankId" placeholder="请选择开户银行" :options="bankNameList" direction="rtl"></selector>
        <!-- <x-input title="支行名称" v-model="bankSub" placeholder="请输入支行名称" :min="2" :max="20" placeholder-align="right" text-align="right"></x-input> -->
      </group>
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">支行名称</span>
          <input slot="right" v-model="bankSub" type="text" placeholder="请输入支行名称" style="text-align:right;">
        </yd-cell-item>
        <yd-cell-item arrow>
          <span slot="left">省份城市</span>
          <input slot="right" v-model="cityName" type="text" placeholder="请选择" style="text-align:right;" readonly @click.stop="show1=true">
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">开户人</span>
          <input slot="right" v-model="holder" type="text" placeholder="请输入开户人名称" style="text-align:right;">
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">卡号</span>
          <input slot="right" v-model="bankCard" type="tel" placeholder="请输入卡号" style="text-align:right;">
        </yd-cell-item>
      </yd-cell-group>
      <yd-button size="large" :type="valid?'primary':'disabled'" @click.native="addBankCard">同意协议并绑定</yd-button>
      <yd-cityselect v-model="show1" :done="result1" :items="district"></yd-cityselect>
    </main>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import HeaderTop from 'components/header/index'
import { Group, Selector } from 'vux'
import {getStore} from 'components/common/mixin'
import { bindBank } from '../../api/index'
import District from 'ydui-district/dist/gov_province_city_id'
export default {
  name: 'NewBank',
  data() {
    return {
      bankId: '',
      bankNameList: [
        { key: 390, value: "中国工商银行" },
        { key: 391, value: "华夏银行" },
        { key: 402, value: "中国民生银行" },
        { key: 413, value: "上海银行" },
        { key: 424, value: "北京银行" },
        { key: 468, value: "浦东发展银行" },
        { key: 479, value: "广发银行" },
        { key: 490, value: "平安银行" },
        { key: 501, value: "中国建设银行" },
        { key: 529, value: "中国农业银行" },
        { key: 540, value: "中国银行" },
        { key: 549, value: "中国人民银行" },
        { key: 603, value: "汇丰银行" },
        { key: 610, value: "花旗银行" },
        { key: 618, value: "交通银行" },
        { key: 688, value: "渣打银行" },
        { key: 696, value: "招商银行" },
        { key: 704, value: "广州银行" },
        { key: 707, value: "中国邮政储蓄银行" },
        { key: 718, value: "中信银行" },
        { key: 729, value: "中国光大银行" },
      ],
      bankSub: '',
      cityValue: '',
      cityName: '',
      district: District,
      show1: false,
      holder: '',
      bankCard: ''
    }
  },
  components: { HeaderTop, Group, Selector },
  computed: {
    ...mapState(['account']),
    validBankCard() {
      return /^\d{15,19}$/.test(this.bankCard)
    },
    valid() {
      return !!this.bankId && !!this.bankSub && !!this.cityValue && !!this.validBankCard && !!this.holder;
    }
  },
  created() {

  },
  activated() {

  },
  methods: {
    result1(res) {
      this.cityName = `${res.itemName1},${res.itemName2}`;
      this.cityValue = `${res.itemValue1},${res.itemValue2}`;
    },
    addBankCard() {
      let vm = this;
      mui.ajax({
        url: bindBank,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          bankId:this.bankId,
          bankSub:this.bankSub,
          bankCard:this.bankCard,
          holder:this.holder,
          cityValue:this.cityValue,
          account:getStore('account'),
          token:md5(`bindBank${getStore('account')}`)
        },
        success(res) {
          if(res.code==200){
            vm.$dialog.toast({
              mes:res.msg,
              callback:()=>{
                vm.$router.go(-1);
              }
            })
          }
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
</style>