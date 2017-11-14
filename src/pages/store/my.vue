<template>
  <div>
    <header-top title="我的店铺"></header-top>
    <main class='scroll-content-2'>
      <section class="store-banner px-1" :style="{backgroundImage:'url('+info.storeBanner+')'}">
        <!-- <img :src="info.storeBanner" alt="" class="banner-img"> -->
        <div class="upload-box">
          更换封面
        </div>
        <input type="file" name="upload-img" id="" @change="previewImg($event)">
      </section>
      <section class="store-info">
        <h2 class="store-title px-1">{{info.storeName}}</h2>
        <div class="flex align-center">
          <div class="flex-1 fs-15">
            <span class="iconfont-large self-location danger-color"></span>
            <span>{{info.provinceId.province}}{{info.cityId.city}}<span v-if="info.areaId">{{info.areaId.area}}</span>{{info.addressDetail}}</span>
          </div>
          <span class="iconfont self-bianji danger-color" @click="showEdit"></span>
        </div>
        <div class="flex align-center">
          <span class="iconfont-large self-tel"></span>
          <span class="fs-16">{{info.sellerMobile}}</span>
        </div>
        <div class="flex align-center">
          <span class="iconfont-large self-renzheng" style="color:#4cd864;"></span>
          <span>店铺审核状态：审核通过</span>
        </div>
      </section>
      <yd-cell-group title="店铺简介">
        <yd-cell-item>
          <yd-textarea slot="right" maxlength="200" placeholder="请输入店铺简介" v-model="info.storeDescription" :readonly="editTag" ref="storeIntro"></yd-textarea>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="right" @click="saveIntro" v-if="!editTag">
            <span class="iconfont self-dui"></span>保存</span>
          <span slot="right" @click="editTag=false" v-else>
            <span class="iconfont self-bianji">编辑</span>
            </span>
        </yd-cell-item>
      </yd-cell-group>
      <section class="store-menu">
        <yd-grids-group :rows="3">
          <yd-grids-item v-for="(item,index) in menu" :key="index" :link="item.link">
            <span slot="icon" :class="['iconfont-large',item.icon]" :style="{color:item.color}"></span>
            <span slot="text">{{item.text}}</span>
          </yd-grids-item>
        </yd-grids-group>
      </section>
    </main>
    <yd-popup v-model="showPopup" position="center" width="90%">
      <div class="edit-container">
        <div class="blue-header"></div>
        <yd-cell-group title="编辑店铺信息">
          <yd-cell-item>
            <span slot="left">联系电话：</span>
            <input type="tel" slot="right" placeholder="请输入手机号码" style="text-align:right;padding-right:5px;" v-model="newMobile">
          </yd-cell-item>
          <yd-cell-item arrow>
            <span slot="left">省份城市：</span>
            <input type="text" slot="right" placeholder="请选择" style="text-align:right;" readonly @click.stop="show1=true" v-model="newStoreCityName">
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">详细地址：</span>
            <yd-textarea slot="right" placeholder="街道、楼牌号码等" v-model="newAddressDetail"></yd-textarea>
          </yd-cell-item>
        </yd-cell-group>
        <button class="save-btn" @click="saveInfo" :disabled="!valid">保存</button>
      </div>
    </yd-popup>
    <yd-cityselect v-model="show1" :done="result1" :items="district" ref="cityselectDemo"></yd-cityselect>
    <!-- <yd-cityselect v-model="show1" :done="result1" :items="district" :provance="info.provinceId.province" :city="info.cityId.city" :area="info.areaId.area" ref="cityselectDemo"></yd-cityselect> -->
  </div>
</template>
<script>
import HeaderTop from "components/header/index";
import { getStore, setStore } from "components/common/mixin";
import {
  myStore,
  updateBanner,
  updateIntro,
  updateAddressInfo
} from "../../api/index";
import District from "ydui-district/dist/gov_province_city_area_id";
import "lrz/dist/lrz.bundle.js";

