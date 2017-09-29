<template>
  <div>
    <header-top title="商品管理"></header-top>
    <main class='scroll-content-3'>
      <yd-checklist v-model="checkList" ref="pdlist" :label="false" :callback="change">
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
            <div class="pd-edit" @click="editpd(item)">
              <span class="iconfont self-bianji"></span>
            </div>
          </div>
        </yd-checklist-item>
      </yd-checklist>
    </main>
    <footer class="fix-footer">
      <div style="padding-left:10px;">
        <yd-checkbox v-model="isCheckAll" shape="circle"  @click.native="checkAll">{{isCheckAll?'取消全选':'全选'}}</yd-checkbox>
      </div>
      <button class=" flex-1 delete-btn" @click="delpd" v-show="checkList.length">下架选中商品</button>
    </footer>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import Crown from 'components/common/Crown'
import { myStorePro, delStorePro, updatePro } from '../../api/index'
import { getStore, mixin } from 'components/common/mixin'
export default {
  name: 'ProductManage',
  data() {
    return {
      pdlist: [],
      checkList: [],
      isCheckAll: false
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
    change(value, isCheckAll) {
      this.isCheckAll = isCheckAll;
    },
    checkAll() {
      this.isCheckAll = !this.isCheckAll;
      this.$refs.pdlist.$emit('ydui.checklist.checkall', this.isCheckAll);
    },
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
          let _list = res.result;
          _list.forEach((pd, index) => {
            let dateStart = pd.indate.split('至')[0];
            let dateEnd = pd.indate.split('至')[1];
            pd.dateStart = dateStart;
            pd.dateEnd = dateEnd;
          })
          vm.pdlist = _list
        }
      })
    },
    delpd() {
      let vm = this;
      this.$dialog.confirm({
        title: '下架商品',
        mes: '请确认是否下架所选商品',
        opts: () => {
          mui.ajax({
            url: delStorePro,
            type: 'post',
            headers: { 'app-version': 'v1.0' },
            data: {
              ids: this.checkList.join(','),
              account: getStore('account'),
              token: md5(`delStorePro${getStore('account')}`)
            },
            success(res) {
              if (res.code == 200) {
                vm.$dialog.notify({
                  mes: '下架成功',
                  timeout: 2000,
                  callback: () => {

                    vm.getpd()
                  }
                })
              }
              else {
                vm.$dialog.toast({
                  mes: res.msg
                })
              }
            }
          })
        }
      });

    },
    editpd(pd) {

      this.$router.push({ name: 'UpdateProduct', params: { pd } })
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';

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
      &.status-0 {
        background-color: @lightgray;
      }
      &.status-1 {
        background-color: @red;
      }
      &.status-2 {
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
  .pd-edit {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    .wh(100%, 100%);
    span {
      position: absolute;
      right: 0;
      bottom: @pd;
    }
  }
}
</style>