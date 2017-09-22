<template>
  <div>
    <header-top :title="addressTitle"></header-top>
    <main class='scroll-content-2'>

    </main>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import {getAddressDetail, updateAddress, newsAddress} from '../../api/index'
export default {
  name: 'EditOrNew',
  data() {
    return {
      addressTitle:'',
      addressId:'',
      consigneeName:''
    }
  },
  components: { HeaderTop },
  computed: {

  },
  created() {

  },
  activated() {
    this.addressId=this.$route.params.id;
    
      this.addressId?this.addressTitle='地址修改':this.addressTitle='地址添加';
    
  },
  methods: {

  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';


</style>