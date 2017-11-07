<template>
  <div>
    <header-top title="授信记录列表"></header-top>
    <main class='scroll-content-2'>
      <yd-infinitescroll :callback="getInfo" ref="historyList">
          <ul slot="list">
            <li class="item" v-for="(item,index) in info" :key="index">
              <div class="flex align-center">
                <span class="iconfont-large self-weixinzhifu" style="color:#25d025;" v-if="item.payType=='1'"></span>
                <span class="iconfont-large self-zhifubao" style="color:#00a0ea;" v-if="item.payType=='2'"></span>
                <span class="iconfont-large self-yinlianzhifu1" style="color:#077d8d;" v-if="item.payType=='3'"></span>
                <span class="time">{{formatTime(item.addTime)}}</span>
              </div>
              <div class="flex just-between align-center">
                <span>充值<span class="money">{{item.tradeMoney}}</span></span>
                <span class="status status-0" v-if="item.tradeStatus==0">待支付</span>
                <span class="status status-1" v-if="item.tradeStatus==1">支付成功</span>
                <span class="status status-2" v-if="item.tradeStatus==2">支付失败</span>
              </div>
            </li>
          </ul>
        </yd-infinitescroll>
    </main>
  </div>
</template>
<script>
import { mapState } from "vuex";
import HeaderTop from "components/header/index";
import { goAllShouXin } from "../../api/index";
import { mixin } from "components/common/mixin";
export default {
  name: "ShouxinList",
  data() {
    return {
      noData: false,
      info: [],
      pageNo: 1
    };
  },
  components: { HeaderTop },
  computed: {
    ...mapState(["account"])
  },
  created() {},
  mixins: [mixin],
  activated() {
    this.noData = false;
    this.info = [];
    this.pageNo = 1;
    this.getInfo();
  },
  methods: {
    getInfo() {
      let vm = this;
      if (!this.noData) {
        mui.ajax({
          url: goAllShouXin,
          type: "post",
          headers: { "app-version": "v1.0" },
          data: {
            account: this.account,
            pageNo: this.pageNo,
            pageSize: 10,
            token: md5(`goAllShouXin}`)
          },
          success(res) {
            let _list = res.result.resultList;
            vm.info = [...vm.info, ..._list];
            if (_list.length < 10) {
              vm.noData = true;
              vm.$refs.historyList.$emit("ydui.infinitescroll.loadedDone");
              return;
            }
            vm.$refs.historyList.$emit("ydui.infinitescroll.finishLoad");
            vm.pageNo++;
          }
        });
      }
    }
  }
};
</script>
<style lang='less' scoped>
@import "../../style/mixin.less";
.item {
  background-color: @white;
  margin-top: @pd;
  .pd;
  .time {
    font-size: 15px;
    margin-left: @pd;
  }
  .money {
    color: @red;
    font-size: 16px;
  }
  .status {
    &.status-0 {
      color: @blue;
    }
    &.status-1 {
      color: @green;
    }
    &.status-2 {
      color: @lightgray;
    }
  }
}
</style>