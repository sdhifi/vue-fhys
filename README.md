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

- 由于打包配置问题， 字体图标库和背景图片路径会出现错误。手动修改app.css如下：
```
搜索iconfont，把static修改为..
搜索mine_background，把/static修改为..
```
- 路由传name形式，才能使用params
```html
  <router-link :to="{name:'Update',params:{member}}"></router-link>
  this.$router.push({path:'/index',params:{cityId})
```

- 解决背景图片打包错误的问题

```html
<section  :style="{'background-image':formatBg('bg.png')}"></section>
```

```javascript
/**
 * 格式化背景图片,具体返回值根据项目路径调整
 * @param {*图片名称} url例如abc.png
 */
formatBg(url){
      return process.env.NODE_ENV == 'development' ? `url(/static/img/${url})` : `url(../img/${url})`
    }
```

