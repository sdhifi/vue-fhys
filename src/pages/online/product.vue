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
      <div class="shopping-cart flex just-center align-center" @click="goShoppingCart">
        <!-- <span class="iconfont self-shopcart"></span> -->
        <!-- <p class="fs-10">购物车</p> -->
        <span class="iconfont-large self-shopcart"></span>
        <span class="shopping-num" type="danger" v-show="totalNum>0">{{totalNum}}</span>
      </div>
      <button @click="buynow" class="flex-1 btn-2">立即购买</button>
      <button @click="add2cart" class="flex-1 btn-1">加入购物车</button>
    </footer>
    <div class="actionsheet-container">
      <transition name="actionsheet-mask">
        <div class="mask" @click="show=false" v-show="show"></div>
      </transition>
      <div class="actionsheet-content" :class="{'actionsheet-toggle':show}">
        <div class="top flex">
          <div class="img-cover">
            <img :src="info.proImg" alt="">
          </div>
          <div class="info flex flex-1">
            <p>{{info.proName}}</p>
            <p class="danger-color fs-14">￥{{info.productAttrStock.price}}</p>
          </div>
          <div class="close" @click="show=false">
            <span class="iconfont-large self-guanbi"></span>
          </div>
        </div>
        <div class="middle">
          <div class="middle-1">
            <h3>请选择属性：</h3>
            <div class="flex align-center" v-for="(item,index) in info.attrs" :key="index" style="margin-bottom:5px;">
              <span class="attr-name">{{item.attrName}}</span>
              <ul class="attr-list">
                <li class="attr-item" :class="{'active':attrIndex==0}" v-for="(attr,attrIndex) in item.attrValues" :key="attr.id" :data-id="attr.id">{{attr.attrValueId.attrValue}}</li>
              </ul>
            </div>
          </div>
          <div class="middle-2">
            <h3>请选择数量：</h3>
            <div class="flex align-center">
              <yd-spinner v-model="pdnum" :min="1" :max="1" v-if="pdtype==0" readonly></yd-spinner>
              <yd-spinner v-model="pdnum" :min="1" :max="info.productAttrStock.repertory" v-else></yd-spinner>
              <p style="margin-left:.2rem;">库存
                <span class="danger-color">{{info.productAttrStock.repertory}}</span>件(商品限购
                <span v-if="pdtype==0">1</span>
                <span v-else>{{info.purchasNum}}</span>件)
              </p>
            </div>
          </div>
        </div>
        <div class="bottom">
          <yd-button size="large" type="danger" @click.native="cartOrBuy">确定</yd-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import HeaderTop from 'components/header/index'
import { LoadMore } from 'vux'
import { onlineProductsDetailInfoInH5, addCart } from '../../api/index'
import { mixin } from 'components/common/mixin'
export default {
  name: 'Product',
  data() {
    return {
      info: {},
      jdinfo: {},
      imgList: [],
      pdtype: -1,//产品类型，积分换购：0，品牌商城：1，京东：2，责任消费：3
      show: false,
      buyType: 0,//购买方式|加入购物车：0，立即购买：1
      pdnum: 1,
      attrId: ''
    }
  },
  components: { HeaderTop, LoadMore },
  computed: {
    ...mapState(['account', 'cartList']),
    totalNum() {
      this.cartList.forEach((item,index)=>{
        
      });
    }
  },
  mixins: [mixin],
  created() {

  },
  activated() {
    this.imgList = [];
    this.info = {};
    this.jdinfo = {};
    this.pdtype = this.$route.query.pdtype;
    this.pdnum = 1;

    if (this.pdtype == 2) {

    }
    this.getInfo();
  },
  beforeRouteLeave(to, from, next) {
    this.imgList = [];
    next();
  },
  mounted() {
    let attrList = document.querySelectorAll('attr-list');
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
          _result.content = _result.content.replace(/\/userfiles/g, 'http://jfh.jfeimao.com/userfiles')

          vm.info = _result;
          vm.attrId = vm.info.attrs[0].attrValues[0].id;
          for (let i = 1; i <= 5; i++) {
            if (vm.info[`para${i}`]) {
              vm.imgList.push(vm.info[`para${i}`]);
            }
          }
          vm.$nextTick(function() {
            Array.from(document.querySelector('.pd-content').querySelectorAll("img")).forEach(function(e) {
              e.style.width = '100%';
            })
          })
        }
      })
    },
    add2cart() {
      this.redirectlogin();
      this.buyType = 0;
      this.show = true;
    },
    buynow() {
      this.redirectlogin();
      this.buyType = 1;
      this.show = true;
    },
    redirectlogin() {
      if (!this.account) {
        this.$router.push('/me/login')
        return;
      }
    },
    cartOrBuy() {
      //加入购物车
      if (this.buyType == 0) {
        let vm = this;
        mui.ajax({
          url: addCart,
          type: 'post',
          headers: { 'app-version': 'v1.0' },
          data: {
            goodsId: this.info.proId,
            goodsAttrStockId: this.info.productAttrStock.id,
            goodsAttrIds: this.info.productAttrStock.productAttrIds,
            goodsAttr: this.info.productAttrStock.productAttrIds,
            goodsNum: this.pdnum,
            account: this.account,
            token: md5(`addCart${this.account}`)
          },
          success(res) {
            vm.show = false;
            vm.$dialog.toast({
              mes: res.msg
            })
          }
        })
      }
      //立即购买
      else {
        this.show = false;
        this.$router.push({ path: '/online/settle' })
      }
    },
    goShoppingCart(){
      this.$router.push({ path: '/online/shoppingcart' })
    }
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

.actionsheet-mask-enter,
actionsheet-mask-leave-active {
  opacity: 0;
}

.actionsheet-mask-leave-active,
.actionsheet-mask-enter-active {
  transition: opacity 300ms!important;
}

.mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .6);
}

.actionsheet-content {
  position: fixed;
  left: 0;
  bottom: 0;
  transform: translate(0, 120%);
  backface-visibility: hidden;
  z-index: 5000;
  width: 100%;
  transition: transform .3s;
  background-color: @white;
  .top {
    position: relative;
    .img-cover {
      position: absolute;
      left: 8px;
      top: -.4rem;
      border: 1px solid #dfdfdf;
      background-color: @white;
      .wh(2rem, 2rem);
      border-radius: 5px;
      overflow: hidden;
      img {
        width: 100%;
        border-radius: 5px;
      }
    }
    .info {
      padding-left: 2.3rem;
      margin-bottom: .6rem;
      flex-direction: column;
      justify-content: space-between;
      p {
        width: 90%;
        padding-top: @pd;
        &:first-of-type {
          .multi-ellipsis(2);
        }
      }
    }
    .close {
      padding: 5px;
    }
  }
  .middle {
    padding-left: @pd;
    .middle-1 {
      margin-bottom: @pd;
    }
    h3 {
      margin-bottom: 5px;
    }
    .attr-name {
      color: @blue;
    }
    .attr-list {
      .attr-item {
        display: inline-block;
        border: 1px solid #bfbfbf;
        border-radius: 4px;
        font-size: 13px;
        color: #232326;
        margin-left: @pd;
        padding: 3px @pd;
        .text-center;
        &.active {
          color: @red;
          border-color: currentColor;
        }
      }
    }
  }
  .bottom {
    .pd-h;
  }
}

.actionsheet-toggle {
  transform: translate(0, 0);
}
</style>