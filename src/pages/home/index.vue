<template>
    <div>
        <header-top :back="false" :login="!loginAccount">注册|登录</header-top>
        <main class="scroll-content">
            <section class="city-search flex text-center align-center danger-bg">
                <router-link to="/address/city" class="current-city">
                    <span>{{city}}</span>
                    <span class="iconfont self-down"></span>
                </router-link>
                <router-link to="/home/search" class="search-box">
                    <span class="iconfont-large self-search"></span>
                    <span style="vertical-align:5px;">搜索商家或商品</span>
                </router-link>
            </section>
            <section class="type-list">
                <!-- <yd-slider>
                        <yd-slider-item v-for="(item,index) in slideTypes" :key="index">
                            <ul class="flex">
                                <li v-for="e in item" :key="e.id" class="type-item text-center">
                                    <router-link :to="{path:'/home/subcolumn/'+e.id}">
                                        <img :src="e.pic2" :alt="e.names">
                                        <p>{{e.names}}</p>
                                    </router-link>
                                </li>
                            </ul>
                        </yd-slider-item>
                    </yd-slider> -->
                <swiper dots-position="center">
                    <swiper-item v-for="(item,index) in slideTypes" :key="index">
                        <ul class="flex">
                            <li v-for="e in item" :key="e.id" class="type-item text-center">
                                <router-link :to="{path:'/home/subcolumn/'+e.id}">
                                    <img :src="e.pic2" :alt="e.names">
                                    <p>{{e.names}}</p>
                                </router-link>
                            </li>
                        </ul>
                    </swiper-item>
                </swiper>
            </section>
            <section class="banner-list">
                <yd-slider>
                    <yd-slider-item v-for="(item,index) in banner" :key="item.id">
                        <router-link :to="'/shop/index/'+item.address.substring(item.address.lastIndexOf('/')+1)">
                            <img :src="item.photo" :alt="item.names">
                        </router-link>
                    </yd-slider-item>
                </yd-slider>
            </section>
            <section class="product-list">
                <div class="title-wrap text-center">
                    <div class="like-title">
                        <span class="iconfont self-crown fs-20"></span>
                        <span class="fs-16">猜你喜欢</span>
                    </div>
                </div>
                <yd-infinitescroll :callback="getYourlike" ref="pdlist">
                    <div slot="list">
                        <product-item v-for="item in productList" :key="item.id" :id="item.id" :img-url="item.imgUrl" :title="item.storeName" :score="item.score" :distance="item.distance" :content="item.name" :price1="item.price" :price2="item.marketPrice"></product-item>
                    </div>
                    <p slot="doneTip">
                        <span class="iconfont self-nodata danger-color" style="margin-right:5px;"></span>没有数据啦
                    </p>
                </yd-infinitescroll>
            </section>
            <!-- <yd-backtop></yd-backtop> -->
        </main>
        <footer-bar></footer-bar>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { Swiper, SwiperItem } from 'vux'
import HeaderTop from 'components/header/index'
import FooterBar from 'components/footer/index'
import ProductItem from 'components/common/ProductItem'
import { o2o, like } from '../../api/index'
import { mixin, getStore } from 'components/common/mixin'
export default {
    name: 'Home',
    data() {
        return {
            oldBack: mui.back,
            noData: false,
            pageNo: 1,
            slideTypes: [],
            banner: [],
            productList: [],
            loginAccount: false
        }
    },
    components: { Swiper, SwiperItem, HeaderTop, FooterBar, ProductItem },
    computed: {
        ...mapState(['longitude', 'latitude', 'city'])
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
        this.getPosition();
        this.getColumns();
    },
    activated() {
        if (getStore('account') && getStore('account').length > 0) {
            this.loginAccount = true;
            this.$store.commit('SET_ACCOUNT', getStore('account'));
        }
    },

    methods: {

        getPosition() {
            if (!this.city) {
                axios.get('https://api.map.baidu.com/location/ip?ak=xVyOYxDsYKpFBx8zdICSlWxsqltd8QoC&coor=gcj02').then(res => {
                    let data = res.data.content
                    let city = data.address_detail.city,
                        longitude = data.point.x,
                        latitude = data.point.y;
                    this.$store.commit('RECORD_ADDRESS', { latitude, longitude })
                    this.$store.commit('RECORD_CITY', city)
                    //this.getYourlike();
                })
            }
            else
                this.getYourlike()
        },
        getColumns() {
            let vm = this;
            mui.ajax({
                url: o2o,
                type: 'post',
                headers: { 'app-version': 'v1.0' },
                data: {
                    token: md5('gjfengo2o')
                },
                success(res) {
                    let result = res.result;
                    vm.slideTypes = [result.indexColumn.slice(0, 8), result.indexColumn.slice(8)];
                    vm.banner = result.indexAd;
                }
            })
        },
        getYourlike() {
            if (!this.noData) {
                let vm = this;
                let longitude = this.longitude;
                let latitude = this.latitude;
                // this.$dialog.loading.open()
                mui.ajax({
                    url: like,
                    type: 'post',
                    data: {
                        longitude: longitude,
                        latitude: latitude,
                        pageNo: this.pageNo,
                        pageSize: 10,
                        token: md5(`gjfenglike${longitude}${latitude}`)
                    },
                    headers: { "app-version": "v1.0" },
                    success(res) {
                        // vm.$dialog.loading.close();
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
    },
    watch: {
        latitude(val) {
            this.productList = [];
            this.pageNo = 1;
            this.noData = false;
            this.getYourlike();
        }
    }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
.city-search {
    height: 44px;
    .pd-h;
    .current-city {
        width: 2rem;
        font-size: .3rem;
    }
    .search-box {
        flex: 1;
        color: @lightgray;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 5px;
        &:last-child {
            font-size: 14px;
            height: 36px;
        }
    }
}

.type-list {
    padding: .2rem 0 0 0;
    margin-bottom: .1rem;
    background-color: @white;
    .type-item {
        width: 25%;
        a {
            display: block;
        }
        img {
            .wh(.8rem, .8rem);
            display: block;
            margin: 0 auto .1rem auto;
        }
        p {
            color: #707070;
            font-size: 14px;
            margin-bottom: .4rem;
        }
    }
}

.product-list {
    margin-top: 10px;
    padding-bottom: 10px;
    background: @white;
}
</style>