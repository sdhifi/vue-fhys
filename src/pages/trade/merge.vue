<template>
  <div>
    <header-top title="合并用户信息"></header-top>
    <main class='scroll-content-2'>
      <p class="danger-color fs-14" style="background-color:#fff;padding:.2rem;">合并过程中，积分、余额、累计消费、责任消费、分红权，系统扣除10%作为服务费</p>
      <yd-cell-group title="合并信息">
        <yd-cell-item>
          <span slot="left"> 合并到：</span>
          <yd-input slot="right" v-model="mobile" required placeholder="请输入会员手机号" type="tel" regex="mobile" @change.native="findMember"></yd-input>
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
import {findMemberByMoblie} from "../../api/index";
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
    ...mapState(['account']),
    valid() {
      return (
        /0?(13|14|15|18)[0-9]{9}/.test(this.mobile)
      );
    }
  },
  created() {},
  activated() {},
  methods: {
    findMember() {
      let vm = this;
      mui.ajax({
        url: findMemberByMoblie,
        type: "post",
        headers: { "app-version": "v1.0" },
        data: {
          account: this.account,
          mobile: this.mobile,
          token: md5(`findMemberByMoblie${this.mobile}`)
        },
        success(res) {
          if (res.result) {
            vm.mobileName = res.result.name || res.result.nickName;
          } else {
            vm.mobileName = "用户不存在";
          }
        }
      });
    },
    checkPayPwd(val) {
      this.$dialog.loading.open("验证支付密码");
      this.merge(val);
    },
    merge(val) {},
    goMergeHistory(){
      this.$router.push({name:"MergeHistory"})
    }
  }
};
</script>
