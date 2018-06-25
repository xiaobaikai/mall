<template>
    <section>
        <TopHead
        mark='mark'
        bgcolor = '#fd545c'
        :title=title
        v-on:history_back="history_back_click"
         ></TopHead>
        <div class="content">
            <div class="styles">
                <div class="content_head">
                    <img class="imgHead" :src="dataObj.profileImgs" @click="go_user(dataObj.userId)">
                    <div>
                        <p class="nameTl">{{dataObj.userName}}</p>
                        <p class="res" >{{leaveType |details}}</p>
                        <p class="res" v-if="leaveType==3||leaveType==4">{{'等待'+dataObj.auditName+'的审批'}}</p>
                    </div>
                </div>
            </div>
            <div class="styles infor">
                <div class="infor-box">
                    <span>审批编号</span>
                    <p>{{dataObj.applyNo}}</p>
                </div>
                <div class="infor-box">
                    <span >部&emsp;&emsp;门</span>
                    <p>{{dataObj.officeName}}</p>
                </div>
                <div class="infor-box">
                    <span>请假类型</span>
                    <p>{{dataObj.leaveType}}</p>
                </div>
                <div class="infor-box">
                    <span>开始时间</span>
                    <p>{{dataObj.beginTime|timeStrSlice}}</p>
                </div>
                <div class="infor-box">
                    <span>结束时间</span>
                    <p>{{dataObj.endTime |timeStrSlice}}</p>
                </div>
                <div class="infor-box">
                    <span >时&emsp;&emsp;长</span>
                    <p>{{dataObj.leaveDuration|dayNum}} 天</p>
                </div>
                <div class="infor-box">
                    <span>请假事由</span>
                    <p>{{dataObj.reason}} 

                       <ul class="reasonImg">
                         <li v-for="(item,index) in dataObj.images"><img :src="item" @click="go_imgdetail(index)"></li>
                       </ul> 
                    </p>
                    
                </div>
            </div>
            <div class="styles approve">
                <p class="title">审批人<span>（已添加{{dataObj.auditers.length+1}}人）</span></p>
                <ul class="list">
                    <li>
                        <div class="approve_list">
                            <img class="imgHead" :src="dataObj.profileImgs">
                            <div class="approve_inf">
                                <span>{{dataObj.userName}}</span>
                                <span>发起申请</span>
                                <span>{{dataObj.applyTime | timeStrSlice}}</span>
                            </div>
                        </div>
                        <svg class="icon icon-back" aria-hidden="false" v-if="index!=2">
                            <use xlink:href="#icon-jiantou1"></use>
                        </svg>
                    </li>
                    <li v-if="dataObj.auditStatus == '3'">
                        <div class="approve_list">
                            <img class="imgHead" :src="dataObj.profileImgs">
                            <div class="approve_inf">
                                <span>{{dataObj.userName}}</span>
                                <span style="color:#f80">已撤销</span>
                                <span></span>
                            </div>
                        </div>
                    </li>
                    <li v-for="(item,index) in dataObj.auditers" :key="item.id" v-if="refuseIndex==-1||(refuseIndex>-1&index<refuseIndex)">
                        <div class="approve_list">
                            <img class="imgHead" :src="item.profileImg">
                            <div class="approve_inf">
                                <span>{{item.name}}</span>
                                <span :class="item.status==0?'consent':'refause'">{{item.status | stateName}}</span>
                                <span>{{item.auditTime | timeStrSlice}}</span>
                            </div>
                        </div>
                        <svg class="icon icon-back" aria-hidden="false" v-if="index!=dataObj.auditers.length-1&item.status!=2">
                            <use xlink:href="#icon-jiantou1"></use>
                        </svg>
                        <div class="reason" v-if="item.status==2">
                            {{item.refuseReason}}
                        </div>
                    </li>
                    
                </ul>
            </div>
            <div class="styles copy">
                <p class="title">抄送人<span>（已抄送{{dataObj.receivers.length}}人）</span></p>
                
                <ul class="list">
                    <li v-for="(item,index) in dataObj.receivers" class="list_item"> 
                        <img class="imgHead" :src="item.profileImg"><span>
                            {{item.name}}
                    </span></li>
                </ul>
                
            </div>
        </div>
        <div class="btn_box">

                <div v-if="dataObj.myselfApply==3&dataObj.auditStatus!='3'&dataObj.auditStatus!='2'&&dataObj.auditStatus!='1'&leaveType!=4" class="revocation_btn" @click="isDialog=true">撤销</div>
                <a  v-if="dataObj.myselfApply==0&dataObj.auditStatus!='3'" class="consent_btn" @click="consent()">同意</a>
                <a  v-if="dataObj.myselfApply==0&dataObj.auditStatus!='3'" class="refuse_btn" @click="refuse()">拒绝</a>
                <div style="clear:both"></div>

        </div>

        <div class="dialog" v-show="isDialog" @touchmove.prevent>
            <div class="dialog_box">
                <div class="dialog_content">确认撤销申请？</div>
                <div class="dialog_btn">
                    <a class="confirm_btn" @click="revocation()">确定</a>
                    <a class="cancel_btn" @click="isDialog=false">取消</a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import TopHead  from '../../components/topheader.vue'  //header导航栏

    export default {
        data(){
            return{
                dataObj: {},
                isDialog : false,
                btnType : 0,
                refuseIndex :-1, //拒绝截止下标
                leaveType : '3', //请假状态
                newStatus :'',
                titleColor:'#fd545c',
                titleType :'no',
                refuseSvgIndex:-1,
                mark :'marks',
                title:'',
            }
        },

        components:{
            TopHead
        },
        methods :{

            revocation:function(){  //撤销
                let that = this;
                let id = this.dataObj.leaveId;
                this.axios.post("/work/leave/update?leaveId="+id+'&type=1').then(function(res) {
                    that.$toast('撤销成功！')
                    setTimeout(()=>{
                          window.location.href = "epipe://?&mark=leaveDetails&_id="+that.dataObj.leaveId+'&data='+JSON.stringify({text:1});;
                    },500)
                });
            },
            submit(){

            },
            refuse(){  //拒绝
                this.$router.push({path:'/opinion',query:{id:this.dataObj.leaveId}})
            },
            consent(){ //同意
                let that = this;
                let id = this.dataObj.leaveId;
                this.axios.post("/work/leave/update?leaveId="+id+'&type=2').then(function(res) {

                    that.$toast('审批通过!')

                    window.location.href = "epipe://?&mark=workUpdate";
                    setTimeout(()=>{
                          window.location.href = "epipe://?&mark=leaveDetails&_id="+that.dataObj.leaveId+'&data='+JSON.stringify({text:1});;
                    },500)

                });
                
            },
             go_user(id){
                window.location.href = "epipe://?&mark=userinfo&_id="+id;
            },
            go_imgdetail: function (index) { //查看图片详情
                let that = this;
                let obj = {index_num: index, data: that.dataObj.images,type:0}
                window.location.href = "epipe://?&mark=imgdetail&url=" + JSON.stringify(obj);
             },
             history_back_click(){
                  if(location.href.indexOf('goWork=0')>0){
                        window.location.href = "epipe://?&mark=history_back"
                        return
                    }
                window.location.href = "epipe://?&mark=goWork";
             }
        },
        mounted:function(){
            let that = this;
          
            let leaveId = this.Util.getUrlValue('leaveId').slice(1)
            if(location.href.indexOf('leave=')>-1){ //判断是否由原生跳转
                that.titleType = 'native';
                leaveId = this.types = this.Util.getUrlValue('leave=')
            }

            this.axios.get('/work/leave/apply/info?leaveId='+leaveId).then(function(res){
                if(res.data.h.code === 200){
                    that.dataObj = res.data.b.data[0];
                    that.title = that.dataObj.userName+'的请假审批';
                    for(let i =0;i<that.dataObj.auditers.length;i++){            
                        if(that.dataObj.auditers[i].status=='2'){
                            that.refuseIndex = i+1;
                            that.leaveType = '0';  //已经拒绝
                            return;
                        }
                    }
                    
                    if(that.dataObj.auditStatus == '3'){ //已经撤销
                        that.leaveType = '2'
                        that.refuseIndex = -2
                        return;
                    }
                    
                    if(that.dataObj.auditers[that.dataObj.auditers.length-1].status == 1){ // 已同意
                        that.leaveType = '1';
                        return;
                    }

                     if(that.dataObj.auditers[0].status!='0'){ //审批开始
                        that.leaveType = '4'
                        return;
                    }
                }
            })

        },
        filters:{
            dayNum : function(value){
                    if(!value) return;
                  return  value.indexOf('.5')>-1?Number(value).toFixed(1):parseInt(value)
            },
            stateName: function(value){
                    return value=='0'?'审批中':value=='1'?'已同意':value=='2'?'已拒绝':'';
            },
            timeStrSlice:function(value){
                return value?value.slice(0,-3):value;
            },
            details:function(value){
    
                if(value == '1'){
                    return '已同意'
                }else if(value =='0'){
                    return '已拒绝'
                }else if(value=='2'){
                    return '已撤销'
                }
            }
        }
    }
