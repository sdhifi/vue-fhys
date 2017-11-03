<template>
  <div>
    <header-top title="购物车"></header-top>
    <main class='scroll-content-3'>
      <ul class="cart-list" v-show="cartList.length">
        <li v-for="(item,index) in cartList" :key="index" class="cart-item flex align-center">
          <label :for="'cart-item'+index" class="cart-check flex align-center just-center">
            <input type="checkbox" :checked="item.checked" name="cart-item" :id="'cart-item'+index"  @change="countChange($event,item,index)">
          </label>
          <div class="flex-1">
          <yd-flexbox style="margin-bottom:5px;">
            <img :src="item.goodsId.imgUrl" alt="">
            <yd-flexbox-item style="margin-left:5px;">
              <h3>{{item.goodsId.name}}</h3>
              <p class="attrs">{{item.goodsAttr}}</p>
              <div class="flex just-between">
                <span class="fs-16 danger-color">￥{{item.goodsAttrStockId.price}}</span>
                <yd-spinner v-model="item.goodsNum" :min="1" :max="item.goodsAttrStockId.repertory" v-show="!item.close"></yd-spinner>
                <div v-show="item.close" class="fs-14">
                  数量：
                  <input type="number" readonly v-model="item.goodsNum">
                </div>
              </div>
            </yd-flexbox-item>
          </yd-flexbox>
          <div class="cart-operate flex just-between">
            <p @click="editCart(item,index)" v-show="item.close">
              <span class="iconfont self-bianji"></span>编辑</p>
            <p @click="deleteCart(item,index)" v-show="item.close">
              <span class="iconfont self-delete"></span>删除</p>
            <p @click="updateCart(item,index)" v-show="!item.close">
              <span class="iconfont self-dui"></span>完成</p>
          </div>
          </div>
        </li>
      </ul>
      <section class="hv-cen text-center" v-show="!cartList.length">
        <span class="iconfont self-shopcart" style="font-size:40px;"></span>
        <p>购物车空空如也</p>
        <p>去商城看看...</p>
      </section>
    </main>
    <footer class="fix-footer flex align-center" style="border-top: 1px solid #dfdfdf;" v-show="cartList.length">
      <label for="check-all" class="cart-check flex align-center just-center fs-15">
            <input type="checkbox" :checked="isCheckAll" id="check-all" @change="checkAll">
            全选
          </label>
      <div class="flex-1 total-price">
        <p class="fs-16">合计：
          <span class="danger-color">￥{{totalPrice}}</span>
        </p>
        <p>不含运费</p>
      </div>
      <button class="submit-btn" @click="settleCart" :disabled="!checkList.length">去结算
        <span class="fs-12">({{amount}}件)</span>
      </button>
    </footer>
  </div>
