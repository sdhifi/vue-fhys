<template>
  <div>
    <header-top :back="false"></header-top>
    <main class="scroll-content">
      <section class="head-container">
        <div class="head-cover" :style="{'background-image':formatBg('mine_background.png')}">
          <router-link :to="{name:'Update',params:{member}}">
            <!-- <img :src="member.imgHeadUrl" :alt="member.name"> -->
            <div class="head-img" :style="{'background-image':'url('+getImgPath(member.imgHeadUrl)+')'}"></div>
          </router-link>
          <span class="sex-tag" :style="{'background-color':member.sex=='0'?'#4cd864':(member.sex=='1'?'#57A9FF':'#f860ef')}">{{member.sex=='0'?'无':(member.sex=='1'?'男':'女')}}</span>
        </div>
        <div class="head-info">
          <div class="name">{{member.name||member.nickName||member.mobile}}</div>
          <p class="desc">{{member.remark||'备注信息'}}</p>
        </div>
      </section>
      <section class="order-container">
        <div class="order-item flex align-center px-1">
          <div class="order-left">我的订单</div>
          <router-link :to="{path:'/me/myorder',query:{id:7}}" class="order-right order-arrow">
            <span>查看所有订单</span>
          </router-link>
        </div>
        <ul class="flex just-around align-center">
          <router-link :to="{path:item.link,query:{id:item.id}}" v-for="(item,index) in order" tag="li" :key="index">
            <span class="iconfont-large" :class="item.icon"></span>
            <p>{{item.name}}</p>
          </router-link>
        </ul>
      </section>
      <section v-for="(item,index) in menu" :key="index">
        <yd-cell-group>
          <yd-cell-item v-for="(cell,i) in item" :key="i" arrow :type="cell.type" @click.native="navigate(cell)">
            <span class="iconfont-large" :class="cell.icon" slot="icon"></span>
            <span slot="left">{{cell.name}}</span>
            <a slot="right" v-if="cell.right" style="color:gold;" :href="'tel:'+cell.right">{{cell.right}}</a>
          </yd-cell-item>
        </yd-cell-group>
      </section>
      <section class="btn-container">
        <button type="button" class="sign-btn" @click="signOut">退出登录</button>
      </section>
    </main>
    <footer-bar></footer-bar>
    <yd-popup v-model="showPopup" position="center" width="90%">
      <div class="ruzhu-container">
        <h3 class="ruzhu-title">您还未入驻凤凰云商O2O</h3>
        <div class="ruzhu-content">
          <div>
            <input type="radio" name="settle-way" id="1" value="1" v-model="settleWay">
            <label class="ruzhu-item" for="1">
              <span class="iconfont self-qiye"></span>
              <p>企业入驻</p>
            </label>
          </div>
          <div>
            <input type="radio" name="settle-way" id="0" value="0" v-model="settleWay">
            <label class="ruzhu-item" for="0">
              <span class="iconfont self-geti"></span>
              <p>个体入驻</p>
            </label>
          </div>
        </div>
        <yd-button type="danger" size="large" @click.native="settle">确认</yd-button>
        <span class="close" @click="showPopup=false;"></span>
      </div>
    </yd-popup>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import FooterBar from 'components/footer/index'
