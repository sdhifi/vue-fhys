<template>
  <li class="order-item">
    <h2>{{name}}</h2>
    <router-link class="good-list" :to="{name:'OrderDetail',query:{sn:sn}}">
      <p class="order-id">订单编号：{{sn}}</p>
      <div class="good-item flex" v-for="good in goods" :key="good.goodsId">
        <img :src="good.goodsImg" :alt="good.goodsName">
        <div class="good-info flex-1 flex just-between">
          <h3 class="good-title">{{good.goodsName}}</h3>
          <div class="good-price flex just-between">
            <span>数量：{{good.goodNum}}</span>
            <span>￥{{good.goodsAmount}}</span>
          </div>
        </div>
      </div>
    </router-link>
    <div class="order-operate flex just-between align-center">
      <p>应付金额：
        <span class="danger-color  fs-16">￥{{total}}</span>
        <span class="pay-tag">{{payType(paytype)}}</span>
      </p>
      <yd-button type="warning" v-if="status=='0'" @click.native="pay">去付款</yd-button>
      <yd-button type="hollow" v-if="status=='1'">待发货</yd-button>
      <yd-button type="danger" v-if="status=='2'" @click.native="update">确认收货</yd-button>
      <yd-button type="primary" v-if="status=='3'" @click.native="comment">去评价</yd-button>
      <yd-button type="disabled" v-if="status=='6'">已退款</yd-button>
    </div>
  </li>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "OrderItem",
  props: {
    name: String,
    sn: String,
    goods: {
      type: Array,
      default: function() {
        return [];
      }
    },
    total: Number,
    status: String,
    paytype: String
  },
  methods: {
    payType(a) {
      switch (a) {
        case "0":
          return "线上余额";
          break;
        case "1":
          return "微信支付";
          break;
        case "2":
          return "支付宝";
          break;
        case "3":
          return "银联支付";
          break;
        case "7":
          return "积分支付";
          break;
        case "8":
          return "责任消费金额";
          break;
      }
    },
    pay() {
      this.$emit("pay");
    },
    update() {
      this.$emit("update");
    },
    comment() {
      this.$emit("comment");
    }
  }
};
</script>
<style lang='less' scoped>
@import "../../style/mixin.less";
.order-item {
  margin-top: @pd;
  .pd;
  background-color: @white;
  h2 {
    padding-bottom: @pd;
    font-size: 0.28rem;
    border-bottom: 1px solid #f7f5f5;
  }
}
.good-list {
  display: block;
  .pd-v;
  .order-id {
    margin-bottom: @pd;
    color: @lightgray;
  }
  .good-item {
    padding-bottom: 0.1rem;
    margin-bottom: 0.1rem;
    border-bottom: 1px solid #f7f5f5;
    img {
      .wh(1.5rem,1.5rem);
      overflow: hidden;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    .good-info {
      flex-direction: column;
      margin-left: @pd * 2;
      .good-title {
        font-weight: normal;
      }
      .good-price {
        span:last-child {
          color: @red;
          font-size: 14px;
        }
      }
    }
  }
}
.pay-tag {
  padding: 2px 5px;
  border: 1px solid @blue;
  border-radius: 10px 0;
  color: @white;
  background-color: @blue;
  font-size: 0.2rem;
}
</style>