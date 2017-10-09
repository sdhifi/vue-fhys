<template>
  <div>
    <header-top title="商品列表"></header-top>
    <main class='scroll-content-2'>
<section class="serach-bar flex just-between align-center">
      <input type="text" placeholder="请输入商品名称..." class="flex-1">
      <yd-button>搜&emsp;索</yd-button>
    </section>
    </main>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import { } from '../../api/index'
export default {
  name: 'Products',
  data() {
    return {

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
.serach-bar{
  background-color:@white;
  padding: .1rem;
  z-index:100;
  input{
    border:1px solid red;
    .pd;
    margin-right:@pd;
    border-radius:@pd * 2;
  }
}

</style>