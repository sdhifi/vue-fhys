<template>
  <div>
    <header-top title="地址管理"></header-top>
    <main class='scroll-content-3'>
      <section class="address-list">
        <ul v-show="addressList.length">
          <li class="address-item" v-for="item in addressList" :key="item.id">
            <div class="address-info flex align-center px-1">
              <label :for="item.id" class="address-label flex-1">
                <span class="address-name">{{item.consigneeName}}</span>
                <span>{{item.mobile}}</span>
                <div>{{item.proviceId.province}}{{item.cityId.city}}{{item.areaId.area}}{{item.addressDetail}}</div>
              </label>
              <div class="address-pick">
                <input type="radio" name="address" :id="item.id" :value="item.id" v-model="defaultId" @change="changeDefault">
                <span class="check-icon">
                  <i></i>
                </span>
              </div>
            </div>
            <div class="address-operate">
              <span class="iconfont self-bianji" @click="editAddress(item)"></span>
              <span class="iconfont self-delete danger-color" @click="deleteAddress(item)"></span>
            </div>
          </li>
        </ul>
        <div class="hv-cen text-center">
          <span class="iconfont self-noorder" style="font-size:40px;"></span>
          <p>没有地址，赶紧去添加</p>
        </div>
      </section>
    </main>
    <footer class="fix-footer">
      <button class="delete-btn btn-large" @click="newAddress">
        <span class="iconfont self-add"></span>添加新地址</button>
    </footer>

  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import { Group, Radio } from 'vux'
import { getMyAddress, defaultAddress, delAdress } from '../../api/index'
import { getStore } from 'components/common/mixin'
export default {
  name: 'AddressManage',
  data() {
    return {
      addressList: [],
      defaultId: ''
    }
  },
  components: { HeaderTop, Group, Radio },
  computed: {

  },
  created() {

  },
  activated() {
    this.getAddress();
  },
  methods: {
    getAddress() {
      let vm = this;
      mui.ajax({
        url: getMyAddress,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          account: getStore('account'),
          token: md5('getMyAddress')
        },
        success(res) {
          let _result = res.result;
          _result.forEach((item, index) => {
            if (item.isDefault == '1') {
              vm.defaultId = item.id;
            }
          })
          vm.addressList = _result;
        }
      })
    },
    changeDefault() {
      let vm = this;
      mui.ajax({
        url: defaultAddress,
        type: 'post',
        headers: {'app-version': 'v1.0'},
        data: {
          id:this.defaultId,
          account:getStore('account'),
          token:md5(`default${this.defaultId}${getStore('account')}`)
        },
        success(res){
          vm.$dialog.toast({
            mes:'设置默认地址成功'
          })
        }
      })
    },
    editAddress(item){
      this.$router.push({name:'EditOrNew',params:{id:item.id}})
    },
    deleteAddress(item){
      this.$dialog.confirm({
        mes:"是否删除收货地址？",
        opts:()=>{
          let vm = this;
          mui.ajax({
            url: delAdress,
            type: 'post',
            headers: {'app-version': 'v1.0'},
            data: {
              id:item.id,
              account:getStore('account'),
              token:md5(`delAdress${this.defaultId}${getStore('account')}`)
            },
            success(res){
              vm.$dialog.notify({
                mes:'删除成功',
                timeout:2000,
                callback:()=>{
                  vm.getAddress();
                }
              })
            }
          })
        }
      })
    },
    newAddress(){
      this.$router.push({name:'EditOrNew'})
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
.address-item {
  margin-bottom: @pd;
  .pd;
  background-color: @white;
  .address-info {
    padding: 0 0 .1rem;
    .address-label {
      padding-right: @pd /2;
      .address-name {
        font-weight: 700;
        font-size: 14px;
        margin-right: @pd;
      }
    }
  }
  .address-operate {
    display: flex;
    justify-content: space-between;
    padding: .1rem;
  }
}

.address-pick {
  >input[type=radio] {
    position: absolute;
    left: 0;
    width: 100%;
    vertical-align: middle;
    top: 0;
    opacity: 0;
    height: 100%;
    z-index: 5;
    &:checked+.check-icon {
      color: rgb(76, 216, 100);
      background-color: currentColor;
      border-color: currentColor;
      >i {
        transform: translate(-50%, -50%) rotate(45deg) scale(1);
        transition: all .2s ease-in-out;
      }
    }
  }
  .check-icon {
    border: 1px solid #ccc;
    border-radius: 50%;
    display: block;
    position: relative;
    z-index: 10;
    pointer-events: none;
    width: 20px;
    height: 20px;
    >i {
      width: 6px;
      height: 12px;
      content: "";
      position: absolute;
      top: 45%;
      left: 50%;
      border: 2px solid #fff;
      border-top: 0;
      border-left: 0;
      transform: translate(-50%, -50%) rotate(45deg) scale(0);
    }
  }
}
</style>