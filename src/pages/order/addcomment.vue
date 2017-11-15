<template>
  <div>
    <header-top title="添加评论"></header-top>
    <main class='scroll-content-2'>
      <yd-cell-group style="margin-bottom:0;">
        <yd-cell-item>
          <span slot="left">订单编号</span>
          <span slot="right">{{info.orderSn}}</span>
        </yd-cell-item>
      </yd-cell-group>
      <section v-for="(item,index) in info.goods" :key="index" style="margin-bottom:.2rem;">
        <yd-cell-group style="margin-bottom:0;">
          <yd-cell-item>
            <span slot="left">评分</span>
            <crown slot="right" :value="5"></crown>
          </yd-cell-item>
        </yd-cell-group>
        <div class="content-box flex">
          <img :src="item.goodsImg" alt="" class="pdimg">
          <div class="flex-1 flex just-between flex-column">
            <p>{{item.goodsName}}</p>
            <p class="flex just-between">
              <span>￥{{item.goodsAmount}}</span>
              <span>×{{item.goodNum}}</span>
            </p>
          </div>
          <yd-textarea placeholder="商品如何，评价下吧" class="comment-content"></yd-textarea>
        </div>
      </section>
      <div style="padding:0 .2rem .2rem;">
        <yd-button size="large" @click.native="publish">立即发布</yd-button>
      </div>
    </main>
  </div>
</template>
<script>
import { mapState } from "vuex";
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
    ...mapState(["member"])
  },
  created() {},
  activated() {
    this.info = this.$route.params.item;
  },
  methods: {
    publish() {
      let vm = this;
      let proId = [],
        score = [],
        content=[];
      this.info.goods.forEach(item => {
        proId.push(item.goodsId);
      });
      Array.from(document.querySelectorAll(".score-num")).forEach(item => {
        score.push(item.innerText.split("分")[0]);
      });
      Array.from(document.querySelectorAll(".comment-content textarea")).forEach(item => {
        content.push(item.value);
      });
      mui.ajax({
        url: newProCommet,
        type: "post",
        headers: { "app-version": "v1.0" },
        data: {
          memberId: this.member.id,
          proId: proId.join(","),
          comScore: score.join(","),
          content:content.join("&"),
          fileContent: "",
          fileName: "123.png",
          orderSn: this.info.orderSn,
          token: md5(`newProCommet${this.member.id}${this.info.orderSn}`)
        },
        success(res) {
          if(res.code!==200){
            vm.$dialog.alert({
              mes:res.msg
            })
          }
          else{
             vm.$dialog.toast({
              mes:res.msg,
              icon:"success",
              callback:()=>{
                vm.$router.go(-1);
              }
            })
          }
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
@import "../../style/mixin.less";
.content-box {
  .pd-h;
  padding-top: @pd;
  background-color: @white;
  img {
    .wh(1rem,1rem);
    margin-right: @pd;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
}
</style>