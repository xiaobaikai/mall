<template>
    <section>
        <TopHead
        mark = 'mark'
        bgcolor = '#609df6'
        title="转正" 
        v-on:history_back="history_back_click"
         ></TopHead>
        <div class="content">
            <div class="styles input_group">
                <div class="bor_bottom">
                    <span class="title">文件标题</span>
                    <input placeholder="请输入标题" style="color:#666"  v-model="regularTitle" />
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
                    <span class="title">职务</span>
                    <input style="color:#666" v-model="position" placeholder="请输入职务"/>
                </div>
                <div class="bor_bottom">
                    <span class="title">年龄</span>
                    <input style="color:#666" v-model="age" placeholder="请输入年龄"/>
                </div>
                <div class="bor_bottom choose" @click="go_sex">
                    <span class="title">性别</span>
                    <p>
                        <span class="nullValue">{{sexName}}</span>
                        <svg class="icon icon-back" aria-hidden="false">
                                <use xlink:href="#icon-right"></use>
                        </svg>
                    </p>
                </div>
                <div class="bor_bottom">
                    <span class="title">籍贯</span>
                    <input style="color:#666" v-model="birthPlace" placeholder="请输入籍贯"/>
                </div>
                 <div class="bor_bottom choose" @click="getTimes(1)">
                     <span class="title">出生时间</span>
                    <p>
                        <span class="nullValue">{{birthday |dateSlice}}</span>
                        <svg class="icon icon-back" aria-hidden="false">
                                <use xlink:href="#icon-right"></use>
                        </svg>
                    </p>
                </div>
                <div class="bor_bottom">
                    <span class="title">学历</span>
                    <input style="color:#666" v-model="education" placeholder="请输入学历"/>
                </div>
                <div class="bor_bottom">
                    <span class="title">专业</span>
                    <input style="color:#666" v-model="major" placeholder="请输入专业"/>
                </div>
                 <div class="bor_bottom choose" @click="getTimes(2)">
                     <span class="title">毕业时间</span>
                    <p>
                        <span class="nullValue">{{graduationDate |dateSlice}}</span>
                        <svg class="icon icon-back" aria-hidden="false">
                                <use xlink:href="#icon-right"></use>
                        </svg>
                    </p>
                </div>
                <div class="bor_bottom choose" @click="getTimes(3)">
                     <span class="title">入司时间</span>
                    <p>
                        <span class="nullValue">{{hireDate|dateSlice}}</span>
                        <svg class="icon icon-back" aria-hidden="false">
                                <use xlink:href="#icon-right"></use>
                        </svg>
                    </p>
                </div>
                <div class="bor_bottom choose" @click="getTime(0)">
                     <span class="title">试用开始时间</span>
                    <p>
                        <span class="nullValue">{{beginTime|dateSlice}}</span>
                        <svg class="icon icon-back" aria-hidden="false">
                                <use xlink:href="#icon-right"></use>
                        </svg>
                    </p>
                </div>
                <div class="bor_bottom choose" @click="getTime(1)">
                     <span class="title">试用结束时间</span>
                    <p>
                        <span class="nullValue">{{endTime|dateSlice}}</span>
                        <svg class="icon icon-back" aria-hidden="false">
                                <use xlink:href="#icon-right"></use>
                        </svg>
                    </p>
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
                type = 9
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
let reg = /^[\u4e00-\u9fa5]+$/;
var regs =/^[1-9]+\d*$/;
let rule = /^[A-Za-z0-9]+$/;
let save_leave = (index,text,that) =>{
    if(that.regularTitle== ''){
        that.$toast('文件标题不能为空')
    }else if(that.regularTitle.length>30 ||that.regularTitle.length<6){
        that.$toast('文件标题不能低于6个或超过30个字符')
    }else if(that.position == ''){
	    that.$toast('职务不能为空')
    }else if(that.position.length>30){
	    that.$toast('职务不能超过30字符')
    }else if(that.birthPlace == ''){
	    that.$toast('籍贯不能为空')
    }else if(that.birthPlace.length>10){
	    that.$toast('籍贯不能超过10个字符')
    }else if(that.sex==-1){
        that.$toast('请选择性别')
    }else if(that.major == ''){
	    that.$toast('专业不能为空')
    }else if(that.major.length>10){
	    that.$toast('专业不能超过10个字符')
    }else if(that.education == ''){
	    that.$toast('学历不能为空')
    }else if(that.education.length>10){
	    that.$toast('学历不能超过10个字符')
    }else if(that.beginTime == '请选择试用开始时间'){
        that.$toast('请选择试用开始时间')
    }else if(that.endTime == '请选择试用结束时间'){
        that.$toast('请选择试用结束时间')
    }else if(that.graduationDate == '请选择毕业时间'){
        that.$toast('请选择毕业时间')
    }else if(that.hireDate == '请选择入司时间'){
        that.$toast('请选择入司时间')
    }else if(that.birthday=='请选择出生时间'){
        that.$toast('请选择出生时间')
    }else if(that.age==''){
        that.$toast('年龄不能为空')
    }else if(isNaN(that.age)){
        that.$toast('年龄必须为数字')
    }else if((that.age+'').length>2){
        that.$toast('年龄不能超过2位数')
    }else if(that.approver_list.length == 0){
        that.$toast('请选择审批人')
    }else{
        let chosed_id = ''; //抄送人
        if(!that.isDraftFlag){
            for (let i = 0; i < that.chosed_list.length; i++) {
                chosed_id  += "|" + that.chosed_list[i].userId
            }
        }else{
            for (let i = 0; i < that.chosed_list.length; i++) {
                chosed_id += "|" + that.chosed_list[i].receiverId
            }
        }
        chosed_id = chosed_id.slice(1)

        let approver_id = '' //审批人

        if(!that.isDraftFlag){
            for (let i = 0; i < that.approver_list.length; i++) {
                approver_id  += "|" + that.approver_list[i].userId
            }
        }else{
            for (let i = 0; i < that.approver_list.length; i++) {
                approver_id  += "|" + that.approver_list[i].auditUserId
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
        // let contDesc = that.description.replace(/\n|\r\n/g,"<br>")
        // https://blog.csdn.net/xiaobao5214/article/details/68923023/
        that.axios({
                method:"post",
                url:"/work/regular/save",
                headers:{
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                data:{
                    Id :that.id, // id
                    regularTitle:that.regularTitle,//申请主题
	                beginTime: that.beginTime,  //
                    endTime: that.endTime,  //
                    education:that.education,
                    birthday:that.birthday,
                    hireDate:that.hireDate,
                    graduationDate:that.graduationDate,
                    birthPlace:that.birthPlace,
                    age:that.age,
                    sex:that.sex,
                    major:that.major,
                    position:that.position,
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
                                    if(that.$route.query.regularId){
                                        window.location.href = "epipe://?&mark=goWork"
                                    }else{
                                        window.location.href = "epipe://?&mark=history_back" 
                                    }
                                },700)
                            }else{
                                that.$toast('提交成功！')
                                window.location.href = "epipe://?&mark=workUpdate";
                                setTimeout(()=>{
                                    window.location.href = "epipe://?&mark=submitRegular&_id="+res.data.b.regularApplyId;
                                    
                                },500)
                            }
                            localStorage.removeItem('regular')
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
                regularTitle : '', // 
                userName : '',//
                position:'',
                age:'',
                sex:-1,
                major:'',
                sexName:'请选择性别',
                education:'',
                birthPlace:'',
                birthday:'请选择出生时间',
                beginTime:'请选择试用开始时间',
                endTime:'请选择试用结束时间',
                graduationDate:'请选择毕业时间',
                hireDate:'请选择入司时间',
                description : '',//用车理由
                chosed_list : [], //抄送人
                approver_list : [], //审批人
                accessory : [],
                isDraftFlag : 0, //判断是不是草稿
                isShow:false,
	            textNum: 0
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
            if(this.$route.query.regularId&&!this.$route.query.resubmit){
                 save_leave(1, "存入草稿成功", this)
            }else{
                localStorage.setItem('regular',JSON.stringify(this.$data))
            }
            window.location.href = "epipe://?&mark=history_back"
        },
        rg_click(){
            this.isShow=false;
            localStorage.removeItem('regular')
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
            window.location.href = "epipe://?&mark=addAccessory"
        },
        deleteFile:function(index){  //删除附件
            this.accessory.splice(index,1)
        },
        go_sex(){
            this.$router.push({path:'/option',query:{type:'sex',indexs:this.sex,remove:true,color:'#609df6'}})
        },
        getTimes(type){ //获取原生时间
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

                    let time = flag?str[0]+'-'+str[1]+'-'+str[2]+' '+str[3]+':'+str[4]:str; 
                    if(type==1){
                        that.birthday = time
                    }else if(type==2){
                        that.graduationDate = time
                    }else{
                        that.hireDate = time
                    }
                }
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
                    if(that.endTime!='请选择试用结束时间'){
                        let endDate = that.tiemF(that.endTime)
                        if(date.getTime()>endDate.getTime()||date.getTime()==endDate.getTime()){
                            that.$toast('试用开始时间不能大于等于试用结束时间')
                        }else{
                           that.beginTime = flag?str[0]+'-'+str[1]+'-'+str[2]+' '+str[3]+':'+str[4]:str; 
                        }
                    }else{
                        that.beginTime = flag?str[0]+'-'+str[1]+'-'+str[2]+' '+str[3]+':'+str[4]:str;
                    }
                }else{            
                    if(that.beginTime!='请选择试用开始时间'){
                        let beginDate = that.tiemF(that.beginTime);
                        if(date.getTime()<beginDate.getTime()||date.getTime()==beginDate.getTime()){
                            that.$toast('试用结束时间不能小于等于试用开始时间')
                        }else{
                            that.endTime = flag?str[0]+'-'+str[1]+'-'+str[2]+' '+str[3]+':'+str[4]:str;
                        }
                    }else{
                        that.endTime = flag?str[0]+'-'+str[1]+'-'+str[2]+' '+str[3]+':'+str[4]:str;
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
        activated(){
            this.approver_list = this.approver_man_state
            this.chosed_list = this.chosed_man_state
         },
         created() {
             if(localStorage.getItem('regular')){
                let regulardata = JSON.parse(localStorage.getItem('regular'))
                for(let key in regulardata){
                    this.$data[key] = regulardata[key]
                }
                this.approver_man(this.$data.approver_list)
                this.change_man(this.$data.chosed_list)
            }
            this.oldData = JSON.parse(JSON.stringify(this.$data))

            eventBus.$on('leaveType', res =>{
            if(res.name=='') return;
            this.sex = res.index;
            this.sexName = res.name;
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

            if(this.$route.query.regularId){
                  this.axios.get('/work/regular/info',{
                    params:{
                        type:that.$route.query.resubmit,
	                    regularApplyId:this.$route.query.regularId
                    }
                }).then(function(res){
                   let data = res.data.b;
                       if(!that.$route.query.resubmit){
                                that.id = data.regularApplyId;
                       }
                      that.isDraftFlag = 1;

                      that.position = data.position;
                      that.accessoryFor(data)
                      that.birthPlace = data.birthPlace;
                      that.birthday = data.birthday;
                      that.major = data.major;
                      that.graduationDate = data.graduationDate;
                      that.regularTitle = data.regularTitle;
                      that.education = data.education;
                      that.age = data.age;
                      that.hireDate = data.hireDate;
                      that.sexName = data.sex;
                      that.sex = data.sexCode;
                      that.beginTime = data.beginTime;
                      that.endTime = data.endTime;
                      that.chosed_list = data.receivers;
                      that.change_man(that.chosed_list);
                      that.approver_list = data.auditers;
                      that.approver_man(that.approver_list);
                      that.oldData = JSON.parse(JSON.stringify(that.$data))
                    })
                    return
            }
        },
        filters:{
            dateSlice:function(value){
                if(value.indexOf('时间')>-1) return value

                return value.slice(0,-6)
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
