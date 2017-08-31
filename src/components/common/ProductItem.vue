<template>
  <div class="like-item px-1">
    <router-link :to="'product/'+item.id" class="like-link">
      <div class="product-cover">
        <img :src="item.imgUrl" :alt="item.name" />
      </div>
      <div class="product-info">
        <div class="product-head flex">
          <h3>{{item.name}}</h3>
          <div class="product-address">
            <span class="iconfont self-location danger-color"></span>
            <span class="product-distance">{{formatDis(item.distance)}}</span>
          </div>
        </div>
        <div class="product-score flex align-center">
          <rater :value="item.score"></rater>
          <div class="score-num">{{item.score||0}}分</div>
        </div>
        <div class="product-content">
          {{item.content||"暂无详情"}}
        </div>
        <div class="product-price">
          <span class="price">￥{{item.price}}.00</span>
          <span class="market-price">门市价：￥{{item.marketPrice}}.00</span>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
import { mixin } from 'components/common/mixin'
import Rater from 'components/common/rater'
export default {
  name: 'ProductItem',
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: { Rater },
  mixins: [mixin],

}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
.like-item {
  padding: .2rem 0;
  margin: 0 .2rem;
}

.like-link {
  display: flex;
  color: #999;
  .product-cover {
    .wh(2rem, 2rem);
    img {
      .wh(100%, 100%);
    }
  }
  .product-info {
    flex: 1;
    width: 1%;
    margin-left: .2rem;
    .product-head {
      font-size: 14px;
      h3 {
        width: 68%;
        .ellipsis;
        color: #333333;
        font-size: 14px;
        font-weight: bold;
        flex: 1;
      }
      .product-address {
        font-size: 0;
        span:first-child {
          font-size: 20px;
        }
        .product-distance {
          color: @red;
          border: 1px solid currentColor;
          border-left: none;
          padding: 2px 2px 2px 0;
          border-radius: 0 5px 5px 0;
          font-size: 12px;
          margin-left: -3px;
          vertical-align: -5px;
        }
      }
    }
    .product-score {
      margin: .1rem 0;
      .score-num {
        margin-left: .5rem;
      }
    }
    .product-content {
      .ellipsis;
      margin: 0 0 .2rem 0;
    }
    .product-price {
      .price {
        font-size: 18px;
        font-weight: bold;
        color: @red;
      }
      .market-price {
        font-size: 12px;
        margin-left: .4rem;
      }
    }
  }
}
</style>