<template>
    <section class="reimburse">
        <TopHead
        mark='mark'
        bgcolor = '#609df6'
        :title=title
        v-on:history_back="history_back_click"
         ></TopHead>
         <div class="base-content">
        <div class="content">
            <div class="styles">
                <div class="content_head">
                    <img class="imgHead" :src="dataObj.profileImg" @click="go_user(dataObj.userId)">
                    <div>
                        <p class="nameTl">{{dataObj.username}}</p>
                        <p :class="leaveType==2?'careOf':leaveType==0?'res':'consent'" v-if="leaveType!=''&leaveType!=3">{{leaveType |details}}</p>
                        <p class="res" v-if="leaveType==3||leaveType==4">{{'等待'+dataObj.auditUserName+'的审批'}}</p>
                    </div>
                </div>
            </div>
            <div class="styles infor">
                <div class="infor-box">
                    <span>审批编号</span>
                    <p>{{dataObj.applyNo}}</p>
                </div>
                <div class="infor-box">
                    <span>标&emsp;&emsp;题</span>
                    <p>{{dataObj.employeeTitle}}</p>
                </div>
            </div>
            <div class="styles infor">
                <div class="infor-box">
                    <span style="letter-spacing:0.05rem">申请人</span>
                    <p>{{dataObj.username}}</p>
                </div>
                <div class="infor-box">
                    <span>所属部门</span>
                    <p>{{dataObj.officeName}}</p>
                </div>
            </div>

            <div class="styles infor">
                <div class="infor-box">
                    <span>招聘岗位 </span>
                    <p>{{dataObj.position}}</p>
                </div>
                <div class="infor-box">
                    <span>需求人数 </span>
                    <p>{{dataObj.num}}</p>
                </div>
                <div class="infor-box">
                    <span>到岗日期 </span>
                    <p>{{dataObj.arrivalDate.slice(0,-8)}}</p>
                </div>
                <div class="infor-box">
                    <span>申请理由 </span>
                    <p>{{dataObj.employeeReason}}</p>
                </div>
            </div>
            <p class="content-title">应聘条件</p>

            <div class="styles infor">
                <div class="infor-box">
                    <span>性&emsp;&emsp;别 </span>
                    <p>{{dataObj.sex}}</p>
                </div>
                 <div class="infor-box">
                    <span>婚&emsp;&emsp;姻 </span>
                    <p>{{dataObj.marriage}}</p>
                </div>
                 <div class="infor-box">
                    <span>年&emsp;&emsp;龄 </span>
                    <p>{{dataObj.age}}</p>
                </div>
                 <div class="infor-box">
                    <span>学&emsp;&emsp;历 </span>
                    <p>{{dataObj.education}}</p>
                </div>
                <div class="infor-box">
                    <span>专&emsp;&emsp;业 </span>
                    <p>{{dataObj.major}}</p>
                </div>
                <div v-if="dataObj.qualifications" class="infor-box">
                    <span>资格证书 </span>
                    <p>{{dataObj.qualifications}}</p>
                </div>
                <div v-if="dataObj.computerLevel" class="infor-box" >
                    <span style="letter-spacing:0.05rem">计算机 </span>
                    <p>{{dataObj.computerLevel}}</p>
                </div>
                <div v-if="dataObj.foreignLevel" class="infor-box">
                    <span>外语水平 </span>
                    <p>{{dataObj.foreignLevel}}</p>
                </div>
                <div class="infor-box">
                    <span>经验技能 </span>
                    <p>{{dataObj.skill}}</p>
                </div>
                <div v-if="dataObj.writings" class="infor-box">
                    <span>公文写作 </span>
                    <p>{{dataObj.writings}}</p>
                </div>
                <div class="infor-box">
                    <span>必要条件 </span>
                    <p>{{dataObj.condition}}</p>
                </div>
                <div v-if="dataObj.priority" class="infor-box">
                    <span>优先录用 </span>
                    <p>{{dataObj.priority}}</p>
                </div>
                <div v-if="dataObj.other" class="infor-box">
                    <span>其他要求 </span>
                    <p>{{dataObj.other}}</p>
                </div>
                <div class="infor-box">
                    <span>工作职责 </span>
                    <p>{{dataObj.responsibility}}</p>
                </div>

            </div>

            <AccessoryList :accessory='accessory'>
            </AccessoryList>

            <Approver
             :dataObj = dataObj
             :refuseIndex = refuseIndex
             :newAppr = newAppr
             v-on:removeApp = "removeApp"
             color="#609df6"
             :amount='amount'

             >
            </Approver>

            <Copy
             :dataObj = dataObj
             :newCopy = newCopy
             v-on:remove = "removeCopy"
             color="#609df6"

            >
            </Copy>
            
            <div class="foot-box">

            </div>
        </div>
        </div>
          <OaBtn
            :dataObj = dataObj
            :leaveType = leaveType
            v-on:consent="consent"
            v-on:refuse="refuse"
            v-on:more='moreBtn'
            v-on:revocation="isDialog=true"
            v-on:resubmit="resubmit"
            v-on:urge="isBackout=true"
            v-on:print="print"
            >
        </OaBtn>
        <div style="width:100%;height:0.15rem;background-color:#fff"></div>

        <div class="dialog" v-show="isDialog" @touchmove.prevent>
            <div class="dialog_box">
                <div class="dialog_content">确认撤销申请？</div>
                <div class="dialog_btn">
                    <a class="confirm_btn" @click="revocation()">确定</a>
                    <a class="cancel_btn" @click="isDialog=false">取消</a>
                </div>
            </div>
        </div>

        <MoreBtn
          v-show="isShow"
          v-on:approveBack="approveBack"
          v-on:deliverTo="deliverTo"
          v-on:revocation="revocation"
          v-on:urge="urge"
          v-on:isShow="isShow=!isShow"
          :myself="myself"
          v-on:print="print"
        >
        </MoreBtn>

        <Dialog
            lfText="确认"
            rgText="取消"
            content="是否提醒审批人审批？"
            v-on:lfClick="urge"
            v-on:rgClick="isBackout=false"
            v-show="isBackout"
            >
        </Dialog>
          
    </section>
