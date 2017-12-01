<template>
  <div v-if="tag">
    <header-top title="发布管理"></header-top>
    <main class='scroll-content-2'>
      <section class="cover">
        <div class="upload-box" v-show="!base64Url">
          <span class="iconfont self-upload"></span>
          <p>选择商品图片</p>
        </div>
        <input type="file"  accept="image/*" name="upload-img" id="" @change="previewImg($event)">
      </section>
      <section class="info">
        <group title="商品名称">
          <x-textarea v-model="pdName" :max="30" placeholder="输入商品名称"></x-textarea>
        </group>
        <group>
          <x-input title="商品价格：" placeholder="输入售卖的商品价格" v-model="pdPrice"></x-input>
          <x-input title="门市价格：" placeholder="输入商品在店的价格" v-model="mtPrice"></x-input>
          <!-- <x-textarea title="有效日期：" placeholder="例:2016.7.18至2017.1.17(周末、法定节假日通用)" v-model="date1"></x-textarea> -->
          <cell title="开始日期：" is-link>
            <yd-datetime v-model="date1" type="date" placeholder="选择商品起始日期" slot="child" class="time-picker"></yd-datetime>
          </cell>
          <cell title="结束日期：" is-link>
            <yd-datetime v-model="date2" type="date" placeholder="选择商品结束日期" slot="child" class="time-picker"></yd-datetime>
          </cell>
          <selector title="商品分类：" placeholder=" 请选择" v-model="column1" :options="columnMenu1" @on-change="changeSubColumn"></selector>
          <selector title="分类下级：" placeholder="请选择" v-model="column2" :options="columnMenu2"></selector>
        </group>
        <group title="购买须知">
          <x-textarea v-model="notice" :max="500" placeholder="填写购买须知，让顾客更加放心购买"></x-textarea>
        </group>
        <yd-button :type="valid?'primary':'disabled'" size="large" @click.native="publish">立即发布</yd-button>
      </section>
    </main>
  </div>
  <div v-else>
    <header-top title="编辑商品"></header-top>
    <main class='scroll-content-2'>
      <section class="cover" :style="{'background-image':'url('+pd.imgUrl+')'}">
        <input type="file"  accept="image/*" name="upload-img" id="" @change="previewImg($event)">
      </section>
      <section class="info">
        <group title="商品名称">
          <x-textarea v-model="pd.name" :max="30" placeholder="输入商品名称"></x-textarea>
        </group>
        <group>
          <x-input title="商品价格：" placeholder="输入售卖的商品价格" v-model="pd.price"></x-input>
          <x-input title="门市价格：" placeholder="输入商品在店的价格" v-model="pd.marketPrice"></x-input>
          <!-- <x-textarea title="有效日期：" placeholder="例:2016.7.18至2017.1.17(周末、法定节假日通用)" v-model="pd.indate"></x-textarea> -->
          <cell title="开始日期：" is-link>
            <yd-datetime v-model="pd.dateStart" type="date" placeholder="选择商品起始日期" slot="child" class="time-picker"></yd-datetime>
          </cell>
          <cell title="结束日期：" is-link>
            <yd-datetime v-model="pd.dateEnd" type="date" placeholder="选择商品结束日期" slot="child" class="time-picker"></yd-datetime>
          </cell>
          <selector title="商品分类：" placeholder=" 请选择" v-model="column1" :options="columnMenu1" @on-change="changeSubColumn"></selector>
          <selector title="分类下级：" placeholder="请选择" v-model="column2" :options="columnMenu2"></selector>
        </group>
        <group title="购买须知">
          <x-textarea v-model="pd.notice" :max="500" placeholder="填写购买须知，让顾客更加放心购买"></x-textarea>
        </group>
        <yd-button :type="valid2?'warning':'disabled'" size="large" @click.native="save">保存修改</yd-button>
      </section>
    </main>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import { Group, Cell, Datetime, XTextarea, XInput, Selector } from 'vux'
import { o2o, subColumn, addProduct, updatePro } from '../../api/index'
import { getStore } from 'components/common/mixin'
import 'lrz/dist/lrz.bundle.js'

