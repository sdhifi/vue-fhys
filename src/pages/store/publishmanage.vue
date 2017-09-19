<template>
  <div>
    <header-top title="发布管理"></header-top>
    <main class='scroll-content-2'>
      <section class="cover">
        <div class="upload-box" v-show="!base64Url">
          <span class="iconfont self-upload"></span>
          <p>选择商品图片</p>
        </div>
        <input type="file" name="upload-img" id="" @change="previewImg($event)">
      </section>
      <section class="info">
        <yd-cell-group title="商品名称">
          <yd-cell-item>
            <yd-textarea slot="right" placeholder="输入商品名称" maxlength="30" v-model="pdName"></yd-textarea>
          </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">商品价格</span>
            <input type="tel" slot="right" placeholder="输入售卖的商品价格" v-model="pdPrice" style="text-align:right;">
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">门市价格</span>
            <input type="tel" slot="right" placeholder="输入商品在店的价格" v-model="mtPrice" style="text-align:right;">
          </yd-cell-item>
          <yd-cell-item arrow>
            <span slot="left">活动开始日期：</span>
            <yd-datetime type="date" slot="right" v-model="date1"></yd-datetime>
          </yd-cell-item>
          <yd-cell-item arrow>
            <span slot="left">活动结束日期：</span>
            <yd-datetime type="date" slot="right" v-model="date2"></yd-datetime>
          </yd-cell-item>
          <yd-cell-item arrow>
            <span slot="left">商品分类</span>
            <select name="" id="" slot="right" v-model="column1" @change="initSubColumn">
              <option value="">请选择</option>
              <option :value="item.id" v-for="item in columnMenu1" :key="item.id">{{item.names}}</option>
            </select>
          </yd-cell-item>
          <yd-cell-item arrow>
            <span slot="left">商品分类下级</span>
            <select name="" id="" slot="right" v-model="column2">
              <option value="">请选择</option>
              <option :value="item.id" v-for="item in columnMenu2" :key="item.id">{{item.names}}</option>
            </select>
          </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group title="购买须知">
          <yd-cell-item>
            <yd-textarea slot="right" placeholder="填写购买须知，让顾客更加放心购买" maxlength="500" v-model="notice"></yd-textarea>
          </yd-cell-item>
        </yd-cell-group>
      </section>
    </main>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import { o2o, subcolumn, addProduct } from '../../api/index'
export default {
  name: 'PublishManage',
  data() {
    return {
      pdName: '',
      pdPrice: '',
      mtPrice: '',
      date1: '',
      date2: '',
      notice: '',
      columnMenu1: [],
      columnMenu2: [],
      column1: '',
      column2: '',
      base64Url: ''
    }
  },
  components: { HeaderTop },
  computed: {

  },
  created() {
    this.getColumn()
  },
  activated() {

  },
  methods: {
    previewImg(event) {
      let headImg = document.querySelector('.cover'),
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
      lrz(file, { width: 800 }).then(rst => {
        headImg.style.backgroundImage = `url(${rst.base64})`;
        vm.base64Url = rst.base64;
      })
    },
    getColumn() {
      let vm = this;
      mui.ajax({
        url: o2o,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          token: md5('o2o')
        },
        success(res) {
          let result = res.result;
          vm.columnMenu1 = result.indexColumn;
        }
      })
    },
    initSubColumn() {

    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
.cover {
  position: relative;
  .wh(100%, 5rem);
  margin-bottom: @pd;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  .upload-box {
    .hv-cen;
    .text-center;
    span {
      font-size: 40px;
    }
    p {
      font-size: 14px;
    }
  }
  input[type=file] {
    opacity: 0;
    .hv-cen;
    .wh(100%, 100%);
  }
}

.yd-cell-right .yd-datetime-input {
  justify-content: flex-end;
}
</style>