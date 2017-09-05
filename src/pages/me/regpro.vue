<template>
  <div>
    <header-top></header-top>
    <main class="scroll-content-2 page-container">
      <iframe :src="url" frameborder="0"></iframe>
    </main>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import {service} from '../../api/index'
export default {
  name: 'RegisterProtocol',
  data() {
    return {
      url:''
    }
  },
  components:{HeaderTop},
  created(){
    let vm = this;
    mui.ajax({
      url: service,
      type: 'post',
      headers: {'app-version': 'v1.0'},
      data: {
        token: md5('service')
      },
      success(res){
        vm.url= res.result;
      }
    })
  },
}
</script>
<style lang='less' scoped>
.page-container{
  iframe{
    width: 100%;
    height: 100%;
  }
}
</style>