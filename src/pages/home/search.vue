<template>
  <div>
    <header-top></header-top>
    <main class='scroll-content-2' style="background-color:#fff;">
      <div class="search-form" autocomplete="off">
        <div class="input-group  flex align-center">
          <span class="iconfont-large self-search"></span>
          <input type="search" name="search" class="search-input" placeholder="搜索商家或商品" v-model="searchValue" autofocus>
          <button type="button" name="submit" class="search-submit" @click="search(searchValue)">搜索</button>
        </div>
      </div>
      <section class="search-history" v-if="account&&searchHistory.length">
        <div class="search-title fs-16">
          <h3 class="fs-14">搜索历史</h3>
          <span class="iconfont self-delete danger-color fs-12" @click="clearHistory">清空</span>
        </div>
        <ul class="search-list flex">
          <li class="search-item" v-for="(item,index) in searchHistory" :key="index" @click="search(item)" :style="{'background-color':bg[index%7]}">
            {{item}}
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>
<script>
import HeaderTop from 'components/header/index'
import { setStore, getStore, removeStore } from 'components/common/mixin'
export default {
  name: 'Search',
  data() {
    return {
      account: '',
      searchValue: '',
      searchHistory: [],
      bg:['#178CEC','#E51417','#34B34C','#FDBA2D','#FE5B24','#829DAE','#1FBFCB']
    }
  },
  components: { HeaderTop },
  computed: {

  },
  created() {

  },
  activated() {
    this.searchValue = '';
    if (getStore('account') && getStore('account').length > 0) {
      this.account = getStore('account');
    }
    if (getStore(`${this.account}_search`)) {
      this.searchHistory = JSON.parse(getStore(`${this.account}_search`))
    }
  },
  methods: {
    search(v) {
      if (!v) return;
      this.searchValue = v;
      this.$store.commit('RECORD_SEARCH_VALUE', this.searchValue);
      let history = getStore(`${this.account}_search`);
      if (history) {
        let repeat = false;
        this.searchHistory = JSON.parse(history);
        this.searchHistory.forEach(item => {
          if (item == this.searchValue) repeat = true;
        })
        if (!repeat)
          this.searchHistory.push(this.searchValue)
      }
      else {
        this.searchHistory.push(this.searchValue)
      }
      setStore(`${this.account}_search`, this.searchHistory)
      this.$router.push({ name: 'SearchResult', params: { searchValue: this.searchValue } })
    },
    clearHistory() {
      this.searchHistory = [];
      removeStore(`${this.account}_search`)
    }
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
    color: @lightgray;
  }
  .search-list {
    .search-item {
      .text-center;
      padding: .04rem .3rem;
      margin: 0 1.5% @pd;
      color: @white;
      border-radius: 10px;
      .ellipsis;
      font-size: .28rem;
    }
  }
}
</style>