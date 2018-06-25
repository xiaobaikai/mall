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
                    <img class="imgHead" :src="dataObj.profileImg" @click="go_user(dataObj.userId)">
                    <div>
                        <p class="nameTl">{{dataObj.userName}}</p>
                        <p :class="leaveType==2?'careOf':leaveType==0?'res':'consent'" v-if="leaveType!=''&leaveType!=3">{{leaveType |details}}</p>
                        <p class="res" v-if="leaveType==3||leaveType==4">{{'等待'+dataObj.auditName+'的审批'}}</p>
                    </div>
                </div>
            </div>
            <div class="styles infor">
                <div class="infor-box">
                    <span>审批编号</span>
                    <p>{{dataObj.contractNoAuto}}</p>
                </div>
                <div class="infor-box">
                    <span >合同编号</span>
                    <p>{{dataObj.contractNoInput}}</p>
                </div>
                <div class="infor-box">
                    <span>合同名称</span>
                    <p>{{dataObj.contractName}}</p>
                </div>
                <div class="infor-box">
                    <span>送审单位</span>
                    <p>{{dataObj.applyCompanyName}}</p>
                </div>
                <div class="infor-box">
                    <span>项目责任人</span>
                    <p>{{dataObj.userName}}</p>
                </div>
                <div class="infor-box">
                    <span>使用单位</span>
                    <p>{{dataObj.receiveCompanyName}}</p>
                </div>
                <div class="infor-box">
                    <span>使用单位责任人</span>
                    <p>{{dataObj.receiveName}}</p>
                </div>
                 <div class="infor-box">
                    <span>合同标的</span>
                    <p>{{dataObj.contractObj}}</p>
                </div>
            </div>

            <div class="styles">
                <div class="infor-box">
                    <span class="contractDescTitle">合同要点说明</span>
                    <p style="margin-top:0.1rem;">{{dataObj.contractDesc}}</p>
                </div>
            </div>

            <div class="styles infor" v-if="accessory.length">
                    <ul class="accessory">
                        <li  v-for="(item,index) in accessory">
                            <img @click="go_fildDetails(item.url)" v-if="item.isImg"  :src="item.url"/>
                            <img @click="go_fildDetails(item.url)" v-if="!item.isImg" src="../../../assets/wenjian.png"/>
                            <div @click="go_fildDetails(item.url)"  class="accessory-cont">
                                <p style="text-align:left">{{item.fileName}}</p>
                                <span>{{item.fileSize | fileSize}}kb</span>
                            </div>
                        </li>
                    </ul>
            </div>
            
            <div class="styles approve">
                <p class="title">审批人<span>（已添加{{dataObj.auditers.length+newAppr.length}}人）</span></p>
                <ul class="list">
                    <li>
                        <div class="approve_list">
                            <img class="imgHead" :src="dataObj.profileImg">
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
                            <img class="imgHead" :src="dataObj.profileImg">
                            <div class="approve_inf">
                                <span>{{dataObj.userName}}</span>
                                <span style="color:#f80">已撤销</span>
                                <span></span>
                            </div>
                        </div>
                    </li>
                    <li v-for="(item,index) in dataObj.auditers" v-if="refuseIndex==-1||(refuseIndex>-1&index<refuseIndex)">
                        <div class="approve_list">
                            <img class="imgHead" @click="go_user(item.auditUserId)" :src="item.profileImg">
                            <div class="approve_inf">
                                <span>{{item.name}}</span>
                                <span v-if="item.connectFslag!=1" :class="item.status!=2?'consent':'refause'">{{item.status | stateName}}</span>
                                <span v-if="item.connectFslag==1" class="careOf">已转交</span>
                                <span>{{item.auditTime | timeStrSlice}}</span>
                            </div>
                        </div>
                        <svg class="icon icon-back" aria-hidden="false" v-if="(index!=dataObj.auditers.length-1&item.status!=2&item.connectFslag!=1)||newAppr.length!=0">
                            <use xlink:href="#icon-jiantou1"></use>
                        </svg>
                        <div class="reason" v-if="item.status==2">
                            {{item.reason}}
                        </div>
                        <div class="reasons" v-if="item.connectFslag==1">
                            <svg  class="icon icon-back" aria-hidden="false" >
                                <use xlink:href="#icon-jiantou1"></use>
                             </svg>
                            <p>{{item.reason}}</p>
                            <div v-if="item.accessory.length">
                            <ul class="accessory">
                                <li  v-for="child in item.accessory">
                                    <img @click="go_fildDetails(child.url)"  v-if="child.isImg"  :src="item.url"/>
                                    <img @click="go_fildDetails(child.url)" v-if="!child.isImg" src="../../../assets/wenjian.png"/>
                                    <div @click="go_fildDetails(child.url)"  class="accessory-cont">
                                        <p style="margin-bottom:0">{{child.fileName}}</p>
                                        <span>{{child.fileSize | fileSize}}kb</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        </div>
                        
                    </li>

                    <li v-for="(it,ind) in newAppr">
                        <div class="approve_list newList">
                            <svg @click="removeAppr(ind)" style="font-size: 0.15rem" class="icon" aria-hidden="false">
                                <use xlink:href="#icon-shanchu"></use>
                            </svg>
                            <img class="imgHead" :src="it.profileImg">
                            <div class="approve_inf">
                                <span>{{it.name}}</span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <svg class="icon icon-back" aria-hidden="false" v-if="ind!=newAppr.length-1">
                            <use xlink:href="#icon-jiantou1"></use>
                        </svg>
                    </li>

                     <li style="margin-top:0.1rem;"  class="list_item" @click="go_imchoice(1)" v-if="dataObj.myselfApply==0">
                        <svg style="font-size: 0.33rem;margin-top: 0.085rem" class="icon" aria-hidden="false">
                            <use xlink:href="#icon-tianjiarenyuan"></use>
                        </svg>
                    </li>
                    
                </ul>
            </div>

            <div class="styles copy">
                <p class="title">抄送人<span>（已抄送{{dataObj.receivers.length+newCopy.length}}人）</span></p>
                
                <ul class="list">
                    <li v-for="(item,index) in dataObj.receivers" class="list_item"> 
                        <img class="imgHead" @click="go_user(item.receiverId)" :src="item.profileImg">
                        <span>
                            {{item.name}}
                         </span>
                    </li>
                    <li v-for="(item,index) in newCopy" class="list_item newCopy">
                        <svg @click="remove(index)" style="font-size: 0.15rem" class="icon" aria-hidden="false">
                            <use xlink:href="#icon-shanchu"></use>
                        </svg>
                        <img class="imgHead" @click="go_user(item.receiverId)" v-if="item.profileImg!=''" :src="item.profileImg">
                        <img class="imgHead" v-else src="../../../assets/tou.png">
                        <span>
                            {{item.name}}
                         </span>
                    </li>
                    <li class="list_item" @click="go_imchoice(0)" v-if="dataObj.myselfApply==0" >
                        <svg style="font-size: 0.33rem;margin-top: 0.085rem" class="icon" aria-hidden="false">
                            <use xlink:href="#icon-tianjiarenyuan"></use>
                        </svg>
                        <div style="margin-top: 0.055rem">添加</div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="btn_box" v-if="dataObj.myselfApply!=4">
            <div class="btn_box_content">
                <div v-if="dataObj.myselfApply==3&dataObj.auditStatus!='3'&leaveType!=4"  class="revocation_btn" @click="isDialog=true">撤销</div>
                <!-- <div> -->
                    <a v-if="dataObj.myselfApply!=3&dataObj.myselfApply==0&dataObj.auditStatus!='3'"  class="consent_btn" @click="consent()">同意</a> 
                    <a v-if="dataObj.myselfApply!=3&dataObj.myselfApply==0&dataObj.auditStatus!='3'"  class="refuse_btn" @click="refuse()">拒绝</a>
                    <a v-if="dataObj.myselfApply!=3&dataObj.myselfApply==0&dataObj.auditStatus!='3'"  class="deliver_btn" @click="more()">更多</a>
                <!-- </div> -->
                <div style="clear:both"></div>
            </div>
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

        <div class="dialog" v-show="isShow" @touchmove.prevent @click="isShow=!isShow">
            <div class="dialog_box" style="height:0.8rem;">
                <div class="dialog_option dialog_border" @click="approveBack()">退回</div>
                <div class="dialog_option" @click="deliverTo()">转交</div>
            </div>
        </div>
          
    </section>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import TopHead  from '../../../components/topheader.vue'  //header导航栏
    import CopeMan  from '../../../components/worknews/copy_man.vue'    //抄送人
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
                contractId:'',
                newCopy:[],
                newAppr:[],
                head:'native',
                isShow:false,
                title:'',
            }
        },
        
        components:{
            TopHead
        },
        methods :{
        ...mapMutations(['change_man','approver_man']),
            refuse:function(){
                 this.$router.push({path:'/opinion',query:{id:this.dataObj.contractId,type:'contract'}})
            },
            history_back_click:function(){
                    if(location.href.indexOf('goWork=0')>0){
                        window.location.href = "epipe://?&mark=history_back"
                        return
                    }
                    window.location.href = "epipe://?&mark=goWork"
            },
            more(){ //更多
                this.isShow=true
            },
            deliverTo(){ //转交
                let newApprStr = this.appAndCopy(this.newAppr)
                let newCopy = this.appAndCopy(this.newCopy)
                this.$router.push({path:'/imchoices',query:{id:this.dataObj.contractId,careOf:true,type:'contract'}})
            },
            approveBack(){
                 this.$router.push({path:'/approveBack',query:{id:this.dataObj.contractId,type:'contract'}})
            },
            consent:function(){
              let that = this;
               let copyStr =  this.appAndCopy(this.newCopy)
               let apprStr = this.appAndCopy(this.newAppr)

                this.axios.post('/work/audit'+this.Service.queryString({
                    applyId:this.dataObj.contractId,
                    type:2,
                    applyType:2,
                    receiverIds:copyStr,
                    auditerIds:apprStr,
                })).then(function(res){
                            if(res.data.h.code==1502){
                                that.$toast(res.data.h.msg)
                            }else if(res.data.h.code==200){

                            that.$toast('审批通过')
                             window.location.href = "epipe://?&mark=workUpdate";
                            setTimeout(()=>{
                                // location.reload() 
                                window.location.href = "epipe://?&mark=contractDetails&_id="+that.dataObj.contractId+'&data='+JSON.stringify({text:1});;
                            },500)      
                        }
                    })
            },
            appAndCopy:function(arr){
                let str = '';
                for(let i=0;i<arr.length;i++){
                        str = str + "|" + arr[i].userId
                }

                return str.slice(1);
            },
            revocation:function(){
                    let that = this;
                    this.isDialog = false;
                    //  this.axios.post('/work/audit?applyId='+this.dataObj.contractId+'&applyType=3&type=1').then(function(res){
                this.axios.post('/work/audit'+this.Service.queryString({
                    applyId:this.dataObj.contractId,
                    type:1,
                    applyType:2,
                })).then(function(res){
                        if(res.data.h.code!=200){
                            that.$toast(res.data.h.msg)
                        }else{
                            window.location.href = "epipe://?&mark=workUpdate";
                            that.$toast('撤销成功！')
          
                            setTimeout(()=>{
                                //   location.reload()
                                window.location.href = "epipe://?&mark=contractDetails&_id="+that.dataObj.contractId+'&data='+JSON.stringify({text:1});;
                                  
                            },500)     
                        } 
                    })
            },
            go_fildDetails: function (url) { //查看图片详情
                let that = this;
                let obj = {index_num: 0, data:[url],type:0}
                window.location.href = "epipe://?&mark=imgdetail&url=" + JSON.stringify(obj);
            },
            accessoryFor:function(){
                if(this.dataObj.accessory==null||this.dataObj.accessory.url==null) return false
               var urlArr = this.dataObj.accessory.url.split('|')
               var fileSizeArr = this.dataObj.accessory.fileSize.split('|')
               var fileNameArr = this.dataObj.accessory.fileName.split('|')
                for(let i=0;i<urlArr.length;i++){
                    let bool = this.Util.isImg(urlArr[i])
                    this.accessory.push({
                        url:urlArr[i],
                        fileSize:fileSizeArr[i],
                        fileName:fileNameArr[i],
                        isImg: bool,
                    })
                }


            },
             accessoryFors:function(datas){
                if(!datas.url==null) return false
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
                this.$router.push({path: 'imchoices', query: {bgcolor:this.color,num:num}})
            },
            remove:function(index){
                this.newCopy.splice(index, 1);
                this.change_man(this.newCopy)
            },
            removeAppr:function(index){
                this.newAppr.splice(index, 1);
                this.approver_man(this.newAppr)
            },
             go_user(id){
                window.location.href = "epipe://?&mark=userinfo&_id="+id;
            },
            // computed: mapState(["chosed_man_state","approver_man_state"])
        },
        mounted:function(){
            let that = this;
            this.contractId = this.Util.getUrlValue('contractId').slice(1)
            this.axios.post('/work/contract/info?contractId='+this.contractId).then(function(res){
                that.dataObj = res.data.b.data[0];
                console.log(that.dataObj)
                that.accessoryFor();
                that.title = that.dataObj.userName+'的合同审批'
                for(let i =0;i<that.dataObj.auditers.length;i++){   

                        if(that.dataObj.auditers[i].status=='2'){
                            that.refuseIndex = i+1;
                            that.leaveType = '0';  //已经拒绝
                            return;
                        }

                        if(that.dataObj.auditers[i].accessory.fileName!=null){
                            that.dataObj.auditers[i].accessory = that.accessoryFors(that.dataObj.auditers[i].accessory)
                        }
                    }

                    if(that.dataObj.auditers[that.dataObj.auditers.length-1].status == 1){ // 已同意
                        that.leaveType = '1';
                        return;
                    }

                    if(that.dataObj.auditers[0].status!='0'&&that.dataObj.auditers[0].status!='00'){ //审批开始
                        that.leaveType = '4';
                        return;
                    }

                    if(that.dataObj.auditStatus == '3'){ //已经撤销
                        that.leaveType = '2'
                        that.refuseIndex = -2
                        return;
                    }
            })

        },
        activated(){
            this.newCopy = this.chosed_man_state;
            this.newAppr = this.approver_man_state;
         },
        filters:{
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
            },
            stateName: function(value){
                    return value=='0'?'审批中':value=='1'?'已同意':value=='2'?'已拒绝':'';
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
                color #0fc37c;
            }
            .cancel_btn{
                ciolor #666;
            }
        }

        .content{
            margin-top 0.59rem;
            padding 0 0.15rem;
             overflow: scroll;
            height: 6.4rem;
            margin-bottom 0.5rem;


            .styles{
                padding 0.15rem;
                margin-bottom 0.15rem;
              -webkit-box-shadow: 0 0 0.2rem rgba(255,136,0,.1);    
                 box-shadow 0 0 0.2rem rgba(255,136,0,.1);
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
                word-break: break-all;
                text-align:right;
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
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
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

                .careOf{
                    color:#f80;
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
            
            .reasons{
                position relative;
                padding-left 0.48rem;
                font-szie 0.14rem;
                color #666;
                line-height 0.2rem;
                margin-top 0.1rem;
                word-wrap:break-word;

                svg{
                    position:absolute;
                    top:0;
                    left:0.1rem;
                    bottom:0;
                    margin:auto;

                }
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

            .list li:nth-child(5),.list li:nth-child(10),
            .list li:nth-child(15),.list li:nth-child(20),
            .list li:nth-child(25),.list li:nth-child(30){
                    margin-right:0;
            }
            
            .list_item{
                float left;
                font-size 0.13rem;
                color #333;
                text-align center;
                margin 0 0.12rem;
                margin-top 0.15rem;

                span{
                    display inline-block
                    width 0.4rem;
                    height:0.15rem;
                    line-height 0.15rem;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
            }
        }
        .btn_box{
            position fixed;
            width:100%;
            bottom 0px;
            box-sizing border-box;

            .btn_box_content{
            background-color #fff;
            display flex;
            text-align center;
            }

            .revocation_btn:after{
                display block;
                content '';
                position absolute;
                height 1px;
                width 200%;
                top 0;
                left -50%;
                transform scale(0.5);
                background-color #ccc;
                z-index 5
            }
            
            .revocation_btn{
                position relative;
                width:100%;
                text-align:center;
                height 0.5rem;
                font-size 0.18rem;
                color #666;
                line-height 0.5rem;
                letter-spacing 0.05rem;
                background-color #fff;
            }

            .consent_btn,.refuse_btn,.deliver_btn{
                flex 1;
                height 0.5rem;
                color #fff; 
                line-height 0.5rem;
                font-size 0.18rem;
                text-align center
            }

            .consent_btn{
                background-color: #0fc37c;
                border:1px solid #0fc37c;
            }

            .refuse_btn{
                position relative;
                color #fd545c;
                margin-right 0
                border 1px solid #fd545c;
            }

            .deliver_btn{
                background-color:#fd545c;
                border:1px solid #fd545c;
            }
        }

        .accessory{

            li{
                display:flex;
                margin-bottom 0.1rem;
            }

            img{
                width 0.34rem;
                height 0.34rem;
                margin-right 0.1rem;
            }


        .accessory-cont{
            flex 1;

            p{
                width 2.4rem;
                font-size 0.14rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            span{
                font-size 0.13rem;
                color #666
            }
        }

        .accessory-delete{
            width 0.3rem;
            text-align right;  
        }
    }

    
     .newCopy{
            position relative;

            svg{
                position absolute;
                top:-0.07rem;
                right:-0.07rem;
            }
        }
</style>

