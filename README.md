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

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### 注意事项

- 由于打包配置问题， 字体图标库和背景图片路径会出现错误。~~搜索mine_background，把/static修改为..[已经使用第三条解决]~~ ,手动修改app.css如下：
```
搜索iconfont，把static修改为..
```
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
- 打包注意事项

```html
  api基路径也需要根据地区更改
  天猫、淘宝首页跳转到优惠券，需要更改相应的参数，详见tmindex注释
```
