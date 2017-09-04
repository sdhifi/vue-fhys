<template>
  <div>
    <header-top :back="false"></header-top>
    <main class="scroll-content">
      <section class="head-container">
        <div class="head-cover">
          <router-link :to="{name:'Update',params:{member}}">
            <img :src="member.imgHeadUrl" :alt="member.name">
          </router-link>
          <span class="sex-tag" :style="{'background-color':member.sex=='1'?'#57A9FF':'#f860ef'}">{{member.sex=='0'?'无':(member.sex=='1'?'男':'女')}}</span>
        </div>
        <div class="head-info">
          <div class="name">{{member.name||member.nickName}}</div>
          <p class="desc">{{member.remark||'备注信息'}}</p>
        </div>
      </section>
      <section class="order-container">
        <div class="order-item flex align-center px-1">
          <div class="order-left">我的订单</div>
          <div class="order-right order-arrow">
            <span>查看所有订单</span>
          </div>
        </div>
        <ul class="flex just-around align-center">
          <router-link :to="{path:item.link}" v-for="(item,index) in order" tag="li" :key="index">
            <span class="iconfont-large" :class="item.icon"></span>
            <p>{{item.name}}</p>
          </router-link>
        </ul>
      </section>
      <section v-for="(item,index) in menu" :key="index">
        <yd-cell-group>
          <yd-cell-item v-for="(cell,i) in item" :key="i" :arrow="cell.type=='link'" :type="cell.type" :href="cell.link">
            <span class="iconfont-large" :class="cell.icon" slot="icon"></span>
            <span slot="left">{{cell.name}}</span>
            <a slot="right" v-if="cell.right" style="color:gold;" :href="'tel:'+cell.right">{{cell.right}}</a>
          </yd-cell-item>
        </yd-cell-group>
      </section>
    </main>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import FooterBar from 'components/footer/index'
import { my } from '../../api/index'
export default {
  name: 'Me',
  data() {
    return {
      member: {},
      order: [{
        name: '待付款',
        icon: 'self-pay',
        link: '/me/pay'
      }, {
        name: '待发货',
        icon: 'self-delivery',
        link: '/me/delivery'
      }, {
        name: '待收货',
        icon: 'self-recept',
        link: '/me/recept'
      }, {
        name: '交易完成',
        icon: 'self-success',
        link: '/me/trade'
      }],
      menu: [
        [
          {
            name: '我的二维码',
            icon: 'self-qrcode c1',
            link: '/me/qrcode',
            type: 'link'
          },
          {
            name: '我的钱包',
            icon: 'self-wallet c2',
            link: '/me/wallet',
            type: 'link'
          },
          {
            name: '购物车',
            icon: 'self-shopcart c1',
            link: '/me/qrcode',
            type: 'link'
          },
          {
            name: '设置支付密码',
            icon: 'self-setting c1',
            link: '/me/setting',
            type: 'link'
          }
        ], [
          {
            name: '我是商家',
            icon: 'self-seller c1',
            link: '/me/seller',
            type: 'link'
          },
          {
            name: '我推荐的人',
            icon: 'self-group c1',
            link: '/me/recommend',
            type: 'link'
          },
          {
            name: '地址管理',
            icon: 'self-address c2',
            link: '/me/address',
            type: 'link'
          },
          {
            name: '我的收藏',
            icon: 'self-heart c1',
            link: '/me/collect',
            type: 'link'
          }
        ], [
          {
            name: '联系客服',
            icon: 'self-service c1',

            right: '020-29030366'
          },
          {
            name: '关于凤凰云商O2O',
            icon: 'self-about c2',
            link: '/me/wallet',
            type: 'link'
          },
          {
            name: 'app下载',
            icon: 'self-download c2',
            link: '/me/download',
            type: 'link'
          }
        ]
      ]
    }
  },
  components: { HeaderTop, FooterBar },
  created() {
    this.getInfo();
  },
  activated() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      let vm = this;
      mui.ajax({
        url: my,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          account: '13544384685',
          token: md5('my13544384685')
        },
        success(res) {
          vm.member = res.result;
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
section {
  background-color: #fff;
  margin-bottom: @pd;
}

.c1 {
  color: #f37370;
}

.c2 {
  color: #f8a24e;
}

.head-container {
  text-align: center;
  .head-cover {
    position: relative;
    height: 1.4rem;
    background-image: url(/static/mine_background.png);
    background-size: cover;
    a {
      .h-cen;
      top: .4rem;
      z-index: 10;
    }
    img {
      .wh(1.6rem, 1.6rem);
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, .5);
    }
    .sex-tag {
      position: absolute;
      left: 30%;
      top: .8rem;
      padding: 5px 10px;
      border-radius: 15px 0 0 0;
      width: 48px;
      color: @white;
      background-color: @green;
      z-index: 5;
    }
  }
  .head-info {
    height: 1.4rem;
    padding-top: .4rem;
    .flex;
    .just-cont(center);
    .align-items(center);
    flex-direction: column;
    .name {
      font-size: 16px;
    }
    .desc {
      .ellipsis;
      color: @lightgray;
    }
  }
}

.order-container {
  .order-item {
    .pd-v;
    font-size: 14px;
    .order-left {
      padding-left: .2rem;
    }
    .order-right {
      flex: 1;
      padding-right: .24rem;
      text-align: right;
    }
    .order-arrow {
      &::after {
        margin-left: .05rem;
        margin-right: -.08rem;
        font-family: YDUI-INLAY;
        font-size: 12px;
        color: #c9c9c9;
        content: "\E608";
      }
    }
  }
  color: @lightgray;
  text-align: center;
  ul {
    .pd-v;
  }
  p {
    font-size: 12px;
    margin-top: 3px;
  }
}
</style>