import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Home = r => require.ensure([], () => r(require('@/page/home/home.vue')), 'group-foo')
const Work = r => require.ensure([], () => r(require('@/page/work/work.vue')), 'group-foo')
const Find = r => require.ensure([], () => r(require('@/page/find/find.vue')), 'group-foo')
const User = r => require.ensure([], () => r(require('@/page/user/User.vue')), 'group-foo')
const Record = r => require.ensure([], () => r(require('@/page/work/record.vue')), 'group-foo')
const Total = r => require.ensure([], () => r(require('@/page/work/total.vue')), 'group-foo')
const Exhibition = r => require.ensure([], () => r(require('@/page/home/exhibition.vue')), 'group-foo')
const Tender = r => require.ensure([], () => r(require('@/page/home/tender.vue')), 'group-foo')
const Supply = r => require.ensure([], () => r(require('@/page/home/supply.vue')), 'group-foo')
const Newsdetail = r => require.ensure([], () => r(require('@/page/home/newsdetail.vue')), 'group-foo')
const Nologin = r => require.ensure([], () => r(require('@/page/work/nologin.vue')), 'group-foo')
const Agreement = r => require.ensure([], () => r(require('@/page/user/registertext.vue')), 'group-foo')
const Registertext = r => require.ensure([], () => r(require('@/page/user/agreement.vue')), 'group-foo')
const Help = r => require.ensure([], () => r(require('@/page/user/help.vue')), 'group-foo')
const Footprint = r => require.ensure([], () => r(require('@/page/work/footprint.vue')), 'group-work')
const Checkmap = r => require.ensure([], () => r(require('@/page/work/checkmap.vue')), 'group-work')
const Journal = r => require.ensure([], () => r(require('@/page/work/journal.vue')), 'group-work')
const Imchoice = r => require.ensure([], () => r(require('@/page/work/imchoice.vue')), 'group-work')
const Daynews = r => require.ensure([], () => r(require('@/page/work/daynews.vue')), 'group-work')
const Weeknews = r => require.ensure([], () => r(require('@/page/work/weeknews.vue')), 'group-work')
const Monthnews = r => require.ensure([], () => r(require('@/page/work/monthnews.vue')), 'group-work')
const Journaldetail = r => require.ensure([], () => r(require('@/page/work/Journaldetail.vue')), 'group-work')
const Application = r => require.ensure([], () => r(require('@/page/work/application.vue')), 'group-work')
const Edit = r => require.ensure([], () => r(require('@/page/work/edit.vue')), 'group-work')
const Create = r => require.ensure([], () => r(require('@/page/work/create.vue')), 'group-work')
const Search = r => require.ensure([], () => r(require('@/page/work/search.vue')), 'group-work')
const Pending = r => require.ensure([], () => r(require('@/page/work/pending.vue')), 'group-work')
const Department = r => require.ensure([], () => r(require('@/page/work/department.vue')), 'group-work')
const EarlyList = r => require.ensure([], () => r(require('@/page/work/enterprise/EarlyList.vue')), 'group-enterprise')
const LateList = r => require.ensure([], () => r(require('@/page/work/enterprise/LateList.vue')), 'group-enterprise')
const NotClocking = r => require.ensure([], () => r(require('@/page/work/enterprise/NotClocking.vue')), 'group-enterprise')
const LeaveList = r => require.ensure([], () => r(require('@/page/work/enterprise/LeaveList.vue')), 'group-enterprise')
const OvertimeList = r => require.ensure([], () => r(require('@/page/work/enterprise/OvertimeList.vue')), 'group-enterprise')
const DailyReport = r => require.ensure([], () => r(require('@/page/work/enterprise/DailyReport.vue')), 'group-enterprise')
const OutputLive = r => require.ensure([], () => r(require('@/page/work/MES/output/OutputLive.vue')), 'group-mes')
const OutputDaily = r => require.ensure([], () => r(require('@/page/work/MES/output/OutputDaily.vue')), 'group-mes')
const OutputCount = r => require.ensure([], () => r(require('@/page/work/MES/output/OutputCount.vue')), 'group-mes')
const MaterielDaily = r => require.ensure([], () => r(require('@/page/work/MES/materiel/MaterielDaily.vue')), 'group-mes')
const MaterielCount = r => require.ensure([], () => r(require('@/page/work/MES/materiel/MaterielCount.vue')), 'group-mes')
const QualityDaily = r => require.ensure([], () => r(require('@/page/work/MES/quality/QualityDaily.vue')), 'group-mes')
const QualityCount = r => require.ensure([], () => r(require('@/page/work/MES/quality/QualityCount.vue')), 'group-mes')
const Power = r => require.ensure([], () => r(require('@/page/work/MES/energycontrol/Power.vue')), 'group-mes')
const Water = r => require.ensure([], () => r(require('@/page/work/MES/energycontrol/Water.vue')), 'group-mes')
const OEE = r => require.ensure([], () => r(require('@/page/work/MES/equipmentcontrol/OEE.vue')), 'group-mes')
const Warning = r => require.ensure([], () => r(require('@/page/work/MES/equipmentcontrol/Warning.vue')), 'group-mes')
const DeviceDetails = r => require.ensure([], () => r(require('@/page/work/MES/equipmentcontrol/DeviceDetails.vue')), 'group-mes')
const DetailsInfo = r => require.ensure([], () => r(require('@/page/work/MES/equipmentcontrol/DetailsInfo.vue')), 'group-mes')
const RunHistory = r => require.ensure([], () => r(require('@/page/work/MES/equipmentcontrol/RunHistory.vue')), 'group-mes')
const MachineList = r => require.ensure([], () => r(require('@/page/work/MES/equipmentcontrol/MachineList.vue')), 'group-mes')
const DetailsList = r => require.ensure([], () => r(require('@/page/work/MES/equipmentcontrol/DetailsList.vue')), 'group-mes')
const EnergyMonitoring = r => require.ensure([], () => r(require('@/page/work/MES/energymonitor/EnergyMonitoring.vue')), 'group-mes')
const TrendMonitoring = r => require.ensure([], () => r(require('@/page/work/MES/energymonitor/TrendMonitoring.vue')), 'group-mes')

