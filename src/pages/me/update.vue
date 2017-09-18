<template>
  <div>
    <header-top title="修改资料"></header-top>
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
        <yd-cell-item :arrow="!certificateStatus">
          <span slot="left">身份实名</span>
          <span slot="right" @click="showModal" v-if="!certificateStatus">去认证</span>
          <span slot="right" v-else>{{info.name}}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">昵称</span>
          <input slot="right" v-model="info.nickName" type="text" style="text-align:right;" class="hight-input" placeholder="不要输入特殊符号"></input>
        </yd-cell-item>
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
    <cert-modal></cert-modal>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import HeaderTop from 'components/header/index'
import CertModal from 'components/common/CertModal'
import { update } from '../../api/index'
import {mixin} from 'components/common/mixin'
import 'lrz/dist/lrz.bundle.js'
export default {
  name: 'Update',
  data() {
    return {
      info: {},
      base64Url: ''
    }
  },
  components: { HeaderTop, CertModal },
  computed: {
    ...mapState(['account','certificateStatus'])
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
    showModal(){
      this.$store.commit('SHOW_CERTIFICATE',true);
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
              mes:'修改失败',
              timeout: 1500,
              icon: 'error'
            })
            return;
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

</style>