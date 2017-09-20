<template>
  <div>
    <header-top title="商品管理"></header-top>
    <main class='scroll-content-3'>
      <yd-checklist v-model="checkList" ref="pdlist" :label="false">
        <yd-checklist-item :val="item.id" v-for="item in pdlist" :key="item.id">
          <div class="pd-item flex align-center">
            <div class="pd-cover">
              <img :src="item.imgUrl" :alt="item.name">
              <span class="pd-status status-0" v-if="item.aduitStatus=='0'">未通过</span>
              <span class="pd-status status-1" v-if="item.aduitStatus=='1'">已上架</span>
              <span class="pd-status status-2" v-if="item.aduitStatus=='2'">待审核</span>
            </div>
            <div class="pd-info">
              <h3 class="pd-title">{{item.name}}</h3>
              <div class="pd-score flex just-between align-center">
                <crown :value="item.score"></crown>
                <div class="pd-sale">
                  已售{{item.salesNum}}份
                </div>
              </div>
              <div class="pd-price">
                <span class="price">￥{{formatPrice(item.price)}}</span>
                <span class="market-price">门市价：￥{{formatPrice(item.marketPrice)}}</span>
              </div>
            </div>
            <div class="pd-edit">
              <span class="iconfont self-bianji"></span>
            </div>
          </div>
        </yd-checklist-item>
      </yd-checklist>
    </main>
    <footer class="edit-bar flex align-center just-between" v-show="checkList.length">
      <button class="delete-btn" @click="delpd">下架选中商品</button>
    </footer>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import Crown from 'components/common/Crown'
import { myStorePro, delStorePro } from '../../api/index'
import { getStore, mixin } from 'components/common/mixin'
export default {
  name: 'ProductManage',
  data() {
    return {
      pdlist: [],
      checkList: []
    }
  },
  components: { HeaderTop, Crown },
  computed: {

  },
  mixins: [mixin],
  created() {

  },
  activated() {
    this.getpd();
  },
  methods: {
    getpd() {
      let vm = this;
      this.$dialog.loading.open();
      mui.ajax({
        url: myStorePro,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          account: getStore('account'),
          token: md5(`myStorePro${getStore('account')}`)
        },
        success(res) {
          vm.$dialog.loading.close();
          if (res.code != 200) {
            vm.$dialog.toast({
              mes: res.msg
            })
            return;
          }
          vm.pdlist = res.result;
        }
      })
    },
   delpd(){

   }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
.edit-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1rem;
  background-color: @white;
}


.pd-item {
  position: relative;  
  .pd-v;
  .pd-cover {
  position: relative;
  overflow: hidden;
    .wh(2rem, 2rem);
    img {
      .wh(100%, 100%);
    }
    .pd-status {
      position: absolute;
      left: 0;
      top: .21rem;
      padding: 1px 2px 0;
      color: #fff;
      font-size: 10px;
      transform: rotate(-45deg);
      text-align: center;
      &.status-0{
        background-color: @lightgray;
      }
      &.status-1{
        background-color: @red;
      }
      &.status-2{
        background-color: @blue;
      }
    }
  }
  .pd-info {
    flex: 1;
    width: 1%;
    margin-left: @pd;
    .pd-title {
      .ellipsis;
      color: #333333;
      font-size: 14px;
    }
    .pd-score {
      margin: .1rem 0;
      width: 100%;
      .pd-sale {
        color: @lightgray;
      }
    }
    .pd-price {
      display: flex;
      flex-direction: column;
      .price {
        font-size: 18px;
        font-weight: bold;
        color: @red;
        width: 100%;
      }
      .market-price {
        font-size: 12px;
      }
    }
  }
  .pd-edit{
    position: absolute;
    right: 0;
    bottom: @pd;
  }
}
</style>