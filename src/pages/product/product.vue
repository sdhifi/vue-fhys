<template>
  <div>
    <header-top></header-top>
    <main class="scroll-content-2">
      <section class="pd-container">
        <div class="pd-cover">
          <img :src="pdDetail.imgUrl1" alt="">
          <div class="pd-desc">{{pdDetail.name}}</div>
        </div>
        <div class="pd-price fs-12">
          <span class="pd-rmb danger-color">￥</span>
          <span class="pd-price1 danger-color fs-20">{{formatPrice(pdDetail.price)}}</span>
          <span class="pd-price2">门市价:￥{{formatPrice(pdDetail.marketPrice)}}</span>
        </div>
      </section>
      <section class="seller-container">
        <h2 class="fs-16">商家信息</h2>
        <div class="flex align-center">
          <div class="seller-info">
            <div class="seller-name fs-14">
              <span class="iconfont self-seller danger-color"></span>
              {{pdDetail.storeName}}
            </div>
            <div class="seller-address">
              <span class="iconfont self-location danger-color"></span>
              {{pdDetail.storeAddress}}
              <p class="fs-12">距离我最近{{formatDis(pdDetail.distance)}}</p>
            </div>
          </div>
          <a class="seller-tel" :href="'tel:'+pdDetail.storeMobile">
            <span class="iconfont self-tel danger-color" style="font-size:.8rem;"></span>
          </a>
        </div>
      </section>
      <section class="tip-container">
        <h3 class="fs-14 danger-color">购买须知</h3>
        <ul>
          <li class="tip-item">有效期：
            <div>{{pdDetail.indate||'暂无'}}</div>
          </li>
          <li class="tip-item">
            使用规则：
            <div>{{pdDetail.notice||'暂无'}}</div>
          </li>
        </ul>
      </section>
      <yd-cell-group>
        <yd-cell-item :arrow="comment.count>0">
          <span slot="left">
            <span>用户评价({{pdDetail.score||0}}分)</span>
            <rater :value="pdDetail.score"></rater>
          </span>
          <span slot="right">共{{comment.count||0}}条</span>
        </yd-cell-item>
      </yd-cell-group>
      <section class="hot-container">
        <div class="title-wrap text-center">
          <div class="like-title">
            <span class="iconfont self-crown fs-20"></span>
            <span class="fs-16">本店热销</span>
          </div>
        </div>
        <yd-infinitescroll :on-infinite="getHotProduct" ref="pdlist">
          <div slot="list">
            <product-item v-for="item in productList" :key="item.id" :item="item"></product-item>
          </div>
          <p slot="doneTip">没有数据啦</p>
        </yd-infinitescroll>
      </section>
    </main>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import HeaderTop from 'components/header/index'
import Rater from 'components/common/Rater'
import { product, hotProduct } from '../../api/index'
import { mixin } from 'components/common/mixin'

export default {
  name: 'Product',
  data() {
    return {
      noata: false,
      pageNo: 1,
      comment: {},
      pdDetail: {},
      productList: []
    }
  },
  components: { HeaderTop, Rater },
  computed: { ...mapState(['longitude', 'latitude']) },
  mixins: [mixin],
  created() {
    this.init();
  },
  activated() {
    this.init();
  },
  methods: {
    init() {
      this.getDetail();
      this.getHotProduct();
    },
    getDetail() {
      let vm = this;
      mui.ajax({
        url: product + this.$route.params.id,
        type: 'post',
        headers: { "app-version": "v1.0" },
        data: {
          longitude: this.longitude,
          latitude: this.latitude,
          id: this.$route.params.id,
          token: md5(`productDetail${this.longitude}${this.latitude}`)
        },
        success(res) {
          let result = res.result
          vm.pdDetail = result.product;
          vm.comment = Object.assign({}, { count: result.comCount, cmt: result.comment })
        }
      })
    },
    getHotProduct() {
      let vm = this;
      if (!this.noData) {
        mui.ajax({
          url: hotProduct,
          type: 'post',
          headers: { 'app-version': 'v1.0' },
          data: {
            pageNo: this.pageNo,
            pageSize: 10,
            id: this.$route.params.id,
            token: md5(`hotProduct${this.$route.params.id}`)
          },
          success(res) {
            let _list = res.result;
            vm.productList = [...vm.productList, ..._list];
            if (_list.length < 10) {
              vm.noData = true;
              vm.$refs.pdlist.$emit('ydui.infinitescroll.loadedDone');
              return;
            }
            vm.$refs.pdlist.$emit('ydui.infinitescroll.finishLoad');
            vm.pageNo++;
          }
        })
      }

    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
@pd: .2rem;
section {
  padding: @pd;
  background-color: @white;
  margin-bottom: @pd;
}

.pd-container {
  .pd-cover {
    position: relative;
    img {
      width: 100%;
      max-height: 5rem;
    }
    .pd-desc {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to bottom, rgba(255, 255, 255, .3), rgba(0, 0, 0, .8));
      color: @white;
      font-size: 14px;
      padding: .1rem;
      box-shadow: 0 -5px 5px rgba(255, 255, 255, .3) inset;
    }
  }
  .pd-price {
    color: #999;
    padding: @pd 0 0 0;
    .pd-price1 {
      margin: 0 @pd 0 -3px;
    }
  }
}

.seller-container {
  h2 {
    font-weight: normal;
    text-align: center;
    padding: .1rem;
    border-bottom: 1px solid #dfdfdf;
  }
  .seller-info {
    flex: 1;
    >div {
      margin: @pd;
    }
    .iconfont {
      margin-right: .1rem;
    }
    .seller-address {
      p {
        color: #999;
        margin-left: .4rem;
      }
    }
  }
  .seller-tel {
    width: 40px;
    height: 40px;
  }
}

.tip-container {
  h3 {
    .flex;
    .align-items(center);
    font-weight: normal;
    padding: @pd 0;
  }
  .tip-item {
    margin-bottom: @pd;
  }
  div {
    color: @lightgray;
  }
}
</style>