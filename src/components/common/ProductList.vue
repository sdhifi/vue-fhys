<template>
  <section class="nav-list">
    <ul class="flex just-around text-center">
      <li class="nav-item" :class="{'nav-active':index+1==filterIndex}" @click="filter(item)" v-for="(item,index) in orderType" :key="index">{{item.name}}</li>
    </ul>
    <yd-infinitescroll :on-infinite="getProduct" ref="pdlist">
      <div slot="list">
        <product-item v-for="item in productList" :key="item.id" :item="item"></product-item>
      </div>
      <p slot="doneTip">没有数据啦</p>
    </yd-infinitescroll>
  </section>
</template>
<script>
import ProductItem from './ProductItem'
import { mapState } from 'vuex'
import { products } from '../../api/index'

export default {
  name: 'ProductList',
  data() {
    return {
      noData: false,
      productList: [],
      filterIndex: 1,
      pageNo: 1,
      orderType: [
        { type: "1", name: "距离近" },
        { type: "2", name: "人气高" },
        { type: "3", name: "价格低" },
        { type: "4", name: "最新" },
      ]
    }
  },
  props: {
    value: {
      // 模糊查询-商品或店铺值
      type: String,
      default: ''
    }
  },
  components: { ProductItem },
  computed: {
    ...mapState(['longitude', 'latitude'])
  },
  created() {
    this.getProduct();
  },
  activated() {

  },
  methods: {
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