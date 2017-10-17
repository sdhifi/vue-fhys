<template>
  <div>
    <header-top title="商品列表"></header-top>
    <div class="search-form" autocomplete="off">
      <div class="input-group  flex align-center">
        <span class="iconfont-large self-search"></span>
        <input type="search" name="search" class="search-input" placeholder="输入搜索的商品关键词" v-model="searchValue" @keyup.enter="searchProduct">
        <button type="button" class="search-submit" @click="searchProduct">搜索</button>
      </div>
    </div>
    <main class='scroll-content-1' style="background-color:#fff;">
      <yd-infinitescroll :callback="getProduct" ref="pdlist">
        <div slot="list" class="pd-list">
          <div class="pd-item flex align-center" v-for="(pd,index) in productList" :key='index' @click="navigate($event,pd)">
            <img v-lazy="pd.imgUrl" :alt="pd.name" class="pd-cover">
            <div class="pd-info flex-1">
              <h3>{{pd.name}}</h3>
              <div class="flex just-between align-center">
                <span class="fs-14 price1">￥{{pd.price}}
                  <span class="price2" v-if="pd.pointNicePrice">+{{pd.pointNicePrice}}积分</span>
                </span>
                <yd-button type="danger">立即购买</yd-button>
              </div>
            </div>
          </div>
        </div>
      </yd-infinitescroll>
    </main>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import { onlineProductsByAllColumn } from '../../api/index'
export default {
  name: 'Products',
  data() {
    return {
      pdtype: '',
      searchValue: '',
      columnId: '',
      type: '',
      pageNo: 1,
      noData: false,
      productList: []
    }
  },
  components: { HeaderTop },
  computed: {

  },
  created() {

  },
  activated() {
    this.reset();
    this.type = this.$route.query.type;
    this.columnId = this.$route.query.id;
    this.pdtype = this.$route.query.pdtype;
    this.searchValue = '';
    this.$refs.pdlist.$emit('ydui.infinitescroll.reInit');
    // setTimeout(()=>{
    this.getProduct();
    // },0)
  },
  beforeRouteLeave(to, from, next) {
    this.reset();
    next();
  },
  methods: {
    reset() {
      this.pageNo = 1;
      this.noData = false;
      this.productList = [];
    },
    getProduct() {
      if (!this.noData) {
        let vm = this;
        mui.ajax({
          url: `${onlineProductsByAllColumn}/${this.type}/${this.columnId}`,
          type: 'post',
          headers: { 'app-version': 'v1.0' },
          data: {
            pageNo: this.pageNo,
            pageSize: 10,
            logitude: '',
            latitude: '',
            columnId: this.columnId,
            type: this.type,
            likeValue: this.searchValue,
            token: md5(`onlineProductsByAllColumn`)
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
    },
    searchProduct() {
      this.reset();
      this.getProduct();
    },
    navigate(event, pd) {
      //pdtype产品类型||积分换购：0，品牌商城：1，京东：2，责任消费：3
      if (event.target.tagName == 'BUTTON') {
        this.$router.push({ path: '/online/settle', query: { pd, pdtype: this.$route.query.pdtype } })
      }
      else {
        this.$router.push({ path: '/online/product', query: { id: pd.id, pdtype: this.$route.query.pdtype } })
      }
    },

  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
.pd-list {
  margin-top: @pd;
}

.pd-item {
  .pd;
  border-bottom: 1px solid #f9f9f9;
  img {
    .wh(1.5rem, 1.5rem)
  }
  .pd-info {
    margin-left: @pd;
    h3 {
      .multi-ellipsis(2);
      margin-bottom: @pd;
      font-weight: normal;
    }
    .price1 {
      color: @red;
    }
    .price2 {
      color: @lightgray;
    }
  }
}
</style>