let baseUrl = "http://fenghuang.77jie.cn/gjfeng-web-client/app";

let o2o = baseUrl + '/index/v1_0/o2o' //获取o2o首页栏目和轮播图信息
let like = baseUrl + '/index/v1_0/o2o/like' //o2o商城的首页猜你喜欢
let subcolumn = baseUrl + '/index/v1_0/o2o/subColumn/' //O2O商城子栏目页

let products = baseUrl + '/product/v1_0/o2o/products' //o2o商城一级栏目或本栏目下的商品

let getProvinceByLetter = baseUrl + '/address/v1_0/getProvinceByLetter' //根据字母获取省市区

let register = baseUrl + 'v1_0/register' //注册
let sendcode = 'http://fenghuang.77jie.cn/gjfeng-web-client/sms/send' //后获取验证码
let my = baseUrl + '/member/v1_0/my' //我的信息
export {
  o2o,
  like,
  subcolumn,
  products,
  getProvinceByLetter,
  register,
  sendcode,
  my
}
