<template>
  <div>
    <header-top title="授信记录列表"></header-top>
    <main class='scroll-content-2'>

    </main>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import {goAllShouXin } from '../../api/index'
export default {
  name: 'ShouxinList',
  data() {
    return {
      list: []
    }
  },
  components: { HeaderTop },
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