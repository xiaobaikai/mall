<template>
    <section>
        <TopHead
        mark='mark'
        bgcolor = '#fd545c'
        title="合同审批" 
        v-on:history_back="history_back_click"
         ></TopHead>
        <div class="content">
            <div class="styles input_group">
                <div class="bor_bottom">
                    <span class="title">合同名称</span>
                    <input placeholder="请输入合同名称"  v-model="contractName" />
                </div>
                <div>
                    <span class="title">合同编号</span>
                    <input placeholder="请输入合同编号"  v-model="contractNoInput" />
                </div>
            </div>
            <div class="styles input_group">
                <div class="bor_bottom">
                    <span class="title">送审单位</span>
                    <input style="color:#666;width:2.1rem;" v-model="applyCompanyName" disabled/>
                </div>
                <div class="bor_bottom">
                    <span class="title">项目责任人</span>
                    <input  placeholder="请输入项目负责人" v-model="userName" disabled/>
                </div>
                <div class="bor_bottom">
                    <span class="title">使用单位</span>
                    <input placeholder="请输入使用单位"  v-model="receiveCompanyName" />
                </div>
                <div>
                    <span class="title">使用单位责任人</span>
                    <input placeholder="请输入单位负责人"  v-model="receiveName" />
                </div>
            </div>

            <div class="styles input_group">
                <div>
                    <span class="title">合同标的</span>
                    <input placeholder="请输入合同标的" v-model="contractObj"/>
                </div>
            </div>

            <div class="styles" style="padding:0 0.15rem;">
                <p class="title">合同要点说明</p>
                <textarea v-model.trim="contractDesc" name="" maxlength="1000" id="" cols="30" rows="10" placeholder="请输入合同要点内容,限定1000字">

                </textarea>
                <div class="record_box">
                        <span>{{textNum}}/1000</span>
                </div>
            </div>
            <Accessory
                :accessory ='accessory'
            >
            </Accessory>
            
            <ApproverMan 
                :has_journal="!has_journal"
                color="#fd545c"
                :data_list=approver_list
                v-on:remove_item="remove_item"
                :special_class='1'
                :isGroup = true
                type = 2
            ></ApproverMan>

            <CopeMan 
                :has_journal="!has_journal"
                color="#fd545c"
                :data_list=chosed_list
                v-on:remove_item="remove_item"
                :special_class='1'
                :types = '2'
                :isGroup = true
            ></CopeMan>
        </div>
            <WorkButton
                v-if="!has_journal"
                v-on:left_click="save_btn"
                v-on:right_click="submit_btn"
                left_title="存草稿"
                right_title="提交"
                noSvg = true
                bgcolor="#fd545c"
            ></WorkButton>
        
         <Dialog
            lfText="保存"
            rgText="不保存"
            content="保存此次编辑?"
            v-on:lfClick="lf_click"
            v-on:rgClick="rg_click"
            v-show="isShow"
            >
        </Dialog>

    </section>
</template>

