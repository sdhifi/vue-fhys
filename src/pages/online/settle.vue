<template>
  <div>
    <yd-navbar title="确认订单" :fixed="true">
      <section slot="left" @click="goBack" style="line-height:1rem;">
        <yd-navbar-back-icon>返回</yd-navbar-back-icon>
      </section>
    </yd-navbar>
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
            <p>收货地址：{{defaultAddress.proviceId.province}}{{defaultAddress.cityId.city}}
              <span v-if="defaultAddress.areaId">{{defaultAddress.areaId.area}}</span>{{defaultAddress.addressDetail}}</p>
          </div>
          <div v-else-if="addressList[0]" class="fs-14 flex-1">
            <p>收货人：
              <span style="margin-right:.2rem;font-weight:bold;">{{addressList[0].consigneeName}}</span>
              <span>{{addressList[0].mobile}}</span>
            </p>
            <p>收货地址：{{addressList[0].proviceId.province}}{{addressList[0].cityId.city}}
              <span v-if="addressList[0].areaId">{{addressList[0].areaId.area}}</span>{{addressList[0].addressDetail}}</p>
          </div>
          <span class="iconfont self-right"></span>
        </router-link>
      </section>
      <section class="order-list">
        <h2>订单信息</h2>
        <ul>
          <li v-for="(item,index) in settleList.goodsVos" :key="index" class="order-item flex">
            <img :src="item.goodsImg" :alt="item.goodsName" class="pd-img">
            <div class="order-info flex-1">
              <h3 class="pd-name">{{item.goodsName}}</h3>
              <p>{{item.goodsAttr}}</p>
              <div class="flex just-between">
                <span class="danger-color fs-16" v-if="settleList.isCanUseCou==1">{{item.goodsAmount}}积分</span>
                <span class="danger-color fs-16" v-else-if="settleList.isCanUseCou==2">{{item.goodsAmount}}责任金</span>
                <span class="danger-color fs-16" v-else-if="settleList.isCanUseCou==3">{{item.goodsAmount}}代金券</span>
                <!-- <span class="danger-color fs-16" v-else>￥{{item.goodsAmount}}</span> -->
                <template v-else>
                  <template v-if="+member.merchantType==1">
                    <span class="danger-color fs-16" v-if="item.standardPrice">￥{{item.standardPrice}}</span>
                    <span class="danger-color fs-16" v-else>￥{{item.goodsAmount}}</span>
                  </template>
                  <template v-else>
                    <span class="danger-color fs-16" v-if="item.honourPrice">￥{{item.honourPrice}}</span>
                    <span class="danger-color fs-16" v-else>￥{{item.goodsAmount}}</span>
                  </template>
                </template>
                <span class="fs-14">x{{item.goodsNum}}</span>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">配送方式</span>
          <span slot="right" class="fs-14" v-if="settleList.logist=='0'">快递：￥{{formatPrice(settleList.pos)}}</span>
          <span slot="right" class="fs-14" v-if="settleList.logist=='1'">物流到付</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">支付明细</span>
          <span slot="right" class="fs-14" v-if="settleList.isCanUseCou==1">{{settleList.totalAmount}}积分+￥{{formatPrice(settleList.pointNiceAmount||settleList.pos)}}</span>
          <span slot="right" class="fs-14" v-else-if="settleList.isCanUseCou==2">{{settleList.totalAmount}}责任金+￥{{formatPrice(settleList.pointNiceAmount||settleList.pos)}}</span>
          <span slot="right" class="fs-14" v-else-if="settleList.isCanUseCou==3">{{settleList.totalAmount}}代金券+￥{{formatPrice(settleList.pointNiceAmount||settleList.pos)}}</span>
          <!-- <span slot="right" class="fs-14" v-else>￥{{settleList.totalAmount}}</span> -->
          <template slot="right" v-else>
            <span class="danger-color fs-16" v-if="settleList.goodsVos[0].honourPrice&&settleList.logist=='0'">￥{{formatPrice(total2)}}+￥{{settleList.pos}}</span>
            <span class="danger-color fs-16" v-else-if="settleList.goodsVos[0].honourPrice&&settleList.logist=='1'">￥{{formatPrice(total2)}}</span>
            <span class="danger-color fs-16" v-else>￥{{settleList.totalAmount}}</span>
          </template>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">买家留言：</span>
          <yd-input slot="right" v-model="remark" placeholder="选填-可告诉卖家您的特殊要求"></yd-input>
        </yd-cell-item>
        <yd-cell-item v-if="orderType=='1'">
          <span slot="left">当前积分:{{member.consumptionMoney}}</span>
          <span slot="right">
            <span class="iconfont self-dui fs-12 primary-color" v-if="member.consumptionMoney>settleList.totalAmount">支付:{{settleList.totalAmount}}</span>
            <span class="iconfont self-x fs-12 danger-color" v-else>积分不足</span>
          </span>
        </yd-cell-item>
        <yd-cell-item v-if="orderType=='2'">
          <span slot="left">当前责任金:{{member.insuranceMoney}}</span>
          <span slot="right">
            <span class="iconfont self-dui fs-12 primary-color" v-if="member.insuranceMoney>settleList.totalAmount">支付:{{settleList.totalAmount}}</span>
            <span class="iconfont self-x fs-12 danger-color" v-else>责任金不足</span>
          </span>
        </yd-cell-item>
        <yd-cell-item v-if="orderType=='3'">
          <span slot="left">当前代金券:{{member.memberVoucherMoney}}</span>
          <span slot="right">
            <span class="iconfont self-dui fs-12 primary-color" v-if="member.memberVoucherMoney>settleList.totalAmount">支付:{{settleList.totalAmount}}</span>
            <span class="iconfont self-x fs-12 danger-color" v-else>代金券不足</span>
          </span>
        </yd-cell-item>
        <yd-cell-item>
          <p slot="right" class="fs-16">
            支付：
            <span class="danger-color" v-if="orderType=='1'&&!$route.query.buynow">￥{{formatPrice(settleList.pointNiceAmount)}}</span>
            <span class="danger-color" v-else-if="orderType=='1'&&$route.query.buynow">￥{{formatPrice(settleList.pointNiceAmount)}}</span>
            <span class="danger-color" v-else-if="orderType=='2'">￥{{formatPrice(settleList.pointNiceAmount||settleList.pos)}}</span>
            <span class="danger-color" v-else-if="orderType=='3'">￥{{formatPrice(settleList.pointNiceAmount||settleList.pos)}}</span>
            <!-- <span class="danger-color" v-else>￥{{formatPrice(total)}}</span> -->
            <template v-else>
              <span class="danger-color fs-16" v-if="settleList.goodsVos[0].honourPrice&&settleList.logist=='0'">￥{{formatPrice(total2+settleList.pos)}}</span>
              <span class="danger-color fs-16" v-else-if="settleList.goodsVos[0].honourPrice&&settleList.logist=='1'">￥{{formatPrice(total2)}}</span>
              <span class="danger-color" v-else>￥{{formatPrice(total)}}</span>
            </template>
          </p>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group v-if="orderType=='1'">
        <yd-cell-item type="radio">
          <span slot="icon" class="iconfont-large self-zhifubao" style="color:#00a0ea"></span>
          <span slot="left">支付宝</span>
          <input slot="right" type="radio" value="7" v-model="payType" />
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group v-else-if="orderType=='2'">
        <yd-cell-item type="radio">
          <span slot="icon" class="iconfont-large self-zhifubao" style="color:#00a0ea"></span>
          <span slot="left">支付宝</span>
          <input slot="right" type="radio" value="8" v-model="payType" />
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group v-else-if="orderType=='3'">
        <yd-cell-item type="radio">
          <span slot="icon" class="iconfont-large self-tiqufuli" style="color:#e7d489"></span>
          <span slot="left">代金券</span>
          <input slot="right" type="radio" value="10" v-model="payType" />
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group title="选择支付方式" v-else>
        <yd-cell-item type="radio">
          <span slot="icon" class="iconfont-large self-zhifubao" style="color:#00a0ea"></span>
          <span slot="left">支付宝支付</span>
          <input slot="right" type="radio" value="2" v-model="payType" />
        </yd-cell-item>
      </yd-cell-group>
      <div style="padding:0 .2rem .2rem;">
        <yd-button size="large" :type="valid ?'danger':'disabled'" @click.native="pay">确认支付</yd-button>
      </div>
    </main>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { addOrder, toAdd } from "../../api/index";
