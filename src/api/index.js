let baseUrl = "http://fenghuang.77jie.cn/gjfeng-web-client";
const VERSION = 'v1_0';
let index=`${baseUrl}/app/index/${VERSION}`,
pd=`${baseUrl}/app/product/${VERSION}`,
cart=`${baseUrl}/app/cart/${VERSION}`,
address=`${baseUrl}/app/address/${VERSION}`,
rule = `${baseUrl}/app/rule/${VERSION}`,
member = `${baseUrl}/app/member/${VERSION}`,
order=`${baseUrl}/app/order/${VERSION}`;

let o2o = `${index}/o2o` //获取o2o首页栏目和轮播图信息
let like = `${index}/o2o/like` //o2o商城的首页猜你喜欢
let subcolumn = `${index}/o2o/subColumn/` //O2O商城子栏目页

let products = `${pd}/o2o/products` //o2o商城一级栏目或本栏目下的商品
let product = `${pd}/o2o/productDetail/` //查询O2O商品信息
let hotProduct = `${pd}/o2o/hotProduct` //O2O查询本店热销商品

let myCart = `${cart}/myCart` //我的购物车
let updateCartNum = `${cart}/updateCartNum` //修改购物车数量
let delCart = `${cart}/delCart/` //移除购物车

let getProvinceByLetter = `${address}/getProvinceByLetter` //根据字母获取省市区
let getMyAddress = `${address}/getMyAddress` //我的收货地址
let getAddressDetail = `${address}/getAddressDetail` //我的收货地址详细信息
let updateAddress = `${address}/updateAddress` //修改收货地址
let defaultAddress = `${address}/default` //设置默认地址
let delAdress = `${address}/delAdress` //删除收货地址
let newsAddress = `${address}/newsAddress` //新增收货地址

let register = baseUrl + `/app/${VERSION}/register` //注册
let login = baseUrl + `/app/${VERSION}/login` //登录
let forgetPassWord = baseUrl + `/app/${VERSION}/forgetPassWord` //忘记密码

let service = `${rule}/service` //服务协议
let aboutGjf = `${rule}/aboutGjf`//关于凤凰云商O2O

let sendcode = baseUrl + `/sms/send` //获取验证码

let my = `${member}/my` //我的信息
let realNameByAly = `${member}/realNameByAly` //用户实名认证
let update = `${member}/update` //编辑个人信息
let myQr = `${member}/myQr` //我的二维码
let countMemberInfo = `${member}/countMemberInfo` //我的钱包
let setPay = `${member}/setPay` //设置支付密码
let myCollect = `${member}/myCollect` //我的收藏
let getMemberLowerLevel = `${member}/getMemberLowerLevel` //获取用户下级

let getOrder = `${order}/getOrder` //我的订单
let updateOrderStatus = `${order}/updateOrderStatus` //确认收货

let newProCommet = baseUrl + `/app/comment/${VERSION}/newProCommet` //添加评论

export {
  o2o,
  like,
  subcolumn,

  hotProduct,
  products,
  product,

  myCart,
  updateCartNum,
  delCart,

  getProvinceByLetter,
  getMyAddress,
  getAddressDetail,
  updateAddress,
  defaultAddress,
  delAdress,
  newsAddress,

  register,
  login,
  forgetPassWord,
  
  service,
  aboutGjf,

  sendcode,

  my,
  realNameByAly,
  update,
  myQr,
  countMemberInfo,
  setPay,
  myCollect,
  getMemberLowerLevel,

  getOrder,
  updateOrderStatus,

  newProCommet,
}
