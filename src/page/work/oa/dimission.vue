<template>
    <section>
        <TopHead
        mark = 'mark'
        bgcolor = '#609df6'
        title="离职" 
        v-on:history_back="history_back_click"
         ></TopHead>
        <div class="content">
            <div class="styles input_group">
                <div class="bor_bottom">
                    <span class="title">文件标题</span>
                    <input placeholder="请输入标题"  v-model="dimissionTitle" />
                </div>
                  <div>
                    <span class="title">申请人</span>
                    <input placeholder="请输入申请人"  v-model="userName" disabled/>
                </div>
                <div class="bor_bottom">
                    <span class="title">所属部门</span>
                    <input placeholder="请输入所属部门"  v-model="departmentName" disabled/>
                </div>
            </div>
            <div class="styles input_group">
                <div class="bor_bottom">
                    <span class="title">员工编号</span>
                    <input style="color:#666" v-model="employeeNo" placeholder="请输入员工编号"/>
                </div>
                <div class="bor_bottom">
                    <span class="title">职务</span>
                    <input style="color:#666" v-model="position" placeholder="请输入职务名称"/>
                </div>
                <router-link :to="{ path:'/option', query: {indexs:positionCode,type:'position',color:'#609df6'}}"  class="bor_bottom choose" tag="div">
                    <span class="title">职务类别</span>
                    <p>
                        <span class="nullValue">{{positionType}}</span>
                        <svg class="icon icon-back" aria-hidden="false">
                                <use xlink:href="#icon-right"></use>
                        </svg>
                    </p>
                </router-link>
                 <div class="bor_bottom">
                    <span class="title">学历</span>
                    <input style="color:#666" v-model="education" placeholder="请输入最高学历"/>
                </div>
                 <div class="bor_bottom choose" @click="getTime(0)">
                     <span class="title">入职日期</span>
                    <p>
                        <span class="nullValue">{{hireDate}}</span>
                        <svg class="icon icon-back" aria-hidden="false">
                                <use xlink:href="#icon-right"></use>
                        </svg>
                    </p>
                </div>
                 <div class="bor_bottom choose" @click="getTimes">
                     <span class="title">合同到期日</span>
                    <p>
                        <span class="nullValue">{{contractEndDate}}</span>
                        <svg class="icon icon-back" aria-hidden="false">
                                <use xlink:href="#icon-right"></use>
                        </svg>
                    </p>
                </div>
               <router-link :to="{ path:'/option', query: {indexs:dimissionCode,type:'dimission',color:'#609df6'}}"  class="bor_bottom choose" tag="div">
                    <span class="title">离职类别</span>
                    <p>
                        <span class="nullValue">{{dimissionType}}</span>
                        <svg class="icon icon-back" aria-hidden="false">
                                <use xlink:href="#icon-right"></use>
                        </svg>
                    </p>
                </router-link>
                 <div class="bor_bottom choose" @click="getTime(1)">
                     <span class="title">最后工作日</span>
                    <p>
                        <span class="nullValue">{{dimissionDate}}</span>
                        <svg class="icon icon-back" aria-hidden="false">
                                <use xlink:href="#icon-right"></use>
                        </svg>
                    </p>
                </div>
            </div>

            <div class="styles" style="padding:0 0.15rem;">
                <p class="title">离职原因</p>
                <textarea v-model.trim="dimissionDesc" name="" maxlength="1000" id="" cols="30" rows="10" placeholder="请输入离职原因,限定1000字">

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
                color="#609df6"
                :data_list=approver_list
                v-on:remove_item="remove_item"
                :special_class='1'
                :isGroup = true
                type = 6
            ></ApproverMan>

            <CopeMan 
                :has_journal="!has_journal"
                color="#609df6"
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
var regs =/^[1-9]+\d*$/;
let save_leave = (index,text,that) =>{
    if(that.dimissionTitle== ''){
        that.$toast('文件标题不能为空')
    }else if(that.dimissionTitle.length>30 ||that.dimissionTitle.length<6){
        that.$toast('文件标题不能低于6个或超过30个字符')
    }else if(that.approver_list.length == 0){
        that.$toast('请选择审批人')
    }else if(that.employeeNo.length<2||that.employeeNo.length>30){
        that.$toast('员工编号不能低于2个或超过30个字符')
    }else if(isNaN(that.employeeNo)){
        that.$toast('员工编号为数字')
    }else if(that.position.length<2||that.position.length>30){
        that.$toast('职务不能低于2个或超过30个字符')
    }else if(that.hireDate=='请选择入职日期'){
        that.$toast('请选择入职日期')
    }else if(that.dimissionDate=='请选择离职日期'){
        that.$toast('请选择离职日期')
    }else if(that.contractEndDate=='请选择合同终止日期'){
        that.$toast('请选择合同终止日期')
    }else if(that.dimissionDesc==''){
        that.$toast('请输入离职原因')
    }else if(that.education.length<2||that.education.length>30){
        that.$toast('学历不能低于2个或超过30个字符')
    }else if(that.dimissionDesc.length<6||that.dimissionDesc.length>1000){
        that.$toast('离职原因不能低于6个或超过1000个字符')
    }else if(that.positionCode<0){
        that.$toast('请选择职务类型')
    }else if(that.dimissionCode<0){
        that.$toast('请选择离职类型')
    }else if(that.dimissionDesc.length<6){
        that.$toast('离职原因不能少于6个字符')
    }
    else{
      
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
        // let contDesc = that.dimissionDesc.replace(/\n|\r\n/g,"<br>")
        // https://blog.csdn.net/xiaobao5214/article/details/68923023/
         that.axios({
                method:"post",
                url:"/work/dimission/save",
                headers:{
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                data:{
                    Id :that.id, // id
                    dimissionTitle:that.dimissionTitle,//标题
                    dimissionDesc:that.dimissionDesc, //离职原因
                    employeeNo:that.employeeNo, //员工编号
                    education:that.education, //学历
                    position:that.position,// 职务
                    hireDate:that.hireDate,//入职时间
                    dimissionDate:that.dimissionDate,//离职日期
                    positionType:that.positionCode,
                    dimissionType:that.dimissionCode,
                    contractEndDate:that.contractEndDate,//合同终止日期
                    urls : urlStr, //附件
                    fileNames:fileNameStr, 
                    fileSizes:fileSizeStr,
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
                         if(that.$route.query.dimissionId){
                             window.location.href = "epipe://?&mark=goWork"
                        }else{
                            window.location.href = "epipe://?&mark=history_back" 
                        }
                        // window.location.href = "epipe://?&mark=history_back";
                    },700)
                }else{
                    that.$toast('提交成功！')
                    window.location.href = "epipe://?&mark=workUpdate";
                    setTimeout(()=>{
                        // that.$router.push({path:'/leOfReDetails',query:{dimissionApplyId:res.data.b,isH5:true}})
                        // window.location.href = "epipe://?&mark=submitLetter&_id="+res.data.b;
                        window.location.href = "epipe://?&mark=submitDimission&_id="+res.data.b.dimissionApplyId;
                        
                    },500)
                }
                localStorage.removeItem('dimission')
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
                dimissionTitle : '', // 标题
                departmentName : '',//
                employeeNo : '', //员工编号
                position:'',//职务
                education:'',//学历
                hireDate:'请选择入职日期',//入职日期
                dimissionDate:'请选择离职日期',//离职日期
                contractEndDate:'请选择合同终止日期',//合同终止日期
                userName : '',//用印承办人
                positionType:'请选择职务类型',
                positionCode:-1,
                dimissionCode:-1 ,
                dimissionType:'请选择离职类型',
                chosed_list : [], //抄送人
                approver_list : [], //审批人
                accessory : [],
                isDraftFlag : 0, //判断是不是草稿
                textNum : 0,
                isShow:false,
                oldData:null,
                dimissionDesc:'',
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
         history_back_click(){
            if(!this.isUpdate()){
                 window.location.href = "epipe://?&mark=history_back"
            }else{
                this.isShow = true;
            }
        },
        lf_click(){
            this.isShow=false;
            if(this.$route.query.dimissionId&&!this.$route.query.resubmit){
                 save_leave(1, "存入草稿成功", this)
            }else{
                localStorage.setItem('dimission',JSON.stringify(this.$data))
            }
            window.location.href = "epipe://?&mark=history_back"
        },
        rg_click(){
            this.isShow=false;
            localStorage.removeItem('dimission')
            window.location.href = "epipe://?&mark=history_back"
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
             getTimes(){ //获取原生时间
                let that = this;
                window.location.href = "epipe://?&mark=getLeaveTime";
                window["epipe_leavetime_callback"] = str => {
                        let flag = false; 
                        let date = null;
                    if(str.indexOf('/')>0){
                        flag = true;
                        date = that.tiemF(str)
                        str = str.split(/[- : \/]/);
                    }else{
                        date = new Date(str)
                    }
                    that.contractEndDate = flag?str[0]+'-'+str[1]+'-'+str[2]+' '+str[3]+':'+str[4]:str; 
                }
            },
            getTime(num){ //获取原生时间
                let that = this;
                window.location.href = "epipe://?&mark=getLeaveTime";

                window["epipe_leavetime_callback"] = str => {
                        let flag = false; 
                        let date = null;
                    if(str.indexOf('/')>0){
                        flag = true;
                        date = that.tiemF(str)
                        str = str.split(/[- : \/]/);
                    }else{
                        date = new Date(str)
                    }

                    if(!num){
                        if(that.dimissionDate!='请选择离职时间'){
                            let endDate = that.tiemF(that.dimissionDate)
                            if(date.getTime()>endDate.getTime()){
                                that.$toast('入职时间不能大于离职时间')
                            }else if(date.getTime()==endDate.getTime()){
                                that.$toast('入职时间不能等于离职时间')
                            }else{
                            that.hireDate = flag?str[0]+'-'+str[1]+'-'+str[2]+' '+str[3]+':'+str[4]:str; 
                            that.getLeaveDay();
                            }
                        }else{
                            that.hireDate = flag?str[0]+'-'+str[1]+'-'+str[2]+' '+str[3]+':'+str[4]:str;
                        }
                    }else{            
                        
                        if(that.hireDate!='请选择入职时间'){
                            let beginDate = that.tiemF(that.hireDate);
                            if(date.getTime()<beginDate.getTime()){
                                that.$toast('离职时间不能小于入职时间')
                            }else if(date.getTime()==beginDate.getTime()){
                                that.$toast('离职时间不能等于入职时间')
                            }else{
                                that.dimissionDate = flag?str[0]+'-'+str[1]+'-'+str[2]+' '+str[3]+':'+str[4]:str;
                                that.getLeaveDay();
                            }
                        }else{
                            that.dimissionDate = flag?str[0]+'-'+str[1]+'-'+str[2]+' '+str[3]+':'+str[4]:str;
                        }  
                    }
                }
            },
             tiemF(timeStr){ //传入原生的时间格式化
                timeStr+=':00';
                timeStr = timeStr.split(/[- : \/]/);
                return new Date(timeStr[0],timeStr[1]-1,timeStr[2],timeStr[3],timeStr[4])
             },
        },
         watch:{
            dimissionDesc : function(){
                if(this.dimissionDesc.length>1000){
                    this.$toast("最多输入1000字~")
                    this.dimissionDesc = this.dimissionDesc.slice(0,1000)
                    return
                }
                this.textNum = this.dimissionDesc.length
            }
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
         created() {
             if(localStorage.getItem('dimission')){
                let dimissiondata = JSON.parse(localStorage.getItem('dimission'))
                for(let key in dimissiondata){
                    this.$data[key] = dimissiondata[key]
                }
                this.approver_man(this.$data.approver_list)
                this.change_man(this.$data.chosed_list)
            }
            this.oldData = JSON.parse(JSON.stringify(this.$data))

            eventBus.$on('leaveType', res =>{
                if(res.name=='') return;
                if(res.type=='dimission'){
                    this.dimissionCode = res.index;
                    this.dimissionType = res.name;
                }else{
                    this.positionCode = res.index;
                    this.positionType = res.name;
                }
            })
         },
        mounted(){
            let that = this;

                window["epipe_camera_callback"] = (url,fileSize,fileName) => {
                    var obj = {
                            url,
                            fileSize,
                            fileName
                    }
                    that.isImg(url)?obj.isImg=true:obj.isImg=false;
                    that.accessory.push(obj)
                }

            this.axios.get('/user/info').then(function(res){
                that.departmentName = res.data.b.officeName
                that.userName = res.data.b.name
                that.oldData = JSON.parse(JSON.stringify(that.$data))
            })

            if(this.$route.query.dimissionId){
                     this.axios.get('/work/dimission/info',{
                        params:{
                            type:that.$route.query.resubmit,
                            dimissionApplyId:this.$route.query.dimissionId
                        }
                    }).then(function(res){
                     let data = res.data.b;
                       that.id = data.dimissionApplyId;
                       that.isDraftFlag = 1;
                       that.native = 'mark';
                        that.accessoryFor(data)
                        that.dimissionTitle = data.dimissionTitle;
                        that.employeeNo = data.employeeNo;
                        that.position = data.position;
                        that.education= data.education;
                        that.hireDate = data.hireDate;
                        that.dimissionDate=data.dimissionDate;
                        that.contractEndDate=data.contractEndDate;
                        that.receiverName = data.receiverName
                        that.dimissionDesc = data.dimissionDesc;
                        that.payDate = data.payDate;
                        that.bankAcount = data.bankAcount;
                        that.bankName=data.bankName;
                        that.positionType = data.positionType
                        that.positionCode =data.positionTypeCode
                        that.dimissionCode = data.dimissionTypeCode
                        that.dimissionType = data.dimissionType
                        that.textNum=data.dimissionDesc.length;
                        that.chosed_list = data.receivers;
                        that.change_man(that.chosed_list);
                        that.approver_list = data.auditers;
                        that.approver_man(that.approver_list);
                        that.oldData = JSON.parse(JSON.stringify(that.$data))
                    })
                    return
            }
        },
        beforeDestroy() {
            eventBus.$off('leaveType');
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
                 width 2.1rem;
                 height 0.44rem;
                 border none;
                 outline none;
                 font-size:0.14rem;
                 text-align right;
                 padding-right 0.15rem;
             }
             input::-webkit-input-placeholder{
                 font-size:0.13rem;
                 color:#666;
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

    .choose{
         p{
            float:right;
            line-height 0.44rem;
        }
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

    .nullValue{
        color:#666;
    }

    

</style>
