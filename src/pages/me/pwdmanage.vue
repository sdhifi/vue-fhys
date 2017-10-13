<template>
  <div>
    <header-top :title="pageTitle"></header-top>
    <main class='scroll-content-2' style="padding: .3rem;">
      <yd-cell-group title="选项">
        <yd-cell-item type="radio">
          <span slot="left">设置支付密码</span>
          <input slot="right" type="radio" :value="true" v-model="picked" />
        </yd-cell-item>
        <yd-cell-item type="radio">
          <span slot="left">修改登录密码</span>
          <input slot="right" type="radio" :value="false" v-model="picked" />
        </yd-cell-item>
        <yd-cell-item arrow type="link" href="/me/forgetpwd">
          <span slot="left">忘记登录密码</span>
        </yd-cell-item>
      </yd-cell-group>
      <section v-show="picked">
        <yd-cell-group>
          <yd-cell-item>
            <span class="iconfont self-mobile" slot="icon"></span>
            <yd-input v-model="account" placeholder="请输入手机号码" readonly slot="right"></yd-input>
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
          <!-- <yd-cell-item>
            <span class="iconfont self-lock" slot="icon"></span>
            <yd-input slot="right" type='password' v-model="password" required :max='6' :min='6' placeholder='请再次输入密码' regex="^\d{6}$"></yd-input>
          </yd-cell-item> -->
        </yd-cell-group>
        <yd-button :type="valid?'primary':'disabled'" size="large" @click.native="submit">确定设置</yd-button>
      </section>
      <section v-show="!picked">
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">旧密码：</span>
            <yd-input slot="right" type='password' v-model="oldPwd" required :max='16' :min='6' placeholder="6-16位数字或字母的密码"></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">新密码：</span>
            <yd-input slot="right" type='password' v-model="newPwd" required :max='16' :min='6' placeholder="6-16位数字或字母的密码"></yd-input>
          </yd-cell-item>
        </yd-cell-group>
        <yd-button :type="valid2?'warning':'disabled'" size="large" @click.native="edit">确定修改</yd-button>
      </section>
    </main>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import HeaderTop from 'components/header/index'
import { setPay, sendcode, updataLoginPassword } from '../../api/index'
export default {
  name: 'PayPwd',
  data() {
    return {
      picked: true,
      password: '',
      startSend: false,
      code: '',
      correctCode: '',
      oldPwd: '',
      newPwd: '',
    }
  },
  components: { HeaderTop },
  computed: {
    ...mapState(['account']),
    pageTitle() {
      return this.picked ? '设置支付密码' : '修改登录密码';
    },
    rightCode() {
      return /^\d{6}$/gi.test(this.code) && (this.code == this.correctCode)
    },
    rightPwd() {
      return /^\d{6}$/.test(this.password)
    },
    valid() {
      return this.rightCode && this.rightPwd;
    },
    valid2() {
      return /[0-9a-zA-Z]{6,16}/.test(this.oldPwd) && /[0-9a-zA-Z]{6,16}/.test(this.newPwd)
    }
  },
  activated() {
    this.picked = true;
    this.startSend = false;
    this.code = '';
    this.correctCode = '';
    this.password = '';
    this.oldPwd = '';
    this.newPwd = '';
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
    submit() {
      let vm = this;
      mui.ajax({
        url: setPay,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          mobile: this.account,
          pwd1: this.password,
          pwd2: this.password,
          token: md5(`setPay${this.account}`)
        },
        success(res) {
          if (res.code == '200') {
            vm.$dialog.toast({
              mes: res.msg || '设置成功',
              timeout: 1500,
              icon: 'success',
              callback: () => {
                vm.$router.go(-1)
              }
            })
          }
          else {
            vm.$dialog.toast({
              mes: res.msg || '修改失败',
              timeout: 1500,
              icon: 'error'
            })
            return;
          }
        }
      })
    },
    edit() {
      let vm = this;
      mui.ajax({
        url: updataLoginPassword,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          account: this.account,
          oldPassword: this.oldPwd,
          newPassword: this.newPwd,
          rePassword: this.newPwd,
          token: md5(`updataLoginPassword${this.account}`)
        },
        success(res) {
          if (res.code == 200) {
            vm.$dialog.toast({
              mes: `${res.msg}，请牢记`
            })
          }
          else {
            vm.$dialog.toast({
              mes: `旧${res.msg}，请重新输入`
            })
          }
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>

</style>