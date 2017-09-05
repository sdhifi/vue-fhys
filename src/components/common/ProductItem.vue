<template>
  <div class="like-item">
    <router-link :to="{path:'/product/product/' + item.id}" class="like-link">
      <div class="product-cover">
        <img :src="item.imgUrl" :alt="item.name" />
      </div>
      <div class="product-info">
        <div class="product-head flex">
          <h3>{{item.storeName}}</h3>

        </div>
        <div class="product-score flex align-center">
          <crown :value="item.score"></crown>
          <div class="score-num">{{item.score||0}}分</div>
          <div class="product-address">
            <span class="iconfont self-location danger-color"></span>
            <span class="product-distance">{{formatDis(item.distance)}}</span>
          </div>
        </div>
        <div class="product-content">
          {{item.name||"暂无"}}
        </div>
        <div class="product-price">
          <span class="price">￥{{item.price}}.00</span>
          <span class="market-price">门市价：￥{{formatPrice(item.marketPrice)}}</span>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
import { mixin } from 'components/common/mixin'
import Crown from './Crown'
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
  components: { Crown },
  mixins: [mixin],

}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
.like-item {
  position: relative;
  border-bottom: 1px solid #f7f5f5; /*兼容部分机型*/
  .pd-v;
  .mg-h;
}

.like-link {
  display: flex;
  color: @lightgray;
  .product-cover {
    .wh(2rem, 2rem);
    img {
      .wh(100%, 100%);
    }
  }
  .product-info {
    flex: 1;
    width: 1%;
    margin-left: @pd;
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
    }
    .product-score {
      margin: .1rem 0;
      .score-num {
        margin-left: @pd;
      }
    }
    .product-address {
      position: absolute;
      right: 0;
      font-size: 0;
      
      .product-distance {
        color: @red;
        border: 1px solid currentColor;
        border-left: none;
        padding: 2px 2px 2px 2px;
        border-radius: 0 5px 5px 0;
        font-size: 10px;
        margin-left: -3px;
        vertical-align: -4px;
      }
    }
    .product-content {
      .ellipsis;
      margin: 0 0 @pd 0;
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