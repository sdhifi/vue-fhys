<template>
  <div class="score-box">
    <a v-for="i in max" class="rater-box" :class="{'is-active':currentValue>i+1}" :style="{color:colors&&colors[i-1]?colors[i-1]:'#ccc'}" :key="i">
      <span class="iconfont self-star rater-inner">
        <span v-if="cutPercent >0 && cutIndex == i-1" class="iconfont self-star rater-outer" :style="{color:activeColor,width:cutPercent+'%'}"></span>
      </span>
    </a>
  </div>
</template>
<script>
export default {
  name: 'Crown',
  props: {
    max: {
      type: Number,
      default: 5
    },
    value: {
      type: Number,
      default: 0
    },
    activeColor: {
      type: String,
      default: '#fab068'
    }
  },
  data() {
    return {
      currentValue: 0,
      colors: []
    }
  },
  computed: {
    sliceValue() {
      var _val = this.currentValue.toFixed(2).split('.');
      return _val.length === 1 ? [_val[0], 0] : _val;
    },
    cutIndex() {
      return this.sliceValue[0] * 1
    },
    cutPercent() {
      return this.sliceValue[1] * 1
    }
  },
  created() {
    this.currentValue = this.value||0;
  },
  mounted() {
    this.updateStyle()
  },
  methods: {
    updateStyle() {
      for (var j = 0; j < this.max; j++) {
        if (j <= this.currentValue - 1) {
          this.$set(this.colors, j, this.activeColor)
        } else {
          this.$set(this.colors, j, '#ccc')
        }
      }
    }
  }
}
</script>
<style lang='less' scoped>
.score-box {
  text-align: left;
  display: inline-block;
  line-height: normal;
  .rater-box {
    position: relative;
    text-align: center;
    display: inline-block;
    color: #ccc;
    .rater-inner {
      position: relative;
      display: inline-block;
    }
    .rater-outer {
      position: absolute;
      left: 0;
      top: 0;
      display: inline-block;
      overflow: hidden;
    }
  }
}
</style>