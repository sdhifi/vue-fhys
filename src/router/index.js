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
    path: '/home/search',
    name: 'Search',
    component: require('../pages/home/search')
  }, {
    path: '/home/searchresult',
    name: 'SearchResult',
    component: require('../pages/home/searchresult')
  }, {
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
    path: '/product/product/:id',
    name: 'Product',
    component: require('../pages/product/product')
  }, {
    path: '*',
    redirect: '/home/index'
  }],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})
