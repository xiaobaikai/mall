<template>
  <div class="mask" v-if="mask"></div>
    <div v-else>
        <div class="no-network" v-if="noNetwork">
            <div class="no-network-content">
                <img :src="logo" alt="无网络">
                <div class="tips">
                <p style="font-size: 0.16rem;">您的手机网络不太顺畅~</p>
                <p>请检查网络设置</p>
                </div>
                <div class="btn-refresh" @click="reload()">刷新</div>
            </div>
            </div>
        <section class="back">
            <div class="infor">

                <div class="infor-user">
                    <img :src="userData.profileImg"/>
                    {{userData.name}}
                </div>

                <div class="infor-msg">
                    <div>
                        <p class="infor-advertising">{{slogans.firstLine}}</p>
                        {{token}}
                        <p class="infor-date">{{dateString}}</p>
                    </div>

                    <div>

                    </div>
                </div>

            </div>

            <div class="menu">
                <div class="menu-lf">
                    <p class="h-title">今日考勤</p>
                    <p class="menu-lf-date">{{toDayCheck!=''?toDayCheck:'未打卡'}}</p>
                    <a @click="go_record">去打卡</a>
                    <span>不要忘记打下班卡哦</span>
                </div>

                <div class="menu-rg">
                    <div class="menu-rg-work">
                        <div>
                            <span>{{signTotal}}</span>
                            <p>本月出勤</p>
                        </div>
                    </div>

                    <div class="menu-rg-company" @click="companyWall">
                        <svg style="width: 0.27rem;height: 0.27rem;margin-top:0.15rem;" class="icon" aria-hidden="false">
                            <use xlink:href="#icon-gongsiqiang1"></use>
                        </svg>
                        <p>公司墙</p>
                    </div>
                </div>
            </div>
        </section>

        <div class="menu-list">
            <div class="menu-item"  :key="index">
                <p class="item-title"> <i></i> <span>常用应用</span>  <a class="manage" @click="manage">管理</a> </p>
                <ul>
                    <li  @click="a()">
                         <svg style="font-size: 0.33rem;"  class="icon img" aria-hidden="false">
                            <use xlink:href="#icon-jiyao"></use>
                        </svg>
                        <span>我的审批</span>
                    </li>
                    <li @click="b()">
                         <svg style="font-size: 0.33rem;"  class="icon img" aria-hidden="false">
                            <use xlink:href="#icon-gongzuohuibao"></use>
                        </svg>
                        <span>我的申请</span>
                    </li>
                     <li  @click="c()">
                         <svg style="font-size: 0.33rem;"  class="icon img" aria-hidden="false">
                            <use xlink:href="#icon-jiyao"></use>
                        </svg>
                        <span>用车</span>
                    </li>
                    <li @click="d()">
                         <svg style="font-size: 0.33rem;"  class="icon img" aria-hidden="false">
                            <use xlink:href="#icon-gongzuohuibao"></use>
                        </svg>
                        <span>用人</span>
                    </li>
                    <li v-for="(c,i) in workData[0].apps" :key="i" >
                        <img :src="c.icon"/>
                        <span>{{c.name}}</span>
                    </li>
                    <li @click="go_neatenWork" v-if="workData[0].apps.length<4">
                         <svg style="font-size: 0.33rem;"  class="icon img" aria-hidden="false">
                            <use xlink:href="#icon-tianjiarenyuan"></use>
                        </svg>
                        
                        添加
                    </li>
                </ul>
            </div>
            <div class="menu-item" v-for="(item,index) in workData" :key="index" v-if="item.id>-1&&item.hideFlag!='1'">
                <p class="item-title"> <i></i> <span>{{item.name}}</span></p>
                <ul>
                    <li v-for="(c,i) in item.apps" :key="i" @click="go_jump(c)" v-if="c.delFlag!='1'">
                        <img :src="c.icon"/>
                        <span>{{c.name}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    function escape2Html(str){
        if(str==''||!str) return ''
        var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"','ldquo':'"','rdquo':'"','mdash':'_'};
        return str.replace(/&(lt|gt|nbsp|amp|quot|ldquo|rdquo|mdash);/ig,function(all,t){
        return arrEntities[t]});
    }
    let days = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
    let date = new Date();
    import {mapState, mapMutations} from 'vuex';
    export default {
        data() {
            return {
               dateString:date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+"  "+days[date.getDay()],
               workData:[],
               slogans:{}, //标语
               userData:{}, //用户信息
               signTotal:{}, //考勤统计
               toDayCheck:'', //今日考勤
               token:'',
               payShow:false,
               mask:true,
               noNetwork:false,
                logo: require("../../assets/no_wifi.png"),
            }
        },
        created() {
            let that = this;

             window["workUpdate"] = () => {
                that.get_work();
                that.getTotal();//获取考勤总次数
                that.today();//获取今日考勤
            }

            this.setToken(this.Service.getCookie('auth_token'))
            this.token = this.Service.getCookie('auth_token')

            this.organization(); //获取是否有组织
            this.slogan(); // 获取标语
            this.getInfor(); //
            this.getUserInfor(); //获取用户名等信息
            this.getTotal();//获取考勤总次数
            this.today();//获取今日考勤
            this.get_work();//获取工作台图标
        },
        computed: mapState(["token"]),
        methods:{
            ...mapMutations([
                'setToken',
            ]),
            a(){
                 window.location.href = "epipe://?&mark=unfinishAffair";
            },
            b(){
                 window.location.href = "epipe://?&mark=myApply";
            },
            c(){
                 window.location.href = "epipe://?&mark=car";
            },
            d(){
                 window.location.href = "epipe://?&mark=employee";
            },
            go_jump(obj){ //应用跳转
                window.location.href = obj.url;
            },
            manage(){ //管理
                // this.$router.push('/neatenWork')
                 window.location.href = "epipe://?&mark=neatenWork";
            },
            get_work(){
                let _this = this;

                this.axios.get('/work/app/list').then(res=>{
                    _this.workData = res.data.b.appCategorys;
                })
            },
            go_neatenWork(){
                // this.$router.push({path:'/addWork'})
                 window.location.href = "epipe://?&mark=addWork";
            },
            go_record(){
                 window.location.href = "epipe://?&mark=record";
            },
            companyWall(){ //跳转公司墙
                 window.location.href = "epipe://?&mark=companyWall";
            },
            slogan(){ //标语
                this.axios.get(this.Service.slogan).then(res =>{
                console.log("标语",res);
                if(res.data.h.code === 200){
                    this.slogans.firstLine = escape2Html(res.data.b.firstLine);
                    this.slogans.secondLine = escape2Html(res.data.b.secondLine);
                }
                });
            },
             reload(){ //刷新
                this.mask = true;
                this.noNetwork = false;
                setTimeout(() =>{
                window.location.reload();
                },0);
            },
            getUserInfor(){  //用户信息
                this.axios.get('/user/info').then(res =>{
                    this.userData = res.data.b
                });
            },
            today(){ //今日考勤
                    let that = this;
                    this.axios.get('/check/sign/record', {
                            params: {
                                checkDate: date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),
                            }
                        }).then(res=>{
                            let str = res.data.b.data[res.data.b.data.length - 1].signTime;
                            that.toDayCheck = str.slice(10)
                        })
            },
            getTotal(){ //考勤统计
                let that = this;
                this.axios.get(this.Service.checkStatic, {
                        params: {
                            staticDate: date.getFullYear()+"-"+(date.getMonth()+1),
                        }
                    }).then(function (res){
                        that.signTotal = res.data.b.normalTimes;
                    })
            },
            getInfor(){
                // const userToken = this.Service.getCookie("auth_token");
                // if(userToken){
                // this.axios.get('/user/info/by/token',{params: {token:userToken}}).then(res =>{
                //     if(res.data.h.code === 200 && res.data.b.centerGroupId){
                //         // this.getFactory(res.data.b.centerGroupId);
                //     }
                // });
                // }
            },
            //判断用户是否有组织
            organization(){
                this.axios.get(this.Service.organization).then(res =>{
                console.log("用户组织",res);

                if(res.data.h.code == 200){
                    let obj = res.data.b;
                    if(obj.type == 1 || obj.type == 2){  //待审核，跳转到待审核页面
                    this.$router.push({path:'/pending'});
                    }else if(obj.type == 3){  //无组织，跳转到申请加入组织页面
                    this.$router.push({path:'/Nologin'});
                    }
                    if(obj.menuType.indexOf('1')>-1){ //显示e付款
                    this.payShow = true;
                    }
                    this.mask = false;  //有组织，展示工作台
            
                }else{
                    this.mask = false;
                    this.$router.push({path:'/Nologin'}); //跳转无组织页面
                }
                }).catch(err =>{
                this.mask = false;
                this.noNetwork = true; //显示无网络界面
                this.$toast(err.data.h.msg);
                });
            },
        }

    }
