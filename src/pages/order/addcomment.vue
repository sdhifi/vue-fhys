<template>
  <div>
    <header-top title="添加评论"></header-top>
    <main class='scroll-content-2'>
      <section v-for="(item,index) in info.orderVos" :key="index">
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">订单编号</span>
            <span slot="right">{{info.orderSn}}</span>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">评分</span>
            <crown slot="right"></crown>
          </yd-cell-item>
        </yd-cell-group>
        <div class="content-box flex">
          <img :src="item.goodsImg" alt="" class="pdimg">
          <yd-textarea placeholder="商品如何，评价下吧" class="flex-1"></yd-textarea>
        </div>
      </section>
      <div>
        <yd-button size="large" @click.native="publish">立即发布</yd-button>
      </div>
    </main>
  </div>
</template>
<script>
import {mapState} from "vuex"
import HeaderTop from "components/header/index";
import Crown from "components/common/Crown";
import { newProCommet } from "../../api/index";
export default {
  name: "AddComment",
  data() {
    return {
      info: {}
    };
  },
  components: { HeaderTop, Crown },
  computed: {
    ...mapState(['member'])
  },
  created() {},
  activated() {
    this.info = this.$route.params.item;
  },
  methods: {
    publish(){
      let vm = this;
      mui.ajax({
        url: newProCommet,
        type: 'post',
        headers: {'app-version': 'v1.0'},
        data: {
          memberId:this.member.id,
          proId:"",
          comScore:"",
          content:"",
          fileContent:"",
          fileName:"123.png",
          orderSn:this.info.orderSn,
          token: md5(`newProCommet${this.member.id}${this.info.orderSn}`)
        },
        success(res){
          
        }
      })
    }
  }
};
</script>
<style lang='less' scoped>
@import "../../style/mixin.less";
.content-box{
  img{
    .wh(1rem,1rem);
  }

}
</style>