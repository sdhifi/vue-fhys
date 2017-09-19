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
          <div class="flex-1">
            <span class="iconfont-large self-location danger-color"></span>
            <span>{{info.provinceId.province}}{{info.cityId.city}}{{info.areaId.area}}{{info.addressDetail}}</span>
          </div>
          <!-- <span class="iconfont-large self-bianji danger-color"></span> -->
        </div>
        <div>
          <span class="iconfont-large self-tel"></span>
          <span>{{info.sellerMobile}}</span>
        </div>
        <div>
          <span class="iconfont-large self-renzheng" style="color:#4cd864;"></span>
          <span>店铺审核状态：审核通过</span>
        </div>
      </section>
      <section class="store-menu">
        <yd-grids-group :rows="3">
          <yd-grids-item v-for="(item,index) in menu" :key="index" :link="item.link">
            <span slot="icon" :class="['iconfont-large',item.icon]" :style="{color:item.color}"></span>
            <span slot="text">{{item.text}}</span>
          </yd-grids-item>
        </yd-grids-group>
      </section>
    </main>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import 'lrz/dist/lrz.bundle.js'
import { getStore } from 'components/common/mixin'
import { myStore, updateBanner } from '../../api/index'
export default {
  name: 'MyStore',
  data() {
    return {
      info: {},
      menu: [{
        icon: 'self-shangpinguanli',
        text: '商品管理',
        link: '/store/productmanage',
        color:'#fc9557'
      }, {
        icon: 'self-dingdanguanli',
        text: '订单管理',
        link: '/store/ordermanage',
        color:'#fab652'
      }, {
        icon: 'self-fabu',
        text: '发布管理',
        link: '/store/publishmanage',
        color:'#fab652'
      }, {
        icon: 'self-shoukuan',
        text: '收款',
        link: '/store/receipt',
        color:'#fc9557'
      }]
    }
  },
  components: { HeaderTop },
  computed: {

  },
  created() {

  },
  activated() {
    this.getMyStore();
  },
  methods: {
    getMyStore() {
      let vm = this;
      mui.ajax({
        url: myStore,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          account: getStore('account'),
          token: md5(`myStore${getStore('account')}`)
        },
        success(res) {
          vm.info = res.result;
        }
      })
    },
    previewImg(event) {
      let headImg = document.querySelector('.store-banner'),
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
        headImg.style.backgroundImage = `url(${rst.base64})`;
        mui.ajax({
          url: updateBanner,
          type: 'post',
          headers: { 'app-version': 'v1.0' },
          data: {
            fileName: '123.png',
            storeId: vm.info.id,
            token: md5('updateBanner'),
            fileContent: rst.base64
          },
          success(res) {
            vm.$dialog.toast({
              mes: res.msg
            })
          }
        })
      })
    },
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
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
    background-color: rgba(0, 0, 0, .3);
    border: 2px solid @white;
  }
  input[type=file] {
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
    font-size: .35rem;
    font-weight: normal;
    .pd-v;
    margin-bottom: .1rem;
  }
  >div {
    margin: .1rem 0;
  }
}
</style>