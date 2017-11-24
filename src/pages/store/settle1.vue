<template>
  <div>
    <header-top title="企业入驻"></header-top>
    <main class='scroll-content-2'>
      <yd-cell-group title="公司信息">
        <yd-cell-item>
          <div slot="left">
            <p>店铺名称：</p>
            <small class="tips">(不可更改)</small>
          </div>
          <yd-input slot="right" v-model="storeName" placeholder="请填写店铺名称" required></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">联系人：</span>
          <yd-input slot="right" v-model="sellerName" placeholder="请填写企业联系人" required></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">联系电话：</span>
          <yd-input slot="right" v-model="sellerMobile" type="tel" regex="mobile" placeholder="请填写联系人的手机号码" required></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">电子邮箱：</span>
          <yd-input slot="right" v-model="sellerEmail" type="email" regex="email" placeholder="请填写联系人的邮箱" required></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">注册资金
            <small class="tips">(万元)</small>：
          </span>
          <yd-input slot="right" v-model="companyRegisteredCapital" type="tel" regex="^\d{1,}" placeholder="请填写金额" required></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group title="公司地址">
        <yd-cell-item arrow>
          <span slot="left">省份城市：</span>
          <input slot="right" type="text" @click.stop="show1 = true" v-model="storeCityName" readonly placeholder="请选择" style="text-align:right;">
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">详细地址：</span>
          <yd-input slot="right" v-model="addressDetail" placeholder="街道、楼牌号码等" required></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cityselect v-model="show1" :done="result1" :items="district"></yd-cityselect>
      <yd-cell-group title="营业执照信息（副本）">
        <yd-cell-item>
          <span slot="left">营业执照号：</span>
          <yd-input slot="right" v-model="businessLicenceNumber" placeholder="请填写营业执照号" required></yd-input>
        </yd-cell-item>
        <yd-cell-item arrow>
          <span slot="left">营业执照所在地：</span>
          <input slot="right" type="text" @click.stop="show2 = true" v-model="businessLicenceAddressName" readonly placeholder="请选择" style="text-align:right;">
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">经营范围
            <small class="tips">(选填)</small>：
          </span>
          <yd-textarea slot="right" v-model="businessSphere" placeholder="填写您的经营范围" maxlength="400"></yd-textarea>
        </yd-cell-item>
        <div class="upload-container">
          <p class="tips">营业执照图片大小请控制在1M之内，请确保图片清晰，文字可辨并有清晰的红色公章。</p>
          <img src="" alt="" class="licence-picture">
          <div class="upload-icon">
            <span class="iconfont self-upload"></span>
            <input type="file" accept="image/*" capture="camera" name="licence-upload" id="licence-upload" @change="choosePicture($event)">
          </div>
        </div>
      </yd-cell-group>
      <yd-cityselect v-model="show2" :done="result2" :items="district"></yd-cityselect>
      <yd-cell-group title="财务资质信息">
        <yd-cell-item>
          <span slot="left">同时设置为结算账号</span>
          <yd-switch slot="right" v-model="isSettlementAccount"></yd-switch>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">银行开户名：</span>
          <yd-input slot="right" v-model="bankAccountName" placeholder="请填写开户银行名" required></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">公司银行账号：</span>
          <yd-input slot="right" v-model="bankAccountNumber" regex="bankcard" placeholder="请填写开户银行账号" required></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">开户银行支行名称：</span>
          <yd-input slot="right" v-model="bankName" placeholder="请填写开户银行支行名称" required></yd-input>
        </yd-cell-item>
        <yd-cell-item arrow>
          <span slot="left">开户银行所在地：</span>
          <input slot="right" type="text" @click.stop="show3 = true" v-model="bankAddressName" readonly placeholder="请选择" style="text-align:right;">
        </yd-cell-item>
      </yd-cell-group>
      <yd-cityselect v-model="show3" :done="result3" :items="district"></yd-cityselect>
      <yd-cell-group v-if="!isSettlementAccount">
        <yd-cell-item>
          <span slot="left">银行开户名：</span>
          <yd-input slot="right" v-model="settlementBankAccountName" placeholder="请填写开户银行名" required></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">公司银行账号：</span>
          <yd-input slot="right" v-model="settlementBankAccountNumber" regex="bankcard" placeholder="请填写开户银行账号" required></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">开户银行支行名称：</span>
          <yd-input slot="right" v-model="settlementBankName" placeholder="请填写开户银行支行名称" required></yd-input>
        </yd-cell-item>
        <yd-cell-item arrow>
          <span slot="left">开户银行所在地：</span>
          <input slot="right" type="text" @click.stop="show4 = true" v-model="settlementBankAddressName" readonly placeholder="请选择" style="text-align:right;">
        </yd-cell-item>
      </yd-cell-group>
      <yd-cityselect v-model="show4" :done="result4" :items="district"></yd-cityselect>
      <yd-cell-group title="信息完善">
        <yd-cell-item>
          <span slot="left">组织机构代码：</span>
          <yd-input slot="right" v-model="organizationCode" placeholder="企业组织机构代码" required></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">税务登记：</span>
          <yd-input slot="right" v-model="taxRegistrationCertificate" placeholder="税务登记证号" required></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <div style="padding:0 .2rem .2rem;">
      <yd-button :type="valid?'primary':'disabled'" size="large" @click.native="applicate">提交申请</yd-button>
      </div>
    </main>
  </div>
