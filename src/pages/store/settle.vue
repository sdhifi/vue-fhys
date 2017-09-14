<template>
  <div>
    <header-top :title="settleTitle"></header-top>
    <main class='scroll-content-2 input-container'>
      <yd-cell-group title="公司信息">
        <yd-cell-item>
          <span slot="left">店铺名称
            <small class="tips">(不可更改)</small>：
            </span>
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
          <span slot="left">注册资金
            <small class="tips">(万元)</small>：
          </span>
          <yd-input slot="right" v-model="companyRegisteredCapital" type="tel" regex="^\d{1,}" placeholder="请填写金额"></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group title="公司地址">
        <yd-cell-item arrow>
          <span slot="left">所在地区：</span>
          <input slot="right" type="text" @click.stop="show1 = true" v-model="storeCityName" readonly placeholder="请选择" style="text-align:right;">
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">详细地址：</span>
          <yd-input slot="right" v-model="addressDetail" placeholder="街道、楼牌号码等"></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cityselect v-model="show1" :done="result1" :items="district"></yd-cityselect>
      <yd-cell-group title="营业执照信息（副本）">
        <yd-cell-item>
          <span slot="left">营业执照号：</span>
          <yd-input slot="right" v-model="businessLicenceNumber" placeholder="请填写营业执照号"></yd-input>
        </yd-cell-item>
        <yd-cell-item arrow>
          <span slot="left">营业执照所在地：</span>
          <input slot="right" type="text" @click.stop="show2 = true" v-model="businesslicenceAddressName" readonly placeholder="请选择" style="text-align:right;">
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">经营范围
            <small class="tips">(选填)</small>：
          </span>
          <yd-textarea slot="right" placeholder="填写您的经营范围" maxlength="1000"></yd-textarea>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cityselect v-model="show2" :done="result2" :items="district"></yd-cityselect>   
      <yd-cell-group title="财务资质信息">
        <yd-cell-item>
          <span slot="left">营业执照号：</span>
          <yd-input slot="right" v-model="businessLicenceNumber" placeholder="请填写营业执照号"></yd-input>
        </yd-cell-item>
        
        
      </yd-cell-group>   
      <yd-cell-group title="信息完善">
        <yd-cell-item>
          <span slot="left">组织机构代码：</span>
          <yd-input slot="right" v-model="organizationCode" placeholder="企业组织机构代码"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">税务登记：</span>
          <yd-input slot="right" v-model="taxRegistrationCertificate" placeholder="税务登记证号"></yd-input>
        </yd-cell-item>
      </yd-cell-group>
    </main>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import District from 'ydui-district/dist/gov_province_city_area_id'
import { addStore } from '../../api/index'
export default {
  name: 'Settle',
  data() {
    return {
      show1: false,//店铺地址判断标志
      show2: false,//营业执照所在地判断标志
      settleTitle: '',
      storeName: '',//店铺名称
      sellerName: '',//联系人
      sellerMobile: '',//联系电话
      sellerEmail: '',//联系邮箱
      companyRegisteredCapital: '',//注册资金
      storeCitys: '',//店铺地址id
      storeCityName: '',//店铺地址
      addressDetail: '',//街道
      organizationCode: '',//组织机构代码
      taxRegistrationCertificate: '',//税务登记
      businessLicenceNumber: '',//营业执照号
      businessLicenceAddress: '',//营业执照地id
      businesslicenceAddressName:'',//营业执照地
      businessLicenceStart: '',//营业执照有效期
      businessSphere:'',//经营范围
      isSettlementAccount: '',//开户账户是否结算账号
      bankAccountName: '',//银行开户名
      bankAccountNumber: '',//银行账号
      bankName: '',//银行名称
      bankAddress: '',//银行所在地id
      bankAddressName: '',//银行所在地
      settlementBankAccountName: '',//结算开户名
      settlementBankAccountNumber: '',//结算账号
      settlementBankName: '',//结算银行名称
      settlementBankAddress: '',//结算银行地址id
      settlementBankAddressName: '',//结算银行地址
      fileContent: '',//营业执照base64
      district: District//省市县数据
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
    result1(res) {
      this.storeCityName = `${res.itemName1},${res.itemName2},${res.itemName3}`;
      this.storeCitys = `${res.itemValue1},${res.itemValue2},${res.itemValue3}`;
    },
     result2(res) {
      this.licenceAddressName = `${res.itemName1},${res.itemName2},${res.itemName3}`;
      this.businessLicenceAddress = `${res.itemValue1},${res.itemValue2},${res.itemValue3}`;
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
.tips{
  color: @red;
}
</style>