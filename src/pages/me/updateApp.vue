<template>
  <div>
    <header-top title="APP更新"></header-top>
    <main class='scroll-content-2'>
      <group>
          <datetime title="开始日期：" v-model="date1" placeholder="选择日期"></datetime>
          <datetime title="结束日期：" v-model="date2" placeholder="选择日期"></datetime>          
        </group>
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