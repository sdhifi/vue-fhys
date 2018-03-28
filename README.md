# vue-fhys

> 凤凰云商-vue重构版

针对地域的线上线下购物商城，会员通过附近找到联盟商户，到店消费参与优惠，并获得对应积分。

帮助商户销售，促进会员消费，增加粘性。

### Build Setup :tada:

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
npm run replace
```

### 功能 :hammer:
:white_check_mark:城市定位、城市选择  
:white_check_mark:附近店铺  
:white_check_mark:地图导航  
:white_check_mark:店铺、商品收藏  
:white_check_mark:网上商城  
:white_check_mark:四大平台对接  
:white_check_mark:商品详情（图文、评论）  
:white_check_mark:商品发布修改   
:white_check_mark:下单、加入购物车  
:white_check_mark:结算               
:white_check_mark:支付     
:white_check_mark:我的钱包  
:white_check_mark:地址管理  
:white_check_mark:订单管理  
:white_check_mark:APP更新  
:white_check_mark:扫一扫  
:white_check_mark:文档下载  
:construction:分享  
:construction:微信支付  
:construction:退货

### 注意事项 :sparkles:

- 解决背景图片打包错误的问题

```html
<section :style="{'background-image':formatBg('bg.png')}"></section>
```

```javascript
/**
 * 格式化背景图片,具体返回值根据项目路径调整
 * @param {*图片名称} filename 例如 abc.png
 */
formatBg(filename){
      return process.env.NODE_ENV == 'development' ? `url(/static/img/${filename})` : `url(./static/img/${filename})`
    }
```
- 路由传name形式，才能使用params
```html
  <router-link :to="{name:'Update',params:{member}}"></router-link>
  this.$router.push({name:'City',params:{cityId})
```

- 解决模拟数据加载路径错误问题
```javascript
  // app.js
  搜索相关json文件，在路径前加‘.’，一般是./static/service/xx.json
```
- 引用swiper报错
```javascript
// .babelrc
 - "plugins":["transform-runtime"],
 + "plugins":[],
```

- 简单保存滚动条位置，不适合存在分页的列表

```javascript
// router.js
import store from '../store/index';
router.afterEach( (to,from) => {
  store.commit('SAVE_POSITION', {
    name:from.path,
    position:document.querySelector("main").scrollTop
  })
})

// state.js
	state:{
      positions: {},
    },
    mutations:{
       ['SAVE_POSITION'](state,payload){
     	  state.positions[payload.name] = payload.position
  		}
    }

// 需要保存滚动条位置的页面
  activated() {
     if(this.$store.state.positions[this.$route.path]){
        document.querySelector('main').scrollTop=this.$store.state.positions[this.$route.path]
        }
   },

```

- 保存浏览位置，适合分页列表[是 activate状态]
```javascript
    activated(){
      if (this.positions[this.$route.path]) {
        document.querySelector("main").scrollTop = this.positions[
          this.$route.path
        ];
      }
      this.noData = this.cacheList[this.$route.path].noData;
      this.pageNo = this.cacheList[this.$route.path].page;
      this.productList = this.cacheList[this.$route.path].list;
    },
//列表页-->详情页，记录需要保存的信息
    navigate(){
      this.$store.commit("SAVE_LIST_WITH_PAGE", {
        name: this.$route.path,
        cacheInfo: {
          noData: this.noData,
          page: this.pageNo,
          list: this.productList
        }
      });
    }
      
```

### 打包应用 :rocket:

- 代码

   现在切换分支，打包对应版本。

### 应用截图 :lipstick:
<img src="https://github.com/weixisheng/vue-fhys/blob/master/screenshots/home.png" width="360px"/>
<img src="https://github.com/weixisheng/vue-fhys/blob/master/screenshots/online.png" width="360px"/>
<img src="https://github.com/weixisheng/vue-fhys/blob/master/screenshots/me.png" width="360px"/>
<img src="https://github.com/weixisheng/vue-fhys/blob/master/screenshots/wallet.png" width="360px"/>
<img src="https://github.com/weixisheng/vue-fhys/blob/master/screenshots/settle.png" width="360px"/>
