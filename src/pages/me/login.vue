<template>
  <div>
    <header-top></header-top>
    <div class="login-form">
      <yd-cell-group>
        <yd-cell-item>
          <span class="iconfont self-mobile" slot="icon"></span>
          <yd-input :debug="true" v-model="mobile" placeholder="请输入手机号码" required regex="mobile" slot="right"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span class="iconfont self-code" slot="icon"></span>
          <input type="tel" slot="right" placeholder="请输入验证码" v-model="code" maxlength="6" @input="formatDigit($event)">
          <yd-sendcode slot="right" v-model="startSend" @click.native="sendCode" :type="rightMobile?'warning':'disabled'"></yd-sendcode>
        </yd-cell-item>
        <yd-cell-item>
          <span class="iconfont self-lock" slot="icon"></span>
          <yd-input slot="right" type='password' v-model="password" :max='16' :min='6' placeholder='请输入6-16位数字或字母的密码'></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <yd-checkbox v-model="checkProtocol" :size="18">{{checkProtocol?'同意':'不同意'}}</yd-checkbox>
      <router-link to="/me/regpro" class="protocol">《凤凰云商o2o用户注册协议》</router-link>
      <yd-button size="large" type="primary" :disabled="!valid" @click.native="login">完成</yd-button>
    </div>

  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import {sendcode} from '../../api/index'
export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      code: '',
      correctCode: '',
      password: '',
      startSend: false,
      checkProtocol: true
    }
  },
  components: { HeaderTop },
  computed: {
    rightMobile() {
      return /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/gi.test(this.mobile)
    },
    rightCode() {
      return /^\d{6}$/gi.test(this.code) && (this.code == this.correctCode)
    },
    valid() {
      return this.rightMobile && this.rightCode && this.checkProtocol
    }
  },
  methods: {
    formatDigit(event){
      this.code= event.target.value.replace(/\D/g,'');
    },
    sendCode() {
      let vm =this;
      this.code = '';
      this.correctCode = '';
      this.$dialog.loading.open('发送中...');
      setTimeout(() => {
        this.startSend = true;
        this.$dialog.loading.close();

        this.$dialog.toast({
          mes: '已发送',
          icon: 'success',
          timeout: 1500
        });
      }, 1000);
      mui.ajax({
        url:sendcode,
        type:'post',
        headers:{"app-version":"v1.0"},
        data:{
          mobile:this.mobile,
          token:md5(`send${this.mobile}`)
        },
        success(res){
          vm.correctCode = res.content;
        }
      })
    },
    login(){
      this.$store.commit('SET_ACCOUNT',this.mobile);
      localStorage.setItem('account',this.mobile);
      this.$router.push({path:'/me/index'})
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
.login-form {
  padding: .3rem;
  .protocol{
    color: #10aeff;
  }
}

</style>