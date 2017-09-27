<template>
  <div>
    <header-top title="福利权益"></header-top>
    <main class='scroll-content-2'>
      <ul>
        <li class="item">
          <!-- <li v-for="(item,index) in info" :key="index" class="item"> -->
          <div class="item-top flex just-between">
            <p>增加权益</p>
            <p>0.002000</p>
          </div>
           <div class="item-bottom flex just-between">
              <p>2017-07-18</p>
              <p>满500增加1个</p>
            </div>
        </li>
        <li class="item">
          <!-- <li v-for="(item,index) in info" :key="index" class="item"> -->
          <div class="item-top flex just-between">
            <p>增加权益</p>
            <p>0.002000</p>
          </div>
           <div class="item-bottom flex just-between">
              <p>2017-07-18</p>
              <p>满500增加1个</p>
            </div>
        </li>
      </ul>
    </main>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import { getParticipate } from '../../api/index'
import { getStore } from 'components/common/mixin'
export default {
  name: 'Participate',
  data() {
    return {
      info: []
    }
  },
  components: { HeaderTop },
  computed: {

  },
  created() {

  },
  activated() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      let vm = this;
      mui.ajax({
        url: getParticipate,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          account: getStore('account'),
          type: this.$route.query.type,
          token: md5('getParticipate')
        },
        success(res) {
          vm.info = res.result;
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
.item {
  margin-top: @pd;
  .pd;
  background-color: @white;
  >div{
    width: 100%;
  }
  .item-top{
    font-size: .3rem;
    margin-bottom: @pd;
    p:last-child{
      color: @red;
    }
  }
}
</style>