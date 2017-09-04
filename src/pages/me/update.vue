<template>
  <div>
    <header-top></header-top>
    <main class='scroll-content-2'>
      <yd-cell-group class="member-container">
        <yd-cell-item arrow style="padding:.2rem 0 .2rem .24rem;">
          <span slot="left">头像</span>
          <div slot="right">
            <img :src="info.imgHeadUrl" :alt="info.name||info.nickName">
            <input type="file" accept="image/*" class="head-img" name="head-img" id="head-img" @change="previewImg($event)">
          </div>
        </yd-cell-item>
        <yd-cell-item :arrow="info.isReadName=='0'">
          <span slot="left">身份实名</span>
          <!-- <span slot="right" @click="showCert=true" v-if="info.isReadName=='0'">去认证</span>
              <span slot="right" v-else>{{info.name}}</span> -->
          <span slot="right" @click="showCert=true">去认证</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">昵称</span>
          <input slot="right" v-model="info.nickName" type="text" style="text-align:right;"></input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">简介</span>
          <yd-textarea slot="right" placeholder="请输入简介" maxlength="30" v-model="info.remark"></yd-textarea>
        </yd-cell-item>
      </yd-cell-group>
      <yd-button size="large" type="primary" @click.native="saveInfo">保存</yd-button>
    </main>
    <modal v-model="showCert">
      <h3 slot="header">
        身份认证
      </h3>
      <div slot="main" class="cert-container">
        <div class="input-group">
          <label for="real-name">真实姓名</label>
          <input id="real-name" type="text" placeholder="请输入真实姓名" v-model="realName">
        </div>
        <div class="input-group">
          <label for="cert-num">身份证号码</label>
          <input id="cert-num" type="tel" placeholder="请输入身份证号码" v-model="certNum">
        </div>
        <button class="sure-btn" @click="saveCert">确定</button>
      </div>
    </modal>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import HeaderTop from 'components/header/index'
import Modal from 'components/common/Modal'
import { realNameByAly, update } from '../../api/index'
export default {
  name: 'Update',
  data() {
    return {
      info: {},
      realName: '',
      certNum: '',
      showCert: false
    }
  },
  components: { HeaderTop, Modal },
  computed: {
    ...mapState(['account'])
  },
  created() {
    this.info = this.$route.params.member;
  },
  activated() {
    this.info = this.$route.params.member;
  },
  methods: {
    previewImg(e) {

    },
    saveInfo() {

    },
    saveCert() {
      let vm = this;
      let account = localStorage.getItem('account');
      if (!this.realName || !this.certNum) {
        this.$dialog.toast({
          mes: '请完善信息',
          timeoue: 1500,
          icon: 'error'
        })
        return;
      }
      if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(this.certNum)) {
        this.$dialog.toast({
          mes: '请输入正确的身份证号',
          timeoue: 1500,
          icon: 'error'
        })
        return;
      }
      mui.ajax({
        url: realNameByAly,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          idCardNo: this.certNum,
          idCardName: this.realName,
          account,
          token: md5(`realNameByAly${account}`)
        },
        success(res) {
          if (res.code == 200) {
            vm.$dialog.toast({
              mes: res.msg,
              timeout: 1500,
              icon: 'success',
              callback: () => {
                vm.showCert = false;
              }
            })
          }
          else {
            vm.$dialog.toast({
              mes: res.msg,
              timeoue: 1500,
              icon: 'error'
            })
          }
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
.member-container {
  margin-top: @pd;
  img {
    border-radius: 50%;
    .wh(1.2rem, 1.2rem);
  }
  .head-img {
    position: absolute;
    flex: 1;
    height: 1.2rem;
    right: .44rem;
    top: .24rem;
    opacity: 0;
  }
}

.cert-container {
  .pd-h;
  .input-group {
    margin-bottom: @pd;
    border-bottom: 1px solid #fcfcfc;
    font-size: 14px;
    label {
      display: block;
      margin-bottom: @pd / 2;
    }
    input {
      outline: none;
      border: 1px solid #ddd;
      padding: @pd;
      width: 100%;
      &:focus {
        border-color: @blue;
        box-shadow: 0 0 5px @blue;
      }
    }
  }
  .sure-btn {
    display: block;
    width: 70%;
    margin: @pd auto;
    padding: @pd 0 @pd @pd;
    letter-spacing: @pd;
    background-color: @blue;
    color: @white;
    font-size: 16px;
    border-radius: 5px;
  }
}
</style>