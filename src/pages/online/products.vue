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
                <span class="fs-14 price1" v-if="pdtype=='0'">￥{{pd.pointNicePrice}}
                  <span class="price2">+{{pd.price}}积分</span>
                </span>
                <span  class="fs-14 price1" v-else>
                  ￥{{pd.price}}
                </span>
                <yd-button type="danger" v-if="account&&pdtype!='2'" @click.native="add2cart(pd.id,$event)">加入购物车</yd-button>
              </div>
            </div>
          </div>
        </div>
      </yd-infinitescroll>
    </main>
    <router-link :to="{path:'/online/shoppingcart'}" class="shopping-container" v-show="account&&pdtype!='2'">
      <div class="shopping-cart">
        <span class="iconfont-large self-shopcart"></span>
      </div>
      <yd-badge type="danger" class="shopping-num" v-show="cartNum>0">{{cartNum}}</yd-badge>
    </router-link>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import HeaderTop from 'components/header/index'
import { onlineProductsByAllColumn, onlineProductsDetailInfoInH5,addCart} from '../../api/index'
export default {
  name: 'Products',
  data() {
    return {
      pdtype: '',
      searchValue: '',
      columnId: '',
      type: '',//栏目级别
      pageNo: 1,
      noData: false,
      productList: []
    }
  },
  components: { HeaderTop },
  computed: {
    ...mapState(['account']),
    ...mapGetters(['cartNum'])
  },
  created() {

  },
  activated() {
    this.reset();
    this.type = this.$route.query.type;
    this.columnId = this.$route.query.id;
    this.pdtype = this.$route.query.pdtype;
    // this.searchValue = '';
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
        // this.$router.push({ path: '/online/settle', query: { pdtype: this.$route.query.pdtype } })
      }
      else {
        this.$router.push({ path: '/online/product', query: { id: pd.id, pdtype: this.$route.query.pdtype } })
      }
    },
    add2cart(id,event){
      let vm = this;
      var ct = event.currentTarget;
      var img = ct.parentElement.parentElement.parentElement.querySelector('img');
      var width = img.clientWidth;
      var height = img.clientHeight;
      var bottom = window.innerHeight - img.getBoundingClientRect().bottom;
      mui.ajax({
        url: onlineProductsDetailInfoInH5,
        type: 'post',
        headers: {'app-version': 'v1.0'},
        data: {
          id,
          token:md5(`onlineProductsDetailInfoInH5${id}`)
        },
        success(res){
          let _result=res.result;
          if(!_result.productAttrStock.repertory){
            vm.$dialog.toast({
              mes: "库存不足，请查看其他商品"
            });
            return;
          }
          //商品加入购物车动画
            
            var src = img.src;
            var m = document.createElement('img');
            m.id = 'imgMoive';
            var tt = `width:${width}px;height:${height}px;bottom:${bottom}px;left:.2rem;`;
            m.style = `position:fixed;z-index:1000;${tt}-webkit-animation:end 1s cubic-bezier(0.99, -0.51, 0.56, 0.55);animation:end 1s cubic-bezier(0.99, -0.51, 0.56, 0.55)`;
            m.src = src;
            document.body.appendChild(m);

            setTimeout(() => {
                m.remove();
            }, 1000);
            mui.ajax({
              url: addCart,
              type: "post",
              headers: { "app-version": "v1.0" },
              data: {
                goodsId: id,
                goodsAttrStockId:_result.productAttrStock.id,
                goodsAttrIds:_result.productAttrStock.productAttrIds,
                goodsAttr:_result.productAttrStock.productAttrIds,
                goodsNum: 1,
                account: vm.account,
                token: md5(`addCart${vm.account}`)
              },
              success(res) {
                vm.$dialog.toast({
                  mes: res.msg
                });
                vm.$store.dispatch("getCartList");
              }
            });
        }
      })
    }
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
.shopping-container{
  position: fixed;
  left:@pd;
  bottom: @pd * 2;
  .wh(1rem,1rem);
  border-radius: 50%;
  z-index: 1000;
  background-color: rgba(0,0,0,.5);
  .shopping-cart{
   .hv-cen;
   color: @white; 
  }
  .shopping-num{
      position: absolute;
      left:.5rem;
      top:.1rem;
    }
}
@keyframes end {
    0% {
        border-radius: 50%;
    }
    50% {
      left:2rem;
      border-radius: 50%;
    }
    100% {
        position: fixed;
        left:.4rem;
        bottom:.5rem;
       .wh(.4rem,.4rem);
        border-radius: 50%;
    }
}
</style>