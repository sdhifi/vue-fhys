<template>
  <div>
    <header-top :title="addressTitle"></header-top>
    <main class='scroll-content-2'>
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">收货人：</span>
          <yd-input slot="right" v-model="consigneeName" placeholder="请输入收货人姓名"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">手机号码：</span>
          <yd-input slot="right" v-model="mobile" placeholder="请输入收货人手机号码" regex="mobile"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">性别：</span>
          <div slot="right">
            <label for="male" class="self-radio">
              <input type="radio" value="1" id="male" v-model="consigneeSex">
              <span>男</span>
            </label>
            <label for="female" class="self-radio">
              <input type="radio" value="2" id="female" v-model="consigneeSex">
              <span>女</span>
            </label>
          </div>
        </yd-cell-item>
        <yd-cell-item arrow>
          <span slot="left">省市区：</span>
          <input type="text" slot="right" placeholder="请选择" style="text-align:right;" readonly @click.stop="show1=true" v-model="adddressName">
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">详细地址：</span>
          <yd-textarea slot="right" placeholder="街道、楼牌号码等" v-model="addressDetail"></yd-textarea>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cityselect v-model="show1" :done="result1" :items="district" ref="cityselectDemo"></yd-cityselect>
      <yd-button :type="valid?'primary':'disabled'" @click.native="addAddress" size="large" v-if="/new/.test($route.path)">保存</yd-button>
      <yd-button :type="valid?'warning':'disabled'" @click.native="editAddress" size="large" v-else>保存</yd-button>
    </main>
  </div>
</template>
<script>
import HeaderTop from "components/header/index";
import { updateAddressInIos, newsAddressInIos } from "../../api/index";
import { getStore } from "components/common/mixin";
import District from "ydui-district/dist/gov_province_city_area_id";
export default {
  name: "EditOrNew",
  data() {
    return {
      district: District,
      show1: false,
      addressTitle: "",
      addressId: "",
      consigneeName: "",
      consigneeSex: "",
      mobile: "",
      proviceId: "",
      proviceName: "",
      cityId: "",
      cityName: "",
      areaId: "",
      areaName: "",
      adddressName: "",
      addressDetail: ""
    };
  },
  components: { HeaderTop },
  computed: {
    valid() {
      return (
        !!this.consigneeName &&
        /^[1][3578][0-9]{9}$/.test(this.mobile) &&
        !!this.adddressName &&
        !!this.addressDetail
      );
    }
  },
  created() {},
  activated() {
    if (/edit/.test(this.$route.path)) {
      this.addressTitle = "地址修改";
      let address = this.$route.params.address;
      this.addressId = address.id;
      this.consigneeName = address.consigneeName;
      this.consigneeSex = address.consigneeSex;
      this.mobile = address.mobile;
      this.proviceId = address.proviceId.provinceId;
      this.cityId = address.cityId.cityId;
      this.addressDetail = address.addressDetail;
      if (address.areaId) {
        this.areaId = address.areaId.areaId;
        this.adddressName = `${address.proviceId.province},${address.cityId.city},${address.areaId.area}`;
      } else {
        this.areaId = "";
        this.adddressName = `${address.proviceId.province},${address.cityId.city}`;
      }
    } else {
      this.addressTitle = "地址添加";
      this.addressId = "";
      this.consigneeName = "";
      this.consigneeSex = "";
      this.mobile = "";
      this.proviceId = "";
      this.proviceName = "";
      this.cityId = "";
      this.cityName = "";
      this.areaId = "";
      this.areaName = "";
      this.addressDetail = "";
      this.adddressName = "";
      this.$refs.cityselectDemo.$emit("ydui.cityselect.reset");
    }
  },
  methods: {
    result1(res) {
      this.proviceId = res.itemValue1;
      this.cityId = res.itemValue2;
      if (res.itemValue3) {
        this.areaId = res.itemValue3;
        this.adddressName = `${res.itemName1},${res.itemName2},${res.itemName3}`;
      } else {
        this.areaId='';
        this.adddressName = `${res.itemName1},${res.itemName2}`;
      }
    },
    addAddress() {
      let vm = this;
      mui.ajax({
        url: newsAddressInIos,
        type: "post",
        headers: { "app-version": "v1.0" },
        data: {
          account: getStore("account"),
          consigneeName: this.consigneeName,
          consigneeSex: this.consigneeSex,
          mobile: this.mobile,
          proviceId: this.proviceId,
          cityId: this.cityId,
          areaId: this.areaId,
          addressDetail: this.addressDetail,
          token: md5(`newsAddress${getStore("account")}`)
        },
        success(res) {
          if (res.code == 200) {
            vm.$dialog.toast({
              mes: "添加成功",
              callback: () => {
                vm.$router.go(-1);
              }
            });
          } else {
            vm.$dialog.toast({
              mes: res.msg
            });
          }
        }
      });
    },
    editAddress() {
      let vm = this;
      mui.ajax({
        url: updateAddressInIos,
        type: "post",
        headers: { "app-version": "v1.0" },
        data: {
          id: this.addressId,
          account: getStore("account"),
          consigneeName: this.consigneeName,
          consigneeSex: this.consigneeSex,
          mobile: this.mobile,
          proviceId: this.proviceId,
          cityId: this.cityId,
          areaId: this.areaId,
          addressDetail: this.addressDetail,
          token: md5(
            `updateAddressInIos${this.addressId}${getStore("account")}`
          )
        },
        success(res) {
          if (res.code == 200) {
            vm.$dialog.toast({
              mes: "修改成功",
              callback: () => {
                vm.$router.go(-1);
              }
            });
          } else {
            vm.$dialog.toast({
              mes: res.msg
            });
          }
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
.self-radio {
  position: relative;
  display: inline-block;
  padding-right: 10px;
  padding-left: 25px;
  font-size: 14px;
  > input[type="radio"] {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 15;
    &:checked + span::before {
      border-color: rgb(76, 216, 100);
    }
    &:checked + span::after {
      color: rgb(76, 216, 100);
      opacity: 1;
      transform: scale(1);
      transition: all 0.2s ease-in-out;
    }
  }
  span {
    &::before {
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      width: 20px;
      height: 20px;
      border: 1px solid #ccc;
      border-radius: 50%;
      display: inline-block;
      z-index: 10;
      vertical-align: middle;
    }
    &::after {
      position: absolute;
      content: "";
      left: 5px;
      top: 5px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: currentColor;
      opacity: 0;
      transform: scale(0);
    }
  }
}
</style>