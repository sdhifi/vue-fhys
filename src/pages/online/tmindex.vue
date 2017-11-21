<template>
  <div>
    <header-top title="淘宝|天猫"></header-top>
    <div class="search-form" autocomplete="off">
      <div class="input-group  flex align-center">
        <span class="iconfont-large self-search"></span>
        <input type="search" name="search" class="search-input" placeholder="输入搜索的商品关键词" v-model="searchValue" @keyup.enter="searchProduct">
        <button type="button" class="search-submit" @click="searchProduct">搜索</button>
      </div>
    </div>
    <main class="scroll-warpper">
      <ul class="tab-list">
        <li class="tab-item" :class="{'tab-active':curIndex==index}" @click="changeTab(index)" v-for="(item,index) in tabList" :key="index">{{item.catName}}</li>
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
import HeaderTop from "components/header/index";
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
      searchValue: "",
      pageNo: 1,
      curIndex: 0,
      tabList: [],
      productList: []
    };
  },
  components: { HeaderTop },
  computed: {
    ...mapState(["member"])
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
    searchProduct() {
      if (!this.searchValue) {
        this.$dialog.alert({
          mes: "请输入关键词！"
        });
        return;
      }
      this.pageNo = 1;
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
            vm.noData = true;
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
      let userId = `1004${this.member.id}`;
      let url = `http://aihua.likecs.com/index.php?mod=aihua&act=fenghuang&param=detail&id=${pdId}&userid=${userId}&phone=${this
        .member
        .mobile}&email=102286545@qq.com&kh=fenghuang&tbnum=4654646465465`;
        this.$router.push({name:"TMDetail",params:{url}})
      // window.location.href = url;
      // mui.openWindow({
      //   url,
      //   id:"tmall-product-detail",
      //   styles:{
      //     top:"1rem",
      //     bottom:"0",
      //     titleNView:{
      //       titleText:"优惠券",
      //       titleColor:"#5C5C5C",
      //       backgroundColor:"#FFFFFF",
      //       fontSize:"0.4rem",
      //       progress:{
      //         color:"#00FF00",
      //         height:"2px"
      //       },
      //       splitLine:{
      //         color:"#FFF7F5",
      //         height:"1px"
      //       }
      //     }
      //   }
      // })
      // mui.openWindowWithTitle(
      //   {
      //     url,
      //     id: "tmall-product-detail"
      //   },
      //   {
      //     id: "title", //导航栏ID,默认为title,若不指定将会使用WebviewOptions中指定的 [webviewID+ "_title"] 作为id
      //     height: "44px", //导航栏高度值
      //     backgroundColor: "#f7f7f7", //导航栏背景色
      //     bottomBorderColor: "#cccccc", //底部边线颜色
      //     title: {
      //       //标题配置
      //       text: "优惠券", //标题文字
      //       position: {
      //         //绘制文本的目标区域，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.Rect
      //         top: 0,
      //         left: 0,
      //         width: "100%",
      //         height: "100%"
      //       },
      //       styles: {
      //         //绘制文本样式，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.TextStyles
      //         color: "#000000",
      //         align: "center",
      //         family: "'Helvetica Neue',Helvetica,sans-serif",
      //         size: "17px",
      //         style: "normal",
      //         weight: "normal",
      //         fontSrc: ""
      //       }
      //     },
      //     back: {
      //       //左上角返回箭头
      //       image: {
      //         //图片格式
      //         base64Data:
      //           "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAb1BMVEUAAAAAev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8AAACubimgAAAAI3RSTlMAGfUTGfQTGPMSGPIYGhgaGBsXGxcbFxwXHBccFhwWHRYdHWufDPQAAAABYktHRACIBR1IAAAAB3RJTUUH4QETEBwooeTlkQAAAJVJREFUSMft1EkSgkAQRNFGUXFWHBDBibr/HTUwD5B/48Ig1y+io7u6MqUhf5hsNEY+j5hMgZ/FJ8Xc9ovos3T96utjbfqN/Nb0O/m96Uv5g+mP8ifTn+Ur01/ka9Nf5RvTt/I309/lH6Z/yr9Mn+Q71/MT8B34K/E58Enzv8R/K98HvnF8p3lr8F7izce7lbf3kJ/lDQp9HdBhgg3PAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTAxLTE5VDE2OjI4OjQwKzA4OjAwpTDFwQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wMS0xOVQxNjoyODo0MCswODowMNRtfX0AAAAASUVORK5CYII=", //加载图片的Base64编码格式数据 base64Data 和 imgSRC 必须指定一个.否则不显示返回箭头
      //         sprite: {
      //           //图片源的绘制区域，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.Rect
      //           top: "0px",
      //           left: "0px",
      //           width: "100%",
      //           height: "100%"
      //         },
      //         position: {
      //           //绘制图片的目标区域，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.Rect
      //           top: "10px",
      //           left: "10px",
      //           width: "24px",
      //           height: "24px"
      //         }
      //       },
      //       click: function() {
      //         //重写 点击返回图标时执行的回调函数，默认执行mui.back();
      //         // mui.back();
      //         history.go(-1);
      //       }
      //     }
      //   }
      // );
    }
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