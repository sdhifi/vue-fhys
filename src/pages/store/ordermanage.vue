<template>
  <div>
    <header-top title="订单管理"></header-top>
    <yd-tab :change="changeStatus" style="position:fixed;left:0;right:0;z-index:1000;background-color:#fff;">
      <yd-tab-panel label="全部订单" tabkey="7">
      </yd-tab-panel>
      <yd-tab-panel label="待支付" tabkey="0">
      </yd-tab-panel>
      <yd-tab-panel label="交易成功" tabkey="3">
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
              <p>应付金额：
                <span class="danger-color">￥{{item.goodsTotalAmount}}</span>
              </p>
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
import { findO2oOrderByPage } from '../../api/index'
export default {
  name: 'OrderManage',
  data() {
    return {
      pageNo: 1,
      status: '',
      orderList: []
    }
  },
  components: { HeaderTop },
  computed: {
    ...mapState(['storeInfo'])
  },
  created() {

  },
  activated() {

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
        url: findO2oOrderByPage,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          status: this.status,
          storeId: this.storeInfo.id,
          pageNo: this.pageNo,
          pageSize: 10,
          beginTime: '',
          endTime: '',
          token: md5(`findO2oOrderByPage${this.storeInfo.id}`)
        },
        success(res) {
          let _list = res.result.resultVo;
          vm.orderList = [...vm.orderList, ..._list];
          if (_list.length < 10) {
            vm.$refs.orderlist.$emit('ydui.infinitescroll.loadedDone');
            return;
          }
          vm.$refs.orderlist.$emit('ydui.infinitescroll.finishLoad');
          vm.pageNo++;
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
</style>