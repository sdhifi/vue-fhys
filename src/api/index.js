// let baseUrl = "http://gz.gjfeng.net/gjfeng-web-client";//测试域名
// let baseUrl = "http://jfh.jfeimao.com/gjfeng-web-client";//广州域名
let baseUrl = "http://yn.gzfzsw.top/gjfeng-web-client";//云南域名
// let baseUrl = "http://www.gjfeng.com/gjfeng-web-client";//湛江域名
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
let allColumn = `${pd}/online/allColumn` //商城所有分类

let findProdutCat = `${baseUrl}/wx/product/findProdutCat` //天猫|淘宝目录
let findProductList = `${baseUrl}/wx/product/findProductList` //天猫|淘宝商品
let findProductListBySerch = `${baseUrl}/wx/product/findProductListBySerch` //搜索商品列表
let findJdProdutCat = `${baseUrl}/wx/product/findJdProdutCat` //京东目录
let findJdProductList = `${baseUrl}/wx/product/findJdProductList` //京东商品
let findJdProductListBySerch = `${baseUrl}/wx/product/findJdProductListBySerch` //搜索商品列表
let imageUploadBStore = `${baseUrl}/wx/store/imageUploadBStore` //上传图片
let appMyQr = `${baseUrl}/wx/member/appMyQr` //二维码
let memberCooperationRule = `${baseUrl}/wx/rule/memberCooperationRule` //二维码

let myCart = `${cart}/myCart` //我的购物车
let updateCartNum = `${cart}/updateCartNum` //修改购物车数量
let delCart = `${cart}/delCart/` //移除购物车
let addCart = `${cart}/addCart` //添加购物车

let getProvinceByLetter = `${address}/getProvinceByLetter` //根据字母获取城市
let getCityName = `${address}/getCityName` //根据经纬度获取城市
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
let consumptionInH5 = `${rule}/consumptionInH5` //消费规则
let agentRule = `${rule}/agent` //代理规则
let toStoreServiceRules = `${rule}/toStoreServiceRules` //店铺入驻协议

let sendcode = baseUrl + `/sms/send` //获取验证码

let my = `${member}/my` //我的信息
let realNameByAly = `${member}/realNameByAly` //用户实名认证
let update = `${member}/update` //编辑个人信息
let myQr = `${member}/myQr` //我的二维码
let countMemberInfo = `${member}/countMemberInfo` //我的钱包
let myWallet = `${member}/myWallet` //我的钱包2
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
let yinLPay = `${order}/yinLPay` //银联预下单
let yinLPayCofirom = `${order}/yinLPayCofirom` //银联支付
let payOrderSign = `${order}/payOrderSign` //订单付款

let newProCommet = baseUrl + `/app/comment/${VERSION}/newProCommet` //添加评论
let getAllProCommetByPage = baseUrl + `/app/comment/${VERSION}/getAllProCommetByPage` //获取评论

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
let getSalesWelfare = `${trade}/getSalesWelfare` //销售福利
let getInterests = `${trade}/getInterests` //累计消费
let getDrawHistory = `${trade}/getDrawHistory` //提取历史
let diviHis = `${trade}/diviHis` //福利记录
let addDrawCash = `${trade}/addDrawCash` //添加提现
let addBenefit = `${trade}/addBenefit` //销售录入
let addShouXin = `${trade}/addShouXin` //购买授信额度
let benefits = `${trade}/benefits` //让利记录
let transferPage = `${trade}/transferPage` //积分转移|合并税费
let memberPointTransfer = `${trade}/memberPointTransfer` //积分转移|合并
let findTransferHistory = `${trade}/findTransferHistory` //转移|合并记录
let agent = `${trade}/agent` //代理页
let findNextAgent = `${trade}/findNextAgent` //商家列表
let agentHistory = `${trade}/agentHistory` //收入历史
let toFhTreasurePage = `${trade}/toFhTreasurePage` //跳转到凤凰宝页面
let toBalanceTransferPage = `${trade}/toBalanceTransferPage` //跳转到转移余额到凤凰宝页面
let transderBalanceToTreasure = `${trade}/transderBalanceToTreasure` //把余额转移到凤凰宝
let transferFhTreasurePage = `${trade}/transferFhTreasurePage` //转移凤凰宝金额给用户
let toFhTreasureDrawCash = `${trade}/toFhTreasureDrawCash` //跳转到凤凰宝提现页面
let addFhTreasureDrawCash = `${trade}/addFhTreasureDrawCash` //凤凰宝提现
let toFhTreasureTradeHistory = `${trade}/toFhTreasureTradeHistory` //凤凰宝交易记录
let findVoucherProduct = `${trade}/findVoucherProduct` //获取商家联盟商品列表
let addMerchantRechargeHistory = `${trade}/addMerchantRechargeHistory` //商家充值商家联盟
let addMemberVonchersHistory = `${trade}/addMemberVonchersHistory` //商家赠送代金券
let addMerchantRechargeToMemberHistory = `${trade}/addMerchantRechargeToMemberHistory` //商家升级赠送
let findMerchantGiveHistory = `${trade}/findMerchantGiveHistory` //获取商家升级赠送历史记录
let findMemberVoucherHistory = `${trade}/findMemberVoucherHistory` //获取代金券交易历史记录

let findAppUpgredeByType = `${baseUrl}/app/upgrede/${VERSION}/findAppUpgredeByType` //APP版本信息
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
  allColumn,

  findProdutCat,
  findProductList,
  findProductListBySerch,
  findJdProdutCat,
  findJdProductList,
  findJdProductListBySerch,
  imageUploadBStore,
  appMyQr,
  memberCooperationRule,
  
  myCart,
  updateCartNum,
  delCart,
  addCart,

  getProvinceByLetter,
  getCityName,
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
  consumptionInH5,
  agentRule,
  toStoreServiceRules,

  sendcode,

  my,
  realNameByAly,
  update,
  myQr,
  countMemberInfo,
  myWallet,
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
  yinLPay,
  yinLPayCofirom,
  payOrderSign,

  newProCommet,
  getAllProCommetByPage,

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
  getSalesWelfare,
  getInterests,
  getDrawHistory,
  diviHis,
  addDrawCash,
  addBenefit,
  addShouXin,
  benefits,
  transferPage,
  memberPointTransfer,
  findTransferHistory,
  agent,
  findNextAgent,
  agentHistory,
  toFhTreasurePage,
  toBalanceTransferPage,
  transderBalanceToTreasure,
  transferFhTreasurePage,
  toFhTreasureDrawCash,
  addFhTreasureDrawCash,
  toFhTreasureTradeHistory,
  findVoucherProduct,
  addMerchantRechargeHistory,
  addMemberVonchersHistory,
  addMerchantRechargeToMemberHistory,
  findMerchantGiveHistory,
  findMemberVoucherHistory,

  findAppUpgredeByType,
}
