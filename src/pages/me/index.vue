<template>
  <div>
    <header-top :back="false" title="个人中心"></header-top>
    <main class="scroll-content">
      <section class="head-container">
        <div class="head-cover" :style="{'background-image':formatBg('mine_background.png')}">
          <router-link :to="{name:'Update'}">
            <div class="head-img" v-lazy:background-image="getImgPath(member.imgHeadUrl)"></div>
          </router-link>
        </div>
        <div class="head-info">
          <div class="name">
            <span>{{member.name||member.nickName||member.mobile}}</span>
            <span class="iconfont self-sex" :style="{'color':'#4cd864'}" v-if="member.sex=='3'"></span>
            <span class="iconfont self-male" :style="{'color':'#57A9FF'}" v-if="member.sex=='1'"></span>
            <span class="iconfont self-female" :style="{'color':'#f860ef'}" v-if="member.sex=='2'"></span>
          </div>
          <p class="desc">{{member.remark||'备注信息'}}</p>
        </div>
      </section>
      <section class="order-container">
        <yd-cell-group>
          <yd-cell-item arrow type="link" href="/order/index?id=0">
            <span class="iconfont self-dingdanguanli" slot="icon" style="font-size:20px;"></span>
            <span slot="left">我的订单</span>
            <span slot="right">查看所有订单</span>
          </yd-cell-item>
        </yd-cell-group>
        <ul class="flex just-around align-center">
          <router-link :to="{path:item.link,query:{id:index+1}}" v-for="(item,index) in order" tag="li" :key="index">
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
            <a slot="right" v-if="cell.tel" style="color:gold;">{{cell.tel}}</a>
            <yd-badge slot="right" v-if="cell.badge&&cartNum>0" type="danger">{{cartNum}}</yd-badge>
          </yd-cell-item>
        </yd-cell-group>
      </section>
      <section class="btn-container">
        <button type="button" class="sign-btn" @click="signOut">退出登录</button>
      </section>
    </main>
    <footer-bar></footer-bar>
    <cert-modal></cert-modal>
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
        <span class="close iconfont-large self-guanbi" @click="showPopup=false;"></span>
      </div>
    </yd-popup>
    <yd-popup v-model="showDialog" position="center" width="80%">
      <div class="tel-container text-center">
        <a href="tel:020-29030366" class="tel-box flex align-center">
          <span class="iconfont-large self-dianhua danger-color"></span>
          <span class="tel-num">拨打:020-29030366</span>
        </a>
        <p>
          <span>工作日9:00-12:00 13:30-18:00 </span><br>节假日不上班，不便之处，尽请谅解</p>
        <p class="fs-14">
          (客服微信：gjfeng-kf01 、 gjfeng-kf02)
        </p>
        <yd-button type="danger" @click.native="showDialog=false">我知道了</yd-button>
      </div>
    </yd-popup>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import HeaderTop from "components/header/index";
