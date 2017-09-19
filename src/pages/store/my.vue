<template>
  <div>
    <header-top title="我的店铺"></header-top>
    <main class='scroll-content-2'>
      <section class="store-banner">
        <img src="" alt="" class="banner-img">
        <input type="file" name="upload-img" id=""  @change="previewImg($event)">
        <div>更换封面</div>
      </section>
    </main>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
export default {
  name: 'MyStore',
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


</style>