export default {
  name: 'PublishOrUpdate',
  data() {
    return {
      tag: true,//true发布商品，false编辑商品
      pdName: '',
      pdPrice: '',
      mtPrice: '',
      date1: '',//发布商品有效期
      date2: '',
      date3: '',//编辑商品有效期
      date4: '',
      notice: '',
      columnMenu1: [],
      columnMenu2: [],
      column1: '',
      column2: '',
      base64Url: '',
      pd: {},
    }
  },
  components: { HeaderTop, Group, Cell, Datetime, XTextarea, XInput, Selector },
  computed: {
    valid() {
      return this.base64Url && this.pdName && /^(([1-9]\d*)(\.\d{1,2})?)$|(0\.0?([1-9]\d?))$/.test(this.pdPrice) &&
        /^(([1-9]\d*)(\.\d{1,2})?)$|(0\.0?([1-9]\d?))$/.test(this.mtPrice) && this.column1 && this.column2 && !!this.date1 && !!this.date2 && !!this.notice
    },
    valid2() {
      return this.pd.name && /^(([1-9]\d*)(\.\d{1,2})?)$|(0\.0?([1-9]\d?))$/.test(this.pd.price) &&
        /^(([1-9]\d*)(\.\d{1,2})?)$|(0\.0?([1-9]\d?))$/.test(this.pd.marketPrice) &&
        this.column1 && this.column2 && !!this.pd.dateStart && !!this.pd.dateEnd && !!this.pd.notice
    },
  },

  created() {
    this.getColumn()
  },
  activated() {
    this.tag = /publishmanage/.test(this.$route.path) ? true : false;
    this.reset();
    if (!this.tag) {
      this.pd = this.$route.params.pd;
    }
  },
  mounted() {
  },
  methods: {
    reset() {
      this.pd = {};
      this.pdName = '';
      this.base64Url = '';
      this.date1 = '';
      this.date2 = '';
      this.column1 = '';
      this.column2 = '';
      this.pdPrice = '';
      this.mtPrice = '';
      this.notice = '';
      let headImg = document.querySelector('.cover');
      headImg.style.backgroundImage = '';
    },
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
      lrz(file, { width: 1000 }).then(rst => {
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
          let result = res.result.indexColumn;
          let _result = [];
          result.forEach((item, index) => {
            _result.push({ key: item.id, value: item.names })
          })
          vm.columnMenu1 = _result;
        }
      })
    },
    changeSubColumn() {
      let vm = this;
      let columnId = this.column1 || '1347'
      mui.ajax({
        url: subColumn + columnId,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          columnId: this.column1,
          token: md5(`subColumn${columnId}`)
        },
        success(res) {
          let result = res.result.subColumns;
          let _result = [];
          result.forEach((item, index) => {
            _result.push({ key: item.id, value: item.names })
          })
          vm.columnMenu2 = _result;
        }
      })
    },
    publish() {
      let vm = this;
      mui.ajax({
        url: addProduct,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          name: this.pdName,
          price: this.pdPrice,
          marketPrice: this.mtPrice,
          // indate: this.date1,
          indate: `${this.date1}至${this.date2}`,
          notice: this.notice,
          columnId: this.column2,
          account: getStore('account'),
          token: md5(`addProduct`),
          fileName: '123.png',
          fileContent: this.base64Url
        },
        success(res) {
          if (res.code == 200) {
            vm.$dialog.toast({
              mes: res.msg || '发布成功，待审核'
            })
          }
          else {
            vm.$dialog.toast({
              mes: '发布异常，稍候重试'
            })
          }
        }
      })
    },
    save() {
      let vm = this;
      let params = {
        id: this.pd.id,
        name: this.pd.name,
        price: this.pd.price,
        marketPrice: this.pd.marketPrice,
        // indate: this.pd.indate,
        indate: `${this.pd.dateStart}至${this.pd.dateEnd}`,
        notice: this.pd.notice,
        account: getStore('account'),
        columnId: this.column2,
        token: md5(`updatePro`),
        fileName: '123.png',
        fileContent: this.base64Url
      };

      mui.ajax({
        url: updatePro,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: params,
        success(res) {
          if (res.code == 200) {
            vm.$dialog.toast({
              mes: res.msg || '修改成功，待审核',
              callback: () => {
                vm.$router.go(-1);
              }
            })
          }
          else {
            vm.$dialog.toast({
              mes: res.msg || '网络异常，请选择商品图片'
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

.time-picker {
  position: absolute;
  left: 7em;
  top: 10px;
}

.yd-cell-right select {
  direction: rtl;
  text-align: center;
}
</style>