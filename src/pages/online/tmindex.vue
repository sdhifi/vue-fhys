<template>
  <div>
    <header-top title="天猫"></header-top>
    <div class="search-form" autocomplete="off">
      <div class="input-group  flex align-center">
        <span class="iconfont-large self-search"></span>
        <input type="search" name="search" class="search-input" placeholder="输入搜索的商品关键词" v-model="searchValue" @keyup.enter="searchProduct">
        <button type="button" class="search-submit" @click="searchProduct">搜索</button>
      </div>
    </div>
    <main class="scroll-warpper">
        <ul class="tab-list">
          <li class="tab-item" :class="{'tab-active':curIndex==index}" @click="changeTab(index)" v-for="(item,index) in tabList" :key="index">{{item.name}}</li>
        </ul>
      <section class="main-list">
        <ul class="product-list flex">
          <li class="product-item" v-for="(item,index) in productList" :key="index">
            <router-link>
              <div class="product-img">
                <img :src="item.smallPic" :alt="item.title">
              </div>
              <div class="product-info flex align-center">
                <div class="product-name">{{item.title}}</div>
              </div>
              <div class="product-price">
                <span>优惠券：</span>
                <span class="fs-16 danger-color">￥{{item.yhqmoney}}</span>
              </div>
            </router-link>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>
<script>
import HeaderTop from "components/header/index";
import {} from "../../api/index";
export default {
  name: "TianMao",
  data() {
    return {
      searchValue: "",
      curIndex: 0,
      tabList: [],
      productList: []
    };
  },
  components: { HeaderTop },
  computed: {},
  created() {},
  activated() {
    this.searchValue = "";
  },
  methods: {
    searchProduct() {},
    changeTab(index) {
      this.curIndex = index;
    },
    getProduct() {}
  }
};
</script>
<style lang='less' scoped>
.scroll-warpper {
  position: absolute;
  left: 0;
  width: 100%;
  top: 2rem;
  bottom: 0;
  overflow: hidden;
  background-color: @white;
}
@import "../../style/mixin.less";
.tab-list {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  width: 20%;
  border-right: 1px solid #ccc;
  .tab-item {
    line-height: 46px;
    height: 46px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    font-size: 0.28rem;
    &.tab-active {
      color: @red;
    }
  }
}
.main-list {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 20%;
  width: 80%;
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  padding: 5px;
  .product-item {
    width: 50%;
    margin-bottom: 5px;
    border: 1px solid #f7f5f0;
    color: #333;
    .product-img {
      padding: 5px;
      img {
        width: 100%;
      }
    }
    .product-info {
      line-height: 20px;
      height: 40px;
      .product-name {
        display: -webkit-box;
        .multi-ellipsis(2);
        word-wrap: break-word;
        word-break: break-all;
      }
    }
    .product-price {
      font-size: 0.28rem;
      color: @red;
    }
  }
}
</style>