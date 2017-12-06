<template>
  <div>
    <header-top title="商家地址"></header-top>
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
      address:"",
      map:null
    }
  },
  components: { HeaderTop },
  computed: {

  },
  created() {
    this.address = this.$route.params.address;
    // document.addEventListener("plusready",this.drawMap,false)
    this.drawMap();
  },

  methods: {
    drawMap(){
      plus.maps.Map.geocode(this.address,{},(event)=>{
        let point = event.coord;
        console.log(point)
      this.map = new plus.maps.Map("map-container");
      this.centerAndZoom(new plus.maps.Point(point.longitude,point.latitude),12)
      },(error)=>{
        this.$dialog.alert({
          mes:error
        })
      })
    }
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