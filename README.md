# vue-fhys

> 凤凰云商-vue重构版

针对地域的线上线下购物商城，会员通过附近找到联盟商户，到店消费参与优惠，并获得对应积分。

帮助商户销售，促进会员消费，增加粘性。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
npm run replace
```

### 注意事项

- 路由传name形式，才能使用params
```html
  <router-link :to="{name:'Update',params:{member}}"></router-link>
  this.$router.push({name:'City',params:{cityId})
```

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

- 保存浏览位置，适合分页列表
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

- 打包注意事项

```html
  APP打包名称：凤凰云商共创辉煌
  安卓包名：cn.gjf_zhanjiang
```