</script>

<style scoped lang="stylus">

.mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    z-index: 9;
  }

    .back{
        background-color #42a653
        height 2.3rem;
        position relative
        box-sizing border-box;
    }

    .manage{
        color #609ef7;
        font-size 0.14rem;
        float right;
        margin-top 0.02rem;
    }

    .infor{
        color #fff
        padding-left 0.15rem;
        padding-top 0.35rem;

        &-user{
            overflow hidden;
            font-size 0.17rem;
            line-height 0.5rem;
            margin-bottom 0.15rem;
            letter-spacing 0.02rem;

            img{
                box-sizing border-box;
                float left;
                width 0.5rem;
                height 0.5rem;
                border-radius 50%;
                border 0.02rem solid #fff;
                margin-right 0.06rem;
            }
        }

        &-advertising{
            font-size 0.17rem;
            letter-spacing 0.02rem;
            margin-bottom 0.07rem;
        }

        &-date{
            font-size 0.12rem;
            color #cfe5db;
        }
    }

    .menu{
        width 3.45rem;
        height 1.7rem;
        box-sizing border-box;
        background-color #fff
        border-radius 0.08rem;
        display flex;
        text-align center
        position absolute 
        bottom -1rem;
        left 0;
        right 0;
        margin auto;

        &-lf{
            border-right 0.01rem solid #e6e6e6;
            width 1.95rem;

            .h-title{
                margin-top 0.2rem;
                margin-bottom 0.1rem;
                font-size 0.17rem;
            }

            &-date{
                color #609ef7
                font-size 0.24rem;
                font-weight bold;
            }

            a{
                display block
                width 1rem;
                height 0.35rem;
                line-height 0.35rem;
                border-radius 0.35rem;
                background-color #f28912;
                color #fff;
                margin 0 auto;
                font-size 0.18rem
                margin-bottom 0.05rem;
                margin-top 0.18rem;
            }

            span{
                color #b2b2b2;
                font-size 0.12rem;
            }
        }

        &-rg{
            flex 1;
            display flex
            flex-direction:column;

            >div{
                width 100%;
                flex 1;
            }

            &-work{
                border-bottom 0.01rem solid #e6e6e6;

                span{
                    display inline-block
                    font-size 0.22rem;
                    color #1bb36f;
                    font-weight bold;
                    margin-top 0.2rem;
                }
            }
        }
    }

    .menu-list{
        margin-top 1.2rem;
    }

    .menu-item{
        box-sizing border-box;
        background-color #fff;
        margin 0 0.15rem;
        padding 0.15rem;
        border-raius 0.04rem;
        margin-bottom 0.15rem;

        .item-title{
            overflow hidden

            i{
                float left
                width 0.03rem;
                height 0.16rem;
                background-color #f80;
                border-radius 0.03rem;
                margin-top 0.03rem;
                margin-right 0.06rem;
            }

            span{
                float left
                font-size 0.16rem;
                color #333
            }
        }

        img,.img{
            display block;
            width 0.27rem;
            height 0.27rem;
            margin 0 auto;
            margin-bottom 0.03rem;
        }

        ul{
            overflow hidden

            li{
                float left;
                width 25%;
                text-align center;
                margin-top 0.15rem;
            }

            span{
                fon-size 0.14rem;
                color #333
            }
        }
    }

    .no-network{
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    background: white;
    .no-network-content{
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      transform: translateY(-50%);
    }
    img{
      width: 1.5rem;
    }
    .tips{
      margin-top: 10px;
      color: #969696;
    }
    .btn-refresh{
      display inline-block;
      width: 0.8rem;
      height: 0.3rem;
      margin-top: 0.2rem;
      line-height 0.3rem;
      text-align: center;
      background: #499844;
      color: white;
      border-radius: 2px;
    }
  }

</style>