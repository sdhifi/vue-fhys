<template>
  <div v-if="/publishmanage/.test($route.path)">
    <header-top title="发布管理"></header-top>
    <main class='scroll-content-2'>
      <section class="cover">
        <div class="upload-box" v-show="!base64Url">
          <span class="iconfont self-upload"></span>
          <p>选择商品图片</p>
        </div>
        <input type="file" capture="camera" accept="image/*" name="upload-img" id="" @change="previewImg($event)">
      </section>
      <section class="info">
        <!-- <yd-cell-group title="商品名称">
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
            <yd-datetime type="date" slot="right" v-model="date2" :startDate="date1"></yd-datetime>
          </yd-cell-item>
          <yd-cell-item arrow>
            <span slot="left">商品分类</span>
            <select slot="right" v-model="column1" @change="changeSubColumn">
              <option value="">请选择</option>
              <option :value="item.key" v-for="item in columnMenu1" :key="item.key">{{item.value}}</option>
            </select>
          </yd-cell-item>
          <yd-cell-item arrow>
            <span slot="left">商品分类下级</span>
            <select slot="right" v-model="column2">
              <option value="">请选择</option>
              <option :value="item.key" v-for="item in columnMenu2" :key="item.key">{{item.value}}</option>
            </select>
          </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group title="购买须知">
          <yd-cell-item>
            <yd-textarea slot="right" placeholder="填写购买须知，让顾客更加放心购买" maxlength="500" v-model="notice"></yd-textarea>
          </yd-cell-item>
        </yd-cell-group> -->
        <group title="商品名称">
          <x-textarea v-model="pdName" :max="30" placeholder="输入商品名称"></x-textarea>
        </group>
        <group>
          <x-input title="商品价格：" placeholder="输入售卖的商品价格" v-model="pdPrice"></x-input>
          <x-input title="门市价格：" placeholder="输入商品在店的价格" v-model="mtPrice"></x-input>
          <datetime title="活动开始日期" v-model="date1" placeholder="选择日期"></datetime>
          <datetime title="活动结束日期" v-model="date2" placeholder="选择日期"></datetime>
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
        <input type="file" capture="camera" accept="image/*" name="upload-img" id="" @change="previewImg($event)">
      </section>
      <section class="info">
        <!-- <yd-cell-group title="商品名称">
              <yd-cell-item>
                <yd-textarea slot="right" placeholder="输入商品名称" maxlength="30" v-model="pd.name"></yd-textarea>
              </yd-cell-item>
            </yd-cell-group>
            <yd-cell-group>
              <yd-cell-item>
                <span slot="left">商品价格</span>
                <input type="tel" slot="right" placeholder="输入售卖的商品价格" v-model="pd.price" style="text-align:right;">
              </yd-cell-item>
              <yd-cell-item>
                <span slot="left">门市价格</span>
                <input type="tel" slot="right" placeholder="输入商品在店的价格" v-model="pd.marketPrice" style="text-align:right;">
              </yd-cell-item>
              <yd-cell-item arrow>
                <span slot="left">活动开始日期：</span>
                <yd-datetime type="date" slot="right" v-model="date3"></yd-datetime>
              </yd-cell-item>
              <yd-cell-item arrow>
                <span slot="left">活动结束日期：</span>
                <yd-datetime type="date" slot="right" v-model="date4" :startDate="date3"></yd-datetime>
              </yd-cell-item>
              <yd-cell-item arrow>
                <span slot="left">商品分类</span>
                <select slot="right" v-model="column1" @change="changeSubColumn">
                  <option value="">请选择</option>
                  <option :value="item.id" v-for="item in columnMenu1" :key="item.id">{{item.names}}</option>
                </select>
              </yd-cell-item>
              <yd-cell-item arrow>
                <span slot="left">商品分类下级</span>
                <select slot="right" v-model="column2">
                  <option value="">请选择</option>
                  <option :value="item.id" v-for="item in columnMenu2" :key="item.id">{{item.names}}</option>
                </select>
              </yd-cell-item>
            </yd-cell-group>
            <yd-cell-group title="购买须知">
              <yd-cell-item>
                <yd-textarea slot="right" placeholder="填写购买须知，让顾客更加放心购买" maxlength="500" v-model="pd.notice"></yd-textarea>
              </yd-cell-item>
            </yd-cell-group> -->
        <group title="商品名称">
          <x-textarea v-model="pd.name" :max="30" placeholder="输入商品名称"></x-textarea>
        </group>
        <group>
          <x-input title="商品价格：" placeholder="输入售卖的商品价格" v-model="pd.price"></x-input>
          <x-input title="门市价格：" placeholder="输入商品在店的价格" v-model="pd.marketPrice"></x-input>
          <datetime title="活动开始日期" v-model="date3" placeholder="选择日期"></datetime>
          <datetime title="活动结束日期" v-model="date4" placeholder="选择日期"></datetime>
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
import { Group, Datetime, XTextarea, XInput, Selector } from 'vux'
import { o2o, subColumn, addProduct, updatePro } from '../../api/index'
import { getStore } from 'components/common/mixin'
import 'lrz/dist/lrz.bundle.js'

export default {
  name: 'PublishOrUpdate',
  data() {
    return {
      pdName: '',
      pdPrice: '',
      mtPrice: '',
      date1: '',//发布商品开始日期
      date2: '',//发布商品结束日期
      date3: '',//编辑商品开始日期
      date4: '',//编辑商品结束日期
      notice: '',
      columnMenu1: [],
      columnMenu2: [],
      column1: '',
      column2: '',
      base64Url: '',
      pd: {},
    }
  },
  components: { HeaderTop, Group, Datetime, XTextarea, XInput, Selector },
  computed: {
    valid() {
      return this.base64Url && this.pdName && this.pdPrice && this.mtPrice && this.column1 && this.column2 && this.date1 && this.date2 && !!this.notice
    },
    valid2() {
      return this.pd.name && this.pd.price && this.pd.marketPrice && this.column1 && this.column2 && this.pd.dateStart && this.pd.dateEnd && !!this.pd.notice
    },
  },

  created() {
    this.getColumn()
  },
  activated() {
    this.pd = {};
    this.date3 = '';
    this.date4 = '';
    this.column1 = '';
    this.column2 = '';
    if (/updateproduct/.test(this.$route.path)) {
      this.pd = this.$route.params.pd;
      this.date3 = this.pd.dateStart;
      this.date4 = this.pd.dateEnd;

    }
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
        indate: `${this.date3}至${this.date4}`,
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
              mes: res.msg || '修改成功，待审核'
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

.yd-cell-right .yd-datetime-input {
  justify-content: flex-end;
}

.yd-cell-right select {
  direction: rtl;
  text-align: center;
}
</style>