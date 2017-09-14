<template>
  <div>
    <header-top :title="settleTitle"></header-top>
    <main class='scroll-content-2 input-container'>
      <yd-cell-group title="公司信息">
        <yd-cell-item>
          <span slot="left">店铺名称<small class="tips">(不可更改)</small>：</span>
          <yd-input slot="right" v-model="storeName" placeholder="请输入店铺名称"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">联系人：</span>
          <yd-input slot="right" v-model="sellerName" placeholder="请输入企业联系人"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">联系电话：</span>
          <yd-input slot="right" v-model="sellerMobile" type="tel" regex="mobile" placeholder="请输入联系人的手机号码"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">电子邮箱：</span>
          <yd-input slot="right" v-model="sellerEmail" type="email" regex="email" placeholder="请输入联系人的邮箱"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">注册资金：</span>
          <yd-input slot="right" v-model="companyRegisteredCapital" type="tel" regex="^\d{1,}" placeholder="请填写金额"></yd-input>
        </yd-cell-item>
      </yd-cell-group>
    </main>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import District from 'ydui-district/dist/gov_province_city_area_id'
import {addStore} from '../../api/index'
export default {
  name: 'Settle',
  data() {
    return {
      settleTitle: '',
      storeName:'',
      sellerName:'',
      sellerMobile:'',
      sellerEmail:'',
      companyRegisteredCapital:'',
      storeCitys:'',
      addressDetail:'',
      organizationCode:'',
      taxRegistrationCertificate:'',
      businessLicenceNumber:'',
      businessLicenceAddress:'',
      businessLicenceStart:'',
      isSettlementAccount:'',
      bankAccountName:'',
      bankAccountNumber:'',
      bankName:'',
      bankAddress:'',
      settlementBankAccountName:'',
      settlementBankAccountNumber:'',
      settlementBankName:'',
      settlementBankAddress:'',
      fileContent:'',
    }
  },
  components: { HeaderTop },
  computed: {

  },
  created() {

  },
  activated() {
    this.settleTitle = this.$route.query.id == '0' ? '个体入驻' : '企业入驻'
  },
  methods: {

  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
.input-container{
  .cell-right input{
    text-align: right;
  }
}
</style>