<script>
let reg = /[\u4e00-\u9fa5]/g;
let regs = /[0-9]/;
let save_leave = (index,text,that) =>{
    if(that.contractName== ''){
        that.$toast('合同名称不能为空')
    }else if(that.contractName.length>64||that.contractName.length<6){
        that.$toast('合同名称不能低于6个或超过64个字符')
    }else if(that.receiveCompanyName==''){
        that.$toast('使用单位名称不能为空')
    }else if(that.receiveName==''){
        that.$toast('使用责任人名称不能为空')
    }else if(regs.test(that.receiveName)){
        that.$toast('使用责任人名称不能有数字')
    }else if(that.receiveName.length<2||that.receiveName.length>12){
        that.$toast('使用责任人名称不能低于2个或超过12个字符')
    }
    else if(that.receiveCompanyName.length>64||that.receiveCompanyName.length<6){
        that.$toast('使用单位名称不能低于6个或超过64个字符')
    }else if(reg.test(that.contractNoInput)){
        that.$toast('合同编号不能含有中文')
    }else if(that.contractDesc==''){
        that.$toast('合同要点详情不能为空')
    }else if(that.contractDesc.length>1000){
        that.$toast('合同要点详情不能超过1000字符')
    }else if(that.approver_list.length == 0){
        that.$toast('请选择审批人')
    }else{
      
        let chosed_id = ''; //抄送人
        if(!that.isDraftFlag){
            for (let i = 0; i < that.chosed_list.length; i++) {
                chosed_id = chosed_id + "|" + that.chosed_list[i].userId
            }
        }else{
            for (let i = 0; i < that.chosed_list.length; i++) {
                chosed_id = chosed_id + "|" + that.chosed_list[i].receiverId
            }
        }
        chosed_id = chosed_id.slice(1)

        let approver_id = '' //审批人

        if(!that.isDraftFlag){
            for (let i = 0; i < that.approver_list.length; i++) {
                approver_id = approver_id + "|" + that.approver_list[i].userId
            }
        }else{
            for (let i = 0; i < that.approver_list.length; i++) {
                approver_id = approver_id + "|" + that.approver_list[i].auditUserId
            }
        }
        approver_id = approver_id.slice(1)

        let urlStr = '',fileSizeStr = '',fileNameStr = '';

        for(let i=0;i<that.accessory.length;i++){

            urlStr+='|'+that.accessory[i].url;
            fileSizeStr+='|'+that.accessory[i].fileSize;
            fileNameStr+='|'+that.accessory[i].fileName;  
        }
        urlStr = urlStr.slice(1)
        fileSizeStr = fileSizeStr.slice(1)
        fileNameStr = fileNameStr.slice(1)
        that.axios({
                method:"post",
                url:"/work/contract/save",
                headers:{
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                data:{
                    Id :that.id, // id
                    contractName:that.contractName,//合同名称
                    contractNoInput:that.contractNoInput, //合同编号
                    applyCompany:that.applyCompanyName,//送审单位名称
                    applyUserName:that.userName, //项目责任人
                    receiveCompany:that.receiveCompanyName, //使用单位名称
                    reveiveUserName:that.receiveName, //使用单位负责人
                    contractDesc:that.contractDesc, //合同要点说明
                    contractObj:that.contractObj, //合同标的
                    url : urlStr, //附件
                    fileName:fileNameStr, 
                    fileSize:fileSizeStr,
                    auditUserIds: approver_id, //审批人
                    receiverIds: chosed_id, //抄送人
                    draftFlag : index, //草稿还是发送
                },
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
            }).then((res)=>{
                 if(res.data.h.code!=200){
                that.$toast(res.data.h.msg)
                    }else if(res.data.h.code == 200){
                    if(index){

                        that.$toast('已保存至草稿箱!')
                        setTimeout(()=>{
                            if(that.$route.query.contractId){
                                window.location.href = "epipe://?&mark=goWork"
                            }else{
                                window.location.href = "epipe://?&mark=history_back" 
                            }
                        },700)
                    }else{
                        that.$toast('提交成功！')
                        window.location.href = "epipe://?&mark=workUpdate";
                        setTimeout(()=>{
                            console.log(res.data.b)
                            window.location.href = "epipe://?&mark=submitContract&_id="+res.data.b.contractId;
                        },500)
                    }
                    localStorage.removeItem('contract')
                }
            })
    }
}

import {mapState, mapMutations} from 'vuex';
import Accessory  from '../../../components/worknews/accessory_select.vue'    //附件
import WorkButton  from '../../../components/worknews/work_button.vue'   //提交按钮
import CopeMan  from '../../../components/worknews/copy_man.vue'    //抄送人
import ApproverMan  from '../../../components/worknews/approver_man.vue'    //审批人
import TopHead  from '../../../components/topheader.vue'  //header导航栏
import Dialog  from '../../../components/oa/dialog.vue'    //弹窗

export default {
        data(){
            return{
                id:'',
                contractName:'', //合同名称
                contractNoInput:'', //合同编号
                applyCompanyName:'',//送审单位
                userName:'',//项目负责人
                receiveCompanyName:'',//使用单位
                receiveName:'',//使用责任人
                contractObj:'', //合同标的
                contractDesc:'',//合同要点说明
                chosed_list: [], //抄送人
                approver_list : [], //审批人
                accessory :[],
                isDraftFlag:0, //判断是不是草稿
                isShow:false,
                textNum:0,
                oldData:null,
            }
        },
        components: {
            WorkButton,
            CopeMan,
            ApproverMan,
            TopHead,
            Accessory,
            Dialog
        },
        methods:{
        ...mapMutations(['change_man','approver_man']),
        save_btn(){ //保存草稿
            save_leave(1, "存入草稿成功", this)
        },
        submit_btn(){ //提交
            save_leave(0, "提交成功", this)
        },
         history_back_click(){
            if(!this.isUpdate()){
                 window.location.href = "epipe://?&mark=history_back"
            }else{
                this.isShow = true;
            }
        },
        lf_click(){
            this.isShow=false;
            if(this.$route.query.contractId&&!this.$route.query.resubmit){
                 save_leave(1, "存入草稿成功", this)
            }else{
                localStorage.setItem('contract',JSON.stringify(this.$data))
            }
            window.location.href = "epipe://?&mark=history_back"
        },
        rg_click(){
            this.isShow=false;
            localStorage.removeItem('contract')
            window.location.href = "epipe://?&mark=history_back"
        },
        isUpdate(){
            let data = this.$data;
            for(let key in data){
               if(key=='approver_list'||key=='chosed_list'||key=='accessory'){
                    if(data[key].length!=this.oldData[key].length){
                        return true
                    }
                    for(let i=0;i<data[key].length;i++){

                        if(key!='accessory'&&data[key][i].auditUserId!=this.oldData[key][i].auditUserId){
                            return true
                        }else if(key=='accessory'&&data[key][i].url!=this.oldData[key][i].url){
                            return true
                        }
                    }
                }else if(key!='oldData'&&key!='approver_list'&&key!='chosed_list'&&key!='accessory'){
                    if(data[key]!=this.oldData[key]){
                            return true;
                    }
                }
            }
            return false
        },
        addAccessory:function(){
            let that = this;
            window.location.href = "epipe://?&mark=addAccessory"
        },
        deleteFile:function(index){  //删除附件
            this.accessory.splice(index,1)
        },
        go_fildDetails: function (url) { //查看图片详情
                let that = this;
                let obj = {index_num: 0, data:[url],type:0}
                window.location.href = "epipe://?&mark=imgdetail&url=" + JSON.stringify(obj);
        },
        remove_item: function (itme, index,typess) {   //删除
            if(typess){
                this.approver_list.splice(index, 1);
                this.approver_man(this.approver_list)
            }else{
                this.chosed_list.splice(index, 1);
                this.change_man(this.chosed_list)
            }
        },
        isImg:function(str){
                 //判断是否是图片 - strFilter必须是小写列举
                var strFilter=".jpeg|.gif|.jpg|.png|.bmp|.pic|"
                if(str.indexOf(".")>-1){
                    var p = str.lastIndexOf(".");
                    var strPostfix=str.substring(p,str.length) + '|';        
                    strPostfix = strPostfix.toLowerCase();
                    if(strFilter.indexOf(strPostfix)>-1){
                        return true;
                    }
                }        
                return false;   
            },
        accessoryFor:function(data){
              if(!data.accessory||data.accessory.url==null) return false;
               var urlArr = data.accessory.url.split('|')
               var fileSizeArr = data.accessory.fileSize.split('|')
               var fileNameArr = data.accessory.fileName.split('|')
                for(let i=0;i<urlArr.length;i++){
                    this.accessory.push({
                        url:urlArr[i],
                        fileSize:fileSizeArr[i],
                        fileName:fileNameArr[i]
                    })
                }
            },
        },
         watch:{
            contractDesc : function(){
                this.textNum = this.contractDesc.length
            }
        },
        created(){
             if(localStorage.getItem('contract')){
                let contractdata = JSON.parse(localStorage.getItem('contract'))
                for(let key in contractdata){
                    this.$data[key] = contractdata[key]
                }
                this.approver_man(this.$data.approver_list)
                this.change_man(this.$data.chosed_list)
            }
             this.oldData = JSON.parse(JSON.stringify(this.$data))

        },
        filters:{
          fileSize:function(value){
              value = value-0
            if(value<5500){
                value = value/1024
                return value.toFixed(2)+'kb';
            }
            value = value/1024/1024
            return value.toFixed(2)+'mb';
          }  
        },
        activated(){
            this.approver_list = this.approver_man_state
            this.chosed_list = this.chosed_man_state
         },
        mounted(){

            window["epipe_camera_callback"] = (url,fileSize,fileName) => {
                var obj = {
                        url,
                        fileSize,
                        fileName
                }
                that.isImg(url)?obj.isImg=true:obj.isImg=false;
                that.accessory.push(obj)
            }

            let that = this;

            this.axios.get('/user/info').then(function(res){
                that.applyCompanyName = res.data.b.organName
                that.userName = res.data.b.name
                that.oldData = JSON.parse(JSON.stringify(that.$data))
            })

            if(this.$route.query.contractId){
                    this.axios.get('/work/contract/info',{
                        params:{
                            type:that.$route.query.resubmit,
                            contractId:this.$route.query.contractId
                        }
                    }).then(function(res){ 
                     let data = res.data.b.data[0];
                       if(!that.$route.query.resubmit){
                            that.id = data.contractId;
                        }
                        that.isDraftFlag = 1;
                        that.accessoryFor(data)
                        that.contractName = data.contractName;
                        that.contractNoInput = data.contractNoInput;
                        that.applyCompanyName = data.applyCompanyName;
                        that.applyUserName = data.userName;
                        that.receiveCompanyName = data.receiveCompanyName;
                        that.receiveName = data.receiveName;
                        that.chosed_list = data.receivers;
                        that.contractObj = data.contractObj;
                        that.contractDesc = data.contractDesc;
                        that.chosed_list = data.receivers;
                        that.textNum = data.contractDesc.length
                        that.change_man(that.chosed_list);
                        that.approver_list = data.auditers;
                        that.approver_man(that.approver_list);
                        that.oldData = JSON.parse(JSON.stringify(that.$data))
                    })
                    return
            }
        },
        computed: mapState(["chosed_man_state","approver_man_state"])
        
}
</script>


<style lang="stylus" scoped>
    .content{
        margin-top 0.59rem;
        margin-bottom 0.3rem;
        padding 0 0.15rem;

         .styles{
            margin-bottom 0.15rem;
             -webkit-box-shadow: 0 0 0.2rem rgba(238,65,54,.1);    
             box-shadow 0 0 0.2rem rgba(238,65,54,.1);
             background-color #fff;
             overflow hidden

             input{
                 box-sizing border-box
                 float right;
                 width 2rem;
                 height 0.44rem;
                 border none;
                 outline none;
                 font-size:0.14rem;
                 text-align right;
                 padding-right 0.15rem;
                 color:#666;
             }
             input::-webkit-input-placeholder{
                 font-size:0.13rem;
             }

             textarea{
                 width 100%;
                 height 1.2rem;
                 line-height 0.2rem;
                border none;
                resize none;
                outline none;
                color #666;
                font-size 0.15rem;
                word-wrap: break-word;
                word-break: break-all
             }

             .title{
                 line-height 0.44rem;
                 font-size 0.15rem;
                 color #333;
                 font-weight:bold;
             }
        }
    }

    .accessory{

        li{
            display:flex;
            margin-bottom 0.1rem;
            padding-left 0.15rem;
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

    .add-btn{
        display flex;
        padding-left:0.15rem;

        div{
            height:0.33rem;
            display: table;
            margin-left:0.1rem;
        }

        p{
            font-size:0.12rem;
            color:#999;
            display: table-cell;  
            vertical-align: middle; 
            word-wrap: break-word;
            word-break: break-all;
        }
    }

    .input_group>div{
        overflow hidden;
        padding 0 0.15rem;
    }

    input[disabled],input:disabled,input.disabled{  
    color: #666;  
    -webkit-text-fill-color:#666;  
    -webkit-opacity:1;  
    opacity: 1;
    background-color:#fff;
} 

    .bor_bottom{
        position:relative;
    }

    .bor_bottom:after{
        position:absolute;
        content:'';
        display:block;
        bottom : 0;
        left:0;
        height:0.01rem;
        width:100%;
        background-color:#f5f5f5;
    }

    .record_box{
        overflow hidden;
        margin-bottom 0.08rem;
        font-size 0.12rem;


        span{
            float right;
            color: rgb(96, 158, 247);
        }
    }

</style>