</script>

<style scoped lang="stylus">

        .reasonImg{
            overflow hidden;
            margin-top 0.1rem;
            height:0.32rem;

            li{
                float left;
                width 0.32rem;
                height 0.32rem;
                margin-right 0.1rem;
            }

            img{
                width:100%;
                height:100%;
            }
        }

        section {
            overflow-y hidden;
        }

        .dialog{
            position fixed;
            width 100%;
            height 100%;
            top 0;
            z-index 5;
            font-size 0.18rem;
            background-color rgba(0,0,0,0.5)

            .dialog_box{
                width 2.7rem;
                height 1.5rem;
                position absolute;
                left 0;
                right 0;
                top 0;
                bottom 0;
                margin auto;
                background #fff;
                text-align center;
            }

            .dialog_content{
                height 1rem;
                line-height 1rem;
                color #333;
                border-bottom 0.01rem solid #e6e6e6;
            }

            .dialog_btn{
                height 0.5rem;
                line-height 0.5rem;
                display flex;

                a{
                    flex  1;
                    touch-action:none;
                    cursor:pointer;
                }
            }

            .confirm_btn{
                color #0fc37c;
            }
            .cancel_btn{
                ciolor #666;
            }
        }

        .content{
            margin-top 0.59rem;
            margin-bottom 0.3rem;
            padding 0 0.15rem;

            .styles{
                padding 0.15rem;
                margin-bottom 0.15rem;
                -webkit-box-shadow: 0 0 0.2rem rgba(238,65,54,.1);    
                box-shadow 0 0 0.2rem rgba(238,65,54,.1);
                background-color #fff;
            }

            .imgHead{
                width 0.37rem;
                height 0.37rem;
                border-radius 50%; 
            }
        }

        .content_head{
            display flex;

            img{
                margin-right 0.1rem;
            }

            .nameTl{
                font-size 0.15rem;
                color #333;
                line-height 1em;
                margin-bottom 0.1rem;
            }

            .res{
                line-height 1em;
                font-size 0.14rem; 
                color #fd545c;               
            }

            .consent{
                 line-height 1em;
                font-size 0.14rem; 
                    color:#0fc37c;
                }

            .careOf{
                line-height 1em;
                font-size 0.14rem; 
                color:#f80;
            }
        }

        .infor{

            .infor-box{
                display flex;
                font-size 0.15rem;
                margin-bottom 0.03rem;
            }

            span{
                color #666;
                margin-right 0.15rem;
            }

            p{
                flex 1;
                color #333;
                width:2.4rem;
                word-wrap:break-word;
            }
        }

        .approve,.copy{

            .title{
                font-size 0.15rem;
                corlor #333;

                span{
                    font-size 0.13rem;
                    color #999;
                }
            }
        }

        .approve{

            .approve_list{
                display flex;
            
                img{
                    margin-right 0.1rem;
                }
            }

            .approve_inf{
                flex 1;
                line-height 0.37rem;
                font-size 0.14rem;

                span:first-child{
                    float left;
                    font-size 0.15rem;
                    color #333;
                    width:0.7rem;
                }
                span:last-child{
                    float right;
                    color #666;
                    width:1.25rem;
                    height:100%;
                }


                .refause{
                    color:#fd545c;
                }

                .consent{
                    color:#0fc37c;
                }

                .success{
                    
                }
            }

            .icon-back{
                transform rotate(90deg)
                margin 0.1rem;
            }

            p{
                margin-bottom 0.15rem;
            }

            .reason{
                padding-left 0.48rem;
                font-szie 0.14rem;
                color #666;
                line-height 0.2rem;
                margin-top 0.1rem;
                word-wrap:break-word;
            }
        }

        .copy{

            .list{
                overflow hidden;

                img{
                    display block;
                    margin 0 auto;
                    margin-bottom 0.1rem;
                }
            }
            
            .list_item{
                float left;
                font-size 0.13rem;
                color #333;
                text-align center;
                margin 0 0.12rem;
                margin-top 0.15rem;
            }
        }

        .btn_box{
            padding 0 0.15rem;
            margin-bottom 0.3rem;
            text-align center;
            

            .revocation_btn{
                position relative;
                height 0.5rem;
                font-size 0.18rem;
                color #666;
                line-height 0.5rem;
                letter-spacing 0.05rem;
                // border 1px solid #666;
                background-color #fff;
            }
           .refuse_btn:after,.revocation_btn:after{
                content: " ";
                position: absolute;
                left: 0;
                top: 0;
                width 200%;
                height: 200%;
                border 1px solid #666;
                border-radius: 4px;
                color: #D9D9D9;
                -webkit-transform-origin: 0 0;
                transform-origin: 0 0;
                -webkit-transform: scale(0.5);
                transform: scale(0.5);
            }

            .consent_btn,.refuse_btn{
                height 0.5rem;
                line-height 0.5rem;
                border-radius 4px;
                font-size 0.18rem;
            }

            .consent_btn{
                float left;
                width 48%;
                background-color #0fc37c;
                color #fff;
            }

            .refuse_btn{
                position relative;
                float right;
                width 48%;
                color #fd545c;
            }

            .refuse_btn:after{
                border-color #fd545c;
            }
        }
</style>