const AccountLogin = r => require.ensure([], () => r(require('@/page/mall/login/AccountLogin.vue')), 'group-mall')
const VerificationLogin = r => require.ensure([], () => r(require('@/page/mall/login/VerificationLogin.vue')), 'group-mall')
const ForgetPassword = r => require.ensure([], () => r(require('@/page/mall/login/ForgetPassword.vue')), 'group-mall')
const Register = r => require.ensure([], () => r(require('@/page/mall/login/Register.vue')), 'group-mall')
const MallAgreement = r => require.ensure([], () => r(require('@/page/mall/login/MallAgreement.vue')), 'group-mall')
const MallHome = r => require.ensure([], () => r(require('@/page/mall/home/MallHome.vue')), 'group-mall')
const GoodsClassification = r => require.ensure([], () => r(require('@/page/mall/class/GoodsClassification.vue')), 'group-mall')
const ClassSearch = r => require.ensure([], () => r(require('@/page/mall/class/ClassSearch.vue')), 'group-mall')
const GoodsDetail = r => require.ensure([], () => r(require('@/page/mall/goods/GoodsDetail.vue')), 'group-mall')
const TestDetail = r => require.ensure([], () => r(require('@/page/mall/goods/TestDetail.vue')), 'group-mall')
const MallSearch = r => require.ensure([], () => r(require('@/page/mall/home/MallSearch.vue')), 'group-mall')

const ShopList = r => require.ensure([], () => r(require('@/page/mall/shop/ShopList.vue')), 'group-mall')
const ConfirmOrder = r => require.ensure([], () => r(require('@/page/mall/shop/ConfirmOrder.vue')), 'group-mall')
const ReceivingAdress = r => require.ensure([], () => r(require('@/page/mall/shop/ReceivingAdress.vue')), 'group-mall')
const Invoice = r => require.ensure([], () => r(require('@/page/mall/shop/Invoice.vue')), 'group-mall')
const SpecialInvoice = r => require.ensure([], () => r(require('@/page/mall/shop/SpecialInvoice.vue')), 'group-mall')
const ManageAddress = r => require.ensure([], () => r(require('@/page/mall/shop/ManageAddress.vue')), 'group-mall')

