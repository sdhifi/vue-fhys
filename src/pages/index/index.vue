<template>
    <div>
        <header-top></header-top>
        <main class="scroll-content">
            <section class="city-search flex text-center align-center danger-bg">
                <router-link to="/city" class="current-city">
                    <span>广州市</span>
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
                        <router-link :to="'/subColumn/'+e.id">
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
                    <router-link :to="'/product'+item.id">
                    <img :src="item.photo" :alt="item.names">
                    </router-link>
                </yd-slider-item>
                </yd-slider>                
            </section>
        </main>
        <footer-bar></footer-bar>
    </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import FooterBar from 'components/footer/index'

export default {
    name: 'Home',
    data() {
        return {
            slideTypes:[],
            banner:[],
            productList:[],
            pageNo:1
        }
    },
    components: { HeaderTop, FooterBar },
    created() {
        this.getColumns();
       
    },
    methods: {
        
        getColumns() {
            axios.post('/index/v1_0/o2o', { token: md5('gjfengo2o') })
                .then((res) =>{
                    // plus.nativeUI.toast(res.data.msg)
                    let result = res.data.result;
                    this.slideTypes = [result.indexColumn.slice(0, 8), result.indexColumn.slice(8)];
                    this.banner = result.indexAd;
                })
        }
    }
}
</script>
<style lang='less' scoped>
.city-search{
    
    height: 44px;
    
    padding: 0 .2rem;
    .current-city{
        width: 2.5rem;
        font-size: 14px;
    }
    .search-box{
        flex: 1;
        padding: .1rem;
        color: rgba(255, 255, 255, .2);
        background-color: currentColor;
        border-radius: 5px;
        &:last-child{
            font-size: 14px;
        }
    }
}
.type-list{
    padding-bottom: .2rem;
    margin-bottom: .1rem;
    background-color: #fff;
    .type-item{
        width: 25%;
        a{
            display: block;
        }
        img{
            width: 100%;
            padding: .2rem .4rem .15rem .4rem;
        }
        p{
            color: #707070;
        }
    }
}
</style>