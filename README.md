# vue-fhys

> 凤凰云商-vue重构版

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

由于打包配置问题， 字体图标库和背景图片路径会出现错误。手动修改app.css如下：

搜索iconfont，把static修改为..

搜索mine_background，把/static修改为..