<template>
  <div>
    <header-top title="合作协议"></header-top>
    <main class='scroll-content-2'>
      <iframe :src="url" frameborder="0" style="width:100%;height:100%;"></iframe>
    </main>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
export default {
  name: 'MerchantProtocol',
  data() {
    return {
      url: 'http://gz.gjfeng.net/gjfeng-web-client/wx/rule/memberCooperationRule?key=merchant_1'
    }
  },
  components: { HeaderTop }
}
</script>
