<template>
  <div>
    <header-top title="积分转移"></header-top>
    <main class='scroll-content-2'>
      <yd-cell-group title="转移信息">
        <yd-cell-item>
          <span slot="left">转移数额：</span>
          <yd-input slot="right" v-model="money" type="tel" placeholder="输入转移数额"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">转移会员：</span>
          <yd-input slot="right" v-model="mobile" required placeholder="请输入会员手机号" type="tel" regex="mobile" @input.native="findMember"></yd-input>
        </yd-cell-item>
        <yd-cell-item v-if="mobileName">
          <span slot="left">会员名称：</span>
          <yd-input slot="right" readonly v-model="mobileName" :show-clear-icon="false"></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group title="转移类型(转移扣除10%手续费)">
        <yd-cell-item>
          <span slot="left">分红权</span>
          <span slot="right" class="danger-color">0.00000</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">余额</span>
          <span slot="right" class="danger-color">0.000</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">积分</span>
          <span slot="right" class="danger-color">0.0</span>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group title="转移方式" v-show="money>0">
        <yd-cell-item type="radio">
          <span slot="icon" class="iconfont-large self-edu danger-color"></span>
          <span slot="left">分红权</span>
          <input slot="right" type="radio" value="4" v-model="payType" />
        </yd-cell-item>
        <yd-cell-item type="radio">
          <span slot="icon" class="iconfont-large self-wallet" style="color:#f9a340;"></span>
          <span slot="left">余额 </span>
          <input slot="right" type="radio" value="5" v-model="payType" />
        </yd-cell-item>
        <yd-cell-item type="radio">
          <span slot="icon" class="iconfont-large self-jifen" style="color:#077d8d;"></span>
          <span slot="left">积分</span>
          <input slot="right" type="radio" value="2" v-model="payType" />
        </yd-cell-item>
      </yd-cell-group>
      <div class="btn-container flex just-around" style="padding:0 .2rem;">
        <yd-button type="warning" @click.native="goTransferHistory" style="font-size:15px;"> 更 多 记 录
          <span class="iconfont self-right"></span>
        </yd-button>
        <yd-button :type="valid?'primary':'disabled'" @click.native="showPassword=true" style="font-size:15px;"> 确 认 转 移
          <span class="iconfont self-dui"></span>
        </yd-button>
      </div>
    </main>
    <yd-keyboard v-model="showPassword" :callback="checkPayPwd" ref="keyboard" title="凤凰云商安全键盘" input-text="请输入支付密码"></yd-keyboard>
  </div>
</template>
<script>
import { mapState } from "vuex";
import HeaderTop from "components/header/index";
import { findMemberByMoblie } from "../../api/index";
import { findMemberByMobile } from "components/common/mixin";
export default {
  name: "Transfer",
  data() {
    return {
      money: "",
      mobile: "",
      mobileName: "",
      payType: "",
      showPassword: false
    };
  },
  components: { HeaderTop },
  computed: {
    ...mapState(["account", "member"]),
    valid() {
      return (
        /^(([1-9]\d*)|([0-9]+\.[0-9]{1,2}))$/.test(this.money) &&
        /0?(13|14|15|18)[0-9]{9}/.test(this.mobile) &&
        !!this.payType
      );
    }
  },
  created() {},
  mixins: [findMemberByMobile],
  activated() {},
  methods: {
    checkPayPwd(val) {
      this.$dialog.loading.open("验证支付密码");
      this.save(val);
    },
    save(val) {},
    goTransferHistory() {
      this.$router.push({ name: "TransferHistory" });
    }
  }
};
</script>
