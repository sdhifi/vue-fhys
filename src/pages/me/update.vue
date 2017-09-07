<template>
  <div>
    <header-top></header-top>
    <main class='scroll-content-2'>
      <yd-cell-group class="member-container">
        <yd-cell-item arrow style="padding:.2rem 0 .2rem .24rem;">
          <span slot="left">头像</span>
          <div slot="right">
            <!-- <img :src="info.imgHeadUrl" :alt="info.name||info.nickName" id="head-img"> -->
            <div id="head-img" :style="{'background-image':'url('+info.imgHeadUrl+')'}"></div>
            <input type="file" capture="camera" accept="image/*" class="head-img" name="head-img" @change="previewImg($event)">
          </div>
        </yd-cell-item>
        <yd-cell-item :arrow="info.isReadName=='0'">
          <span slot="left">身份实名</span>
          <span slot="right" @click="showCert=true" v-if="info.isReadName=='0'">去认证</span>
          <span slot="right" v-else>{{info.name}}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">昵称</span>
          <input slot="right" v-model="info.nickName" type="text" style="text-align:right;" class="hight-input" placeholder="不要输入特殊符号"></input>
        </yd-cell-item>
        <!-- <yd-cell-item>
          <span slot="left">性别</span>
          <yd-radio-group slot="right" v-model="sex">
            <yd-radio val="1">男</yd-radio>
            <yd-radio val="2">女</yd-radio>
            <yd-radio val="0">未知</yd-radio>
          </yd-radio-group>
        </yd-cell-item> -->
        <yd-cell-item>
          <span slot="left" style="margin-right:.4rem;">简介</span>
          <yd-textarea slot="right" placeholder="请输入简介" maxlength="30" v-model="info.remark" class="hight-input"></yd-textarea>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group title="性别">
        <yd-cell-item type="radio">
            <span slot="left">男</span>
            <input slot="right" type="radio" value="1" v-model="info.sex"/>
        </yd-cell-item>
        <yd-cell-item type="radio">
            <span slot="left">女</span>
            <input slot="right" type="radio" value="2" v-model="info.sex"/>
        </yd-cell-item>
        <yd-cell-item type="radio">
            <span slot="left">未知</span>
            <input slot="right" type="radio" value="0" v-model="info.sex"/>
        </yd-cell-item>
      </yd-cell-group>
      <yd-button size="large" type="primary" @click.native="saveInfo">保存</yd-button>
    </main>
    <modal v-model="showCert">
      <h3 slot="header">
        身份认证
        <p class="danger-color fs-12">注意：一经认证，无法再修改</p>
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
import {mixin} from 'components/common/mixin'
import '../../../node_modules/lrz/dist/lrz.bundle.js'
export default {
  name: 'Update',
  data() {
    return {
      info: {},
      base64Url: '',
      realName: '',
      certNum: '',
      showCert: false
    }
  },
  components: { HeaderTop, Modal },
  computed: {
    ...mapState(['account'])
  },
  mixins:[mixin],
  created() {
    //this.info = this.$route.params.member;
  },
  activated() {
    this.info = this.$route.params.member;
  },
  methods: {
    previewImg(event) {
      let headImg = document.getElementById('head-img'),
        file = event.target.files[0];
       let vm = this;
      if (!/image\/\w+/.test(file.type)) {
        this.$dialog.toast({
          mes: '请上传图片',
          timeout: 1000,
          icon: 'error'
        })
        return;
      }
      lrz(file,{width:800}).then(rst=>{
        headImg.style.backgroundImage = `url(${rst.base64})`;
        vm.base64Url = rst.base64;
      })
    },
    saveInfo() {
      if (!this.info.nickName) {
        this.$dialog.toast({
          mes: '昵称不能为空',
          timeout: 1500,
          icon: 'error'
        })
        return;
      }
      if (this.info.remark == 'null') {
        this.info.remark = '';
      }
      let vm = this;
      let rm = Math.random().toString().substring(2);
      mui.ajax({
        url: update,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          id: this.info.id,
          fileName: `${rm}.png`,
          nickName: this.info.nickName,
          remark: this.info.remark,
          sex: this.info.sex,
          account: localStorage.getItem('account'),
          token: md5(`update${this.info.id}`),
          fileContent: this.base64Url
        },
        success(res) {
          vm.$dialog.toast({
            mes: '修改成功',
            timeout: 1000,
            icon: 'success',
            callback: () => {
              vm.$router.go(-1);
            }
          })
        },
        error(res){
          vm.$dialog.toast({
              mes:'上传失败',
              timeout: 1500,
              icon: 'error'
            })
            return;
        }
      })
    },
    saveCert() {
      let vm = this;
      let account = localStorage.getItem('account');
      if (!this.realName || !this.certNum) {
        this.$dialog.toast({
          mes: '请完善信息',
          timeout: 1500,
          icon: 'error'
        })
        return;
      }
      if (!/(^\d{15}$)|(^\d{17}([0-9]|[X|x])$)/.test(this.certNum)) {
        this.$dialog.toast({
          mes: '请输入正确的身份证号',
          timeout: 1500,
          icon: 'error'
        })
        return;
      }
      mui.ajax({
        url: realNameByAly,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          idCardNo: this.certNum.replace(/x/gi, 'X'),
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
                vm.info = Object.assign({}, vm.info, { isReadName: '1', name: vm.realName })
              }
            })
          }
          else {
            vm.$dialog.toast({
              mes: res.msg,
              timeout: 1500,
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
  #head-img {
    border-radius: 50%;
    .wh(1.2rem, 1.2rem);
    background-size: cover;
    background-repeat: no-repeat;
  }
  .head-img {
    position: absolute;
    flex: 1;
    height: 1.2rem;
    right: .44rem;
    top: .24rem;
    opacity: 0;
  }
  .hight-input {
    &:focus {
      box-shadow: 0 0 5px @green inset;
      padding-right: @pd * 2;
      margin-left: @pd;
    }
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