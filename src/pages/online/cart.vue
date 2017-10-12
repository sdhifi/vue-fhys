<template>
  <div>
    <header-top title="购物车"></header-top>
    <main class='scroll-content-3'>
      <yd-checklist v-model="checkList" :label="false" ref="checklistDemo" :callback="change" v-show="cartList.length">
        <yd-checklist-item :val="item.id" v-for="(item,index) in cartList" :key="index" class="cart-item">
          <yd-flexbox style="align-items:flex-start;">
            <img :src="item.goodsId.imgUrl" alt="">
            <yd-flexbox-item style="margin-left:5px;">
              <h3>{{item.goodsId.name}}</h3>
              <p class="attrs">{{item.goodsAttr}}</p>
              <div class="flex just-between">
                <span class="fs-14 danger-color ">￥{{item.goodsId.price}}</span>
                <yd-spinner v-model="item.goodsNum" :min="1" :max="item.goodsAttrStockId.repertory" v-show="!item.close"></yd-spinner>
                <div v-show="item.close">
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
        </yd-checklist-item>
      </yd-checklist>
      <section class="hv-cen text-center" v-show="!cartList.length">
        <span class="iconfont self-shopcart" style="font-size:40px;"></span>
        <p>购物车空空如也</p>
        <p>去商城看看...</p>
      </section>
    </main>
    <footer class="fix-footer flex align-center" style="border-top: 1px solid #dfdfdf;" v-show="cartList.length">
      <div style="padding-left:12px;">
        <yd-checkbox v-model="isCheckAll" shape="circle" @click.native="checkAll">全选</yd-checkbox>
      </div>
      <div class="flex-1 total-price">
        <p class="danger-color">合计：￥
          <span>{{totalPrice}}</span>
        </p>
        <p>不含运费</p>
      </div>
      <button class="submit-btn" @click="actCart" :disabled="!checkList.length">结算
        <span>({{checkList.length}})</span>
      </button>
    </footer>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import HeaderTop from 'components/header/index'
import { updateCartNum, delCart } from '../../api/index'
export default {
  name: 'ShoppingCart',
  data() {
    return {
      checkList: [],
      isCheckAll: false,
      totalPrice: 0
    }
  },
  components: { HeaderTop },
  computed: {
    ...mapState(['account', 'cartList'])
  },
  created() {

  },
  activated() {
    this.$store.dispatch('getCartList')
  },
  mounted(){

  },
  methods: {
    change(value, isCheckAll) {
      this.isCheckAll = isCheckAll;
      this.calcTotal();
    },
    checkAll() {
      this.isCheckAll = !this.isCheckAll;
      this.$refs.checklistDemo.$emit('ydui.checklist.checkall', this.isCheckAll);
      this.calcTotal();
    },
    updateCart(item, index) {
      let vm = this;
      mui.ajax({
        url: updateCartNum,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          id: item.id,
          goodsNum: item.goodsNum,
          account: this.account,
          token: md5(`updateCartNum`)
        },
        success(res) {
          vm.$store.commit('UPDATE_CART_NUM', { item, index });
          vm.$dialog.toast({
            mes: res.msg
          });
          vm.calcTotal();
        }
      })
      item.close = true;
    },
    editCart(item, index) {
      item.close = false;
    },
    deleteCart(item, index) {
      this.$dialog.confirm({
        mes: '确定删除该商品？',
        opts: () => {
          let vm = this;
          mui.ajax({
            url: delCart + `/${item.id}`,
            type: 'post',
            headers: { 'app-version': 'v1.0' },
            data: {
              id: item.id,
              account: this.account,
              token: md5(`delCart`)
            },
            success(res) {
              vm.$store.commit('DELETE_CART_ITEM', index);
              vm.$dialog.toast({
                mes: res.msg
              })
              vm.calcTotal();
              vm.checkList.splice(vm.checkList.indexOf(item.id),1);
              if(!vm.checkList.length){
                vm.checkAll=false;
              }
            }
          })
        }
      })
    },
    calcTotal() {
      if (!this.checkList.length) {
        this.totalPrice = 0;
      }
      else {
        let a = 0;
        for (let i = 0; i < this.checkList.length; i++) {
          for (let j = 0; j < this.cartList.length; j++) {
            if (this.checkList[i] == this.cartList[j].id) {
              a += this.cartList[j].goodsId.price * this.cartList[j].goodsNum;
            }
          }
        }
        this.totalPrice = a;
      }

    },
    actCart() {

    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
.cart-item {
  padding: @pd *2 0;
  img {
    .wh(1rem, 1rem);
    border: 1px solid #dfdfdf;
  }
  .attrs {
    color: @lightgray;
  }
  input[type=number] {
    border: none;
    text-align: right;
    font-size: 14px;
    width: .5rem;
  }
  .cart-operate {
    margin-top: 5px;
    border-top: 1px solid #dfdfdf;
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
  background: #4cd864;
  color: @white;
  height: 1rem;
  line-height: 1rem;
  padding: 0 10px;
  font-size: 14px;
  margin-left: @pd;
}
</style>