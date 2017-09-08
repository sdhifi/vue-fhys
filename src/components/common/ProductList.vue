<template>
  <section class="nav-list">
    <ul class="flex just-around text-center block" v-if="tabType=='block'">
      <li class="nav-item" :class="{'nav-active':index+1==filterIndex}" @click="filter(item)" v-for="(item,index) in orderType" :key="index">{{item.name}}</li>
    </ul>
    <ul class="flex just-around text-center" v-else>
      <li class="nav-item" :class="{'nav-active':index+1==filterIndex}" @click="filter(item)" v-for="(item,index) in orderType2" :key="index">{{item.name}}</li>
    </ul>
    <yd-infinitescroll :on-infinite="getProduct" ref="pdlist">
      <div slot="list">
        <product-item v-for="item in productList" :key="item.id" :item="item"></product-item>
      </div>
      <p slot="doneTip">
        <span class="iconfont self-nodata danger-color" style="margin-right:5px;"></span>没有数据啦</p>
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
      ],
      orderType2: [
        { type: "1", name: "距离最近" },
        { type: "2", name: "人气优先" },
        { type: "3", name: "价格最低" },
        { type: "4", name: "最新发布" },
      ]
    }
  },
  props: {
    tabType: {
      type: String,
      default: 'block' //tab类型，默认【block】块状，还有【line】下划线状
    },
    likeValue: {
      // 模糊查询-商品或店铺值
      type: String,
      default: ''
    },
    columnId: {
      type: String,
      default: ''
    },
    columnType: {
      type: String,
      default: '1'
    }
  },
  components: { ProductItem },
  computed: {
    ...mapState(['longitude', 'latitude'])
  },
  created() {
  },
  activated() {
    this.filterIndex = 1;
    this.reset();
  },
  methods: {
    reset() {
      this.noData = false;
      this.productList = [];
      this.pageNo = 1;
      this.getProduct();
    },
    filter(e) {
      this.filterIndex = +e.type
      this.reset();
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
            columnId: this.columnId,
            columnType: this.columnType,
            orderType: this.filterIndex,
            likeValue: this.likeValue,
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
    padding-bottom: 0;
    border-bottom: 1px solid #ddd;
    .nav-item {
      flex: 1;
      margin:0 3%;
      padding: .15rem 0;
      border-bottom: 2px solid transparent;
      transition: all .2s;
      font-size: .28rem;
      &.nav-active {
        color: @red;
        border-bottom: 2px solid currentColor;
      }
    }
    &.block {
      padding-bottom: @pd;
      .nav-item {
        border-radius: 3px;
        border: 1px solid #ddd;
        &.nav-active {
          color: @red;
          border-color: currentColor;
        }
      }
    }
  }
}
</style>