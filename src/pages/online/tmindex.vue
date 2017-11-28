<template>
  <div>
    <yd-navbar title="淘宝|天猫" :fixed="true">
      <section slot="left" @click="goBack">
        <yd-navbar-back-icon>返回</yd-navbar-back-icon>
      </section>
    </yd-navbar>
    <div class="search-form" autocomplete="off">
      <div class="input-group  flex align-center">
        <span class="iconfont-large self-search"></span>
        <input type="search" name="search" class="search-input" placeholder="输入搜索的商品关键词" v-model="searchValue" @keyup.enter="searchProduct">
        <button type="button" class="search-submit" @click="searchProduct">搜索</button>
      </div>
    </div>
    <main class="scroll-warpper">
      <ul class="tab-list">
        <li class="tab-item" :class="{'danger-bg':curIndex==index}" @click="changeTab(index)" v-for="(item,index) in tabList" :key="index">{{item.catName}}</li>
      </ul>
      <section class="main-list" ref="mainList">
        <yd-infinitescroll :callback="getProduct" ref="pdlist">
          <ul class="product-list flex" slot="list">
            <li class="product-item" v-for="(item,index) in productList" :key="index" @click="navigate(item)">
              <div class="product-img">
                <img :src="item.smallPic" :alt="item.title">
              </div>
              <div class="product-info flex align-center">
                <div class="product-name">{{item.title}}</div>
              </div>
              <div class="product-price">
                <span>优惠券：</span>
                <span class="fs-16 danger-color">￥{{item.yhqmoney || 0}}</span>
              </div>
            </li>
          </ul>
        </yd-infinitescroll>
      </section>
    </main>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getStore } from "components/common/mixin";
import {
  findProdutCat,
  findProductList,
  findProductListBySerch
} from "../../api/index";
export default {
  name: "TianMao",
  data() {
    return {
      oldBack: mui.back,
      searchValue: "",
      pageNo: 1,
      curIndex: 0,
      tabList: [],
      productList: []
    };
  },
  computed: {
    ...mapState(["member"])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      mui.back = vm.goBack;
    });
  },
  beforeRouteLeave(to, from, next) {
    mui.back = this.oldBack;
    next();
  },
  created() {
    this.getCatalog();
  },
  activated() {
    if (getStore("account") && getStore("account").length > 0) {
      this.$store.dispatch("getInfo");
    }
    this.searchValue = "";
  },
  methods: {
    goBack(){
      this.$router.replace("/online/index");
    },
    searchProduct() {
      if (!this.searchValue) {
        this.$dialog.alert({
          mes: "请输入关键词！"
        });
        return;
      }
      this.pageNo = 1;
      this.$refs.pdlist.$emit("ydui.infinitescroll.reInit");
      this.productList = [];
      let vm = this;
      this.$dialog.loading.open();
      mui.ajax({
        url: findProductListBySerch,
        type: "get",
        data: {
          keyWord: this.searchValue,
          page: this.pageNo
        },
        success(res) {
          vm.$dialog.loading.close();
          vm.productList = [...vm.productList, ...res];
          if (res.length < 30) {
            vm.$refs.pdlist.$emit("ydui.infinitescroll.loadedDone");
            return;
          }
          vm.$refs.pdlist.$emit("ydui.infinitescroll.finishLoad");
          vm.pageNo++;
        }
      });
    },
    changeTab(index) {
      this.pageNo = 1;
      this.curIndex = index;
      this.$refs.mainList.scrollTop = 0;
      this.$refs.pdlist.$emit("ydui.infinitescroll.reInit");
      this.productList = [];
      this.getProduct();
    },
    getCatalog() {
      let vm = this;
      mui.ajax({
        url: findProdutCat,
        type: "get",
        success(res) {
          vm.tabList = res;
          vm.getProduct();
        }
      });
    },
    getProduct() {
      let vm = this;
      this.$dialog.loading.open();
      mui.ajax({
        url: findProductList,
        type: "get",
        data: {
          type: this.tabList[this.curIndex].id,
          page: this.pageNo
        },
        success(res) {
          vm.$dialog.loading.close();
          vm.productList = [...vm.productList, ...res];
          if (res.length < 30) {
            vm.noData = true;
            vm.$refs.pdlist.$emit("ydui.infinitescroll.loadedDone");
            return;
          }
          vm.$refs.pdlist.$emit("ydui.infinitescroll.finishLoad");
          vm.pageNo++;
        }
      });
    },
    navigate(pd) {
      if (!this.member) {
        this.$router.push("/me/login");
        return;
      }
      let pdId = pd.id;
      let userId = `1004${this.member.id}`;//广州：1004，O2O：1003，云南：1002，湛江：1001
      let url = `http://aihua.likecs.com/index.php?mod=aihua&act=fenghuang&param=detail&id=${pdId}&userid=${userId}&phone=${this
        .member
        .mobile}&email=102286545@qq.com&kh=fenghuang&tbnum=4654646465465`;
        this.$router.push({name:"TMDetail",params:{url}})
    }
  }
};
</script>
<style lang='less' scoped>
  @import "../../style/mixin.less";
.scroll-warpper {
  position: absolute;
  left: 0;
  width: 100%;
  top: 2rem;
  bottom: 0;
  overflow: hidden;
  background-color: @white;
}
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
    padding: 5px;
    border: 1px solid #f7f5f0;
    color: #333;
    .product-img {
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