import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/home/index',
      name:'Index',
      component:require('../pages/home/index')
    },{
      path:'/home/subcolumn/:id',
      name:'SubColumn',
      component:require('../pages/home/subcolumn')
    },
    {
      path:'/address/city',
      name:'City',
      component:require('../pages/address/city')
    },
    {
      path:'/me/index',
      name:'Me',
      component:require('../pages/me/index'),
      meta:{
        requireAuth:true
      }
    },
    {
      path:'/me/login',
      name:'Login',
      component:require('../pages/me/login')
    },{
      path:'/me/regpro',
      name:'RegPro',
      component:require('../pages/me/regpro')
    },
    {
      path:'/product/product/:id',
      name:'Product',
      component:require('../pages/product/product')
    },
    {
      path:'*',
      redirect:'/home/index'
    }
  ]
})
