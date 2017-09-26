<template>
  <div>
    <header-top title="银行卡"></header-top>
    <main class='scroll-content-3'>
      <section class="bank-list">
        <ul v-show="bankList.length">
          <li class="bank-item flex align-center" v-for="item in bankList" :key="item.id">
            <div class="bank-info flex-1" :style="{color:item.bankColor}">
              <div class="bank-label flex align-center">
                <img :src="item.bankPic" alt="">
                <div class="bank-name flex-1">
                  <p>{{item.bankName}}</p>
                  <p>{{item.bankSub}}</p>
                </div>
              </div>
              <div class="bank-card">{{item.bankCard}}</div>
            </div>
            <span class="iconfont self-delete danger-color" @click="deleteBank(item)"></span>
          </li>
        </ul>
        <div class="hv-cen text-center" v-show="!bankList.length">
          <span class="iconfont self-noorder" style="font-size:40px;"></span>
          <p>没有银行卡，赶紧去添加</p>
        </div>
      </section>
    </main>
    <footer class="fix-footer">
      <button class="delete-btn btn-large" @click="newBank">
        <span class="iconfont self-add"></span>添加银行卡</button>
    </footer>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import { getStore } from 'components/common/mixin'
import { myBanks, deleteMemBank } from '../../api/index'
export default {
  name: 'BankCard',
  data() {
    return {
      bankList: [],
    }
  },
  components: { HeaderTop },
  computed: {

  },
  created() {

  },
  activated() {
    this.getBanks();
  },
  methods: {
    getBanks() {
      let vm = this;
      mui.ajax({
        url: myBanks,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          account: getStore('account'),
          token: md5(`myBanks${getStore('account')}`)
        },
        success(res) {
          vm.bankList = res.result;
        }
      })
    },
    deleteBank(b) {
      let vm = this;
      mui.ajax({
        url: deleteMemBank,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          bankId: b.id,
          account: getStore('account'),
          token: md5(`deleteMemBank${getStore('account')}${b.id}`)
        },
        success(res) {
          if (res.code !== 200) {
            vm.$dialog.toast({
              mes: res.msg,
            })
            return;
          }
          else {
            vm.$dialog.toast({
              mes: res.msg,
              callback: () => {
                vm.getBanks();
              }
            })
          }
        }
      })
    },
    newBank() {
      this.$router.push({ name: 'NewBank' })
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
.bank-item {
  margin-bottom: @pd;
  color: @white;
  .bank-info {
    .bank-label{
      width:100%;
      img{
        .wh(.8rem,.8rem);
      }
      .bank-name{
        margin-left: @pd;
        p:first-of-type{
          font-size: 16px;
        }
      }
    }
    .bank-card{
      width: 100%;
      font-size: .3rem;
      letter-spacing: 3px;
    }
  }
}
</style>