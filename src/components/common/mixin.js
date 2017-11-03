export const mixin = {
  methods: {
    plusReady() {
      mui.init({
        swipeBack: false
      });
      let first = null;
      mui.back = function () {
        if (!first) {
          first = new Date().getTime();
          mui.toast('再按一次退出应用');
          setTimeout(function () {
            first = null;
          }, 1000);
        } else {
          if (new Date().getTime() - first < 1000) {
            plus.runtime.quit();
          }
        }
      }
    },
    /**
     * 格式化距离
     * @param {*数值} d 
     */
    formatDis(d) {
      if (!d) return '未知';
      return d > 1000 ? `${(d / 1000).toFixed(2)}公里` : `${d}米`;
    },
    /**
     * 
     * @param {*时间戳} t 
     * @param {*类型} type 
     * 
     */
    formatTime(t,type){
      var date, year, month, day, hour, minute,second;
      if(!t)
      return '--'
      date = new Date(t);
      /**
       * @param  {String} time 日期时间
       * @return {String}      格式化日期时间
       */
      var complete = function (time) {
          return time.toString().replace(/^(\d)$/, "0$1");
          // return time.toString().padStart(2,'0');
      };
      year = date.getFullYear();
      month = complete(date.getMonth() + 1);
      day = complete(date.getDate());
      hour = complete(date.getHours());
      minute = complete(date.getMinutes());
      second = complete(date.getSeconds());
      return type?`${year}-${month}-${day} ${hour}:${minute}:${second}`:`${year}年${month}月${day}日 ${hour}:${minute}`;
    },
    /**
     * 格式化金额，返回两位小数
     * @param {*数值} m 
     */
    formatPrice(m) {
      return (m || 0).toFixed(2);
    },
    /**
     * 格式化图片地址，默认图片
     * @param {*路径} path 
     */
    getImgPath(path) {
      return path ? path : (process.env.NODE_ENV == 'development' ? "/static/img/default.png" : "./static/img/default.png")
    },
    errorImg(){
      return process.env.NODE_ENV == 'development' ? "/static/img/default.png" : "./static/img/default.png";
    },
    /**
     * 格式化背景图片,例如abc.png
     * @param {*图片名称} url
     */
    formatBg(url){
      return process.env.NODE_ENV == 'development' ? `url(/static/img/${url})` : `url(./static/img/${url})`
    },
    /**
     * 过滤表情符号
     * @param {*值} v 
     */
    filterMotion(v) {
      return v.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "")
    },
    isEmpty(e) {
      var t;
      for (t in e)
        return !1;
      return !0;
    }
  }
}
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}

export const validateSettle = {
  computed:{
    validStoreName(){
      return this.storeName && /^([A-Za-z]|[\u4E00-\u9FA5])+$/.test(this.storeName)
    },
    validSellerName(){
      return this.sellerName && /^([A-Za-z]|[\u4E00-\u9FA5])+$/.test(this.sellerName)
    },
    validSellerMobile(){
      return /^(86)?1[3,4,5,7,8]\d{9}$/.test(this.sellerMobile)
    },
    validEmail(){
      return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(this.sellerEmail)
    },
    validStoreCitys(){
      return !!this.storeCitys
    },
    validAddressDetail(){
      return !!this.addressDetail
    },
    validLicenseNumber(){
      return !!this.businessLicenceNumber
    },
    validLicenseAddress(){
      return !!this.businessLicenceAddress
    },
    validFileContent(){
      return !!this.fileContent
    },
    validBankAccount(){
      return /^\d{15,19}$/.test(this.bankAccountNumber)
    }
  }
}