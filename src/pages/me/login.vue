<template>
  <div>
    <header-top></header-top>
    <div class="page-container">
      <yd-cell-group>
        <yd-cell-item type="div">
          <h3 slot="left">{{loginWay?'没有账号，注册':'已有账号，登录'}}</h3>
          <yd-switch slot="right" v-model="loginWay"></yd-switch>
        </yd-cell-item>
        <yd-cell-item>
          <span class="iconfont self-mobile" slot="icon"></span>
          <yd-input :debug="true" v-model="mobile" placeholder="请输入手机号码" required regex="mobile" slot="right"></yd-input>
        </yd-cell-item>
        <yd-cell-item v-if="loginWay">
          <span class="iconfont self-code" slot="icon"></span>
          <input type="tel" slot="right" placeholder="请输入验证码" v-model="code" maxlength="6" @input="formatDigit($event)">
          <yd-sendcode slot="right" v-model="startSend" @click.native="sendCode" :type="rightMobile?'warning':'disabled'"></yd-sendcode>
        </yd-cell-item>
        <yd-cell-item>
          <span class="iconfont self-lock" slot="icon"></span>
          <yd-input slot="right" type='password' v-model="password" required :max='16' :min='6' placeholder='请输入6-16位数字或字母的密码' regex="^[0-9a-zA-Z]{6,16}$"></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <div v-if="loginWay">
        <yd-checkbox v-model="checkProtocol" :size="18">{{checkProtocol?'同意':'不同意'}}</yd-checkbox>
        <router-link to="/me/regpro" class="protocol">《凤凰云商o2o用户注册协议》</router-link>
      </div>
      <yd-button size="large" type="primary" :disabled="!validRegister" @click.native="register" v-if="loginWay">注册</yd-button>
      <yd-button size="large" type="primary" :disabled="!validLogin" @click.native="login" v-else>登录</yd-button>
      <router-link to="/me/forgetpwd" v-if="!loginWay" class="forget-pwd">忘记密码</router-link>
    </div>

  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import { sendcode, register, login } from '../../api/index'
import {setStore} from 'components/common/mixin'
export default {
  name: 'Login',
  data() {
    return {
      loginWay: true,//judge login or register,default way is register
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
    rightPwd() {
      return /[0-9a-zA-Z]{6,16}/.test(this.password)
    },
    validRegister() {
      return this.rightMobile && this.rightCode && this.rightPwd && this.checkProtocol
    },
    validLogin() {
      return this.rightMobile && this.rightPwd;
    }
  },
  activated(){
    this.password = '';
  },
  methods: {
    formatDigit(event) {
      this.code = event.target.value.replace(/\D/g, '');
    },
    sendCode() {
      let vm = this;
      this.code = '';
      this.correctCode = '';
      this.$dialog.loading.open('发送中...');
      mui.ajax({
        url: sendcode,
        type: 'post',
        headers: { "app-version": "v1.0" },
        data: {
          mobile: this.mobile,
          token: md5(`send${this.mobile}`)
        },
        success(res) {
          vm.correctCode = res.content;
        }
      })
      setTimeout(() => {
        this.startSend = true;
        this.$dialog.loading.close();

        this.$dialog.toast({
          mes: '已发送',
          icon: 'success',
          timeout: 1500
        });
      }, 1000);
    },

    register() {
      let vm = this;
      mui.ajax({
        url: register,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          account: this.mobile,
          password: this.password,
          nickname:'',
          token: md5('register')
        },
        success(res) {
          if (res.code == '200') {
            vm.$dialog.toast({
              mes: '注册成功',
              timeout: 1500,
              callback: () => {
                vm.$store.commit('SET_ACCOUNT', vm.mobile);
                setStore('account', vm.mobile);
                vm.$router.push({ path: '/me/index' })
              }
            })
          }
          else{
            vm.$dialog.toast({
              mes: res.msg||'注册失败',
              timeout: 1500
            })
            return;
          }
        },
        error(res){
          vm.$dialog.toast({
              mes:  res.msg||'注册失败',
              timeout: 1500
            })
            return;
        }
      })

    },
    login() {
      let vm = this;
      mui.ajax({
        url: login,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          account: this.mobile,
          password: this.password,
          token: md5('login')
        },
        success(res) {
          if (res.code == '200') {
            vm.$dialog.toast({
              mes: '登录成功',
              timeout: 1000,
              callback: () => {
                vm.$store.commit('SET_ACCOUNT', vm.mobile);
                localStorage.setItem('account', vm.mobile);
                vm.$router.push({ path: '/me/index' })
              }
            })
          }
          else{
            vm.$dialog.toast({
              mes:  res.msg||'登录信息有误请检查',
              timeout: 1500
            })
            return;
          }
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';

.page-container {
  padding: .3rem;
  .protocol {
    color: #10aeff;
  }
  .forget-pwd{
    display: block;
    width: 2rem;
    padding: .1rem 0; 
    .text-center;
    margin: .8rem auto;
    color: @blue;
    border: 1px solid currentColor;
    border-radius: 5px;
    &:active{
      background-color: @blue;
      color: @white;
    }
  }
}
</style>