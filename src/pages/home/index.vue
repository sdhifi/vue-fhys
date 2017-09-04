<template>
    <div>
        <header-top :back="false" :login="!loginAccount"></header-top>
        <main class="scroll-content">
            <section class="city-search flex text-center align-center danger-bg">
                <router-link to="/address/city" class="current-city">
                    <span>{{city}}</span>
                    <span class="iconfont self-down"></span>
                </router-link>
                <router-link to="/search" class="search-box">
                    <span class="iconfont-large self-search"></span>
                    <span>搜索商家或商品</span>
                </router-link>
            </section>
            <section class="type-list">
                <yd-slider>
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
                </yd-slider>
            </section>
            <section class="banner-list">
                <yd-slider>
                    <yd-slider-item v-for="(item,index) in banner" :key="item.id">
                        <router-link :to="'/product/'+item.id">
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
                <yd-infinitescroll :on-infinite="getYourlike" ref="pdlist">
                    <div slot="list">
                        <product-item v-for="item in productList" :key="item.id" :item="item"></product-item>
                    </div>
                    <p slot="doneTip">没有数据啦</p>
                </yd-infinitescroll>
            </section>
        </main>
        <footer-bar></footer-bar>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import HeaderTop from 'components/header/index'
import FooterBar from 'components/footer/index'
import ProductItem from 'components/common/ProductItem'
import { o2o, like } from '../../api/index'

export default {
    name: 'Home',
    data() {
        return {
            noData: false,
            pageNo: 1,
            slideTypes: [],
            banner: [],
            productList: [],
            loginAccount:false
        }
    },
    components: { HeaderTop, FooterBar, ProductItem },
    computed: {
        ...mapState(['longitude', 'latitude', 'city'])
        
    },
    created() {
        this.plusReady();
        this.getPosition();
        this.getColumns();
    },
    activated(){
        this.loginAccount= localStorage.getItem('account').length
    },
    methods: {
        plusReady() {
            let first = null;
            mui.back = function() {
                if (!first) {
                    first = new Date().getTime();
                    mui.toast('再按一次退出应用');
                    setTimeout(function() {
                        first = null;
                    }, 1000);
                } else {
                    if (new Date().getTime() - first < 1000) {
                        plus.runtime.quit();
                    }
                }
            }
        },
        getPosition() {
            if (!this.city) {
                axios.get('https://api.map.baidu.com/location/ip?ak=xVyOYxDsYKpFBx8zdICSlWxsqltd8QoC&coor=gcj02').then(res => {
                    let data = res.data.content
                    let city = data.address_detail.city,
                        longitude = data.point.x,
                        latitude = data.point.y;
                    this.$store.commit('RECORD_ADDRESS', { latitude, longitude })
                    this.$store.commit('RECORD_CITY', city)
                    this.getYourlike();
                })
            }
            else
                this.getYourlike()
        },
        getColumns() {
            axios.post(o2o, { token: md5('gjfengo2o') })
                .then((res) => {
                    // plus.nativeUI.toast(res.data.msg)
                    let result = res.data.result;
                    this.slideTypes = [result.indexColumn.slice(0, 8), result.indexColumn.slice(8)];
                    this.banner = result.indexAd;
                })
        },
        getYourlike() {
            if (!this.noData) {
                let vm = this;
                let longitude = this.longitude;
                let latitude = this.latitude;
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
.city-search {
    height: 44px;
    .pd-h;
    .current-city {
        width: 2rem;
        font-size: 14px;
    }
    .search-box {
        flex: 1;
        padding: .1rem;
        color: @lightgray;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 5px;
        &:last-child {
            font-size: 14px;
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
    .like-item {
        .pd-v;
        .mg-h;
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
}
</style>