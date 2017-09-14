import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [{
    path: '/home/index',
    name: 'Index',
    component: require('../pages/home/index')
  }, {
    path: '/home/subcolumn/:id',
    name: 'SubColumn',
    component: require('../pages/home/subcolumn')
  }, {
    path: '/home/subcolumn2/:id',
    name: 'SubColumn2',
    component: require('../pages/home/subcolumn2')
  }, {
    path: '/home/search',
    name: 'Search',
    component: require('../pages/home/search')
  }, {
    path: '/home/searchresult',
    name: 'SearchResult',
    component: require('../pages/home/searchresult')
  }, {
    path: '/near/index',
    name: 'Near',
    component: require('../pages/near/index')
  },  {
    path: '/online/index',
    name: 'Online',
    component: require('../pages/online/index')
  },{
    path: '/address/city',
    name: 'City',
    component: require('../pages/address/city')
  }, {
    path: '/me/index',
    name: 'Me',
    component: require('../pages/me/index'),
    meta: {
      requireAuth: true
    }
  },{
    path: '/me/myorder',
    name: 'MyOrder',
    component: require('../pages/me/myorder')
  },{
    path: '/me/mywallet',
    name: 'MyWallet',
    component: require('../pages/me/mywallet')
  },{
    path: '/me/qrcode',
    name: 'Qrcode',
    component: require('../pages/me/qrcode')
  },{
    path: '/me/recommend',
    name: 'Recommend',
    component: require('../pages/me/recommend')
  },{
    path: '/me/about',
    name: 'About',
    component: require('../pages/me/about')
  }, {
    path: '/me/login',
    name: 'Login',
    component: require('../pages/me/login')
  }, {
    path: '/me/regpro',
    name: 'RegPro',
    component: require('../pages/me/regpro')
  }, {
    path: '/me/forgetpwd',
    name: 'Forgetpwd',
    component: require('../pages/me/forgetpwd')
  }, {
    path: '/me/update',
    name: 'Update',
    component: require('../pages/me/update')
  }, {
    path: '/shop/index/:id',
    name: 'Shop',
    component: require('../pages/shop/index')
  },{
    path: '/store/settle',
    name: 'Settle',
    component: require('../pages/store/settle')
  },  {
    path: '*',
    redirect: '/home/index'
  }]
})
