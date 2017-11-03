<template>
  <div>
    <header-top title="我的订单"></header-top>
     <tab :line-width="2" active-color='#ff5350' v-model="index" custom-bar-width="60px">
      <tab-item  v-for="(item, index) in menu" :key="index" @on-item-click="toggleItem(index)">{{item.value}}</tab-item>
    </tab>
    <main class='scroll-content-1'>
      <div v-show="index==0">
        <yd-infinitescroll :callback="getMyOrder" ref="orderlist7">
          <ul slot="list">
            <order-item v-for="item in list7" :key="item.orderSn" :name="item.storeName" :sn="item.orderSn" :goods="item.goods" :total="item.goodsTotalAmount" :status="item.orderStatus"></order-item>
          </ul>
        </yd-infinitescroll>
      </div>
      <div v-show="index==1">
        <yd-infinitescroll :callback="getMyOrder" ref="orderlist0">
          <ul slot="list">
            <order-item v-for="item in list0" :key="item.orderSn" :name="item.storeName" :sn="item.orderSn" :goods="item.goods" :total="item.goodsTotalAmount" :status="item.orderStatus"></order-item>
          </ul>
        </yd-infinitescroll>
      </div>
      <div v-show="index==2">
        <yd-infinitescroll :callback="getMyOrder" ref="orderlist1">
          <ul slot="list">
            <order-item v-for="item in list1" :key="item.orderSn" :name="item.storeName" :sn="item.orderSn" :goods="item.goods" :total="item.goodsTotalAmount" :status="item.orderStatus"></order-item>
          </ul>
        </yd-infinitescroll>
      </div>
      <div v-show="index==3">
        <yd-infinitescroll :callback="getMyOrder" ref="orderlist2">
          <ul slot="list">
            <order-item v-for="item in list2" :key="item.orderSn" :name="item.storeName" :sn="item.orderSn" :goods="item.goods" :total="item.goodsTotalAmount" :status="item.orderStatus"></order-item>
          </ul>
        </yd-infinitescroll>
      </div>
      <div v-show="index==4">
        <yd-infinitescroll :callback="getMyOrder" ref="orderlist3">
          <ul slot="list">
           <order-item v-for="item in list3" :key="item.orderSn" :name="item.storeName" :sn="item.orderSn" :goods="item.goods" :total="item.goodsTotalAmount" :status="item.orderStatus"></order-item>
          </ul>
        </yd-infinitescroll>
      </div>
    </main>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import HeaderTop from 'components/header/index'
import OrderItem from 'components/common/OrderItem'
import { Tab, TabItem } from "vux"
import { getOrder } from '../../api/index'
export default {
  name: 'MyOrder',
  data() {
    return {
      menu: [
        { key: "7", value: "全部订单" },
        { key: "0", value: "待支付" },
        { key: "1", value: "待发货" },
        { key: "2", value: "待收货" },
        { key: "3", value: "交易完成" }
      ],
      index: 0, //控制tab
      orderType: '7', //控制订单类型
      noData0: false,
      noData1: false,
      noData2: false,
      noData3: false,
      noData7: false,
      list0: [],
      list1: [],
      list2: [],
      list3: [],
      list7: [],
      pageNo0: 1,
      pageNo1: 1,
      pageNo2: 1,
      pageNo3: 1,
      pageNo7: 1
    }
  },
  components: { HeaderTop, OrderItem, Tab, TabItem  },
  computed: {
    ...mapState(['account'])
  },
  created() {

  },
  activated() {
    this.reset();
    this.index = +this.$route.query.id;
    this.toggleItem(this.index);
  },
  methods: {
    reset(){
      this.orderType= '7';
      this.noData0= false;
      this.noData3= false;
      this.noData7= false;
      this.list0= [];
      this.list3= [];
      this.list7= [];
      this.pageNo0= 1;
      this.pageNo3= 1;
      this.pageNo7= 1;
    },
    toggleItem(index) {
      this.orderType = this.menu[index].key;
      if (!this[`noData${this.orderType}`]) {
        this.getMyOrder();
      }
    },
    getMyOrder() {
      let vm = this;
      mui.ajax({
        url: getOrder,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          pageNo: this[`pageNo${this.orderType}`],
          pageSize: 10,
          account: this.account,
          status: this.orderType,
          token: md5(`getOrder${this.account}${this.orderType}`)
        },
        success(res) {
          if (res.code == 200) {
            let _list = res.result;
            vm[`list${vm.orderType}`] = [...vm[`list${vm.orderType}`],..._list];
            if (_list.length < 10) {
              vm[`noData${vm.orderType}`] = true;
              vm.$refs[`orderlist${vm.orderType}`].$emit("ydui.infinitescroll.loadedDone");
              return;
            }
            vm.$refs[`orderlist${vm.orderType}`].$emit("ydui.infinitescroll.finishLoad");
            vm[`pageNo${vm.orderType}`]++;
          } else {
            vm.$dialog.toast({
              mes: res.msg || "网络异常,请重试"
            });
            return;
          }
        }
      })
      // axios.get('/static/json/order.json').then(res=>{
      //   this.list7=res.data.result;
      // })
    }
  }
}
</script>
