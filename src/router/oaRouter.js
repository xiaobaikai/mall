

/* ======== OA =============*/
const Copy = r => require.ensure([], () => r(require('@/page/work/oa/copy.vue')), 'group-foo')


const Leave = r => require.ensure([], () => r(require('@/page/work/leave.vue')), 'group-work')
const LeaveDetails = r => require.ensure([], () => r(require('@/page/work/leaveDetails.vue')), 'group-work')
const LetterOfRequest = r => require.ensure([], () => r(require('@/page/work/letterOfRequest.vue')), 'group-work')
const LeOfReDetails = r => require.ensure([], () => r(require('@/page/work/leOfReDetails.vue')), 'group-work')
const Project = r => require.ensure([], () => r(require('@/page/work/oa/project.vue')), 'group-foo')
const ProjectDetails = r => require.ensure([], () => r(require('@/page/work/oa/projectDetails.vue')), 'group-foo')
const Regular = r => require.ensure([], () => r(require('@/page/work/oa/regular.vue')), 'group-foo')
const RegularDetails = r => require.ensure([], () => r(require('@/page/work/oa/regularDetails.vue')), 'group-foo')
const Meal = r => require.ensure([], () => r(require('@/page/work/oa/meal.vue')), 'group-foo')
const MealDetails = r => require.ensure([], () => r(require('@/page/work/oa/MealDetails.vue')), 'group-foo')
const Document = r => require.ensure([], () => r(require('@/page/work/oa/document.vue')), 'group-foo')
const DocumentDetails = r => require.ensure([], () => r(require('@/page/work/oa/documentDetails.vue')), 'group-foo')
const Overtime = r => require.ensure([], () => r(require('@/page/work/oa/overtime.vue')), 'group-foo')
const OvertimeDetails = r => require.ensure([], () => r(require('@/page/work/oa/overtimeDetails.vue')), 'group-foo')

const Exchange = r => require.ensure([], () => r(require('@/page/work/oa/exchange.vue')), 'group-foo')
const ExchangeDetails = r => require.ensure([], () => r(require('@/page/work/oa/exchangeDetails.vue')), 'group-foo')

export default [
    {
        path: '/leave',  //请假
        component: Leave,
        meta: {keepAlive: true}
    },
    {
        path: '/leaveDetails',  //请假详情
        component: LeaveDetails,
        meta: {keepAlive: true}
    },
    {
      path:'/letterOfRequest', //请示函
      component : LetterOfRequest,
      meta: {keepAlive: true}
    },
    {
      path:'/leOfReDetails', //请示函详情
      component : LeOfReDetails,
      meta: {keepAlive: true}
    },
    {
        path:'/copy',
        component:Copy,
    },
    {
        path:'/project',//项目立项申请
        component:Project,
		meta: {keepAlive: true}
    },{
        path:'/projectDetails', //项目立项
        component:ProjectDetails,
		meta: {keepAlive: true}
    },{
        path:'/regular',//员工转正申请
        component:Regular,
		meta: {keepAlive: true}
    },{
        path:'/regularDetails', //员工转正
        component:RegularDetails,
		meta: {keepAlive: true}
    },
    {
        path:'/meal',//就餐申请
        component:Meal,
		meta: {keepAlive: true}
    },{
        path:'/mealDetails', //就餐申请详情
        component:MealDetails,
		meta: {keepAlive: true}
    },
    {
        path:'/document',//行文呈批
        component:Document,
		meta: {keepAlive: true}
    },{
        path:'/documentDetails', //行文呈批详情
        component:DocumentDetails,
		meta: {keepAlive: true}
    },
    {
        path:'/overtime', //加班
        component:Overtime,
		meta: {keepAlive: true}
    },
    {
        path:'/overtimeDetails', //加班详情
        component:OvertimeDetails,
		meta: {keepAlive: true}
    },
    {
        path:'/exchange', //调岗
        component:Exchange,
		meta: {keepAlive: true}
    },
    {
        path:'/exchangeDetails', //调岗详情
        component:ExchangeDetails,
		meta: {keepAlive: true}
    },
    
]