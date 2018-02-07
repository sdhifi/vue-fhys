let plus = {
  barcode: {
    Barcode: function (params) {
      return {
        start: function () {
          console.log('starting...')
        },
        cancel: function () {
          console.log('canceled!!!')
        },
        close: function () {
          console.log('closeed!!!')
        },
        setFlash:function(){
          console.log('flashing...')
        }
      }
    }
  },
  runtime: {
    openURL(href) {
      window.location = href;
    },
    appid: 'abcde',
    getProperty(appid, callback) {
      let info = {
        appid: "abcde",
        version: "2.0",
        name: "hello",
        description: "this is a test",
        author: "hishion",
        email: "hishion.wei@gmail.com",
        license: "hello world",
        licensehref: "https://www.github.com/",
        features: "yes"
      }
      callback(info);
    }
  },
  payment: {
    channels: [{
      appStoreReceipt: () => {},
      description: "支付宝",
      id: "alipay",
      installService: () => {},
      requestOrder(ids, successCB1, errorCB1) {},
      restoreComplateRequest(options, successCB2) {},
      serviceReady: true
    }],
    getChannels(successCB, errorCB) {
      successCB(this.channels);
    },
    request(channel, statement, successCB, errorCB) {
      successCB("ok");
    }
  }
};
exports.plus = plus;