import FooterBar from "components/footer/index";
import CertModal from "components/common/CertModal";
import { mixin, getStore, removeStore } from "components/common/mixin";
export default {
  name: "Me",
  data() {
    return {
      oldBack: mui.back,
      showPopup: false,
      settleWay: "",
      order: [
        {
          id: 0,
          name: "待付款",
          icon: "self-pay",
          link: "/order/index"
        },
        {
          id: 1,
          name: "待发货",
          icon: "self-delivery",
          link: "/order/index"
        },
        {
          id: 2,
          name: "待收货",
          icon: "self-recept",
          link: "/order/index"
        },
        {
          id: 3,
          name: "交易完成",
          icon: "self-success",
          link: "/order/index"
        }
      ],
      menu: [
        [
          {
            name: "我的二维码",
            icon: "self-qrcode c1",
            link: "/me/qrcode",
            type: "label"
          },
          {
            name: "我的钱包",
            icon: "self-wallet c2",
            link: "/me/mywallet",
            type: "label"
          },
          {
            name: "购物车",
            icon: "self-shopcart c1",
            link: "/online/shoppingcart",
            type: "label",
            badge: true
          },
          {
            name: "设置密码",
            icon: "self-setting c1",
            link: "/me/pwdmanage",
            type: "label"
          }
        ],
        [
          {
            name: "我是商家",
            icon: "self-seller c1",
            link: "/store/my",
            type: "label"
          },
          {
            name: "我推荐的人",
            icon: "self-group c1",
            link: "/me/recommend",
            type: "label"
          },
          {
            name: "地址管理",
            icon: "self-address c2",
            link: "/address/index",
            type: "label"
          },
          {
            name: "我的收藏",
            icon: "self-heart c1",
            link: "/me/collect",
            type: "label"
          }
        ],
        [
          {
            name: "联系客服",
            icon: "self-service c1",
            tel: "020-29030366"
          },
          {
            name: "关于凤凰云商O2O",
            icon: "self-fenghuang c2",
            link: "/me/about",
            type: "label"
          },
          {
            name: "APP更新",
            icon: "self-gengxin c2",
            link: "/me/updateApp",
            type: "label"
          }
        ]
      ],
      showDialog: false
    };
  },
  components: { HeaderTop, FooterBar, CertModal },
  created() {},
  computed: {
    ...mapState(["certificateStatus", "showCertificate", "account", "member"]),
    ...mapGetters(["cartNum"])
  },
  mixins: [mixin],
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.plusReady();
    });
  },
  beforeRouteLeave(to, from, next) {
    mui.back = this.oldBack;
    next();
  },
  activated() {
    if (this.$store.state.positions[this.$route.path]) {
      document.querySelector("main").scrollTop = this.$store.state.positions[
        this.$route.path
      ];
    }
    if (getStore("account") && getStore("account").length > 0) {
      this.$store.commit("SET_ACCOUNT", getStore("account"));
      this.$store.dispatch("getInfo");
      this.$store.dispatch("getCartList");
    } else {
      this.$router.push("/me/login");
    }
  },
  methods: {
    navigate(item) {
      if (/store/.test(item.link)) {
        //身份认证
        if (!this.certificateStatus) {
          this.$store.commit("SHOW_CERTIFICATE", true);
          return;
        }

        //入驻弹窗
        if (this.member.type == "0") {
          this.showPopup = true;
          return;
        }
      }
      if (/recommend/.test(item.link)) {
        this.$router.push({
          name: "Recommend",
          params: { id: this.member.id }
        });
      }
      if (item.tel) {
        this.showDialog = true;
      }
      item.link && this.$router.push(item.link);
    },
    settle() {
      if (this.settleWay == "") {
        this.$dialog.toast({
          mes: "请选择一种入驻方式后再确认",
          timeout: 1500
        });
        return;
      }
      this.showPopup = false;
      if (this.settleWay == "0") {
        this.$router.push({ path: "/store/settle" });
      } else {
        this.$router.push({ path: "/store/settle-1" });
      }
    },
    signOut() {
      removeStore("account");
      removeStore("storeId");
      removeStore("tips");
      this.$store.commit("SET_ACCOUNT", "");
      this.$store.commit("RECORD_BANK_List", []);
      this.$store.commit("RECORD_BANK_CARD", null);
      this.$store.commit("RECORD_MEMBER_INFO", null);

      this.$dialog.toast({
        mes: "退出成功",
        timeout: 1000,
        callback: () => {
          this.$router.replace("/me/login");
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
@import "../../style/mixin.less";
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
    position: relative;
    height: 1.6rem;
    background-size: cover;
    padding: @pd 0;
    a {
      display: block;
      .wh(1.7rem,1.7rem);
      margin: 0 auto;
      z-index: 10;
      border-radius: 50%;
    }
    .head-img {
      .wh(1.6rem, 1.6rem);
      border-radius: 50%;
      background-size: cover;
      background-repeat: no-repeat;
      z-index: 5;
      border: 3px solid rgba(228, 187, 145, 0.6);
    }
    .sex-tag {
      position: absolute;
      left: 2.5rem;
      bottom: 0;
    }
  }
  .head-info {
    min-height: 1.6rem;
    padding: @pd @pd/2 0;
    .flex;
    .just-cont(center);
    .align-items(center);
    flex-direction: column;
    .name {
      width: 100%;
      font-size: 0.32rem;
    }
    .desc {
      color: @lightgray;
    }
  }
}

.order-container {
  .order-item {
    .pd-v;
    font-size: 14px;
    .order-left {
      padding-left: 0.2rem;
      color: #333;
    }
    .order-right {
      flex: 1;
      padding-right: 0.24rem;
      text-align: right;
    }
    .order-arrow {
      &::after {
        margin-left: 0.05rem;
        margin-right: -0.08rem;
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
    margin-top: -@pd;
    padding-bottom: @pd;
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
    font-size: 0.34rem;
    text-align: center;
    padding: 0.2rem 0;
    border-radius: 5px;
  }
}

.tel-container {
  .pd-h;
  margin: @pd *2 0;
  .tel-box {
    display: block;
    border-radius: 15px;
    border: 1px solid @red;
    box-shadow: 0 0 10px 5px @red inset;
    .pd;
    .mg-v;
    .tel-num {
      margin-left: 0.1rem;
      font-size: 16px;
      vertical-align: 2px;
    }
  }
  button {
    margin-top: @pd * 2;
  }
}
</style>