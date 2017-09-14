<template>
  <div>
    <header-top title="我的订单"></header-top>
    <main class='scroll-content-2'>
      <yd-tab :change="changeStatus">
        <yd-tab-panel label="全部订单" tabkey="7" :active="$route.query.id==7">
          <div v-if="orderList.length">有数据</div>
          <div v-else class="empty-order text-center">
            <div><span class="iconfont self-noorder"></span></div>
            <p>没有数据</p>
          </div>
        </yd-tab-panel>
        <yd-tab-panel label="待支付" tabkey="0" :active="$route.query.id==0">
          <div v-if="orderList.length">有数据</div>
          <div v-else class="empty-order text-center">
            <div><span class="iconfont self-noorder"></span></div>
            <p>没有数据</p>
          </div>
        </yd-tab-panel>
        <yd-tab-panel label="待发货" tabkey="1" :active="$route.query.id==1">
          <div v-if="orderList.length">有数据</div>
          <div v-else class="empty-order text-center">
            <div><span class="iconfont self-noorder"></span></div>
            <p>没有数据</p>
          </div>
        </yd-tab-panel>
        <yd-tab-panel label="待收货" tabkey="2" :active="$route.query.id==2">
          <div v-if="orderList.length">有数据</div>
          <div v-else class="empty-order text-center">
            <div><span class="iconfont self-noorder"></span></div>
            <p>没有数据</p>
          </div>
        </yd-tab-panel>
        <yd-tab-panel label="交易完成" tabkey="3" :active="$route.query.id==3">
          <div v-if="orderList.length">有数据</div>
          <div v-else class="empty-data">
            <span class="iconfont self-noorder"></span>
            <p>没有数据</p>
          </div>
        </yd-tab-panel>
      </yd-tab>
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
    changeStatus(label,tabkey){
     this.status = tabkey;
     this.pageNo=1;
     this.orderList=[];
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
          status:this.status,
          token:md5(`getOrder${this.account}${this.status}`)
        },
        success(res) {
          vm.orderList = res.result;
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
.empty-order{
  padding: 65% 0 66%;
  span{
    font-size: 1rem;
    color: #333;
  }
  p{
    margin-top: @pd;
  }
}
</style>