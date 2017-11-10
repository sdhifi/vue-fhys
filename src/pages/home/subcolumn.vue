<template>
  <div>
    <header-top title="栏目"></header-top>
    <main class="scroll-content-2">
      <section class="search-container">
        <router-link to="/home/search" class="search-input">
          <span class="iconfont-large self-search"></span>
          <span>搜索商家或商品</span>
        </router-link>
      </section>
      <section class="banner-list">
        <yd-slider>
          <yd-slider-item v-for="(item,index) in banner" :key="item.id">
            <img :src="item.photo" :alt="item.names">
          </yd-slider-item>
        </yd-slider>
      </section>
      <section class="subcolumns-list">
        <ul class="flex" v-show="subcolumns.length">
          <router-link :to="{path:'/home/subcolumn2/'+e.id}" v-for="e in subcolumns" :key="e.id" class="type-item text-center" tag="li">
            <img :src="getImgPath(e.pic2)" :alt="e.names">
            <p>{{e.names}}</p>
          </router-link>
        </ul>
      </section>
      <product-list :column-id="$route.params.id" :stick-tag="stickTag"></product-list>
    </main>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import HeaderTop from 'components/header/index'
import ProductList from 'components/common/ProductList'
import { subColumn} from '../../api/index'
import { mixin } from 'components/common/mixin'
import { throttle } from 'vux'
export default {
  name: 'SubColumn',
  data() {
    return {
      banner: [],
      subcolumns: [],
      stickTag:false
    }
  },
  components: { HeaderTop,ProductList},
  computed: { ...mapState(['longitude', 'latitude']) },
  mixins: [mixin],
  created() {
   // this.init();
  },
  activated() {
    this.init();
  },
  methods: {
    init() {
      this.getColumn();
    },
    getColumn() {
      let vm = this;
      let main = document.querySelector("main"),
      list = document.querySelector(".nav-tab");
      mui.ajax({
        url: subColumn + this.$route.params.id,
        type: "post",
        headers: { "app-version": "v1.0" },
        data: {
          columnId: this.$route.params.id,
          token: md5(`subColumn${this.$route.params.id}`)
        },
        success(res) {
          vm.banner = res.result.subAds;
          vm.subcolumns = res.result.subColumns;
          vm.$nextTick(()=>{
            main.addEventListener("scroll",throttle((e)=>{
                vm.stickTag = e.target.scrollTop>list.offsetTop;
            },300))
          })
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
.subcolumns-list {
  background-color: @white;
  padding: .4rem 0;
  margin-bottom: @pd;
  .type-item {
    width: 20%;
    margin-bottom: @pd;
    img {
      width: 100%;
      padding: 0 .4rem @pd .4rem;
    }
  }
}

</style>