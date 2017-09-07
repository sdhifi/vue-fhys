<template>
  <div>
    <header-top></header-top>
    <main class='scroll-content-2'>

    </main>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import HeaderTop from 'components/header/index'
export default {
  name: 'SearchResult',
  data() {
    return {

    }
  },
  components: { HeaderTop },
  computed: {
    ...mapState(['searchValue'])
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