</template>
<script>
import { mapState } from "vuex";
import HeaderTop from "components/header/index";
import District from "ydui-district/dist/gov_province_city_area_id";
import { addStore } from "../../api/index";
import { validateSettle } from "components/common/mixin";
import "lrz/dist/lrz.bundle.js";
export default {
  name: "Settle1",
  data() {
    return {
      oldBack: mui.back,
      show1: false, //店铺地址判断标志
      show2: false, //营业执照所在地判断标志
      show3: false, //开户银行所在地判断标志
      show4: false, //结算银行所在地判断标志
      storePro: "0",
      storeType: "1", //入驻类型-企业入驻
      storeName: "", //店铺名称
      sellerName: "", //联系人
      sellerMobile: "", //联系电话
      sellerEmail: "", //联系邮箱
      companyRegisteredCapital: "", //注册资金
      storeCitys: "", //店铺地址id
      storeCityName: "", //店铺地址
      addressDetail: "", //街道
      organizationCode: "", //组织机构代码
      taxRegistrationCertificate: "", //税务登记
      businessLicenceNumber: "", //营业执照号
      businessLicenceAddress: "", //营业执照地id
      businessLicenceAddressName: "", //营业执照地
      businessLicenceStart: "", //营业执照有效期
      businessSphere: "", //经营范围
      isSettlementAccount: true, //开户账户是否结算账号
      bankAccountName: "", //银行开户名
      bankAccountNumber: "", //银行账号
      bankName: "", //银行名称
      bankAddress: "", //银行所在地id
      bankAddressName: "", //银行所在地
      settlementBankAccountName: "", //结算开户名
      settlementBankAccountNumber: "", //结算账号
      settlementBankName: "", //结算银行名称
      settlementBankAddress: "", //结算银行地址id
      settlementBankAddressName: "", //结算银行地址
      fileContent: "", //营业执照base64
      district: District //省市县数据
    };
  },
  components: { HeaderTop },
  mixins: [validateSettle],
  computed: {
    ...mapState(["account"]),
    validCapital() {
      return /^\d{1,}$/.test(this.companyRegisteredCapital);
    },
    validBankAddress() {
      return !!this.bankAddress;
    },
    validBankAccountName() {
      return !!this.bankAccountName;
    },
    valid() {
      return (
        this.validStoreName &&
        this.validSellerName &&
        this.validSellerMobile &&
        this.validEmail &&
        this.validStoreCitys &&
        this.validAddressDetail &&
        this.validLicenseNumber &&
        this.validLicenseAddress &&
        this.validFileContent &&
        this.validBankAccount &&
        this.validCapital &&
        this.validBankAddress &&
        this.validBankAccountName
      );
    }
  },
  created() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      mui.back = vm.goBack;
    });
  },
  beforeRouteLeave(to, from, next) {
    mui.back = this.oldBack;
    next();
  },
  activated() {
    if (this.isSettlementAccount) {
      this.settlementBankAccountName = this.bankAccountName;
      this.settlementBankAccountNumber = this.bankAccountNumber;
      this.settlementBankName = this.bankName;
      this.settlementBankAddress = this.bankAddress;
      this.settlementBankAddressName = this.bankAddressName;
    } else {
      this.settlementBankAccountName = "";
      this.settlementBankAccountNumber = "";
      this.settlementBankName = "";
      this.settlementBankAddress = "";
      this.settlementBankAddressName = "";
    }
  },
  mounted() {
    [
      ...document.querySelectorAll(
        "input[type='text'],input[type='tel'],input[type='number'],textarea"
      )
    ].forEach((item, index) => {
      item.addEventListener("focus", function() {
        item.scrollIntoView();
      });
    });
  },
  methods: {
    goBack() {
      if (this.show1) {
        this.show1 = false;
      } else if (this.show2) {
        this.show2 = false;
      } else if (this.show3) {
        this.show3 = false;
      } else if (this.show4) {
        this.show4 = false;
      } else {
        this.$router.go(-1);
      }
    },
    result1(res) {
      this.storeCityName = `${res.itemName1},${res.itemName2},${res.itemName3}`;
      this.storeCitys = `${res.itemValue1},${res.itemValue2},${res.itemValue3}`;
    },
    result2(res) {
      this.businessLicenceAddressName = `${res.itemName1},${res.itemName2},${res.itemName3}`;
      this.businessLicenceAddress = `${res.itemValue1},${res.itemValue2},${res.itemValue3}`;
    },
    result3(res) {
      this.bankAddressName = `${res.itemName1},${res.itemName2},${res.itemName3}`;
      this.bankAddress = `${res.itemValue1},${res.itemValue2},${res.itemValue3}`;
    },
    result4(res) {
      this.settlementBankAddressName = `${res.itemName1},${res.itemName2},${res.itemName3}`;
      this.settlementBankAddress = `${res.itemValue1},${res.itemValue2},${res.itemValue3}`;
    },
    choosePicture(event) {
      let p = document.querySelector(".licence-picture"),
        file = event.target.files[0];
      let vm = this;
      if (!/image\/\w+/.test(file.type)) {
        this.$dialog.toast({
          mes: "请上传图片",
          timeout: 1000,
          icon: "error"
        });
        return;
      }
      lrz(file, { width: 800 }).then(rst => {
        p.src = rst.base64;
        vm.fileContent = rst.base64;
      });
    },
    applicate() {
      let vm = this;
      let params = {
        storeName: this.storeName,
        sellerName: this.sellerName,
        sellerMobile: this.sellerMobile,
        sellerEmail: this.sellerEmail,
        companyRegisteredCapital: this.companyRegisteredCapital,
        storeCitys: this.storeCitys,
        addressDetail: this.addressDetail,
        organizationCode: this.organizationCode,
        taxRegistrationCertificate: this.taxRegistrationCertificate,
        businessLicenceNumber: this.businessLicenceNumber,
        businessLicenceAddress: this.businessLicenceAddress,
        businessSphere: this.businessSphere,
        businessLicenceStart: "20160901",
        businessLicenceEnd: "20700901",
        isSettlementAccount: this.isSettlementAccount ? "1" : "0",
        bankAccountName: this.bankAccountName,
        bankAccountNumber: this.bankAccountNumber,
        bankName: this.bankName,
        bankAddress: this.bankAddress,
        fileContent: this.fileContent,
        fileName: "123.png",
        account: this.account,
        token: md5("addStore")
      };
      if (this.isSettlementAccount) {
        params.settlementBankAccountName = params.bankAccountName;
        params.settlementBankAccountNumber = params.bankAccountNumber;
        params.settlementBankName = params.bankName;
        params.settlementBankAddress = params.bankAddress;
      }
      mui.ajax({
        url: addStore,
        type: "post",
        headers: { "app-version": "v1.0" },
        data: params,
        success(res) {
          if (res.code != 200) {
            vm.$dialog.toast({
              mes: res.msg,
              timeout: 1500
            });
            return;
          }
          vm.$dialog.toast({
            mes: res.msg,
            timeout: 1500,
            callback: () => {
              vm.$router.go(-1);
            }
          });
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
@import "../../style/mixin.less";
.tips {
  color: @red;
}

.upload-container {
  padding: @pd;
  .tips {
    font-size: 12px;
    color: #999;
    margin-bottom: 0.1rem;
  }
  .licence-picture {
    width: 100%;
  }
  .upload-icon {
    position: relative;
    text-align: center;
    span {
      font-size: 40px;
    }
    #licence-upload {
      position: absolute;
      left: 0;
      .wh(100%, 40px);
      top: 0;
      opacity: 0;
    }
  }
}
</style>