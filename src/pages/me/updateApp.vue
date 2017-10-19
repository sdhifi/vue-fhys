<template>
  <div>
    <header-top title="APP更新"></header-top>
    <main class='scroll-content-2'>
      <group>
          <datetime title="开始日期：" v-model="date1" placeholder="选择日期"></datetime>
        </group>
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">time:</span>
          <yd-datetime slot="right" v-model="date2" placeholder="choose" type="date"></yd-datetime>
          </yd-cell-item>
        </yd-cell-group>
    </main>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import {Group,Datetime} from 'vux'
import {} from '../../api/index'
export default {
  name: 'UpdateApp',
  data() {
    return {
      date1: '',
      date2: '',
    }
  },
  components: { HeaderTop,Group,Datetime},
  computed: {

  },
  created() {

  },
  activated() {

  },
  methods: {

  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
</style>