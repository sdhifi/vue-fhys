<template>
  <div>
    <header-top></header-top>
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
          <router-link :to="{path:'/product/subcolumn/'+e.id}" v-for="e in subcolumns" :key="e.id" class="type-item text-center" tag="li">
            <img :src="getImgPath(e.pic2)" :alt="e.names">
            <p>{{e.names}}</p>
          </router-link>
        </ul>
      </section>
      <product-list :column-id="$route.params.id" ></product-list>
    </main>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import HeaderTop from 'components/header/index'
import ProductList from 'components/common/ProductList'
import { subcolumn} from '../../api/index'
import { mixin } from 'components/common/mixin'
export default {
  name: 'SubColumn',
  data() {
    return {
      banner: [],
      subcolumns: [],
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
      mui.ajax({
        url: subcolumn + this.$route.params.id,
        type: "post",
        headers: { "app-version": "v1.0" },
        data: {
          columnId: this.$route.params.id,
          token: md5(`subColumn${this.$route.params.id}`)
        },
        success(res) {
          vm.banner = res.result.subAds;
          vm.subcolumns = res.result.subColumns;
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

.nav-list {
  background-color: @white;
  padding: @pd;
  ul {
    padding-bottom: @pd;
    border-bottom: 1px solid #ddd;
  }
  .nav-item {
    width: 20%;
    padding: .15rem;
    border: 1px solid #ddd;
    border-radius: 3px;
    transition: all .2s;
    &.nav-active {
      color: @red;
      border-color: currentColor;
    }
  }
}
</style>