import { my } from '../../api/index'
import { mixin, getStore, removeStore } from 'components/common/mixin'
export default {
  name: 'Me',
  data() {
    return {
      oldBack: mui.back,
      member: {},
      showPopup: false,
      settleWay: '',
      order: [{
        id: 0,
        name: '待付款',
        icon: 'self-pay',
        link: '/me/myorder'
      }, {
        id: 1,
        name: '待发货',
        icon: 'self-delivery',
        link: '/me/myorder'
      }, {
        id: 2,
        name: '待收货',
        icon: 'self-recept',
        link: '/me/myorder'
      }, {
        id: 3,
        name: '交易完成',
        icon: 'self-success',
        link: '/me/myorder'
      }],
      menu: [
        [
          {
            name: '我的二维码',
            icon: 'self-qrcode c1',
            link: '/me/qrcode',
            type: 'label'
          },
          {
            name: '我的钱包',
            icon: 'self-wallet c2',
            link: '/me/mywallet',
            type: 'label'
          },
          {
            name: '购物车',
            icon: 'self-shopcart c1',
            link: '/me/shopcart',
            type: 'label'
          },
          {
            name: '设置支付密码',
            icon: 'self-setting c1',
            link: '/me/setting',
            type: 'label'
          }
        ], [
          {
            name: '我是商家',
            icon: 'self-seller c1',
            link: '/me/seller',
            type: 'label'
          },
          {
            name: '我推荐的人',
            icon: 'self-group c1',
            link: '/me/recommend',
            type: 'label'
          },
          {
            name: '地址管理',
            icon: 'self-address c2',
            link: '/me/address',
            type: 'label'
          },
          {
            name: '我的收藏',
            icon: 'self-heart c1',
            link: '/me/collect',
            type: 'label'
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
            link: '/me/about',
            type: 'label'
          }
        ]
      ]
    }
  },
  components: { HeaderTop, FooterBar },
  created() {
    //this.getInfo();
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
  activated() {
    if ((getStore("account") && getStore("account").length > 0)) {
      this.$store.commit('SET_ACCOUNT', getStore("account"));
      this.getInfo();
    }
    else {
      this.$router.push('/me/login')
    }
  },
  methods: {
    getInfo() {
      let vm = this;
      let account = getStore('account');
      mui.ajax({
        url: my,
        type: 'post',
        headers: { 'app-version': 'v1.0' },
        data: {
          account,
          token: md5(`my${account}`)
        },
        success(res) {
          vm.member = res.result;
        }
      })
    },
    navigate(item) {
      if (/seller/.test(item.link) && this.member.type == '0') {
        this.showPopup = true;
        return;
      }
      if(/recommend/.test(item.link)){
        this.$router.push({name:'Recommend',params:{id:this.member.id}})
      }
      item.link && this.$router.push(item.link);
    },
     settle() {
      if (this.settleWay == '') {
        this.$dialog.toast({
          mes: '请选择一种入驻方式后再确认',
          timeout: 1500
        })
        return;
      }
      this.showPopup = false;
      this.$router.push({path:'/store/settle',query:{id:this.settleWay}})

    },
    signOut() {
      removeStore('account');
      this.$store.commit('SET_ACCOUNT', '');
      this.$dialog.toast({
        mes: '退出成功',
        timeout: 1000,
        callback: () => {
          this.$router.push('/me/login');
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
  .text-center;
  .head-cover {
    height: 1.4rem;
    background-size: cover;
    a {
      .h-cen;
      top: .4rem;
      z-index: 10;
      border: 3px solid rgba(255, 255, 255, 0.5);
      border-radius: 50%;
    }
    img {
      .wh(1.6rem, 1.6rem);
      border-radius: 50%;
    }
    .head-img {
      .wh(1.6rem, 1.6rem);
      border-radius: 50%;
      background-size: cover;
      background-repeat: no-repeat;
      background-color: #fff;
    }
    .sex-tag {
      position: absolute;
      left: 2.3rem;
      top: .8rem;
      padding: @pd / 2 @pd;
      border-radius: 15px 0 0 0;
      width: .9rem;
      color: @white;
      background-color: @green;
      z-index: 5;
      text-align: left;
    }
  }
  .head-info {
    height: 1.6rem;
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
      color: #333;
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
  .text-center;
  ul {
    .pd-v;
  }
  p {
    font-size: 12px;
    margin-top: 3px;
  }
}

.btn-container {
  .pd;
  .sign-btn {
    display: block;
    width: 90%;
    margin: 0 auto;
    color: @white;
    background-color: @red;
    font-size: .34rem;
    text-align: center;
    padding: .2rem 0;
    border-radius: 5px;
  }
}
</style>