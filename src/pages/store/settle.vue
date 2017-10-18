<template>
  <div>
    <header-top title="个体入驻"></header-top>
    <main class='scroll-content-2'>
      <yd-cell-group title="店铺信息">
        <yd-cell-item>
          <span slot="left">店铺名称
            <small class="tips">(不可更改)</small>：
          </span>
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
      </yd-cell-group>
      <yd-cell-group title="店铺地址">
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
      <yd-cell-group title="信息完善">
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
          <p class="tips">图片大小请控制在1M之内，请确保图片清晰，文字可辨并有清晰的红色公章。</p>
          <img src="" alt="" class="licence-picture">
          <div class="upload-icon">
            <span class="iconfont self-upload"></span>
            <input type="file" accept="image/*" capture="camera" name="licence-upload" id="licence-upload" @change="choosePicture($event)">
          </div>
        </div>
      </yd-cell-group>
      <yd-cityselect v-model="show2" :done="result2" :items="district"></yd-cityselect>
      <yd-cell-group>
        <yd-cell-item :arrow="!certificateStatus">
          <span slot="left">身份认证</span>
          <span slot="right" @click="showModal" v-if="!certificateStatus">去认证</span>
          <span slot="right" v-else>已认证</span>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group title="结算账号">
        <yd-cell-item>
          <span slot="left">银行开户名：</span>
          <yd-input slot="right" v-model="bankAccountName" placeholder="请填写银行开户名" required></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">银行账号：</span>
          <yd-input slot="right" v-model="bankAccountNumber" regex="bankcard" placeholder="请填写银行账号" required></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <cert-modal></cert-modal>
      <yd-button :type="valid?'primary':'disabled'" size="large" @click.native="applicate">提交申请</yd-button>
    </main>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import HeaderTop from 'components/header/index'
import CertModal from 'components/common/CertModal'
import District from 'ydui-district/dist/gov_province_city_area_id'
import { addStore } from '../../api/index'
import { validateSettle } from 'components/common/mixin'
import 'lrz/dist/lrz.bundle.js'
export default {
  name: 'Settle',
  data() {
    return {
      show1: false,//店铺地址判断标志
      show2: false,//营业执照所在地判断标志

      storeName: '',//店铺名称
      sellerName: '',//联系人
      sellerMobile: '',//联系电话
      sellerEmail: '',//联系邮箱

      storeCitys: '',//店铺地址id
      storeCityName: '',//店铺地址
      addressDetail: '',//街道

      businessLicenceNumber: '',//营业执照号
      businessLicenceAddress: '',//营业执照地id
      businessLicenceAddressName: '',//营业执照地
      businessSphere: '',//经营范围

      bankAccountName: '',//银行开户名
      bankAccountNumber: '',//银行账号

      fileContent: '',//营业执照base64
      district: District//省市县数据
    }
  },
  components: { HeaderTop, CertModal },
  mixins: [validateSettle],
  computed: {
    ...mapState(['account', 'certificateStatus']),
    valid() {
      return this.validStoreName && this.validSellerName && this.validSellerMobile && this.validEmail && this.validStoreCitys
        && this.validAddressDetail && this.validLicenseNumber && this.validLicenseAddress && this.validFileContent && this.validBankAccount
    }
  },
  activated() {

  },
  mounted() {
    [...document.querySelectorAll("input[type='text'],input[type='tel'],input[type='number'],textarea")].forEach((item, index) => {
      item.addEventListener('focus', function() {
        item.scrollIntoView();
      })
    })
  },
  methods: {
    result1(res) {
      this.storeCityName = `${res.itemName1},${res.itemName2},${res.itemName3}`;
      this.storeCitys = `${res.itemValue1},${res.itemValue2},${res.itemValue3}`;
    },
    result2(res) {
      this.businessLicenceAddressName = `${res.itemName1},${res.itemName2},${res.itemName3}`;
      this.businessLicenceAddress = `${res.itemValue1},${res.itemValue2},${res.itemValue3}`;
    },
    showModal() {
      this.$store.commit('SHOW_CERTIFICATE', true);
    },
    choosePicture(event) {
      let p = document.querySelector('.licence-picture'),
        file = event.target.files[0];
      let vm = this;
      if (!/image\/\w+/.test(file.type)) {
        this.$dialog.toast({
          mes: '请上传图片',
          timeout: 1000,
          icon: 'error'
        })
        return;
      }
      lrz(file, { width: 800 }).then(rst => {
        p.src = rst.base64;
        vm.fileContent = rst.base64;
      })
    },
    applicate() {
      let vm = this;
      let params = {
        storePro: '0',
        storeType: '0',//入驻类型-个体入驻
        storeName: this.storeName,
        sellerName: this.sellerName,
        sellerMobile: this.sellerMobile,
        sellerEmail: this.sellerEmail,
        storeCitys: this.storeCitys,
        addressDetail: this.addressDetail,
        businessLicenceNumber: this.businessLicenceNumber,
        businessLicenceAddress: this.businessLicenceAddress,
        businessSphere: this.businessSphere,
        businessLicenceStart: '20160901',
        businessLicenceEnd: '20700901',
        bankAccountName: this.bankAccountName,
        bankAccountNumber: this.bankAccountNumber,
        fileName: '123.png',
        account: this.account,
        token: md5('addStore'),
        fileContent: this.fileContent
      };

      mui.ajax({
        url: addStore,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: params,
        success(res) {
          if (res.code != 200) {
            vm.$dialog.toast({
              mes: res.msg,
              timeout: 1500
            })
            return;
          }
          vm.$dialog.toast({
            mes: res.msg,
            timeout: 1500,
            callback: () => {
              vm.$router.go(-1);
            }
          })
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
.tips {
  color: @red;
}

.upload-container {
  padding: @pd;
  .tips {
    font-size: 12px;
    color: #999;
    margin-bottom: .1rem;
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