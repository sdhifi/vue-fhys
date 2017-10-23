<template>
  <div>
    <header-top title="下单"></header-top>
    <main class='scroll-content-2'>
      <section class="address-container">
        <yd-cell-group v-if="!addressList.length">
          <yd-cell-item arrow type="link" href="/address/new">
            <yd-icon slot="icon" name="location"></yd-icon>
            <span slot="left">收货人</span>
            <span slot="right">去添加</span>
          </yd-cell-item>
        </yd-cell-group>
        <router-link v-else to="/address/index?type=choose" class="flex align-center">
          <div v-if="defaultAddress" class="fs-14 flex-1">
            <p>收货人：
              <span style="margin-right:.2rem;font-weight:bold;">{{defaultAddress.consigneeName}}</span>
              <span>{{defaultAddress.mobile}}</span>
            </p>
            <p>收货地址：{{defaultAddress.proviceId.province}}{{defaultAddress.cityId.city}}{{defaultAddress.areaId.area}}{{defaultAddress.addressDetail}}</p>
          </div>
          <div v-else-if="addressList[0]" class="fs-14 flex-1">
            <p>收货人：
              <span style="margin-right:.2rem;font-weight:bold;">{{addressList[0].consigneeName}}</span>
              <span>{{addressList[0].mobile}}</span>
            </p>
            <p>收货地址：{{addressList[0].proviceId.province}}{{addressList[0].cityId.city}}{{addressList[0].areaId.area}}{{addressList[0].addressDetail}}</p>
          </div>
          <span class="iconfont self-right"></span>
        </router-link>
      </section>
      <section class="order-list">
        <h2>订单信息</h2>
        <ul>
          <li v-for="(item,index) in settleList" :key="index" class="order-item flex">
            <img :src="item.goodsId.imgUrl" :alt="item.goodsId.name" class="pd-img">
            <div class="order-info flex-1">
              <h3 class="pd-name">{{item.goodsId.name}}</h3>
              <p>{{item.goodsAttr}}</p>
              <div class="flex just-between">
                <span class="danger-color fs-16">￥{{item.goodsId.price}}</span>
                <span class="fs-14">x{{item.goodsNum}}</span>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">配送方式：</span>
          <span slot="right" class="fs-14">快递：￥{{formatPrice(0)}}</span>
        </yd-cell-item>
         <yd-cell-item>
          <span slot="left">支付明细：</span>
          <span slot="right" class="fs-14" v-if="orderType==1">{{total.price}}积分+￥{{formatPrice(total.pointPrice)}}</span>
          <span slot="right" class="fs-14" v-else>￥{{total.price}}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">买家留言：</span>
          <yd-input slot="right" v-model="remark" placeholder="选填-可告诉卖家您的特殊要求"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <p slot="right" class="fs-16">
            总支付：<span  class="danger-color">￥{{formatPrice(total.sum)}}</span>
          </p>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group v-if="orderType=='1'">
         <yd-cell-item type="radio">
          <span slot="icon" class="iconfont-large self-wallet danger-color"></span>
          <span slot="left">积分支付</span>
          <input slot="right" type="radio" value="0" v-model="payType" />
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group title="选择支付方式" v-else>
        <yd-cell-item type="radio">
          <span slot="icon" class="iconfont-large self-wallet danger-color"></span>
          <span slot="left">会员余额</span>
          <input slot="right" type="radio" value="0" v-model="payType" />
        </yd-cell-item>
        <yd-cell-item type="radio">
          <span slot="icon" class="iconfont-large self-weixinzhifu" style="color:#25d025;"></span>
          <span slot="left">微信支付</span>
          <input slot="right" type="radio" value="1" v-model="payType" />
        </yd-cell-item>
        <yd-cell-item type="radio">
          <span slot="icon" class="iconfont-large self-yinlianzhifu1" style="color:#077d8d;"></span>
          <span slot="left">银联在线支付</span>
          <input slot="right" type="radio" value="3" v-model="payType" />
        </yd-cell-item>
        <yd-cell-item type="radio">
          <span slot="icon" class="iconfont-large self-zhifubao" style="color:#00a0ea"></span>
          <span slot="left">支付宝支付</span>
          <input slot="right" type="radio" value="2" v-model="payType" />
        </yd-cell-item>
      </yd-cell-group>
      <div style="padding:.2rem;">
        <yd-button size="large" type="danger" @click.native="pay">确认支付</yd-button>
        </div> 
    </main>
  </div>
</template>
<script>
import { mapState } from "vuex";
import HeaderTop from "components/header/index";
import { addOrder } from "../../api/index";
import { mixin } from "components/common/mixin";
export default {
  name: "Settle",
  data() {
    return {
      orderType:0,//0:普通商品 1：积分兑换 2责任消费
      remark: "", //备注
      payType: 0 //支付方式
    };
  },
  components: { HeaderTop },
  computed: {
    ...mapState(["account", "defaultAddress", "addressList", "settleList"]),
    total() {
      let sum = 0,
        price = 0,
        pointPrice = 0;
      this.settleList.forEach(item => {
        price += item.goodsAttrStockId.price * item.goodsNum;
        if (item.goodsId.isCanUserCou == "1" || item.goodsId.isCanUserCou == "2") {
          pointPrice += item.goodsId.pointNicePrice * item.goodsNum;
        }
      });
      sum = price + pointPrice;
      return { sum, price, pointPrice };
    }
  },
  created() {},
  activated() {
    this.orderType=this.$route.query.orderType;
    this.$store.dispatch("getAddressList");
  },
  mixins: [mixin],
  methods: {
    pay() {}
  }
};
</script>
<style lang='less' scoped>
@import "../../style/mixin.less";
.address-container {
  background-color: @white;
  margin-bottom: @pd;
  .pd;
}
.order-list {
  .pd;
  background-color: @white;
  margin-bottom: @pd;
  h2 {
    font-size: 0.3rem;
    padding-bottom: @pd;
    font-weight: normal;
  }
  .order-item {
    .pd-v;
    border-top: 1px solid #f9f9f9;
    img {
      .wh(1.5rem,1.5rem);
    }
    .order-info {
      margin-left: @pd;
      .pd-name {
        .multi-ellipsis(2);
        margin-bottom: 0.12rem;
        color: #333;
        font-size: 0.28rem;
      }
      p {
        color: @lightgray;
      }
    }
  }
}
</style>