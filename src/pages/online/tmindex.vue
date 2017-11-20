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
      <aside>
        <ul class="tab-list">
          <li class="tab-item tab-active">热门推荐</li>
          <li class="tab-item">国际大牌</li>
          <li class="tab-item">女装</li>
          <li class="tab-item">女鞋</li>
          <li class="tab-item">男装</li>
          <li class="tab-item">男鞋</li>
          <li class="tab-item">内衣</li>
          <li class="tab-item">母婴</li>
          <li class="tab-item">手机</li>
          <li class="tab-item">数码</li>
          <li class="tab-item">家电</li>
          <li class="tab-item">美妆</li>
          <li class="tab-item">箱包</li>
          <li class="tab-item">运动</li>
          <li class="tab-item">户外</li>
          <li class="tab-item">家装</li>
          <li class="tab-item">家纺</li>
          <li class="tab-item">居家</li>
          <li class="tab-item">鲜花园艺</li>
          <li class="tab-item">饰品</li>
          <li class="tab-item">食品</li>
          <li class="tab-item">生鲜</li>
          <li class="tab-item">汽车摩托</li>
          <li class="tab-item">医药</li>
          <li class="tab-item">图书</li>
          <li class="tab-item">通信</li>
          <li class="tab-item">洗护</li>
          <li class="tab-item">乐器</li>
        </ul>
      </aside>
      <section class="main-list">
        <ul class="product-list flex">
          <li class="product-item">
            <a href="">
              <div class="product-img">
                <img src="https://m.360buyimg.com/mobilecms/s357x357_jfs/t11569/290/1772238500/387735/a89d43fd/5a0918b6N1403ae81.jpg!q50.jpg" alt="">
              </div>
              <div class="product-info flex align-center">
                <div class="product-name">倪妃2017冬季羊毛真皮平底防水防滑雪地靴女短筒加厚保暖加绒短靴女牛筋底孕妇棉鞋女靴女鞋子 卡其色 37</div>
              </div>
              <div class="product-price">
                <span>￥</span>
                <span>199.00</span>
              </div>
            </a>
          </li>
          <li class="product-item">
            <a href="">
              <div class="product-img">
                <img src="https://m.360buyimg.com/mobilecms/s357x357_jfs/t9085/22/907696059/71305/93f88c62/59b85847N20776d8e.jpg!q50.jpg" alt="">
              </div>
              <div class="product-info">
                <div class="product-name">
                  Apple iPhone 8
                </div>
              </div>
              <div class="product-price">
                <span>￥</span>
                <span class="price">5888.00</span>
              </div>
            </a>
          </li>
          <li class="product-item">
            <a href="">
              <div class="product-img">
                <img src="https://m.360buyimg.com/mobilecms/s357x357_jfs/t2308/25/2381146788/201967/9249b208/56cd5463N35ed50c3.jpg!q50.jpg" alt="">
              </div>
              <div class="product-info">
                <div class="product-name">老人头（LAORENTOU）牛皮时尚单肩包欧美潮流斜挎手提包998J086L1A黑色</div>
              </div>
              <div class="product-price">
                <span>￥</span>
                <span>338.00</span>
              </div>
            </a>
          </li>
          <li class="product-item">
            <a href="">
              <div class="product-img">
                <img src="https://m.360buyimg.com/mobilecms/s357x357_jfs/t11569/290/1772238500/387735/a89d43fd/5a0918b6N1403ae81.jpg!q50.jpg" alt="">
              </div>
              <div class="product-info">
                <div class="product-name">倪妃2017冬季羊毛真皮平底防水防滑雪地靴女短筒加厚保暖加绒短靴女牛筋底孕妇棉鞋女靴女鞋子 卡其色 37</div>
              </div>
              <div class="product-price">
                <span>￥</span>
                <span>199.00</span>
              </div>
            </a>
          </li>
          <li class="product-item">
            <a href="">
              <div class="product-img">
                <img src="https://m.360buyimg.com/mobilecms/s357x357_jfs/t9085/22/907696059/71305/93f88c62/59b85847N20776d8e.jpg!q50.jpg" alt="">
              </div>
              <div class="product-info">
                <div class="product-name">
                  Apple iPhone 8
                </div>
              </div>
              <div class="product-price">
                <span>￥</span>
                <span class="price">5888.00</span>
              </div>
            </a>
          </li>
          <li class="product-item">
            <a href="">
              <div class="product-img">
                <img src="https://m.360buyimg.com/mobilecms/s357x357_jfs/t2308/25/2381146788/201967/9249b208/56cd5463N35ed50c3.jpg!q50.jpg" alt="">
              </div>
              <div class="product-info">
                <div class="product-name">老人头（LAORENTOU）牛皮时尚单肩包欧美潮流斜挎手提包998J086L1A黑色</div>
              </div>
              <div class="product-price">
                <span>￥</span>
                <span>338.00</span>
              </div>
            </a>
          </li>
          <li class="product-item">
            <a href="">
              <div class="product-img">
                <img src="https://m.360buyimg.com/mobilecms/s357x357_jfs/t11569/290/1772238500/387735/a89d43fd/5a0918b6N1403ae81.jpg!q50.jpg" alt="">
              </div>
              <div class="product-info">
                <div class="product-name">倪妃2017冬季羊毛真皮平底防水防滑雪地靴女短筒加厚保暖加绒短靴女牛筋底孕妇棉鞋女靴女鞋子 卡其色 37</div>
              </div>
              <div class="product-price">
                <span>￥</span>
                <span>199.00</span>
              </div>
            </a>
          </li>
          <li class="product-item">
            <a href="">
              <div class="product-img">
                <img src="https://m.360buyimg.com/mobilecms/s357x357_jfs/t9085/22/907696059/71305/93f88c62/59b85847N20776d8e.jpg!q50.jpg" alt="">
              </div>
              <div class="product-info">
                <div class="product-name">
                  Apple iPhone 8
                </div>
              </div>
              <div class="product-price">
                <span>￥</span>
                <span class="price">5888.00</span>
              </div>
            </a>
          </li>
          <li class="product-item">
            <a href="">
              <div class="product-img">
                <img src="https://m.360buyimg.com/mobilecms/s357x357_jfs/t2308/25/2381146788/201967/9249b208/56cd5463N35ed50c3.jpg!q50.jpg" alt="">
              </div>
              <div class="product-info">
                <div class="product-name">老人头（LAORENTOU）牛皮时尚单肩包欧美潮流斜挎手提包998J086L1A黑色</div>
              </div>
              <div class="product-price">
                <span>￥</span>
                <span>338.00</span>
              </div>
            </a>
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
      searchValue:"",
      curIndex:0
    };
  },
  components: { HeaderTop },
  computed: {},
  created() {},
  activated() {},
  methods: {
    searchProduct(){},
    changeTab(index){
      this.curIndex = index;
    },
    getProduct(){

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
    font-size: .28rem;
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