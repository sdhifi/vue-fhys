<template>
  <div>
    <header-top title="我的收藏"></header-top>
    <yd-tab :callback="changeTab" style="position:fixed;left:0;right:0;z-index:1000;background-color:#fff;">
      <yd-tab-panel label="关注的店铺" tabkey='1'>
        <yd-infinitescroll :callback="getCollect" ref="ctlist1">
          <ul slot="list">
            <li v-for="item in info1" :key="item.colId" class="collect-item flex align-center px-1">
              <img :src="getImgPath(item.img)" alt="">
              <div class="collect-info flex-1">
                <h3>{{item.storeName}}</h3>
                <p>收藏时间：{{formatTime(item.addTime)}}</p>
              </div>
              <span class="iconfont self-delete danger-color" @click="deleteCollect(item.colId,index)"></span>
            </li>
          </ul>
        </yd-infinitescroll>
      </yd-tab-panel>
      <yd-tab-panel label="关注的商品" tabkey='2'>
        <yd-infinitescroll :callback="getCollect" ref="ctlist2">
          <ul slot="list">
            <li v-for="(item,index) in info2" :key="item.colId" class="collect-item flex align-center px-1">
              <img :src="getImgPath(item.img)" alt="">
              <div class="collect-info flex-1">
                <h3>{{item.goodName}}</h3>
                <p>收藏时间：{{formatTime(item.addTime)}}</p>
              </div>
              <span class="iconfont self-delete danger-color" @click="deleteCollect(item.colId,index)"></span>
            </li>
          </ul>
        </yd-infinitescroll>
      </yd-tab-panel>
    </yd-tab>

  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import { myCollect, delectMyCollect } from '../../api/index'
import { getStore, mixin } from 'components/common/mixin'
export default {
  name: 'MyCollect',
  data() {
    return {
      noData2: false,
      noData1: false,
      info2: [],
      info1: [],
      pageNo2: 1,
      pageNo1: 1,
      collectType: '1',
    }
  },
  components: { HeaderTop },
  computed: {

  },
  mixins: [mixin],
  created() {

  },
  activated() {
    this.noData2 = false;
    this.noData1 = false;
    this.info2 = [];
    this.info1 = [];
    this.pageNo2 = 1;
    this.pageNo1 = 1;
    this.collectType = '1';
    if (!this.info1.length) {
      this.changeTab('关注的店铺', '1')
    }
  },
  methods: {
    changeTab(label, tabkey) {
      this.collectType = tabkey;
      if (this[`noData${this.collectType}`])
        return;
      this.getCollect();
    },
    getCollect() {
      let vm = this;
      mui.ajax({
        url: myCollect,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          pageNo: this[`pageNo${this.collectType}`],
          pageSize: 10,
          collectType: this.collectType,
          account: getStore('account'),
          token: md5(`myCollect`)
        },
        success(res) {
          if (res.code == 200) {
            let _list = res.result;
            vm[`info${vm.collectType}`] = [...vm[`info${vm.collectType}`], ..._list];
            if (_list.length < 10) {
              vm[`noData${vm.collectType}`] = true;
              vm.$refs[`ctlist${vm.collectType}`].$emit('ydui.infinitescroll.loadedDone');
              return;
            }
            vm.$refs[`ctlist${vm.collectType}`].$emit('ydui.infinitescroll.finishLoad');
            vm[`pageNo${vm.collectType}`]++;
          }
        else{
          vm.$dialog.toast({
              mes: res.msg || '网络异常,请重试'
            })
            return;
        }
        }
      })
    },
    deleteCollect(id, index) {
      let vm = this;
      mui.ajax({
        url: delectMyCollect,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          colId: id,
          token: md5('delectMyCollect')
        },
        success(res) {
          if (res.code == 200) {
            vm.$dialog.toast({
              mes: res.msg || '已取消收藏',
              callback: () => {
                vm[`info${vm.collectType}`].splice(index, 1);
              }
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
.collect-item {
  .pd-h;
  .mg-v;
  img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
  }
  .collect-info {
    margin: 0 @pd /1;
    font-size: 14px;
    p:first-of-type {
      color: @lightgray;
      font-size: 12px;
    }
  }
}
</style>