<template>
  <div>
    <header-top title="我的订单"></header-top>
    <yd-tab :change="changeStatus" style="position:fixed;left:0;right:0;z-index:1000;background-color:#fff;">
        <yd-tab-panel label="全部订单" tabkey="7" :active="$route.query.id==7">
        </yd-tab-panel>
        <yd-tab-panel label="待支付" tabkey="0" :active="$route.query.id==0">
        </yd-tab-panel>
        <yd-tab-panel label="待发货" tabkey="1" :active="$route.query.id==1">
        </yd-tab-panel>
        <yd-tab-panel label="待收货" tabkey="2" :active="$route.query.id==2">
        </yd-tab-panel>
        <yd-tab-panel label="交易完成" tabkey="3" :active="$route.query.id==3">
        </yd-tab-panel>
      </yd-tab>
    <main class='scroll-content-1'>
      
      <yd-infinitescroll :callback="getMyOrder" ref="orderlist">
        <ul slot="list">
          <li class="order-item px-1" v-for="item in orderList" :key="item.orderSn">
            <h2 class="px-1">{{item.storeName}}</h2>
            <div class="good-list">
            <p class="order-id">订单编号：{{item.orderSn}}</p>
              <div class="good-item flex px-1" v-for="good in item.goods" :key="good.goodsId">
                <img :src="good.goodsImg" :alt="good.goodsName">
                <div class="good-info">
                  <h3 class="good-title">{{good.goodsName}}</h3>
                  <div class="good-price">
                    <span>数量：{{good.goodNum}}</span>
                    <span>￥{{good.goodsAmount}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="order-operate flex just-between align-center">
              <p>应付金额：<span class="danger-color">￥{{item.goodsTotalAmount}}</span></p>
              <yd-button type="danger" v-if="item.orderStatus=='0'">付&emsp;款</yd-button>
              <yd-button type="disabled" disabled v-if="item.orderStatus=='3'">已收货</yd-button>
              <yd-button type="disabled" disabled v-if="item.orderStatus=='6'">已退款</yd-button>
            </div>
          </li>
        </ul>
        <p slot="doneTip">
          <span class="iconfont self-nodata danger-color" style="margin-right:5px;"></span>没有数据啦
        </p>
      </yd-infinitescroll>
    </main>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import HeaderTop from 'components/header/index'
import { getOrder } from '../../api/index'
export default {
  name: 'MyOrder',
  data() {
    return {
      pageNo: 1,
      status: '',
      orderList: []
    }
  },
  components: { HeaderTop },
  computed: {
    ...mapState(['account'])
  },
  created() {

  },
  activated() {
    this.status = this.$route.query.id;
    // this.getMyOrder();
  },
  methods: {
    changeStatus(label, tabkey) {
      this.status = tabkey;
      this.pageNo = 1;
      this.orderList = [];
      this.getMyOrder();
    },
    getMyOrder() {
      let vm = this;
      mui.ajax({
        url: getOrder,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          pageNo: this.pageNo,
          pageSize: 10,
          account: this.account,
          status: this.status,
          token: md5(`getOrder${this.account}${this.status}`)
        },
        success(res) {
          let _list = res.result;
          vm.orderList = [...vm.orderList,..._list];
          if(_list.length<10){
            vm.$refs.orderlist.$emit('ydui.infinitescroll.loadedDone');
            return;
          }
          vm.$refs.orderlist.$emit('ydui.infinitescroll.finishLoad');
          vm.pageNo++;
        }
      })
      // axios.get('/static/service/order.json').then(res => {
      //   let _list = res.data.result;
      //   this.orderList = [...this.orderList, ..._list];
      //   if (_list.length < 10) {
      //     this.$refs.orderlist.$emit('ydui.infinitescroll.loadedDone');
      //     return;
      //   }
      //   this.$refs.orderlist.$emit('ydui.infinitescroll.finishLoad');

      // })
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
.order-item{
  margin-top: @pd;
  .pd;
  background-color: @white;
  h2,.order-id{
    .pd-v;
  }
  .good-list{
   .good-item{
     padding-bottom: .1rem;
     margin-bottom: .1rem;
     img{
       .wh(1.5rem,1.5rem);
     }
     .good-info{
       flex: 1;
       display: flex;
       flex-direction: column;
       justify-content: space-between;
       margin-left: @pd * 2;
       .good-title{
         .ellipsis-2;
         font-weight: normal;
       }
       .good-price{
         display: flex;
         justify-content: space-between;
         span:last-child{
           color: @red;
           font-size: 14px;
         }
       }
     }
   } 
  }
}
</style>