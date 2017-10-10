<template>
  <div>
    <header-top title="商品详情"></header-top>
    <main class='scroll-content-2'>

    </main>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import HeaderTop from 'components/header/index'
import { } from '../../api/index'
export default {
  name: 'Product',
  data() {
    return {
      info:{},
      pdtype:'',//产品类型，积分换购：0，品牌商城：1，京东：2，责任消费：3
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