import { mixin, payMixin } from "components/common/mixin";
export default {
  name: "Settle",
  data() {
    return {
      oldBack: mui.back,
      orderType: "0", //0:普通商品 1：积分兑换 2责任消费 3代金券
      remark: "", //备注
      payType: "", //支付方式
      pays: {}
    };
  },
  computed: {
    ...mapState([
      "account",
      "defaultAddress",
      "addressList",
      "settleList",
      "member"
    ]),
    total() {
      return this.settleList.totalAmount + this.settleList.pointNiceAmount;
    },
    total2() {
      let a = 0;
      this.settleList.goodsVos.forEach(item => {
        a +=
          +this.member.merchantType > 1
            ? item.honourPrice * item.goodsNum
            : item.standardPrice * item.goodsNum;
      });
      return a;
    },
    validAddress() {
      return this.defaultAddress || !!this.addressList.length;
    },
    valid() {
      switch (this.orderType) {
        case "1":
          return (
            this.validAddress &&
            this.member.consumptionMoney > this.settleList.totalAmount
          );
          break;
        case "2":
          return (
            this.validAddress &&
            this.member.insuranceMoney > this.settleList.totalAmount
          );
          break;
        case "3":
          return (
            this.validAddress &&
            this.member.memberVoucherMoney > this.settleList.totalAmount
          );
          break;
        default:
          return this.validAddress && true;
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      mui.back = vm.goBack;
    });
  },
  beforeRouteLeave(to, from, next) {
    mui.back = this.oldBack;
    next();
  },
  created() {},
  activated() {
    this.$store.dispatch("getInfo");
    this.$store.dispatch("getFHB");
    this.orderType = this.$route.query.orderType;
    this.$store.dispatch("getAddressList", { source: 0 });
    switch (this.orderType) {
      case "1":
        this.payType = "7";
        break;
      case "2":
        this.payType = "8";
        break;
      case "3":
        this.payType = "10";
        break;
      default:
        this.payType = "2";
        break;
    }
  },
  mixins: [mixin, payMixin],
  methods: {
    goBack(b) {
      if (b == true) {
        this.$router.go(-1);
        return;
      }
      if (!this.$route.query.buynow) {
        this.$dialog.confirm({
          title: "确认离开吗？",
          mes: "购物车相关商品会被删除哦",
          opts: () => {
            this.$router.go(-1);
          }
        });
      } else {
        this.$router.go(-1);
      }
    },
    pay() {
      if (!this.payType) {
        this.$dialog.toast({
          mes: "请选择支付方式",
          timeout: 1000
        });
        return;
      }
      if (this.orderType == 1) {
        //积分换购
        this.placeAnOrder("");
      } else {
        this.placeAnOrder("");
      }
    },
    placeAnOrder(pwd) {
      let vm = this;
      //购物车下单参数
      let cmParams = null;
      let a = [],
        b = [],
        c = [],
        d = [],
        e = [];
      this.settleList.orderAddVos.forEach(item => {
        if (/(,)$/.test(item.goodsAttrIds))
          item.goodsAttrIds = item.goodsAttrIds.slice(
            0,
            item.goodsAttrIds.length - 1
          );
        a.push(item.goodsId);
        b.push(item.goodsAttrStockId);
        c.push(item.goodsAttrIds);
        d.push(item.goodsAttr);
        e.push(item.goodsNum);
      });
      cmParams = {
        goodsId: a.join(","),
        goodsAttrStockId: b.join(","),
        goodsAttrIds: c.join(";"),
        goodsAttr: d.join(","),
        goodsNum: e.join(","),

        payType: this.payType,
        remark: this.remark,
        couponsId: "",
        orderAddressId:
          (this.defaultAddress && this.defaultAddress.id) ||
          this.addressList[0].id,
        payPassword: pwd,
        account: this.account,
        logist: this.settleList.logist,
        token: md5(`gjfengaddOrder${this.payType}`)
      };
      mui.ajax({
        url: addOrder,
        type: "post",
        headers: { "app-version": "v1.0" },
        data: cmParams,
        success(res) {
          let _result = res.result;
          //品牌商城
          if (vm.orderType == 0) {
            // 余额支付
            if (vm.payType == "2") {
              //支付宝
              vm.zfbPay(_result.payString);
            }
          } else if (vm.orderType == 1) {
            //积分换购，积分支付
            if (res.code == 200) {
              vm.payPos(_result.payString, res.msg);
            } else {
              vm.$dialog.alert({
                mes: res.msg
              });
            }
          } else if (vm.orderType == 2) {
            //责任消费
            if (res.code == 200) {
              vm.payPos(_result.payString, res.msg);
            } else {
              vm.$dialog.alert({
                mes: res.msg
              });
            }
          } else if (vm.orderType == 3) {
            //代金券
            if (res.code == 200) {
              vm.payPos(_result.payString, res.msg);
            } else {
              vm.$dialog.alert({
                mes: res.msg
              });
            }
          }
        },
        error(err) {
          vm.$dialog.toast({
            mes: "超时，请稍后重试"
          });
        }
      });
    },
    confirmBox(tips) {
      this.$dialog.confirm({
        mes: tips || "下单成功！",
        opts: [
          {
            txt: "返回购物",
            color: false,
            stay: false,
            callback: () => {
              this.goBack(true);
            }
          },
          {
            txt: "查看订单",
            color: true,
            stay: false,
            callback: () => {
              this.$router.replace({
                name: "MyOrder",
                params: { update: true },
                query: { id: 0 }
              });
            }
          }
        ]
      });
    },
    zfbPay(payParams) {
      let vm = this;
      this.checkService(this.pays["alipay"], function() {
        plus.payment.request(
          vm.pays["alipay"],
          payParams,
          function(result) {
            vm.confirmBox("支付成功！");
          },
          function(e) {
            vm.$dialog.alert({
              mes: "支付失败:" + e.message
            });
          }
        );
      });
    },
    payPos(payParams, successTips) {
      if (this.settleList.pointNiceAmount || this.settleList.pos) {
        this.$dialog.alert({
          mes: "下单成功，去支付现金部分",
          callback: () => {
            this.zfbPay(payParams);
          }
        });
      } else {
        this.$dialog.alert({
          mes: successTips,
          callback: () => {
            this.goBack(true);
          }
        });
      }
    }
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
      overflow: hidden;
    }
    .order-info {
      margin-left: @pd;
      .pd-name {
        .multi-ellipsis(2);
        margin-bottom: 0.12rem;
        color: #333;
        font-size: 0.28rem;
        word-break: break-all;
      }
      p {
        color: @lightgray;
      }
    }
  }
}
.pay-box {
  position: absolute;
  bottom: 9rem;
  left: 0;
  width: 6rem;
  left: 50%;
  margin-left: -3rem;
  background-color: @white;
  z-index: 1503;
  border-radius: 5px;
  .pay-title {
    color: @white;
    border-radius: 5px 5px 0 0;
    .pd-v;
  }
  .pay-price {
    .pd-v;
    border-bottom: 1px solid #f7f7f5;
  }
  .balance-price {
    text-align: left;
    .pd;
  }
}
</style>