<template>
  <div>
    <header-top title="消费规则"></header-top>
    <main class='scroll-content-2' style="background-color:#fff;">
      <load-more tip="福利奖励方式：会员" :show-loading="false" background-color="rgb(236, 227, 124)"></load-more>
      <x-table :cell-bordered="false" :content-bordered="false">
        <thead>
          <tr style="background-color: #F7F7F7">
            <th>累计消费金额</th>
            <th>每累计消费</th>
            <th>奖励</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1万元以下</td>
            <td>500</td>
            <td>1福利</td>
          </tr>
          <tr>
            <td>1万元~100万元</td>
            <td>1000</td>
            <td>1福利</td>
          </tr>
          <tr>
            <td>100万元以上</td>
            <td>5000</td>
            <td>1福利</td>
          </tr>
        </tbody>
      </x-table>
       <p class="tips">注：会员与商户的福利是分开计算的。</p>
      <load-more tip="福利奖励方式：商户" :show-loading="false" background-color="rgb(236, 227, 124)"></load-more>
      <x-table :cell-bordered="false" :content-bordered="false">
        <thead>
          <tr style="background-color: #F7F7F7">
            <th>累计让利金额</th>
            <th>每累计让利</th>
            <th>奖励</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1万元以下</td>
            <td>500</td>
            <td>1商户福利</td>
          </tr>
          <tr>
            <td>1万元以上</td>
            <td>1000</td>
            <td>1商户福利</td>
          </tr>
        </tbody>
      </x-table>
     
    </main>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import { XTable, LoadMore } from 'vux'
export default {
  name: 'ConsumeRule',
  data() {
    return {

    }
  },
  components: { HeaderTop, XTable, LoadMore },
}
</script>
<style lang='less' scoped>
.tips{
  margin:.2rem;
  color: red;
}
</style>