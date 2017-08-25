// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'

import router from './router'
import store from './store';
import axios from 'axios';

import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css'
import '../static/fonts/iconfont.css'
Vue.use(VueRouter)
Vue.use(YDUI)

FastClick.attach(document.body)
Vue.prototype.axios = axios;
axios.defaults.headers={"app-version":"v1.0"}
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
