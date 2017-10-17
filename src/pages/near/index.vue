<template>
  <div>
    <header-top title="附近" :back="false"></header-top>
    <main class='scroll-content' style="background-color:#fff;">
      <section class="search-container">
        <router-link to="/home/search" class="search-input">
          <span class="iconfont-large self-search"></span>
          <span>搜索商家或商品</span>
        </router-link>
      </section>
      <!-- <yd-tab ref="tab" :callback="changeStatus">
              <yd-tab-panel :label="item.names" v-for="(item,index) in column" :key="index" :tabkey="item.id">
                <div class="swiper-container">
                  <div class="swiper-wrapper sub-list">
                    <div class="swiper-slide sub-item" v-for="(sub,i) in subColumn" :key="sub.id" :data-id="sub.id" :class="{'sub-active':columnId==sub.id}"
                     @click="changeSubColumn(sub)">{{sub.names}}</div>
                  </div>
                </div>
              </yd-tab-panel>
            </yd-tab> -->
        <div class="sub-list">
          <div class="sub-item" v-for="(sub,i) in column" :key="sub.id" :data-id="sub.id" :class="{'sub-active':columnId==sub.id}" @click="changeSubColumn(sub)">{{sub.names}}</div>
        </div>
      <section class="pd-list">
        <yd-infinitescroll :on-infinite="getProduct" ref="pdlist">
          <div slot="list">
            <product-item v-for="item in productList" :key="item.id" :id="item.id" :img-url="item.imgUrl" :title="item.storeName" :score="item.score" :distance="item.distance" :content="item.name" :price1="item.price" :price2="item.marketPrice"></product-item>
          </div>
          <p slot="doneTip">
            <span class="iconfont self-nodata danger-color" style="margin-right:5px;"></span>没有数据啦</p>
        </yd-infinitescroll>
      </section>
    </main>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import HeaderTop from 'components/header/index'
import FooterBar from 'components/footer/index'
import ProductItem from 'components/common/ProductItem'
import { findNearColum, findNearSubColum, products } from '../../api/index'
import { mixin } from 'components/common/mixin'

export default {
  name: 'Near',
  data() {
    return {
      oldBack: mui.back,
      noData: false,
      column: [],
      subColumn: [],
      pageNo: 1,
      columnId: '',
      productList: []
    }
  },
  components: { HeaderTop, FooterBar, ProductItem },
  computed: {
    ...mapState(['longitude', 'latitude'])
  },
  mixins: [mixin],
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.plusReady();
    })
  },
  beforeRouteLeave(to, from, next) {
    mui.back = this.oldBack;
    next();
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
        url: findNearColum,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          token: md5('findNearColum')
        },
        success(res) {
          vm.column = res.result;
          vm.columnId = vm.column[0].id
          vm.getProduct();
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
      let w = document.querySelector('.sub-list');
      w.scrollLeft = 0;
      this.columnId = tabkey;
      let vm = this;
      mui.ajax({
        url: findNearSubColum,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          columnId: tabkey,
          token: md5('findNearSubColum')
        },
        success(res) {
          vm.subColumn = res.result;
          vm.reset();
        }
      })
    },
    changeSubColumn(item) {
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
  .sub-list {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
    .sub-item {
      display: inline-block;
      width: 20%;
      height: 30px;
      line-height: 30px;
      border-radius: 3px;
      border: 1px solid #ddd;
      text-align: center;
      transition: all .2s;
      margin: 2.5%;
      &.sub-active {
        color: @red;
        border-color: currentColor;
        box-shadow: 0 0 5px currentColor;
      }
    }
  }

.pd-list {
  background-color: @white;
}
</style>