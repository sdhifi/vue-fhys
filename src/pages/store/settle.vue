<template>
  <div>
    <header-top title="个体入驻"></header-top>
    <main class='scroll-content-2'>
      <group title="基本信息">
        <x-textarea  title="店铺名称：" v-model="storeName" placeholder="请填写店铺名称" :rows="2" inline-desc="(不可更改)"></x-textarea >
        <x-input title="联系人：" v-model="sellerName" placeholder="请填写企业联系人" :required="true"></x-input>
        <x-input title="联系电话：" v-model="sellerMobile" placeholder="请填写联系人的手机号码" type="tel" is-type="china-mobile" :required="true"></x-input>
        <x-input title="电子邮箱：" v-model="sellerEmail" placeholder="请填写联系人的邮箱" type="email" is-type="email" :required="true"></x-input>
      </group>
      <group title="店铺信息">
        <x-address title="省份城市：" v-model="storeCitys" :list="addressData" placeholder="请选择地址" :show.sync="show1"></x-address>
        <x-textarea title="详细地址：" v-model="addressDetail" placeholder="街道、楼牌号码等" :max="200"></x-textarea>
        <x-input title="营业执照号：" v-model="businessLicenceNumber" placeholder="请填写营业执照号" :required="true" type="tel"></x-input>
        <x-address title="营业执照" inline-desc="所在地" v-model="businessLicenceAddress" :list="addressData" placeholder="营业执照所在地" :show.sync="show2"></x-address>
        <x-textarea title="经营范围：" inline-desc="(选填)" v-model="businessSphere" placeholder="填写您的经营范围" :max="400"></x-textarea>
      </group>
      <group title="信息完善">
        <div class="upload-container">
          <p class="tips">请确保营业执照图片清晰，文字可辨并有清晰的红色公章。</p>
          <img src="" alt="" class="licence-picture">
          <div class="upload-icon">
            <span class="iconfont self-upload"></span>
            <input type="file" accept="image/*" name="licence-upload" id="licence-upload" @change="choosePicture($event)">
          </div>
        </div>
      </group>
      <yd-cell-group>
        <yd-cell-item :arrow="!certificateStatus">
          <span slot="left">身份认证</span>
          <span slot="right" @click="showModal" v-if="!certificateStatus">去认证</span>
          <span slot="right" v-else>已认证</span>
        </yd-cell-item>
      </yd-cell-group>
      <group title="结算账号">
        <x-input title="银行开户名：" v-model="bankAccountName" placeholder="请填写银行开户名" :required="true"></x-input>
        <x-input title="银行账号：" v-model="bankAccountNumber" placeholder="请填写银行账号" :required="true" type="tel"></x-input>
      </group>
      <div style="padding:.2rem;">
        <yd-checkbox v-model="checkProtocol" :size="18">{{checkProtocol?'同意':'不同意'}}</yd-checkbox>
        <router-link to="/store/service" class="protocol">《凤凰云商o2o店铺入驻协议》</router-link>
        <yd-button :type="valid?'primary':'disabled'" size="large" @click.native="applicate">提交申请</yd-button>
      </div>
    </main>
    <cert-modal></cert-modal>
  </div>
</template>
<script>
import { mapState } from "vuex";
import HeaderTop from "components/header/index";
import CertModal from "components/common/CertModal";
import { Group, XInput,XTextarea, XAddress, ChinaAddressV4Data } from "vux";
import { addStore } from "../../api/index";
import { validateSettle } from "components/common/mixin";
import "lrz/dist/lrz.bundle.js";
export default {
  name: "Settle",
  data() {
    return {
      oldBack: mui.back,
      show1: false, //店铺地址判断标志
      show2: false, //营业执照所在地判断标志

      storeName: "", //店铺名称
      sellerName: "", //联系人
      sellerMobile: "", //联系电话
      sellerEmail: "", //联系邮箱

      storeCitys: [], //店铺地址id
      addressDetail: "", //街道

      businessLicenceNumber: "", //营业执照号
      businessLicenceAddress: [], //营业执照地id
      businessSphere: "", //经营范围

      bankAccountName: "", //银行开户名
      bankAccountNumber: "", //银行账号

      fileContent: "", //营业执照base64
      addressData: ChinaAddressV4Data, //省市县数据

      checkProtocol: true
    };
  },
  components: {
    HeaderTop,
    CertModal,
    Group,
    XInput,
    XTextarea,
    XAddress
  },
  mixins: [validateSettle],
  computed: {
    ...mapState(["account", "certificateStatus"]),
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
        this.checkProtocol
      );
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      mui.back = vm.goBack;
    });
  },
  beforeRouteLeave(to, from, next) {
    mui.back = this.oldBack;
    next();
  },
  activated() {},
  mounted() {
   
  },
  methods: {
    goBack() {
      if (this.show1) {
        this.show1 = false;
      } else if (this.show2) {
        this.show2 = false;
      } else {
        this.$router.go(-1);
      }
    },
    showModal() {
      this.$store.commit("SHOW_CERTIFICATE", true);
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
      let a1 = this.storeCitys[2]=='--'?'0':this.storeCitys[2];
      let a2 = this.businessLicenceAddress[2]=='--'?'0':this.businessLicenceAddress[2];
      let params = {
        storePro: "0",
        storeType: "0", //入驻类型-个体入驻
        storeName: this.storeName,
        sellerName: this.sellerName,
        sellerMobile: this.sellerMobile,
        sellerEmail: this.sellerEmail,
        storeCitys: `${this.storeCitys[0]},${this.storeCitys[1]},${a1}`,
        addressDetail: this.addressDetail,
        businessLicenceNumber: this.businessLicenceNumber,
        businessLicenceAddress: `${this.businessLicenceAddress[0]},${this.businessLicenceAddress[1]},${a2}`,
        businessSphere: this.businessSphere,
        businessLicenceStart: "20160901",
        businessLicenceEnd: "20700901",
        bankAccountName: this.bankAccountName,
        bankAccountNumber: this.bankAccountNumber,
        fileName: "123.png",
        account: this.account,
        token: md5("addStore"),
        fileContent: this.fileContent
      };

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