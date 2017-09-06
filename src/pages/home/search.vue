<template>
  <div>
    <header-top></header-top>
    <main class='scroll-content-2' style="background-color:#fff;">
      <form class="search-form" autocomplete="off">
        <div class="input-group  flex align-center">
          <span class="iconfont-large self-search"></span>
          <input type="search" name="search" class="search-input" placeholder="搜索商家或商品" v-model="searchValue">
          <button type="submit" name="submit" class="search-submit" @click.prevent="search('')">搜索</button>
        </div>
      </form>
      <section class="search-history">
        <div class="search-title fs-16">
          <h3>搜索历史</h3>
          <span class="iconfont self-delete danger-color fs-12">清空</span>
        </div>
        <ul class="search-list flex">
          <li class="search-item" v-for="(item,index) in searchHistory" :key="index" @click="search(item)">
            {{item}}
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import { setStore, getStore } from 'components/common/mixin'
export default {
  name: 'Search',
  data() {
    return {
      searchValue: '',
      searchHistory: ['汉堡', '汉堡', '汉堡', '汉堡']
    }
  },
  components: { HeaderTop },
  computed: {

  },
  created() {

  },
  activated() {

  },
  methods: {
    search(v) { }
  }
}
</script>
<style lang='less' scoped>
@import '../../style/mixin.less';
.search-form {
  .mg-v;
  .input-group {
    background-color: @red;
    color: @white;
    .mg;
    border: 1px solid @red;
    border-radius: @pd;
  }
  .search-input {
    flex: 1;
    .pd;
    font-size: .32rem;
    border: none;
    background-color: @white;
    border-right: 1px solid @red;
  }
  .search-submit {
    width: 1rem;
    font-size: .28rem;
    color: @white;
  }
}

.search-history {
  .mg;
  border-top: 1px solid #f5f5f5;
  .search-title {
    .flex;
    .just-cont(space-between);
    .mg-v;
  }
  .search-list {
    .search-item {
      width: 30%;
      .text-center;
      padding: .1rem;
      margin: 0 1.5% @pd;
      border: 1px solid @blue;
      border-radius: 10px;
      .ellipsis;
    }
  }
}
</style>