</template>

<script>
    import $ from "jquery";
    import {mapState, mapMutations} from 'vuex';
    import TopHead  from '../../../components/topheader.vue'  //header导航栏
    import CopeMan  from '../../../components/worknews/copy_man.vue'    //抄送人
    import AccessoryList  from '../../../components/oa/accessoryList.vue'  //附件
    import Approver  from '../../../components/oa/approverDetails.vue'  // 审批人
    import Copy  from '../../../components/oa/copyDetails.vue'  // 抄送人
    import OaBtn  from '../../../components/oa/oa_btn.vue'  // 动作按钮
    import MoreBtn  from '../../../components/oa/more_btn.vue'  // 更多弹窗
    import Dialog  from '../../../components/oa/dialog.vue'    //弹窗

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
                accessory:[],
                borrowId:'',
                newCopy:[], //新增抄送人
                newAppr:[], //新增审批人
                head:'native',
                isShow:false,
                title:'',
                myself:false,
                isBackout:false,
                amount:0,

            }
        },
        
        components:{
            TopHead,
            AccessoryList,
            Approver,
            Copy,
            OaBtn,
            MoreBtn,
            Dialog
        },
        methods :{
        ...mapMutations(['change_man','approver_man']),
            refuse:function(){
                 this.$router.push({path:'/opinion',query:{id:this.dataObj.employeeApplyId,typeName:'employee',applyType:13,color:'#609df6'}})
            },
            history_back_click:function(){
                    if(location.href.indexOf('goWork=0')>0){
                        window.location.href = "epipe://?&mark=history_back"
                        return
                    }
                    window.location.href = "epipe://?&mark=goWork"
            },
            deliverTo(){ //转交
                let newApprStr = this.appAndCopy(this.newAppr,'auditUserId')
                let newCopy = this.appAndCopy(this.newCopy)
                this.$router.push({path:'/imchoices',query:{id:this.dataObj.employeeApplyId,receiverIds:newCopy,careOf:true,typeName:'employee',applyType:13,bgcolor:'#609df6',auditerIds:newApprStr,num:1}})
            },
            approveBack(){ //退回
                 this.$router.push({path:'/approveBack',query:{id:this.dataObj.employeeApplyId,typeName:'employee',applyType:13,color:'#609df6'}})
            },
            consent:function(){
              let that = this;
               let copyStr =  this.appAndCopy(this.newCopy)
               let apprStr = this.appAndCopy(this.newAppr,'auditUserId')

            this.$router.push({path:'/opinion',query:{id:this.dataObj.employeeApplyId,receiverIds:copyStr,auditerIds:apprStr,color:'#609df6',typeName:'employee',applyType:13,pageType:'consent'}})
               
            },
            resubmit(){ //再次提交
                this.$router.replace({path:'/employee',query:{employeeId:this.dataObj.employeeApplyId,resubmit:1}})
            }, 
            print(){//打印
                window.location.href = "epipe://?&mark=print&url="+location.href;
            },
            urge(){ //催办
                this.isBackout = false;
                let that = this;
                this.axios.post('/work/audit'+this.Service.queryString({
                    applyId:this.dataObj.employeeApplyId,
                    type:6,
                    applyType:13,
                })).then(function(res){
                    if(res.data.h.code==200){
                        that.$toast('催办成功!')
                    }else{
                        that.$toast(res.data.h.msg)
                    }
                })
            },
            appAndCopy:function(arr,type){
                if(!type) type='userId'
                let str = '';
                for(let i=0;i<arr.length;i++){
                        let obj = arr[i]
                        str = str + "|" + obj[type]
                }
                return str.slice(1);
            },
            moreBtn(){ //更多
                this.isShow = true;
                this.$forceUpdate();
            },
            revocation:function(){
                let that = this;
                this.isDialog = false;
                this.axios.post('/work/audit'+this.Service.queryString({
                    applyId:this.dataObj.employeeApplyId,
                    type:1,
                    applyType:13,
                })).then(function(res){
                        if(res.data.h.code!=200){
                            that.$toast(res.data.h.msg)
                        }else{
                            window.location.href = "epipe://?&mark=workUpdate";
                            that.$toast('撤销成功！')
          
                            setTimeout(()=>{
                                window.location.href = "epipe://?&mark=employeeDetails&_id="+that.dataObj.employeeApplyId+'&data='+JSON.stringify({text:1});;
                            },500)     
                        } 
                    })
            },
            go_fildDetails: function (url) { //查看图片详情
                let that = this;
                let obj = {index_num: 0, data:[url],type:0}
                window.location.href = "epipe://?&mark=imgdetail&url=" + JSON.stringify(obj);
            },
             accessoryFors:function(datas){
              if(!datas||datas.url==null) return false
               let urlArr = datas.url.split('|')
               let fileSizeArr = datas.fileSize.split('|')
               let fileNameArr = datas.fileName.split('|')
               let arrs = [];
                for(let i=0;i<urlArr.length;i++){
                    let bool = this.Util.isImg(urlArr[i])
                    arrs.push({
                        url:urlArr[i],
                        fileSize:fileSizeArr[i],
                        fileName:fileNameArr[i],
                        isImg: bool,
                    })
                }
                return arrs
            },
            go_imchoice:function(num){
                this.$router.push({path: 'imchoices', query: {bgcolor:'#609df6',num:num}})
            },
            removeCopy:function(index){
                this.newCopy.splice(index, 1);
                this.change_man(this.newCopy)
            },
            removeApp:function(index){
                this.newAppr.splice(index, 1);
                this.approver_man(this.newAppr)
            },
             go_user(id){
                window.location.href = "epipe://?&mark=userinfo&_id="+id;
            },
        },
        created() {
        },
        mounted:function(){
            let that = this;
            this.employeeId = this.$route.query.employeeId;
            let pushId = this.$route.query.pushId

            this.axios.get('/work/employee/info?employeeApplyId='+this.employeeId+'&pushId='+pushId).then(function(res){
                that.dataObj = res.data.b;
                let arr=[];
                that.accessory = that.accessoryFors(that.dataObj.accessory)
                that.title = that.dataObj.username+'的人员需求申请'
                for(let i =0;i<that.dataObj.auditers.length;i++){   
                        if(that.dataObj.auditers[i].status=='2'){
                            that.leaveType = '0';  //已经拒绝
                        }
                        if(that.dataObj.auditers[i].status=='00'){
                            arr.push(that.dataObj.auditers[i])
                        }else{
                            that.amount++;
                        }

                        if(that.dataObj.auditers[i].accessory!=null){
                            that.dataObj.auditers[i].accessory = that.accessoryFors(that.dataObj.auditers[i].accessory)
                        }
                    }

                    that.newAppr = arr
                    that.approver_man(arr)

                    if(that.dataObj.userId==that.dataObj.auditUserId){
                        that.myself=true;
                        if(that.dataObj.auditStatus==0&&that.dataObj.myselfApply!='00'){
                            that.dataObj.myselfApply="0"
                        }
                    }

                    if(that.dataObj.auditStatus=='4'){
                        that.leaveType='5'
                        return;
                    }

                    if(that.dataObj.auditers[that.dataObj.auditers.length-1].status == 1){ // 已同意
                        that.leaveType = '1';
                        return;
                    }

                    if(that.dataObj.auditStatus == '3'){ //已经撤销
                        that.leaveType = '2'
                        return;
                    }
            })

        },
        activated(){
            this.newCopy = this.chosed_man_state;
            this.newAppr = this.approver_man_state;
         },
        filters:{
            details:function(value){
    
                if(value == '1'){
                    return '已同意'
                }else if(value =='0'){
                    return '已拒绝'
                }else if(value=='2'){
                    return '已撤销'
                }else if(value =='5'){
                    return '已退回'
                }
            },
            nameFor:function(value){
                if(!value) return ''
                let arr = value.split('|')

                return arr.join(',')
            },
          
        },
        computed: mapState(["chosed_man_state","approver_man_state"])
    }
