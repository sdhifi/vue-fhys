<template>
  <div>
    <header-top title="凤凰宝交易记录"></header-top>
    <main class='scroll-content-2'>
      <yd-infinitescroll :callback="getInfo" ref="historyList">
        <ul slot="list">
          <li class="item" v-for="(item,index) in info" :key="index">
            <div class="flex just-between">
              <span>{{formatTime(item.addTime,true)}}</span>
              <span v-if="item.tradeType=='3'" class="status-1">转入</span>
              <span v-else-if="item.tradeType=='2'" class="status-1">提现</span>
              <span v-else class="status-0">转出</span>
            </div>
            <div class="flex just-between" v-if="item.tradeType!='3'">
              <span>转移对象</span>
              <p>
                <span>{{item.transferMemberName}}</span>
                <span>{{item.transferMemberMobile}}</span>
              </p>
            </div>
            <div class="flex just-between">
              <span>转移数额</span>
              <span>{{item.memberTreasureTradeMoney}}</span>
            </div>
            <div class="flex just-between">
              <span>转移前</span>
              <span>{{item.memberTreasureMoneyBf}}</span>
            </div>
            <div class="flex just-between">
              <span>转移后</span>
              <span class="danger-color">{{item.memberTreasureMoneyAf}}</span>
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
import { toFhTreasureTradeHistory } from "../../api/index";
import { mixin } from "components/common/mixin";
export default {
  name: "TreasureList",
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
  created() {
    this.getInfo();
  },
  mixins: [mixin],
  methods: {
    getInfo() {
      let vm = this;
      if (!this.noData) {
        mui.ajax({
          url: toFhTreasureTradeHistory,
          type: "post",
          headers: { "app-version": "v1.0" },
          data: {
            account: this.account,
            pageNo: this.pageNo,
            pageSize: 10,
            token: md5(`gjfengtoFhTreasureTradeHistory${this.account}`)
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
  .pd;
  margin-bottom: @pd;
  font-size: 0.28rem;
  .status-0 {
    color: @blue;
  }
  .status-1 {
    color: @green;
  }
}
</style>