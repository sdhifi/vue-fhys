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
  }, {
    path: '/online/index',
    name: 'Online',
    component: require('../pages/online/index')
  },  {
    path: '/online/allcolumn',
    name: 'AllColumn',
    component: require('../pages/online/allcolumn')
  },  {
    path: '/online/products',
    name: 'Products',
    component: require('../pages/online/products')
  },  {
    path: '/online/product',
    name: 'Product',
    component: require('../pages/online/product')
  }, {
    path: '/online/settle',
    name: 'SettleBalance',
    component: require('../pages/online/settle')
  },{
    path: '/online/shoppingcart',
    name: 'ShoppingCart',
    component: require('../pages/online/cart')
  }, {
    path: '/address/city',
    name: 'City',
    component: require('../pages/address/city')
  }, {
    path: '/address/index',
    name: 'AddressManage',
    component: require('../pages/address/index')
  }, {
    path: '/address/edit',
    name: 'AddressEdit',
    component: require('../pages/address/edit')
  }, {
    path: '/address/new',
    name: 'AddressNew',
    component: require('../pages/address/edit')
  }, {
    path: '/me/index',
    name: 'Me',
    component: require('../pages/me/index'),
    meta: {
      requireAuth: true
    }
  }, {
    path: '/order/index',
    name: 'MyOrder',
    component: require('../pages/order/index')
  }, {
    path: '/me/mywallet',
    name: 'MyWallet',
    component: require('../pages/me/mywallet')
  }, {
    path: '/me/qrcode',
    name: 'Qrcode',
    component: require('../pages/me/qrcode')
  }, {
    path: '/me/recommend',
    name: 'Recommend',
    component: require('../pages/me/recommend')
  }, {
    path: '/me/about',
    name: 'About',
    component: require('../pages/me/about')
  }, {
    path: '/me/updateApp',
    name: 'UpdateApp',
    component: require('../pages/me/updateApp')
  },  {
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
    path: '/me/pwdmanage',
    name: 'PwdManage',
    component: require('../pages/me/pwdmanage')
  }, {
    path: '/me/update',
    name: 'Update',
    component: require('../pages/me/update')
  }, {
    path: '/me/collect',
    name: 'MyCollect',
    component: require('../pages/me/collect')
  }, {
    path: '/shop/index/:id',
    name: 'Shop',
    component: require('../pages/shop/index')
  }, {
    path: '/store/settle',
    name: 'Settle',
    component: require('../pages/store/settle')
  }, {
    path: '/store/settle-1',
    name: 'Settle1',
    component: require('../pages/store/settle1')
  }, {
    path: '/store/my',
    name: 'MyStore',
    component: require('../pages/store/my')
  }, {
    path: '/store/productmanage',
    name: 'ProductManage',
    component: require('../pages/store/productmanage')
  }, {
    path: '/store/ordermanage',
    name: 'OrderManage',
    component: require('../pages/store/ordermanage')
  }, {
    path: '/store/publishmanage',
    name: 'PublishManage',
    component: require('../pages/store/publishmanage')
  }, {
    path: '/store/updateproduct',
    name: 'UpdateProduct',
    component: require('../pages/store/publishmanage')
  }, {
    path: '/store/receipt',
    name: 'Receipt',
    component: require('../pages/store/receiptmanage')
  }, {
    path: '/trade/download',
    name: 'Download',
    component: require('../pages/trade/download')
  }, {
    path: '/trade/bankcard',
    name: 'BankCard',
    component: require('../pages/trade/bankcard')
  }, {
    path: '/trade/consumerule',
    name: 'ConsumeRule',
    component: require('../pages/trade/consumerule')
  }, {
    path: '/trade/newbank',
    name: 'NewBank',
    component: require('../pages/trade/newbank')
  }, {
    path: '/trade/participate',
    name: 'Participate',
    component: require('../pages/trade/participate')
  },{
    path: '/trade/salerecord',
    name: 'SaleRecord',
    component: require('../pages/trade/salerecord')
  },{
    path: '/trade/salehistory',
    name: 'SaleHistory',
    component: require('../pages/trade/salehistory')
  },  {
    path: '/trade/salewelfare',
    name: 'SaleWelfare',
    component: require('../pages/trade/salewelfare')
  }, {
    path: '/trade/interest',
    name: 'Interest',
    component: require('../pages/trade/interest')
  }, {
    path: '/trade/cashhistory',
    name: 'CashHistory',
    component: require('../pages/trade/cashhistory')
  }, {
    path: '/trade/welfrecord',
    name: 'WelfareRecord',
    component: require('../pages/trade/welfrecord')
  }, {
    path: '/trade/withdrawals',
    name: 'WithDrawals',
    component: require('../pages/trade/withdrawals')
  }, {
    path: '/trade/shouxin',
    name: 'Shouxin',
    component: require('../pages/trade/shouxin')
  }, {
    path: '/trade/buyshouxin',
    name: 'BuyShouxin',
    component: require('../pages/trade/buyshouxin')
  }, {
    path: '/trade/shouxinlist',
    name: 'ShouxinList',
    component: require('../pages/trade/shouxinlist')
  },  {
    path: '*',
    redirect: '/home/index'
  }]
})
