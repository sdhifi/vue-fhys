<template>
  <div>
    <header-top title="合并用户信息"></header-top>
    <main class='scroll-content-2'>
      <p class="danger-color fs-14" style="background-color:#fff;padding:.2rem;">合并过程中，积分、余额、累计消费、责任消费、分红权，系统扣除10%作为服务费</p>
      <yd-cell-group title="合并信息">
        <yd-cell-item>
          <span slot="left"> 合并到：</span>
          <yd-input slot="right" v-model="mobile" required placeholder="请输入会员手机号" type="tel" regex="mobile" @input.native="findMember"></yd-input>
        </yd-cell-item>
        <yd-cell-item v-if="mobileName">
          <span slot="left">会员名称：</span>
          <yd-input slot="right" readonly v-model="mobileName" :show-clear-icon="false"></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <div class="btn-container flex just-around" style="padding:0 .2rem;">
        <yd-button type="warning" @click.native="goMergeHistory" style="font-size:15px;"> 更 多 记 录
          <span class="iconfont self-right"></span>
        </yd-button>
        <yd-button :type="valid?'primary':'disabled'" @click.native="showPassword=true" style="font-size:15px;"> 确 认 合 并
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
import { memberPointTransfer } from "../../api/index";
import { findMemberByMobile } from "components/common/mixin";
export default {
  name: "Merge",
  data() {
    return {
      mobile: "",
      mobileName: "",
      showPassword: false
    };
  },
  components: { HeaderTop },
  computed: {
    ...mapState(["account"]),
    valid() {
      return /0?(13|14|15|18)[0-9]{9}/.test(this.mobile);
    }
  },
  created() {},
  mixins: [findMemberByMobile],
  activated() {},
  methods: {
    checkPayPwd(val) {
      this.$dialog.loading.open("验证支付密码");
      this.merge(val);
    },
    merge(val) {
      mui.ajax({
        url: memberPointTransfer,
        type: "post",
        headers: { "app-version": "v1.0" },
        data: {
          transferMoney: '',
          transferMemberMobile: this.mobile,
          payPassword: val,
          type: 3,
          token: md5(`memberPointTransfer`)
        },
        success(res) {
          vm.$dialog.loading.close();
          if (res.code == 200) {
            vm.$dialog.toast({
              mes: res.msg
            });
          } else if (res.code == 401) {
            vm.$dialog.confirm({
              title: "忘记密码？",
              mes: `${res.msg}，前往设置`,
              opts: () => {
                vm.$router.push({ name: "PwdManage" });
              }
            });
            vm.$refs.keyboard.$emit(
              "ydui.keyboard.error",
              "对不起，您的支付密码不正确，请重新输入。"
            );
          } else {
            vm.$dialog.alert({
              mes: res.msg
            });
          }
        }
      });
    },
    goMergeHistory() {
      this.$router.push({ name: "TransferHistory" ,query:{type:1}});
    }
  }
};
</script>
