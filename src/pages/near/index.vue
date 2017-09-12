<template>
  <div>
    <header-top title="附近"></header-top>
    <main class='scroll-content-2'>
      <section class="search-container">
        <router-link to="/home/search" class="search-input">
          <span class="iconfont-large self-search"></span>
          <span>搜索商家或商品</span>
        </router-link>
      </section>
      <yd-tab ref="tab" >
        <yd-tab-panel :label="item.columnName" v-for="(item,index) in info" :key="index" :tabkey="item.subColumn[0].id">
          <div class="swiper-container">
            <div class="swiper-wrapper sub-list">
              <div class="swiper-slide sub-item" v-for="sub in item.subColumn" :key="sub.id" :class="{'sub-active':columnId==sub.id}" @click="changeSubColumn(sub)">{{sub.names}}</div>
            </div>
          </div>
        </yd-tab-panel>
      </yd-tab>
      <section class="pd-list">
        <yd-infinitescroll :on-infinite="getProduct" ref="pdlist">
          <div slot="list">
            <product-item v-for="item in productList" :key="item.id" :id="item.id" :img-url="item.imgUrl" :title="item.name" :score="item.score" :price1="item.price" :price2="item.marketPrice" :sale-num="item.saleNum"></product-item>
          </div>
          <p slot="doneTip">
            <span class="iconfont self-nodata danger-color" style="margin-right:5px;"></span>没有数据啦</p>
        </yd-infinitescroll>
      </section>
    </main>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import HeaderTop from 'components/header/index'
import ProductItem from 'components/common/ProductItem'
import { near, products } from '../../api/index'
import Swiper from 'swiper/dist/js/swiper.min.js'
import '../../../node_modules/swiper/dist/css/swiper.min.css'
export default {
  name: 'Near',
  data() {
    return {
      noData: false,
      info: [],
      pageNo: 1,
      columnId: '',
      productList: []
    }
  },
  components: { HeaderTop, ProductItem },
  computed: {
    ...mapState(['longitude', 'latitude'])
  },
  created() {
    this.getNear();
  },
  activated() {
  },
  methods: {
    getNear() {
      let vm = this;
      mui.ajax({
        url: near,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          token: md5('near')
        },
        success(res) {
          vm.info = res.result;
          setTimeout(() => {
            vm.$refs.tab.init(false);
            new Swiper('.swiper-container', {
              slidesPerView: 4,
              spaceBetween: 10,
              observer: true,
              observeParents: true,
              slideToClickedSlide: true
            })
          }, 0)
        }
      })
    },
    reset() {
      this.noData = false;
      this.productList = [];
      this.pageNo = 1;
      this.getProduct();
    },
    changeStatus(label, tabkey) {
      this.columnId = tabkey;
      this.reset();
    },
    changeSubColumn(item){
      this.columnId = item.id;
      this.reset();
    },
    getProduct() {
      let vm = this;
      if (!this.noData) {
        mui.ajax({
          url: products,
          type: 'post',
          headers: { 'app-version': 'v1.0' },
          data: {
            pageNo: this.pageNo,
            longitude: this.longitude,
            latitude: this.latitude,
            columnId: this.columnId,
            orderType: 1,
            columnType: 2,
            token: md5(`products${this.longitude}${this.latitude}`)
          },
          success(res) {
            let _list = res.result;
            vm.productList = [...vm.productList, ..._list];
            if (_list.length < 10) {
              vm.noData = true;
              vm.$refs.pdlist.$emit('ydui.infinitescroll.loadedDone');
              return;
            }
            vm.$refs.pdlist.$emit('ydui.infinitescroll.finishLoad');
            vm.pageNo++;
          }
        })
      }
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
.swiper-container{
   .pd;
   .sub-list {
  .sub-item {
    padding: .15rem 0;
    border-radius: 3px;
    border: 1px solid #ddd;
    text-align: center;
    transition: all .4s;
    &.sub-active {
      color: @red;
      border-color: currentColor;
      box-shadow: 0 0 5px currentColor;
    }
  }
}
}

</style>