const MallUser = r => require.ensure([], () => r(require('@/page/mall/user/User.vue')), 'mall-user')
const MallSetting = r => require.ensure([], () => r(require('@/page/mall/user/Setting.vue')), 'mall-user')
const MallAddress = r => require.ensure([], () => r(require('@/page/mall/user/Address.vue')), 'mall-user')
const MallPassword = r => require.ensure([], () => r(require('@/page/mall/user/Password.vue')), 'mall-user')
const MallUserInfo = r => require.ensure([], () => r(require('@/page/mall/user/Info.vue')), 'mall-user')
const MallAddressList = r => require.ensure([], () => r(require('@/page/mall/user/AddressList.vue')), 'mall-user')
const MallCollection = r => require.ensure([], () => r(require('@/page/mall/user/Collection.vue')), 'mall-user')
const MyOrder = r => require.ensure([], () => r(require('@/page/mall/user/MyOrder.vue')), 'mall-user')
const OrderDetails = r => require.ensure([], () => r(require('@/page/mall/user/OrderDetails.vue')), 'mall-user')
const RecentHistory = r => require.ensure([], () => r(require('@/page/mall/user/RecentHistory.vue')), 'mall-user')
const GoodsComment = r => require.ensure([], () => r(require('@/page/mall/user/GoodsComment.vue')), 'mall-user')
const ReturnList = r => require.ensure([], () => r(require('@/page/mall/user/ReturnList.vue')), 'mall-user')
const RefundList = r => require.ensure([], () => r(require('@/page/mall/user/RefundList.vue')), 'mall-user')

const StoreSearch = r => require.ensure([], () => r(require('@/page/mall/store/StoreSearch.vue')), 'mall-store')
const StoreHome = r => require.ensure([], () => r(require('@/page/mall/store/StoreHome.vue')), 'mall-store')