export default {
  name: "MyStore",
  data() {
    return {
      editTag: true,
      info: null,
      showPopup: false,
      intro: "", //简介
      tag: false, //简介是否可编辑
      district: District, //省市县数据
      show1: false, //所在地标志
      newMobile: "",
      newStoreCity: "", //所在地id
      newStoreCityName: "", //所在地名称
      newAddressDetail: "",
      menu: [
        {
          icon: "self-shangpinguanli",
          text: "商品管理",
          link: "/store/productmanage",
          color: "#fc9557"
        },
        // {
        //   icon: "self-dingdanguanli",
        //   text: "订单管理",
        //   link: "/store/ordermanage",
        //   color: "#fab652"
        // },
        {
          icon: "self-fabu",
          text: "发布管理",
          link: "/store/publishmanage",
          color: "#fab652"
        },
        // {
        //   icon: "self-shoukuan",
        //   text: "付款",
        //   link: "/store/receipt",
        //   color: "#fc9557"
        // }
      ]
    };
  },
  components: { HeaderTop },
  computed: {
    valid() {
      return (
        /^1[3|4|5|7|8][0-9]{9}$/.test(this.newMobile) && this.newAddressDetail
      );
    }
  },
  created() {},
  activated() {
    this.getMyStore();
    if(this.$store.state.positions[this.$route.path]){
            document.querySelector('main').scrollTop=this.$store.state.positions[this.$route.path]
        }
  },
  mounted() {
    [
      ...document.querySelectorAll(
        "input[type='text'],input[type='tel'],input[type='number'],textarea"
      )
    ].forEach((item, index) => {
      item.addEventListener("click", function() {
        item.scrollIntoView();
      });
      item.addEventListener("focus", function() {
        item.scrollIntoView();
      });
    });
  },
  methods: {
    getMyStore() {
      let vm = this;
      mui.ajax({
        url: myStore,
        type: "post",
        headers: { "app-version": "v1.0" },
        data: {
          account: getStore("account"),
          token: md5(`myStore${getStore("account")}`)
        },
        success(res) {
          vm.info = res.result;
          vm.$store.commit("RECORD_STORE_INFO", vm.info);
          setStore("storeId", vm.info.id);
        }
      });
    },
    previewImg(event) {
      let headImg = document.querySelector(".store-banner"),
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
        headImg.style.backgroundImage = `url(${rst.base64})`;
        mui.ajax({
          url: updateBanner,
          type: "post",
          headers: { "app-version": "v1.0" },
          data: {
            fileName: "123.png",
            storeId: vm.info.id,
            token: md5("updateBanner"),
            fileContent: rst.base64
          },
          success(res) {
            vm.$dialog.toast({
              mes: res.msg
            });
          }
        });
      });
    },
    showEdit() {
      this.newMobile = this.info.sellerMobile;
      this.newStoreCityName = this.info.areaId?`${this.info.provinceId.province},${this.info.cityId.city},${this.info.areaId.area}`:`${this.info.provinceId.province},${this.info.cityId.city}`;
      this.newAddressDetail = this.info.addressDetail;
      this.showPopup = true;
    },
    result1(res) {
      if (res.itemValue3) {
        // this.areaId = res.itemValue3;
        this.newStoreCityName = `${res.itemName1},${res.itemName2},${res.itemName3}`;
        this.newStoreCity = `${res.itemValue1},${res.itemValue2},${res.itemValue3}`;
      } else {
        // this.areaId='';
        this.newStoreCityName = `${res.itemName1},${res.itemName2}`;
        this.newStoreCity = `${res.itemValue1},${res.itemValue2},0`;
      }
    },
    saveInfo() {
      let vm = this;
      mui.ajax({
        url: updateAddressInfo,
        type: "post",
        headers: { "app-version": "v1.0" },
        data: {
          storeId: this.info.id,
          sellerMobile: this.newMobile,
          cityValue: this.newStoreCity,
          addressDetail: this.newAddressDetail,
          token: md5(`updateAddressInfo${this.info.id}`)
        },
        success(res) {
          vm.$dialog.toast({
            mes: res.msg,
            callback: () => {
              vm.getMyStore();
              vm.showPopup = false;
            }
          });
        }
      });
    },
    saveIntro() {
      let vm = this;
      mui.ajax({
        url: updateIntro,
        type: "post",
        headers: { "app-version": "v1.0" },
        data: {
          description: this.info.storeDescription,
          storeId: this.info.id,
          token: md5(`updateIntro${this.info.id}`)
        },
        success(res) {
          vm.$dialog.toast({
            mes: res.msg
          });
          vm.editTag = true;
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
@import "../../style/mixin.less";
.store-banner {
  background-color: @white;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  .wh(100%, 5rem);
  .upload-box {
    .hv-cen;
    .text-center;
    color: @white;
    .wh(2rem, 40px);
    line-height: 40px;
    font-size: 14px;
    background-color: rgba(0, 0, 0, 0.3);
    border: 2px solid @white;
  }
  input[type="file"] {
    .hv-cen;
    .wh(100%, 100%);
    opacity: 0;
  }
}

.store-info {
  background-color: @white;
  .pd;
  .mg-v;
  font-size: 14px;
  .store-title {
    font-size: 0.35rem;
    .pd-v;
    margin-bottom: 0.1rem;
  }
  > div {
    margin: 0.1rem 0;
  }
}

.edit-container {
  border-radius: 5px;
  .blue-header {
    background-color: @blue;
    height: @pd;
  }
}
</style>