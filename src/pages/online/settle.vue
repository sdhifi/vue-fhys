<template>
  <div>
    <header-top title="结算"></header-top>
    <main class='scroll-content-2'>

    </main>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import HeaderTop from 'components/header/index'
import { } from '../../api/index'
export default {
  name: 'Settle',
  data() {
    return {

    }
  },
  components: { HeaderTop },
  computed: {
...mapState(['account','defaultAddress','addressList'])
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