</template>
<script>
import { mapState } from "vuex";
import HeaderTop from "components/header/index";
import { updateCartNum, delCart, actCartInH5 } from "../../api/index";
export default {
  name: "ShoppingCart",
  data() {
    return {
      isCheckAll: true,
      totalPrice: 0
    };
  },
  components: { HeaderTop },
  computed: {
    ...mapState(["account", "cartList"]),
    checkList() {
      return this.cartList.filter((item, index) => {
        return item.checked;
      });
    },
    amount() {
      let num = 0;
      this.checkList.forEach(item => {
        num += item.goodsNum;
      });
      return num;
    }
  },
  created() {},
  activated() {
    this.$store.dispatch("getCartList");
    this.isCheckAll = false;
    this.totalPrice = 0;
  },
  mounted() {},
  methods: {
    countChange(e, item, index) {
      item.checked = !item.checked;
      this.$store.commit("UPDATE_CART_ITEM", { item, index });
      this.isCheckAll = this.checkList.length == this.cartList.length;
      this.calcTotal();
    },
    checkAll() {
      this.isCheckAll = !this.isCheckAll;
      this.cartList.forEach((item, index) => {
        item.checked = this.isCheckAll;
        this.$store.commit("UPDATE_CART_ITEM", { item, index });
      });
      this.calcTotal();
    },
    updateCart(item, index) {
      let vm = this;
      mui.ajax({
        url: updateCartNum,
        type: "post",
        headers: { "app-version": "v1.0" },
        data: {
          id: item.id,
          goodsNum: item.goodsNum,
          account: this.account,
          token: md5(`updateCartNum`)
        },
        success(res) {
          vm.$store.commit("UPDATE_CART_ITEM", { item, index });
          vm.$dialog.toast({
            mes: res.msg
          });
          vm.calcTotal();
        }
      });
      item.close = true;
    },
    editCart(item, index) {
      if (item.goodsId.isCanUserCou == "1") {
        this.$dialog.toast({
          mes: "积分换购商品限购一件"
        });
        return;
      }
      item.close = false;
    },
    deleteCart(item, index) {
      this.$dialog.confirm({
        mes: "确定删除该商品？",
        opts: () => {
          let vm = this;
          mui.ajax({
            url: delCart + `/${item.id}`,
            type: "post",
            headers: { "app-version": "v1.0" },
            data: {
              id: item.id,
              account: this.account,
              token: md5(`delCart`)
            },
            success(res) {
              vm.$store.commit("DELETE_CART_ITEM", index);
              vm.$dialog.toast({
                mes: res.msg,
                timeout:1000
              });
              vm.calcTotal();
              if (!vm.checkList.length) {
                vm.isCheckAll = false;
              }
            }
          });
        }
      });
    },
    calcTotal() {
      if (!this.checkList.length) {
        this.totalPrice = 0;
      } else {
        let a = 0;
        for (let i = 0; i < this.checkList.length; i++) {
          a += this.checkList[i].goodsAttrStockId.price * this.checkList[i].goodsNum;
        }
        this.totalPrice = a;
      }
    },
    settleCart() {
      let vm = this;
      let settleList = [],
        orderType = 0; //0普通商品 1积分换购 2责任消费
      var length = this.checkList.length,
        count0 = 0,
        count1 = 0,
        count2 = 0;
      this.checkList.forEach(item => {
        settleList.push(item.id);
        if (item.goodsId.isCanUserCou == "0") {
          count0++;
        } else if (item.goodsId.isCanUserCou == "1") {
          count1++;
        } else if (item.goodsId.isCanUserCou == "2") {
          count2++;
        }
      });
     
      if ((count0 &&count0 !== length) || (count1 &&count1 !== length) || (count2 &&count2 !== length)) {
        this.$dialog.alert({
          mes: "不同类型商品不能同时结算"
        });
        return;
      }
      if(count0) orderType=0
      else if(count1) orderType=1
      else if(count2) orderType=2
      mui.ajax({
        url: actCartInH5,
        type: "post",
        headers: { "app-version": "v1.0" },
        data: {
          cartIds: settleList.join(","),
          account: this.account,
          token: md5(`actCartInH5${settleList.join(",")}`)
        },
        success(res) {
          let _result = res.result;
          vm.$store.commit('SET_PAY_PASSWORD',_result.gjfMemberInfo.payPassword?true:false);
          vm.$store.commit("RECORD_SETTLE_LIST", _result);
          // vm.$store.commit("RECORD_SETTLE_LIST", res.result);
          vm.$router.push({ name: "SettleBalance", query: { orderType }});
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
@import "../../style/mixin.less";
.cart-item {
  padding: @pd @pd @pd 0;
  margin-bottom: @pd / 2;
  background-color: @white;
  img {
    .wh(1.5rem, 1.5rem);
    border: 1px solid #dfdfdf;
  }
  .attrs {
    color: @lightgray;
  }
  input[type="number"] {
    border: none;
    text-align: right;
    font-size: 14px;
    width: 0.5rem;
  }
  h3 {
    .multi-ellipsis(2);
    font-size: 0.32rem;
    font-weight: normal;
  }
  .cart-operate {
    padding-top: 5px;
    border-top: 1px solid #dfdfdf;
    font-size: 0.3rem;
    p {
      &:first-of-type {
        color: @blue;
      }
      &:nth-of-type(2) {
        color: @red;
      }
      &:last-of-type {
        color: @green;
      }
    }
  }
}

.total-price {
  text-align: right;
  p:last-of-type {
    color: @lightgray;
  }
}

.submit-btn {
  background: #e4393c;
  color: @white;
  height: 1rem;
  line-height: 1rem;
  padding: 0 10px;
  font-size: 0.32rem;
  margin-left: @pd;
  &[disabled] {
    background-color: #ccc;
    color: #f0f0f0;
  }
}
.cart-check {
  padding: @pd;
  position: relative;
  z-index: 5;
  input[type="checkbox"] {
    display: inline-block;
    .wh(25px,25px);
    background-image: url(../../assets/1.png);
    background-size: contain;
    border: none;
    outline: none;
    appearance: none;
    &:checked {
      background-image: url(../../assets/2.png);
    }
  }
}
</style>