</script>

<style scoped lang="stylus">

        .contractDescTitle{
            color:#666;
            font-size:0.15rem;
        }

        .newList{

            position relative;

            svg{
                position absolute;
                left 0.32rem;
                top -0.05rem;
            }
        }

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

             .dialog_option{
                height 0.4rem;
                line-height 0.4rem;
                position relative;
                font-size:0.16rem;
            }

            .dialog_border{
                border 1px solid #f5f5f5
            }

            .confirm_btn{
                color #609df6;
            }
            .cancel_btn{
                ciolor #666;
            }
        }

        .content{
            margin-top 0.59rem;
            padding 0 0.15rem;
            // height: 6.4rem;
            // padding-bottom 0.5 rem;


            .styles{
                padding 0.15rem;
                margin-bottom 0.15rem;
              -webkit-box-shadow: 0 0 0.2rem rgba(96,157,246,.1);    
                 box-shadow 0 0 0.2rem rgba(96,157,264,.1);
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
                line-height:0.2rem;
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
                word-break: break-all;
                text-align:left;
            }
        }

    .foot-box{
        height:0.55rem;
    }

    body{
        background-color:#f80;
    }
    .content-title{
        // text-indent:0.15rem;
        margin-bottom:0.05rem;
        color #609ef7
    }
</style>
