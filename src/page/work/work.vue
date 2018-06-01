<style scoped lang="stylus">
  @import "../../style/variable.styl";
  *{
    -webkit-tap-highlight-color: transpranet;
  }
  .tab_work_con {
    margin-left: 0.135rem;
    margin-right: 0.135rem;
    margin-top: 0.15rem;
    background-color: #fff;
    border-radius: 0.027rem;
    box-shadow: 0 0 10px rgba(14,175,106,0.1);
  }
  .tab_work_2con {
    display: flex;
    display:-webkit-flex;
    flex-direction: row;
    height: 0.53rem;
    align-items: center;
  }
  .tab_work_2con li:first-child {
    width: 0.035rem;
    height: 0.16rem;
    background-color: $orange_color;
    border-radius: 1rem;
    margin-left: 0.12rem;
  }
  .tab_work_2con li:last-child {
    margin-left: 0.05rem;
    font-size: 0.16rem;
  }
  .tab_work_3con {
    display: flex;
    display:-webkit-flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  }
  .first_tab_work_3con{
     height auto
     padding-top 0.2rem;
  }
  .tab_work_3con li{
    position relative;
    width: 25%;
    display: flex;
    display:-webkit-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom 0.2rem;
    padding-top 0.1rem;
    margin-top -0.15rem;
    -webkit-tap-highlight-color: transpranet;
  }

  .tab_work_3con li .mes-num{
      position absolute;
      width 0.15rem;
      height  0.15rem;
      line-height 0.15rem;
      border-radius 50%;
      right 0.05rem;
      top 0.05rem;
      color #fff;
      font-size 0.1rem;
      text-align center;
      background-color rgb(253, 84, 92); 
  }
  .tab_work_3con li:nth-child(n + 5){
    margin-top 0;
  }
  .tab_work_3con li div:last-child
    font-size: 0.14rem
    margin-top 0.05rem

  .mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    z-index: 9;
  }
  .banner-wrapper{
    z-index: -1;
    height: 1.23rem;
    padding: 0 0.15rem;
    padding-top: 0.3rem;
    background: #499844;
    border-bottom-left-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
    color: white;
    line-height:1;
  }
  .banner-h1{
    font-size: 0.19rem;
  }
  .banner-h2{
    font-size: 0.16rem;
    margin: 0.1rem 0 0.16rem;
  }
  .banner-h3{
    font-size: 0.13rem;
  }
  .broadcast{
    display: flex;
    display:-webkit-flex;
    align-items center;
    padding: 0.15rem;
    margin-top: -0.3rem;
    box-shadow: 0 0 20px rgba(0,143,87,0.15);
  }
  .broadcast-content-wrapper,.broadcast-item{
    width 2.7rem;
    height: 0.41rem;
    overflow: hidden;
  }
  .icon-broadcast{
    width: 0.4rem;
    height: 0.4rem;
    margin-right: 0.1rem;
  }
  .broadcast-time{
    font-size: 0.14rem;
    color: #666;
  }
  .broadcast-message{
    white-space nowrap;
    overflow hidden;
    text-overflow ellipsis;
    font-size: 0.16rem;
    color: #333;
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
<template>
  <div class="mask" v-if="mask"></div>
  <section class="padding_bottom_content" v-else>
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
    <div class="banner-wrapper">
      <div class="banner-h1">{{slogans.firstLine}}</div>
      <div class="banner-h2">{{slogans.secondLine}}</div>
      <div class="banner-h3">{{dateString}}</div>
    </div>
    <div class="content-wrapper">
      <div class="tab_work_con broadcast">
        <div>
          <svg class="icon icon-broadcast" aria-hidden="false">
            <use xlink:href="#icon-Msg"></use>
          </svg>
        </div>
        <div class="broadcast-content-wrapper">
          <div class="broadcast-content" ref="broadcast">
            <div class="broadcast-item" v-for="(item,index) in broadcast_list" :key="index" @click="messageLink">
              <div class="broadcast-time">{{item.sendDate}}</div>
              <div class="broadcast-message">{{item.message}}</div>
            </div>
          </div>
        </div>
      </div>


 		 <div class="tab_work_con">
        <ul class="tab_work_3con first_tab_work_3con">
          <li @click="go_unfinishAffairs">
            <span v-if="mesNum" class="mes-num">{{mesNum}}</span>
            <div>
              <svg style="width: 0.27rem;height: 0.27rem" class="icon" aria-hidden="false">
                <use xlink:href="#icon-daibanshiyi"></use>
              </svg>
            </div>
            <div style="font-size:0.14rem;margin-top: 0.05rem">待办事宜</div>
          </li> 
          <li @click="go_finishAffairs">
            <div>
              <svg style="width: 0.27rem;height: 0.27rem" class="icon" aria-hidden="false">
                <use xlink:href="#icon-yibanshiyi"></use>
              </svg>
            </div>
            <div style="font-size:0.14rem;margin-top: 0.05rem">已办事宜</div>
          </li> 
          <li @click="go_myApply">
            <div>
              <svg style="width: 0.27rem;height: 0.27rem" class="icon" aria-hidden="false">
                <use xlink:href="#icon-wodeshenqing-mian"></use>
              </svg>
            </div>
            <div style="font-size:0.14rem;margin-top: 0.05rem">我的申请</div>
          </li> 
          <li @click="go_daily">
            <div>
              <svg style="width: 0.27rem;height: 0.27rem" class="icon" aria-hidden="false">
                <use xlink:href="#icon-qiyeribao"></use>
              </svg>
            </div>
            <div>企业日报</div>
          </li>
        </ul>
      </div>
      <div class="tab_work_con">
        <ul class="tab_work_2con">
          <li></li>
          <li>企业管理</li>
        </ul>
        <ul class="tab_work_3con">
          <li @click="go_record">
            <div>
              <svg style="width: 0.27rem;height: 0.27rem" class="icon" aria-hidden="false">
                <use xlink:href="#icon-kaoqin"></use>
              </svg>
            </div>
            <div>考勤</div>
          </li>
          <li @click="go_outwork">
            <div>
              <svg style="width: 0.27rem;height: 0.27rem" class="icon" aria-hidden="false">
                <use xlink:href="#icon-waiqin"></use>
              </svg>
            </div>
            <div>外勤</div>
          </li>
          <li @click="go_leave">
            <div>
              <svg style="width: 0.27rem;height: 0.27rem" class="icon" aria-hidden="false">
                <use xlink:href="#icon-qingjia"></use>
              </svg>
            </div>
            <div style="font-size:0.14rem;margin-top: 0.05rem">请假</div>
          </li>
          <li @click="go_Grouplist">
            <div>
              <svg style="width: 0.27rem;height: 0.27rem" class="icon" aria-hidden="false">
                <use xlink:href="#icon-qunzu"></use>
              </svg>
            </div>
            <div style="font-size:0.14rem;margin-top: 0.05rem">群组</div>
          </li>
          <li @click="go_LetterOfRequest">
            <div>
              <svg style="width: 0.27rem;height: 0.27rem" class="icon" aria-hidden="false">
                <use xlink:href="#icon-qingshihan"></use>
              </svg>
            </div>
            <div style="font-size:0.14rem;margin-top: 0.05rem">请示函</div>
          </li>  
          <li @click="go_Maillist">
            <div>
              <svg style="width: 0.27rem;height: 0.27rem" class="icon" aria-hidden="false">
                <use xlink:href="#icon-tongxunlu"></use>
              </svg>
            </div>
            <div style="font-size:0.14rem;margin-top: 0.05rem">通讯录</div>
          </li>  
        </ul>
      </div>
      <div class="tab_work_con">
        <ul class="tab_work_2con">
          <li></li>
          <li>工作汇报</li>
        </ul>
        <ul class="tab_work_3con">
          <li @click="go_daynews">
            <div>
              <svg style="width: 0.27rem;height: 0.27rem" class="icon" aria-hidden="false">
                <use xlink:href="#icon-ribao"></use>
              </svg>
            </div>
            <div style="font-size:0.14rem;margin-top: 0.05rem">日报</div>
          </li>
          <li @click="go_weeknews">
            <div>
              <svg style="width: 0.27rem;height: 0.27rem" class="icon" aria-hidden="false">
                <use xlink:href="#icon-zhoubao"></use>
              </svg>
            </div>
            <div style="font-size:0.14rem;margin-top: 0.05rem">周报</div>
          </li>
          <li @click="go_monthnews">
            <div>
              <svg style="width: 0.27rem;height: 0.27rem" class="icon" aria-hidden="false">
                <use xlink:href="#icon-yuebao"></use>
              </svg>
            </div>
            <div style="font-size:0.14rem;margin-top: 0.05rem">月报</div>
          </li>
          <li @click="go_journal">
            <div>
              <svg style="width: 0.27rem;height: 0.27rem" class="icon" aria-hidden="false">
                <use xlink:href="#icon-gongzuohuibao"></use>
              </svg>
            </div>
            <div style="font-size:0.14rem;margin-top: 0.05rem">工作汇报</div>
          </li>
        </ul>
      </div>
      <div class="tab_work_con" v-show="showMES">
        <ul class="tab_work_2con">
          <li></li>
          <li>移动制造</li>
        </ul>
        <ul class="tab_work_3con">
          <li @click="go_output">
            <div>
              <svg style="width: 0.27rem;height: 0.27rem" class="icon" aria-hidden="false">
                <use xlink:href="#icon-shengchanguanli"></use>
              </svg>
            </div>
            <div style="font-size:0.14rem;margin-top: 0.05rem">生产管理</div>
          </li>
          <li @click="go_materierl">
            <div>
              <svg style="width: 0.27rem;height: 0.27rem" class="icon" aria-hidden="false">
                <use xlink:href="#icon-wuliaoguanli"></use>
              </svg>
            </div>
            <div style="font-size:0.14rem;margin-top: 0.05rem">物料管理</div>
          </li>
          <li @click="go_machine">
            <div>
              <svg style="width: 0.27rem;height: 0.27rem" class="icon" aria-hidden="false">
                <use xlink:href="#icon-shebeiguanli"></use>
              </svg>
            </div>
            <div style="font-size:0.14rem;margin-top: 0.05rem">设备管理</div>
          </li>
          <li @click="go_quality">
            <div>
              <svg style="width: 0.27rem;height: 0.27rem" class="icon" aria-hidden="false">
                <use xlink:href="#icon-zhiliangguanli"></use>
              </svg>
            </div>
            <div style="font-size:0.14rem;margin-top: 0.05rem">质量管理</div>
          </li>
          <li @click="go_energy">
            <div>
              <svg style="width: 0.27rem;height: 0.27rem" class="icon" aria-hidden="false">
                <use xlink:href="#icon-nengyuanguanli"></use>
              </svg>
            </div>
            <div style="font-size:0.14rem;margin-top: 0.05rem">能源管理</div>
          </li>
          <li @click="go_energyMonitor">
            <div>
              <svg style="width: 0.27rem;height: 0.27rem" class="icon" aria-hidden="false">
                <use xlink:href="#icon-nengyuanjiankong"></use>
              </svg>
            </div>
            <div style="font-size:0.14rem;margin-top: 0.05rem">能源监控</div>
          </li>
          <li @click="go_trendMonitor">
            <div>
              <svg style="width: 0.27rem;height: 0.27rem" class="icon" aria-hidden="false">
                <use xlink:href="#icon-qushijiankong"></use>
              </svg>
            </div>
            <div style="font-size:0.14rem;margin-top: 0.05rem">趋势监控</div>
          </li>
        </ul>
      </div>
    </div>
  </section>
      
    </div>
  </section>
</template>
<script>
  let date = new Date();
  let days = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
  function escape2Html(str){
    var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"','ldquo':'"','rdquo':'"','mdash':'_'};
    return str.replace(/&(lt|gt|nbsp|amp|quot|ldquo|rdquo|mdash);/ig,function(all,t){
      return arrEntities[t]});
  }
  function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  }
  import {mapState, mapMutations} from 'vuex';
  export default {
    data () {
      return {
        mesNum : 0,//待办事宜条数
        banner: '',
        loading: false,
        is_login: true,
        mask: true,
        noNetwork: false,
        slogans:{},
        broadcast_list: [],
        dateString: date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+"  "+days[date.getDay()],
        interval: null,
        logo: require("../../assets/no_wifi.png"),
        showMES: false,
      }
    },
    created(){
      if (window.localStorage.work_banner) {
        this.banner = JSON.parse(window.localStorage.work_banner)
      }
    },
    methods: {
      go_record(){
        TDAPP.onEvent('record','考勤')                
        window.location.href = "epipe://?&mark=record"
        window["epipe_login_callback"] = auth_token => {
          window.localStorage.setItem("auth_token", auth_token);
        }
      },
      go_outwork(){
        TDAPP.onEvent('outwork','外勤')        
        window.location.href = "epipe://?&mark=outwork"
        window["epipe_login_callback"] = auth_token => {
          window.localStorage.setItem("auth_token", auth_token);
        }
      },
      go_Maillist(){
        TDAPP.onEvent('Maillist','通讯录')        
        window.location.href = "epipe://?&mark=Maillist"
      },
      //日报
      go_daynews(){
        TDAPP.onEvent('daynews','日报')
        window["epipe_login_callback"] = auth_token => {
          window.localStorage.setItem("auth_token", auth_token);
        }
        window.location.href = "epipe://?&mark=daynews"
      },
      //周报
      go_weeknews(){
        TDAPP.onEvent('weeknews','周报') 
        window["epipe_login_callback"] = auth_token => {
          window.localStorage.setItem("auth_token", auth_token);
        }
        window.location.href = "epipe://?&mark=weeknews"
      },
      //月报
      go_monthnews(){
        TDAPP.onEvent('monthnews','月报')                        
        window["epipe_login_callback"] = auth_token => {
          window.localStorage.setItem("auth_token", auth_token);
        }
        window.location.href = "epipe://?&mark=monthnews"
      },
      //工作汇报
      go_journal(){
        TDAPP.onEvent('journal','工作汇报')                
        window["epipe_login_callback"] = auth_token => {
          window.localStorage.setItem("auth_token", auth_token);
        }
        window.location.href = "epipe://?&mark=journal"
      },
      go_newsdetail(item){
        if (item.url != "#") {
          let title = Util.Title_format(item.title)
          window.location.href = "epipe://?&mark=newsdetail&title=" + title + "&url=" + item.url;
        }
      },
      //企业日报
      go_daily(){
        TDAPP.onEvent('dailyreport','企业日报')        
        window.location.href = "epipe://?&mark=dailyreport";
      },
      //已办事宜
      go_finishAffairs(){
        TDAPP.onEvent('finishAffair','已办事宜')
        window.location.href = "epipe://?&mark=finishAffair";
      },
      //待办事宜
      go_unfinishAffairs(){
        TDAPP.onEvent('unfinishAffair','待办事宜')        
        window.location.href = "epipe://?&mark=unfinishAffair"
      },
      //我的申请
      go_myApply(){
        TDAPP.onEvent('myApply','我的申请')                
        window.location.href = "epipe://?&mark=myApply"
      },
      //请假
      go_leave(){
        TDAPP.onEvent('leave','请假')                        
        window.location.href = "epipe://?&mark=leave"
      },
       //请示函
      go_LetterOfRequest(){
        TDAPP.onEvent('letter_of_request','请示函')                        
        window.location.href = "epipe://?&mark=letterOfRequest"
      },
      //跳转群组
      go_Grouplist(){
        TDAPP.onEvent('group','群组')                                
        window.location.href = "epipe://?&mark=Grouplist"
      },
      //物料管理
      go_materierl(){
        TDAPP.onEvent('materialControl','物料管理')        
        window.location.href = "epipe://?&mark=materieldaily";
      },
      //设备管理
      go_machine(){
        TDAPP.onEvent('equipmentControl ','设备管理')                        
        
        window.location.href = "epipe://?&mark=warning";
      },
      //生产管理
      go_output(){
        TDAPP.onEvent('productionControl ','生产管理')                        
        
        window.location.href = "epipe://?&mark=outputdaily";
      },
      //质量管理
      go_quality(){
        TDAPP.onEvent('qualityControl','质量管理')                                
        window.location.href = "epipe://?&mark=qualitydaily";
      },
      //能源管理
      go_energy(){
        TDAPP.onEvent('energyControl','能源管理')                        
        window.location.href = "epipe://?&mark=water";
      },
      //能源监控
      go_energyMonitor(){
        TDAPP.onEvent('energymonitoring','能源监控')                
        window.location.href = "epipe://?&mark=energymonitoring";
      },
      //趋势监控
      go_trendMonitor(){
        TDAPP.onEvent('trendmonitoring','趋势监控')    
        window.location.href = "epipe://?&mark=trendmonitoring";
      },
      //判断用户是否有组织
      organization(){
        this.axios.get(this.Service.organization).then(res =>{
          console.log("用户组织",res);
          if(res.data.h.code ==200){
            let obj = res.data.b;
            if(obj.type == 1 || obj.type == 2){  //待审核，跳转到待审核页面
              this.$router.push({path:'/pending'});
            }else if(obj.type == 3){  //无组织，跳转到申请加入组织页面
              this.$router.push({path:'/Nologin'});
            }
            this.mask = false;  //有组织，展示工作台
       
       }else{
            this.mask = false;
            this.$router.push({path:'/Nologin'});
          }
        }).catch(err =>{
          this.mask = false;
          this.noNetwork = true;
          this.$toast(err.data.h.msg);
        });
      },
      /*获取用户信息*/
      getUserInfo(){
        //const userToken = getCookie("auth_token") ? getCookie("auth_token") : "bc0b43b3-c9b2-49a5-b1c9-72c029580437";
        const userToken = getCookie("auth_token");
        if(userToken){
          this.axios.get('/user/info/by/token',{params: {token: userToken}}).then(res =>{
            console.log("用户信息",res);
            if(res.data.h.code === 200 && res.data.b.centerGroupId){
              this.getFactory(res.data.b.centerGroupId);
            }
          });
        }
      },
      /*获取工厂ID*/
      getFactory(id){
        this.$mes.get("/user/factoryId",{
          companyId: id
        }).then(res =>{
          console.log("工厂信息",res);
          if(res.b.factoryId){
            this.showMES = true;
          }else{
            this.showMES = false;
          }
        })
      },
      /*获取banner图片*/
      getBanner(){
        let that = this;
        this.axios.get(this.Service.content_show, {params: {type: 3, locationId: 30}}).then(function (data) { //欢迎图
          if (data.data.b) {
            data.data.b[0].imgUrl = data.data.b[0].imgUrl + "?imageslim&imageView2/1/w/750/h/320"
            that.banner = data.data.b[0]
            window.localStorage.work_banner = JSON.stringify(data.data.b[0])
          }
        });
      },
      /*广播信息轮播*/
      broadcast(){
        let parentNode = this.$refs.broadcast;
        let timer = null;
        clearInterval(this.interval);
        this.interval = setInterval(() =>{
          parentNode.style.transition="-webkit-transform 500ms linear";
          parentNode.style.transition="transform 500ms linear";
          parentNode.style.WebkitTransform = "translateY(-0.4rem)";
          parentNode.style.transform = "translateY(-0.4rem)";
          clearTimeout(timer);
          timer = setTimeout(() =>{
            let childNode = parentNode.removeChild(parentNode.firstChild);
            parentNode.appendChild(childNode);
            parentNode.style.transition="-webkit-transform 0s ease-out";
            parentNode.style.transition="transform 0s ease-out";
            parentNode.style.WebkitTransform = "translateY(0)";
            parentNode.style.transform = "translateY(0)";
          },500);
        },3000);
      },
      /*工作台文字信息*/
      slogan(){
        this.axios.get(this.Service.slogan).then(res =>{
          console.log("标语",res);
          if(res.data.h.code === 200){
            this.slogans.firstLine = escape2Html(res.data.b.firstLine);
            this.slogans.secondLine = escape2Html(res.data.b.secondLine);
          }
        });
      },
      /*获取广播消息*/
      message(){
        let vm = this;
        this.axios.get(this.Service.message).then(res =>{
          if(res.data.h.code === 200){
            if(res.data.b.data.length>5){
              for(let i=0;i<5;i++){
                this.broadcast_list.push(res.data.b.data[i]);
              }
            }else{
              this.broadcast_list = res.data.b.data;
            }
            if(this.broadcast_list.length > 1){
              this.broadcast();
            }
          }
        });
        window["epipe_message_callback"] = () => {
          vm.message();
        }
      },
      /*消息跳转*/
      messageLink(){
        window.location.href = "epipe://?&mark=message"
      },
      /*刷新页面*/
      reload(){
        this.mask = true;
        this.noNetwork = false;
        setTimeout(() =>{
          window.location.reload();
        },0);
      },
      getAffairs(){
        let vm = this;
        vm.mesNum = 0;
        this.axios.get(this.Service.affairsList).then(function(res){
              vm.mesNum = res.data.b[0].count;
            });

        window["epipe_affairs_callback"] = () => {
            vm.getAffairs();
        }

      },

    },
 
    mounted(){
      this.organization();
      this.getUserInfo();
      this.slogan();
      this.message();
      this.getAffairs();
    }
  }
</script>


