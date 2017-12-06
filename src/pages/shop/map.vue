<template>
  <div>
    <header-top title="地图"></header-top>
    <main id="map-container">

    </main>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
export default {
  name: 'Map',
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
#map-container{
  position: absolute;
  left: 0;
  width: 100%;
  top: 1rem;
  bottom: 0;
  background-color: #fff;
}
</style>