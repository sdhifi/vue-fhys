// let baseUrl = "http://fenghuang.77jie.cn/gjfeng-web-client";
let baseUrl = "http://gz.gjfeng.net/gjfeng-web-client";
const VERSION = 'v1_0';
let index = `${baseUrl}/app/index/${VERSION}`,
  pd = `${baseUrl}/app/product/${VERSION}`,
  cart = `${baseUrl}/app/cart/${VERSION}`,
  address = `${baseUrl}/app/address/${VERSION}`,
  rule = `${baseUrl}/app/rule/${VERSION}`,
  member = `${baseUrl}/app/member/${VERSION}`,
  order = `${baseUrl}/app/order/${VERSION}`,
  store = `${baseUrl}/app/store/${VERSION}`,
  trade = `${baseUrl}/app/trade/${VERSION}`;

let o2o = `${index}/o2o` //获取o2o首页栏目和轮播图信息
let like = `${index}/o2o/like` //o2o商城的首页猜你喜欢
let subColumn = `${index}/o2o/subColumn/` //O2O商城子栏目页
let near = `${index}/near` //获取附近的栏目
let findNearColum = `${index}/findNearColum` //获取附近的一级栏目
let findNearSubColum = `${index}/findNearSubColum` //获取附近的一级栏目下的子栏目
let onlineInH5 = `${index}/onlineInH5` //网上商城首页

let products = `${pd}/o2o/products` //o2o商城一级栏目或本栏目下的商品
let product = `${pd}/o2o/productDetail/` //查询O2O商品信息
let hotProduct = `${pd}/o2o/hotProduct` //O2O查询本店热销商品
let delStorePro = `${pd}/delStorePro` //删除商品
let addProduct = `${pd}/addProduct` //发布商品
let updatePro = `${pd}/updatePro` //编辑商品
let myStorePro = `${pd}/myStorePro` //商品管理列表
let goMoneyPage = `${pd}/goMoneyPage` //付款
let onlineProductsByAllColumn = `${pd}/online/onlineProductsByAllColumn` //网上商城栏目下的商品
let onlineProductsDetailInfoInH5 = `${pd}/online/onlineProductsDetailInfoInH5` //网上商城商品详情
let stockAndPrice = `${pd}/online/product/stockAndPrice` //商品价格和库存


let myCart = `${cart}/myCart` //我的购物车
let updateCartNum = `${cart}/updateCartNum` //修改购物车数量
let delCart = `${cart}/delCart/` //移除购物车
let addCart = `${cart}/addCart` //添加购物车

let getProvinceByLetter = `${address}/getProvinceByLetter` //根据字母获取省市区
let getMyAddress = `${address}/getMyAddress` //我的收货地址
let getAddressDetail = `${address}/getAddressDetail` //我的收货地址详细信息
let updateAddressInIos = `${address}/updateAddressInIos` //修改收货地址
let defaultAddress = `${address}/default` //设置默认地址
let delAdress = `${address}/delAdress` //删除收货地址
let newsAddressInIos = `${address}/newsAddressInIos` //新增收货地址

let register = baseUrl + `/app/${VERSION}/register` //注册
let login = baseUrl + `/app/${VERSION}/login` //登录
let forgetPassWord = baseUrl + `/app/${VERSION}/forgetPassWord` //忘记密码
let updataLoginPassword = baseUrl + `/app/${VERSION}/updataLoginPassword` //忘记密码

let service = `${rule}/service` //服务协议
let aboutGjf = `${rule}/aboutGjf` //关于凤凰云商O2O

let sendcode = baseUrl + `/sms/send` //获取验证码

let my = `${member}/my` //我的信息
let realNameByAly = `${member}/realNameByAly` //用户实名认证
let update = `${member}/update` //编辑个人信息
let myQr = `${member}/myQr` //我的二维码
let countMemberInfo = `${member}/countMemberInfo` //我的钱包
let setPay = `${member}/setPay` //设置支付密码
let myCollect = `${member}/myCollect` //我的收藏
let addMyCollect = `${member}/addMyCollect` //添加收藏
let delectMyCollect = `${member}/delectMyCollect` //取消收藏
let getMemberLowerLevel = `${member}/getMemberLowerLevel` //获取用户下级
let findMemberByMoblie = `${member}/findMemberByMoblie` //根据手机号获取用户信息
let goAllShouXin = `${member}/goAllShouXin` //授信记录

let getOrder = `${order}/getOrder` //我的订单
let orderDetail = `${order}/detail` //订单详情
let updateOrderStatus = `${order}/updateOrderStatus` //确认收货
let findO2oOrderByPage = `${order}/findO2oOrderByPage` //店铺订单
let addOrder = `${order}/addOrder` //下单
let toAdd = `${order}/toAdd` //立即购买下单
let actCartInH5 = `${order}/actCartInH5` //结算购物车

let newProCommet = baseUrl + `/app/comment/${VERSION}/newProCommet` //添加评论

let addStore = `${store}/addStore` //入驻申请
let myStore = `${store}/myStore` //商家信息
let updateBanner = `${store}/updateBanner` //更换banner图
let updateIntro = `${store}/updateIntro` //编辑简介
let updateAddressInfo = `${store}/updateAddressInfo` //编辑店铺信息

let myBanks = `${trade}/myBanks` //银行卡列表
let bindBank = `${trade}/bindBank` //添加银行卡
let getAllBank = `${trade}/getAllBank` //所有银行卡信息
let deleteMemBank = `${trade}/deleteMemBank` //删除银行卡
let getParticipate = `${trade}/getParticipate` //福利权益
let getInterests = `${trade}/getInterests` //累计消费
let getDrawHistory = `${trade}/getDrawHistory` //提取历史
let diviHis = `${trade}/diviHis` //福利记录
let addDrawCash = `${trade}/addDrawCash` //添加提现
let addBenefit = `${trade}/addBenefit` //销售录入
let addShouXin = `${trade}/addShouXin` //购买授信额度
let benefits = `${trade}/benefits` //让利记录

let findAppUpgredeByType = baseUrl + `/app/upgrade/${VERSION}/findAppUpgredeByType` //APP版本信息
export {
  o2o,
  like,
  subColumn,
  near,
  findNearColum,
  findNearSubColum,
  onlineInH5,

  hotProduct,
  products,
  product,
  myStorePro,
  delStorePro,
  addProduct,
  updatePro,
  goMoneyPage,
  onlineProductsByAllColumn,
  onlineProductsDetailInfoInH5,
  stockAndPrice,

  myCart,
  updateCartNum,
  delCart,
  addCart,

  getProvinceByLetter,
  getMyAddress,
  getAddressDetail,
  updateAddressInIos,
  defaultAddress,
  delAdress,
  newsAddressInIos,
  
  register,
  login,
  forgetPassWord,
  updataLoginPassword,
  
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
  addMyCollect,
  delectMyCollect,
  getMemberLowerLevel,
  findMemberByMoblie,
  goAllShouXin,

  getOrder,
  orderDetail,
  updateOrderStatus,
  findO2oOrderByPage,
  addOrder,
  toAdd,
  actCartInH5,

  newProCommet,

  addStore,
  myStore,
  updateBanner,
  updateIntro,
  updateAddressInfo,

  myBanks,
  bindBank,
  getAllBank,
  deleteMemBank,
  getParticipate,
  getInterests,
  getDrawHistory,
  diviHis,
  addDrawCash,
  addBenefit,
  addShouXin,
  benefits,

  findAppUpgredeByType,
}