const Affairs = r => require.ensure([], () => r(require('@/page/work/affairs.vue')), 'group-work')
const Leave = r => require.ensure([], () => r(require('@/page/work/leave.vue')), 'group-work')
const LeaveDetails = r => require.ensure([], () => r(require('@/page/work/leaveDetails.vue')), 'group-work')
const Option= r => require.ensure([], () => r(require('@/page/work/option.vue')), 'group-work')
const Opinion = r => require.ensure([], () => r(require('@/page/work/opinion.vue')), 'group-work')
const Market = r => require.ensure([], () => r(require('@/page/home/market.vue')), 'group-foo')
const Interview = r => require.ensure([], () => r(require('@/page/home/interview.vue')), 'group-foo')
const Expert = r => require.ensure([], () => r(require('@/page/home/expert.vue')), 'group-foo')
const SpecialistAgencies = r => require.ensure([], () => r(require('@/page/home/specialistagencies.vue')), 'group-foo')
const GroupAgreement = r => require.ensure([], () => r(require('@/page/user/groupAgreement.vue')), 'group-foo')
const ExpertList = r => require.ensure([], () => r(require('@/page/home/expertList.vue')), 'group-foo')
const AgenciesList = r => require.ensure([], () => r(require('@/page/home/agenciesList.vue')), 'group-foo')
const HomeSearch = r => require.ensure([], () => r(require('@/page/home/homeSearch.vue')), 'group-foo')
const SearchRes = r => require.ensure([], () => r(require('@/page/home/searchRes.vue')), 'group-foo')
const MyCollection = r => require.ensure([], () => r(require('@/page/user/myCollection.vue')), 'group-foo')

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    }, {
      path: '/home',
      component: Home //首页
    }, {
      path: '/work',
      component: Work, //工作台
    }, {
      path: '/find',
      component: Find  //发现
    }, {
      path: '/user',
      component: User  //用户中心
    }, {
      path: '/record',
      component: Record  //考勤记录
    }, {
      path: '/total',
      component: Total  //考勤统计
    }, {
      path: '/exhibition',
      component: Exhibition  //展会
    },
    {
      path: '/supply',
      component: Supply  //供需
    },
    {
      path: '/tender',
      component: Tender  //招投标
    },
    {
      path: '/newsdetail',
      component: Newsdetail  //详情
    },
    {
      path: '/nologin',
      component: Nologin  //未登录页面
    },
    {
      path: '/agreement',  //隐私保护政策
      component: Agreement
    },
    {
      path: '/registertext',  //用户协议
      component: Registertext
    },
    {
      path: '/footprint',
      component: Footprint  //足迹
    },
    {
      path: '/checkmap',
      component: Checkmap //足迹详情
    },
    {
      path: '/help',
      component: Help //帮助
    },
    {
      path: '/journal',
      component: Journal  //日志列表
    },
    {
      path: '/imchoice',
      component: Imchoice  //选择联系人
    },
    {
      path: '/daynews',
      component: Daynews,  //日报
      meta: {keepAlive: true}
    },
    {
      path: '/weeknews',
      component: Weeknews, //周报
      meta: {keepAlive: true}
    },
    {
      path: '/monthnews',
      component: Monthnews,  //月报
      meta: {keepAlive: true}
    },
    {
      path: '/journaldetail',  //日志详情
      component: Journaldetail
    },
    {
      path: '/application',  //申请加入组织
      component: Application
    },
    {
      path: '/create',  //创建组织
      component: Create
    },
    {
      path: '/edit',  //编辑模板页面
      component: Edit
    },
    {
      path: '/search',  //搜索组织
      component: Search,
    },
    {
      path: '/pending',  //等待审核
      component: Pending,
    },
    {
      path: '/department',  //选择部门
      component: Department,
    },
    {
      path: '/outputlive',  //产出看板
      component: OutputLive,
    },
    {
      path: '/outputcount',  //产出看板
      component: OutputCount,
    },
    {
      path: '/outputdaily',  //产出看板
      component: OutputDaily,
    },
    {
      path: '/earlylist',  //早到榜
      component: EarlyList,
    },
    {
      path: '/notclocking',  //未打卡
      component: NotClocking,
    },
    {
      path: '/latelist',  //迟到榜
      component: LateList,
    },
    {
      path: '/leavelist',  //早退榜
      component: LeaveList,
    },
    {
      path: '/overtimelist',  //加班榜
      component: OvertimeList,
    },
    {
      path: '/dailyreport',  //企业日报
      component: DailyReport,
    },
    {
      path: '/materieldaily',  //消耗日报
      component: MaterielDaily,
    },
    {
      path: '/materielcount',  //消耗统计
      component: MaterielCount,
    },
    {
      path: '/qualitydaily',  //良率日报
      component: QualityDaily,
    },
    {
      path: '/qualitycount',  //良率日报
      component: QualityCount,
    },
    {
      path: '/power',  //电耗分析
      component: Power,
    },
    {
      path: '/water',  //水耗分析
      component: Water,
    },
    {
      path: '/oee',  //OEE分析
      component: OEE,
    },
    {
      path: '/warning',  //预警报警
      component: Warning,
    },
    {
      path: '/devicedetails',  //设备详情列表
      component: DeviceDetails,
    },
    {
      path: '/detailsinfo',  //设备详情信息
      component: DetailsInfo,
    },
    {
      path: '/runhistory',  //设备运行历史
      component: RunHistory,
    },
    {
      path: '/machinelist',  //设备列表
      component: MachineList,
    },
    {
      path: '/detailslist',  //详情列表
      component: DetailsList,
    },
    {
      path: '/energymonitoring',  //能源监控
      component: EnergyMonitoring,
    },
    {
      path: '/trendmonitoring',  //趋势监控
      component: TrendMonitoring,
    },
    //下面为商城部分
    {
      path: '/accountlogin',  //账号密码登录
      component: AccountLogin,
    },
    {
      path: '/verificationlogin',  //动态密码登录
      component: VerificationLogin,
    },
    {
      path: '/forgetpassword',  //忘记密码
      component: ForgetPassword,
    },
    {
      path: '/register',  //注册
      component: Register,
    },
    {
      path: '/mallagreement',  //注册协议
      component: MallAgreement,
    },
    {
      path: '/mallhome',  //商城首页
      component: MallHome,
    },
    {
      path: '/goodsclassification',  //分类
      component: GoodsClassification,
    },
    {
      path: '/classsearch',  //分类搜索
      component: ClassSearch,
    },
    {
      path: '/goodsdetail',  //商品详情
      component: GoodsDetail,
    },
    {
      path: '/testdetail',  //商品详情测试
      component: TestDetail,
    },
    {
      path: '/mallsearch',  //商城搜索
      component: MallSearch,
    },
    {
      path: '/shoplist',  //购物车列表
      component: ShopList,
    },
    {
      path: '/malluser',  //商城个人中心
      component: MallUser,
    },
    {
      path: '/mallsetting',  //商城设置
      component: MallSetting,
    },
    {
      path: '/malladdress',  //商城收货地址设置
      component: MallAddress,
    },
    {
      path: '/mallpassword',  //商城修改密码
      component: MallPassword,
    },
    {
      path: '/malluserinfo',  //商城个人信息
      component: MallUserInfo,
    },
    {
      path: '/malladdresslist',  //商城地址列表
      component: MallAddressList,
    },
    {
      path: '/mallcollection',  //商城商品收藏
      component: MallCollection,
    },
    {
      path: '/confirmorder',  //确认订单
      component: ConfirmOrder,
    },
    {
      path: '/receivingadress',  //收货地址
      component: ReceivingAdress,
    },
    {
      path: '/invoice',  //发票
      component: Invoice,
    },
    {
      path: '/specialinvoice',  //专用发票
      component: SpecialInvoice,
    },
    {
      path: '/myorder',  //我的订单
      component: MyOrder,
    },
    {
      path: '/manageaddress',  //专用发票
      component: ManageAddress,
    },
    {
      path: '/orderdetails',  //订单详情
      component: OrderDetails,
    },
    {
      path: '/recenthistory',  //最近浏览
      component: RecentHistory,
    },
    {
      path: '/goodscomment',  //商品评价
      component: GoodsComment,
    },
    {
      path: '/returnlist',  //退货单列表
      component: ReturnList,
    },
    {
      path: '/refundlist',  //退款单列表
      component: RefundList,
    },
	  {
	  	path: '/storesearch', //商城店铺搜索
		  component: StoreSearch
	  },
	  {
		  path: '/storehome', //商城店铺首页
		  component: StoreHome
	  },
    {
      path: '/affairs',  //OA事宜
      component: Affairs
    },
    {
      path: '/leave',  //请假
      component: Leave,
      meta: {keepAlive: true}
    },
    {
      path: '/leaveDetails',  //请假
      component: LeaveDetails
    },
    {
      path: '/opinion',  //拒绝理由
      component: Opinion
    },
    {
      path: '/option',  //请假类型
      component: Option
    },
    {
      path: '/market',  //行情
      component: Market
    },
    {
      path: '/expert',  //专家库
      component: Expert
    },
    {
      path: '/interview',  //访谈
      component: Interview
    },
    {
      path: '/specialistAgencies',  //专业机构
      component: SpecialistAgencies
    },
    {
      path:'/groupAgreement',   //群服务协议
      component : GroupAgreement
    },
    {
      path:'/expertList',   //专家列表
      component : ExpertList
    },
    {
      path:'/agenciesList',   //机构列表
      component : AgenciesList
    },
    {
      path:'/homeSearch',  //首页搜索
      component : HomeSearch
    },
    {
      path:'/searchRes',  //首页搜索结果
      component : SearchRes
    },{
      path:'/myCollection', //我的收藏
      component : MyCollection
    }
  ]
})
