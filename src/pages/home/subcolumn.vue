<template>
  <div>
    <header-top></header-top>
    <main class="scroll-content-2">
      <section class="banner-list">
        <yd-slider>
          <yd-slider-item v-for="(item,index) in banner" :key="item.id">
            <img :src="item.photo" :alt="item.names">
          </yd-slider-item>
        </yd-slider>
      </section>
      <section class="subcolumns-list">
        <ul class="flex" v-show="subcolumns.length">
          <router-link :to="{path:'/product/subcolumn/'+e.id}" v-for="e in subcolumns" :key="e.id" class="type-item text-center" tag="li">
            <img :src="getImgPath(e.pic2)" :alt="e.names">
            <p>{{e.names}}</p>
          </router-link>
        </ul>
      </section>
      <!-- <section class="nav-list">
        <ul class="flex just-around text-center">
          <li class="nav-item" :class="{'nav-active':index+1==filterIndex}" @click="filter(item)" v-for="(item,index) in orderType" :key="index">{{item.name}}</li>
        </ul>
        <yd-infinitescroll :on-infinite="getProduct" ref="pdlist">
          <div slot="list">
            <product-item v-for="item in productList" :key="item.id" :item="item"></product-item>
          </div>
          <p slot="doneTip">没有数据啦</p>
        </yd-infinitescroll>
      </section> -->
      <product-list></product-list>
    </main>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import HeaderTop from 'components/header/index'
import ProductItem from 'components/common/ProductItem'
import ProductList from 'components/common/ProductList'
import { subcolumn, products } from '../../api/index'
import { mixin } from 'components/common/mixin'
export default {
  name: 'SubColumn',
  data() {
    return {
      noData: false,
      banner: [],
      subcolumns: [],
      orderType: [
        { type: "1", name: "距离近" },
        { type: "2", name: "人气高" },
        { type: "3", name: "价格低" },
        { type: "4", name: "最新" },
      ],
      productList: [],
      filterIndex: 1,
      pageNo: 1,
    }
  },
  components: { HeaderTop, ProductItem ,ProductList},
  computed: { ...mapState(['longitude', 'latitude']) },
  mixins: [mixin],
  created() {
    this.init();
  },
  activated() {
    this.init();
  },
  methods: {
    init() {
      this.getColumn();
      this.getProduct();
      this.reset();
    },
    reset() {
      this.noData = false;
      this.productList = [];
      this.filterIndex = 1;
      this.pageNo = 1;
    },
    getColumn() {
      let vm = this;
      mui.ajax({
        url: subcolumn + this.$route.params.id,
        type: "post",
        headers: { "app-version": "v1.0" },
        data: {
          columnId: this.$route.params.id,
          token: md5(`subColumn${this.$route.params.id}`)
        },
        success(res) {
          vm.banner = res.result.subAds;
          vm.subcolumns = res.result.subColumns;
        }
      })
    },
    filter(e) {
      this.filterIndex = +e.type
      this.pageNo = 1;
      this.noData = false;
      this.productList = [];
      this.getProduct();
    },
    getProduct() {
      let vm = this;
      if (!this.noData) {
        mui.ajax({
          url: products,
          type: "post",
          headers: { "app-version": "v1.0" },
          data: {
            longitude: this.longitude,
            latitude: this.latitude,
            columnId: this.$route.params.id,
            columnType: 1,
            orderType: this.filterIndex,
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
.subcolumns-list {
  background-color: @white;
  padding: .4rem 0;
  margin-bottom: @pd;
  .type-item {
    width: 20%;
    margin-bottom: @pd;
    img {
      width: 100%;
      padding: 0 .4rem @pd .4rem;
    }
  }
}

.nav-list {
  background-color: @white;
  padding: @pd;
  ul {
    padding-bottom: @pd;
    border-bottom: 1px solid #ddd;
  }
  .nav-item {
    width: 20%;
    padding: .15rem;
    border: 1px solid #ddd;
    border-radius: 3px;
    transition: all .2s;
    &.nav-active {
      color: @red;
      border-color: currentColor;
    }
  }
}
</style>