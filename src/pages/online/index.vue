<template>
  <div>
    <header-top title="网上商城" :back="false"></header-top>
    <main class='scroll-content'>
      <section>
        <yd-slider>
          <yd-slider-item v-for="(item,index) in info.indexAds" :key="item.id">
            <router-link :to="'/online/product?id='+item.address.substring(item.address.lastIndexOf('/')+1)">
              <img :src="item.photo" :alt="item.names">
            </router-link>
          </yd-slider-item>
        </yd-slider>
      </section>
      <section class="column-list flex text-center align-center">
        <router-link :to="{path:'/online/products',query:{type:0,id:item.id}}" class="column-item" v-for="item in info.indexColumns" :key="item.id">
          <img :src="getImgPath(item.pic2)" alt="" class="column-img">
          <p>{{item.names}}</p>
        </router-link>
        <router-link class="column-item" to="/online/allcolumn">
          <div :style="{'background-image':formatBg('column.png')}" class="column-img column-all"></div>
          <p>全部分类</p>
        </router-link>
      </section>
      <section class="pd-list" v-for="(item,index) in pds" :key="index">
        <yd-cell-group>
          <yd-cell-item arrow type="link" :href="'/online/products?type=1&id='+item.id+'&pdtype='+index">
            <span slot="icon" class="iconfont self-libao" style="color:#f98e25;font-size:20px;"></span>
            <span slot="left">{{item.label}}</span>
            <span slot="right">更多</span>
          </yd-cell-item>
        </yd-cell-group>
        <ul class="flex just-between">
          <router-link :to="{path:'/online/product',query:{id:pd.id,pdtype:index}}" v-for="pd in item.list" :key="pd.id" tag="li" class="pd-item">
            <div class="img-cover">
              <img :src="pd.imgUrl" :alt="pd.name">
            </div>
            <h3 class="title">{{pd.name}}</h3>
            <div class="price" v-if="item.label=='积分换购'">
              <span>￥{{formatPrice(pd.pointNicePrice)}}</span>+
              <span>{{formatPrice(pd.price)}}积分</span>
            </div>
            <div class="price" v-else-if="item.label=='责任消费'">
              <span>￥{{formatPrice(pd.pointNicePrice)}}</span>+
              <span>{{formatPrice(pd.price)}}责任金额</span>
            </div>
            <div class="price" v-else>
              <span>￥{{formatPrice(pd.price)}}</span>
            </div>
          </router-link>
        </ul>
      </section>
    </main>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import FooterBar from 'components/footer/index'
import { Swiper, SwiperItem } from 'vux'
import { mixin } from 'components/common/mixin'
import { onlineInH5 } from '../../api/index'
export default {
  name: 'Online',
  data() {
    return {
      oldBack: mui.back,
      info: {},
      pds: []
    }
  },
  components: { HeaderTop, FooterBar },
  computed: {

  },
  mixins: [mixin],
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.plusReady();
    })
  },
  beforeRouteLeave(to, from, next) {
    mui.back = this.oldBack;
    next();
  },
  created() {
    this.getInfo();
  },
  activated() {

  },
  methods: {
    getInfo() {
      let vm = this;
      mui.ajax({
        url: onlineInH5,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          token: md5(`onlineInH5`)
        },
        success(res) {
          let _pds = [];
          Object.entries(res.result.indexProducts).forEach((value, index) => {
            var item = {};
            var desc = value[0].split(/[;|~]/);
            item.label = desc[0];
            item.icon = desc[1];
            item.id = desc[2];
            item.list = value[1];
            _pds.push(item);
            // console.log(value[0].split(/[;|~]/))
          })
          vm.info = res.result;
          vm.pds = _pds;
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
section {
  margin-bottom: @pd;
  background-color: @white;
}

.column-list {
  padding-bottom: @pd;
  .column-item {
    margin-top: @pd;
    width: 25%;
    .column-img {
      .wh(1rem, 1rem);
      margin: 0 auto;
    }
    .column-all {
      background-size: contain;
    }
    p {
      margin-top: @pd / 2;
      font-size: .28rem;
    }
  }
}

.pd-list {
  ul {
    .pd-h;
  }
  .pd-item {
    width: 48%;
    padding: .1rem;
    margin-bottom: @pd;
    border: 1px solid #dfdfdf;
    .img-cover {
      position: relative;
      width: 100%;
      overflow: hidden;
      padding: 50% 0;
      img {
        width: 100%;
        .hv-cen;
      }
    }

    .title {
      .multi-ellipsis(2);
      font-size: .3rem;
      height: .8rem;
      font-weight: normal;
      word-wrap: break-word;
      word-break: break-all;
    }
    .price {
      margin-top: .1rem;
      font-size: 14px;
      span:first-of-type {
        color: @red;
      }
      span:nth-of-type(2) {
        font-size: 12px;
        color: @lightgray;
      }
    }
  }
}
</style>