<template>
  <div>
    <header-top title="设置支付密码"></header-top>
    <main class='scroll-content-2' style="padding: .3rem;">
      <yd-cell-group>
        <yd-cell-item>
          <span class="iconfont self-mobile" slot="icon"></span>
          <yd-input v-model="account" placeholder="请输入手机号码"  readonly slot="right"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span class="iconfont self-code" slot="icon"></span>
          <input type="tel" slot="right" placeholder="请输入验证码" v-model="code" maxlength="6">
          <yd-sendcode slot="right" v-model="startSend" @click.native="sendCode" type="warning"></yd-sendcode>
        </yd-cell-item>
        <yd-cell-item>
          <span class="iconfont self-lock" slot="icon"></span>
          <yd-input slot="right" type='password' v-model="password" required :max='6' :min='6' placeholder='请输入6位数字的密码' regex="^\d{6}$"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span class="iconfont self-lock" slot="icon"></span>
          <yd-input slot="right" type='password' v-model="password" required :max='6' :min='6' placeholder='请再次输入密码' regex="^\d{6}$"></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <yd-button :type="valid?'primary':'disabled'" size="large" @click.native="submit">确定</yd-button>
    </main>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import HeaderTop from 'components/header/index'
import {setPay,sendcode } from '../../api/index'
export default {
  name: 'PayPwd',
  data() {
    return {
      password: '',
      startSend: false,
      code: '',
      correctCode: '',
    }
  },
  components: { HeaderTop },
  computed: {
    ...mapState(['account']),
    rightCode() {
      return /^\d{6}$/gi.test(this.code) && (this.code == this.correctCode)
    },
    rightPwd(){
      return /^\d{6}$/.test(this.password)
    },
    valid(){
      return  this.rightCode &&this.rightPwd;
    }
  },
  activated() {
    this.startSend = false;
    this.code='';
    this.correctCode='';
    this.password = '';
  },
  methods: {
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
          mobile: this.account,
          token: md5(`send${this.account}`)
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
          timeout: 1000
        });
      }, 1000);
    },
    submit(){
      let vm = this;
      mui.ajax({
        url: setPay,
        type: 'post',
        headers: {'app-version': 'v1.0'},
        data: {
          mobile:this.account,
          pwd1:this.password,
          pwd2:this.password,
          token:md5(`setPay${this.account}`)
        },
        success(res){
          if (res.code == '200') {
            vm.$dialog.toast({
              mes: res.msg||'设置成功',
              timeout: 1500,
              icon:'success',
              callback: () => {
                vm.$router.go(-1)
              }
            })
          }
          else{
            vm.$dialog.toast({
              mes: res.msg||'修改失败',
              timeout: 1500,
              icon:'error'
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
</style>