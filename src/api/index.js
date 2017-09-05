let baseUrl = "http://fenghuang.77jie.cn/gjfeng-web-client";

let o2o = baseUrl + '/app/index/v1_0/o2o' //获取o2o首页栏目和轮播图信息
let like = baseUrl + '/app/index/v1_0/o2o/like' //o2o商城的首页猜你喜欢
let subcolumn = baseUrl + '/app/index/v1_0/o2o/subColumn/' //O2O商城子栏目页

let products = baseUrl + '/app/product/v1_0/o2o/products' //o2o商城一级栏目或本栏目下的商品
let product = baseUrl + '/app/product/v1_0/o2o/productDetail/' //查询O2O商品信息
let hotProduct = baseUrl + '/app/product/v1_0/o2o/hotProduct' //O2O查询本店热销商品

let getProvinceByLetter = baseUrl + '/app/address/v1_0/getProvinceByLetter' //根据字母获取省市区

let register = baseUrl + '/app/v1_0/register' //注册
let sendcode = baseUrl + '/sms/send' //获取验证码
let login = baseUrl + '/app/v1_0/login' //登录
let service = baseUrl + '/app/rule /v1_0/service' //服务协议
let my = baseUrl + '/app/member/v1_0/my' //我的信息
let realNameByAly = baseUrl + '/app/member/v1_0/realNameByAly' //用户实名认证
let update = baseUrl + '/app/member/v1_0/update' //编辑个人信息
export {
  o2o,
  like,
  subcolumn,
  hotProduct,
  products,
  product,
  getProvinceByLetter,
  register,
  sendcode,
  login,
  service,
  my,
  realNameByAly,
  update
}
