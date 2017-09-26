<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {getStore} from 'components/common/mixin'
export default {
  name: 'app',
  components: {  },
  computed: { ...mapState(['account']),
  key(){
    return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date()
  }
   },
  created() {
    this.redirect();
  },
  methods: {
    redirect() {
      this.$router.beforeEach((to, from, next) => {
        if (to.matched.some(record => record.meta.requireAuth)) {
          if (!(getStore("account")&&getStore("account").length>0)) {
            next({
              path: '/me/login'
            })
          }
          else {
            next();
          }
        }
        else {
          next();
        }
      })
    }
  }
}
</script>

<style lang="less">
@import 'style/common.less';

/*
.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity .3s;
}

.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}
*/
</style>
