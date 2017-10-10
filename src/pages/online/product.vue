<template>
  <div>
    <header-top title="商品详情"></header-top>
    <main class='scroll-content-3'>
      <section class="info-1">
        <yd-slider>
          <yd-slider-item v-for="(item,index) in imgList" :key="index">
            <img :src="item">
          </yd-slider-item>
        </yd-slider>
        <p>{{info.proName}}</p>
        <p class="danger-color fs-16">
          <span v-if="pdtype==0">{{info.productAttrStock.price}}
            <span class="fs-12" style="margin-left:.1rem;">积分</span>
          </span>
          <span v-else-if="pdtype==2">￥{{jdinfo.proPrice}}</span>
          <span v-else-if="pdtype==3"></span>
          <span v-else>￥{{info.productAttrStock.price}}</span>
        </p>
      </section>
      <section class="info-2">
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">剩余：{{info.productAttrStock.repertory}}</span>
          </yd-cell-item>
          <yd-cell-item v-if="pdtype==0">
            <span slot="left">积分使用说明:{{info.productAttrStock.price}}积分 +
              <span class="danger-color">￥{{info.pointNeedMoney}}</span>
            </span>
          </yd-cell-item>
        </yd-cell-group>
      </section>
      <section>
        <load-more tip="商品详细信息" :show-loading="false" background-color="rgb(236, 227, 124)" style="margin-bottom:0;"></load-more>
        <div v-html="info.content" class="pd-content"></div>
      </section>
      <yd-backtop></yd-backtop>
    </main>
    <footer class="fix-footer flex align-center" v-show="pdtype==2">
      <button @click="buynow" class="flex-1 btn-2">[京东]立即购买</button>
    </footer>
    <footer class="fix-footer flex align-center" v-show="pdtype!=2">
      <div class="shopping-cart flex just-center align-center">
        <span class="iconfont-large self-shopcart"></span>
        <span class="shopping-num" type="danger">9</span>
      </div>
      <button @click="buynow" class="flex-1 btn-2">立即购买</button>
      <button @click="add2cart" class="flex-1 btn-1">加入购物车</button>
    </footer>
    
  </div>
</template>
<script>
import { mapState } from 'vuex'
import HeaderTop from 'components/header/index'
import { LoadMore } from 'vux'
import { onlineProductsDetailInfoInH5 } from '../../api/index'
import { mixin } from 'components/common/mixin'
export default {
  name: 'Product',
  data() {
    return {
      info: {},
      jdinfo: {},
      imgList: [],
      pdtype: -1,//产品类型，积分换购：0，品牌商城：1，京东：2，责任消费：3
    }
  },
  components: { HeaderTop, LoadMore },
  computed: {
    ...mapState(['account'])
  },
  mixins: [mixin],
  created() {

  },
  activated() {
    this.imgList = [];
    this.info = {};
    this.jdinfo = {};
    this.pdtype = this.$route.query.pdtype;
    if (this.pdtype == 2) {

    }
    this.getInfo();
  },
  mounted() {

  },
  methods: {
    getInfo() {
      let vm = this;
      mui.ajax({
        url: onlineProductsDetailInfoInH5,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          id: this.$route.query.id,
          token: md5(`onlineProductsDetailInfoInH5${this.$route.query.id}`)
        },
        success(res) {
          let _result = res.result;
          // if(vm.isEmpty(_result)){
          //   return;
          // }
          vm.info = _result;
          for (let i = 1; i <= 5; i++) {
            if (vm.info[`para${i}`]) {
              vm.imgList.push(vm.info[`para${i}`]);
            }
          }
          vm.$nextTick(function() {
            Array.from(document.querySelectorAll("img")).forEach(function(e) {
              e.style.width = '100%';
            })
          })
        }
      })
    },
    add2cart() { },
    buynow() { }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
section {
  background-color: @white;
  margin-bottom: @pd;
}

.info-1 {
  p {
    .pd;
    font-size: .3rem;
  }
}

footer {
  .shopping-cart {
    position: relative;
    .wh(1rem, 1rem);
    .shopping-num {
      position: absolute;
      font-size: 10px;
      left: .7rem;
      top: .4rem;
      transform: translate(-50%, -50%);
      color: @white;
      background-color: @red;
      border-radius: 10px;
      padding: 2px 5px;
      text-align: center;
    }
  }
  button {
    line-height: 1rem;
    font-size: 14px;
    color: @white;
    &.btn-1 {
      background-color: #ffb03f;
    }
    &.btn-2 {
      background-color: @red;
    }
  }
}
</style>