<template>
    <section>
        <TopHead
        :native= native
        bgcolor = '#fd545c'
        title="请假" 
         ></TopHead>
        <div class="content">          
            <router-link :to="{ path:'/option', query: {indexs:leaveIndex}}" class="styles" tag="div">
                <div class="items">
                    请假类型
                    <p>
                        <span class="nullValue">{{leaveName}}</span>
                    <svg class="icon icon-back" aria-hidden="false">
                            <use xlink:href="#icon-right"></use>
                    </svg>
                    </p>
                </div>
           </router-link>
            <div class="styles inp_ul">
                <div class="items" @click="getTime(0)">
                    开始时间
                    <p >
                        <span class="nullValue">{{beginTime}}</span>
                        <svg class="icon icon-back" aria-hidden="false">
                            <use xlink:href="#icon-right"></use>
                        </svg>
                    </p>
                </div>

                <div class="items" @click="getTime(1)">
                    结束时间
                    <p >
                        <span class="nullValue">{{endTime}}</span>
                        <svg class="icon icon-back" aria-hidden="false">
                            <use xlink:href="#icon-right"></use>
                        </svg>
                    </p>
                </div>
                <div class="items leaveTime">
                    时长 <span style="font-size:12px;color:#999">（以0.5为单位）</span>
                    <p>
                        <input type="number" v-model="leaveDay">
                        <span class="nullValue">
                            天
                            </span>
                        <svg class="icon icon-back" aria-hidden="false">
                            <use href=""></use>
                        </svg>
                    </p>
                </div>
            </div>
            
            <div class="styles pad reason">
                <p>请假事由</p>
                <textarea v-model="reasonText"  placeholder="请输入请假事由">

                </textarea>
                <div class="record_box">
                    <span>{{textNum}}/150</span>
                </div>
                <ul class="imgShow">
                    <li v-for="(item,index) in URL">
                        <img :src="item" @click="go_imgdetail(index)">
                    </li>
                    <li @click="get_camera" style="height:0.35rem">
                        <svg class="icon icon-back" aria-hidden="false" style="width:0.32rem;height:0.34rem">
                            <use xlink:href="#icon-xiangji"></use>
                        </svg>
                    </li>
                </ul>
            </div>  

            <ApproverMan 
                :has_journal="!has_journal"
                color="#609ef7"
                :data_list=approver_list
                v-on:remove_item="remove_item"
                :special_class='1'
            ></ApproverMan>

            <CopeMan 
                :has_journal="!has_journal"
                color="#609ef7"
                :data_list=chosed_list
                v-on:remove_item="remove_item"
                :special_class='1'
                :types = '2'
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
    </section>
</template>

<script>

let save_leave = (index,text,that) =>{
    if(that.leaveIndex== '-1'){
        that.$toast('请选择请假类型')
    }else if(that.beginTime=='请选择开始时间'){
        that.$toast('请选择开始时间')
    }else if(that.endTime=='请选择结束时间'){
        that.$toast('请选择结束时间')
    }else if(that.textNum == 0){
        that.$toast("请输入请假事由")
    }else if(that.approver_list.length == 0){
        that.$toast('请选择审批人')
    }else if(that.leaveDay=='0'){
        that.$toast('请假天数不能为0')
    }else if(that.leaveDay==''||that.leaveDay*10%5!=0){
        that.$toast('请输入正确的请假天数')
    }
    
    else{
        let chosed_id = ''; //抄送人
        if(!that.isDraft){
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

        if(!that.isDraft){
            for (let i = 0; i < that.approver_list.length; i++) {
                approver_id = approver_id + "|" + that.approver_list[i].userId
            }
        }else{
            for (let i = 0; i < that.approver_list.length; i++) {
                approver_id = approver_id + "|" + that.approver_list[i].auditUserId
            }
        }
        
        approver_id = approver_id.slice(1)

        let string_img = "" //图片
        for (let i = 0; i < that.URL.length; i++) {
            string_img = string_img + "|" + that.URL[i]
        }
        string_img = string_img.slice(1)

        that.axios.post(that.Service.saveLeave + that.Service.queryString({
          Id :that.leaveId, // id
          leaveType: that.leaveIndex, //请假类型
          beginTime: that.beginTime, //开始时间
          endTime : that.endTime, //结束时间
          leaveDuration : that.leaveDay, //请假天数
          auditUserIds: approver_id, //审批人
          receiverIds: chosed_id, //抄送人
          images: string_img, //图片
          reason : that.reasonText, //请假事由
          draftFlag : index, //草稿还是发送
        })).then(function (res){
            if(res.data.h.code==1503||res.data.h.code==1500||res.data.h.code==1502||res.data.h.code==1501){
                that.$toast(res.data.h.msg)
            }else if(res.data.h.code == 200){
                if(index){
                        that.$toast('已保存至草稿箱!')
                        setTimeout(()=>{
                            window.location.href = "epipe://?&mark=history_back";
                        },700)
                }else{
                        that.$toast('提交成功！')
                        window.location.href = "epipe://?&mark=workUpdate";
                        setTimeout(()=>{
                            that.$router.push({path:'/leaveDetails',query:{leaveId:res.data.b.leaveId,leaveOk:true}})
                        },1000)
                }
            }
      })
    }
}

  import {mapState, mapMutations} from 'vuex';
  import TopHead  from '../../components/topheader.vue'  //header导航栏
  import WorkButton  from '../../components/worknews/work_button.vue'   //提交按钮
  import CopeMan  from '../../components/worknews/copy_man.vue'    //抄送人
  import ApproverMan  from '../../components/worknews/approver_man.vue'    //审批人

export default {
    data(){
        return {
            textNum : 0,  //请假输入字数
            // beginTime :'2018-03-09 12:08',
            // endTime :'2018-03-12 12:08',
             beginTime : '请选择开始时间', //开始时间
             endTime : '请选择结束时间',  //结束时间
            chosed_list: [], //抄送人
            approver_list : [], //审批人
            leaveIndex : '-1', //假期类型
            leaveName : '', //请假类型名称
            reasonText : '', //请假事由
            leaveDay : '0',  //请假天数
            URL: [], //图片
            leaveId :'',
            isDraft : 0, //0请假 1草稿
            native : 'native',
            workOnTime: '',//上班开始时间
        }
    },
    components: {
      WorkButton,
      CopeMan,
      TopHead,
      ApproverMan
    },
    methods : {
        ...mapMutations(['change_man','approver_man']),
        save_btn(){ //保存草稿
            save_leave(1, "存入草稿成功", this)
        },
        submit_btn(){ //提交
            save_leave(0, "提交成功", this)
        },
        get_camera: function () { //调用原生图片
            let that = this;
            if (that.URL.length >= 5) {
                this.$alert("最多选择5张图片")
            } else {
                window.location.href = "epipe://?&mark=camera&num=" + that.URL.length
                window["epipe_camera_callback"] = URL => {
                    that.URL = that.URL.concat(URL);
                }
            }
        },
        go_imgdetail: function (index) { //查看图片详情
   
            let that = this;
            let obj = {index_num: index, data: this.URL,type:1}
            window.location.href = "epipe://?&mark=imgdetail&url=" + JSON.stringify(obj);
            window["epipe_removephoto_callback"] = index => {//原生的调用删除图片的方法
                that.URL.splice(parseInt(index), 1)
            }
        },
        tiemF(timeStr){
            timeStr+=':00';
            timeStr = timeStr.split(/[- : \/]/);
            return new Date(timeStr[0],timeStr[1]-1,timeStr[2],timeStr[3],timeStr[4])
        },
        getLeaveDay(){
            
            let bTime = this.tiemF(this.beginTime)
            let eTime = this.tiemF(this.endTime)
            let time =eTime.getTime() - bTime.getTime()

            let dayTime =  parseInt( time/(24*60*60*1000));
   
            if(time/(1000*60*60)<=4){
                this.leaveDay = 0.5;
            }else if(!dayTime&&time/(1000*60*60)>4){
                this.leaveDay = 1;
            }else{
                let days = time/(1000*60*60) - dayTime * 24
                this.leaveDay = days<=4?dayTime +0.5:dayTime+1
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
                    if(that.endTime!='请选择结束时间'){
                        let endDate = that.tiemF(that.endTime)
                        if(date.getTime()>endDate.getTime()){
                            that.$toast('开始时间不能大于结束时间')
                        }else if(date.getTime()==endDate.getTime()){
                             that.$toast('开始时间不能等于结束时间')
                        }else{
                           that.beginTime = flag?str[0]+'-'+str[1]+'-'+str[2]+' '+str[3]+':'+str[4]:str; 
                           that.getLeaveDay();
                        }
                    }else{
                        that.beginTime = flag?str[0]+'-'+str[1]+'-'+str[2]+' '+str[3]+':'+str[4]:str;
                    }
                }else{            
                    
                    if(that.beginTime!='请选择开始时间'){
                        let beginDate = that.tiemF(that.beginTime);
                        if(date.getTime()<beginDate.getTime()){
                            that.$toast('结束时间不能小于开始时间')
                        }else if(date.getTime()==beginDate.getTime()){
                             that.$toast('结束时间不能等于开始时间')
                        }else{
                            that.endTime = flag?str[0]+'-'+str[1]+'-'+str[2]+' '+str[3]+':'+str[4]:str;
                            that.getLeaveDay();
                        }
                    }else{
                        that.endTime = flag?str[0]+'-'+str[1]+'-'+str[2]+' '+str[3]+':'+str[4]:str;
                    }  
                }
            }
        },
        remove_item: function (itme, index,typess) {   //删除抄送人
            if(typess){
                this.approver_list.splice(index, 1);
                this.approver_man(this.approver_list)
            }else{
                this.chosed_list.splice(index, 1);
                this.change_man(this.chosed_list)
            }
        },
    },
    watch :{
            reasonText : function(){
                if(this.reasonText.length>150){
                    this.$toast("最多输入150字~")
                    this.reasonText = this.reasonText.slice(0,150)
                    return
                }
                this.textNum = this.reasonText.length
            }
        },
    created(){
        eventBus.$on('leaveType', res =>{
            this.leaveIndex = res.index -0 + 1;
            this.leaveName = res.name;
        })
    },
    activated(){
        this.approver_list = this.approver_man_state
        this.chosed_list = this.chosed_man_state
    },
    mounted : function(){
        let that = this;
     
        if(location.href.indexOf('draftId')>0){

            let draftId = this.types = this.Util.getUrlValue('draftId=')

            this.axios.get('/work/leave/apply/info?leaveId='+draftId).then(function(res){
                 let datas = res.data.b.data[0];
                 if(res.data.h.code == 200){
                     that.isDraft = 1;
                     that.URL = datas.images;
                     that.leaveId = datas.leaveId;
                     that.beginTime = datas.beginTime.slice(0,-3);
                     that.endTime = datas.endTime.slice(0,-3);
                     that.leaveDay = datas.leaveDuration.slice(0,-1)
                     that.leaveName = datas.leaveType;
                     that.leaveIndex = datas.leaveTypecode;
                     that.reasonText = datas.reason;
                     that.chosed_list = datas.receivers;
                     that.change_man(that.chosed_list);
                     that.approver_list = datas.auditers;
                     that.approver_man(that.approver_list);
                 }
             })
        }else{
            this.axios.get(this.Service.reportReceiver).then(function (data) { //查询抄送人
            if (data.data.h.code == 10) {
                window.location.href = "epipe://?&mark=login_out"
            } else if (data.data.h.code == 200) {
                that.chosed_list = data.data.b.data
                that.chosed_list.forEach(function(item){
                    item.receiverId = item.userId;
                })
                window.localStorage.chosed_list = JSON.stringify(that.chosed_list)
                that.change_man(that.chosed_list)
            }
      })
        }


    },
     beforeDestroy() {
      eventBus.$off('leaveType');
    },
    computed: mapState(["chosed_man_state","approver_man_state"])
}
</script>

<style scoped lang="stylus">
    
    .leaveTime{

        input{
            width:1.2rem;
            outline:none;
            text-align:right;
            color:#999;
            font-size:14px;
            padding-right:0.1rem;
        }
    }

    .content{
        margin-top 0.59rem;
        margin-bottom 0.3rem;
        padding 0 0.15rem;

        .styles{
            padding 0 0.15rem;
            margin-bottom 0.15rem;
             -webkit-box-shadow: 0 0 0.2rem rgba(238,65,54,.1);    
             box-shadow 0 0 0.2rem rgba(238,65,54,.1);
             background-color #fff;
        }

        .pad{
              padding 0.15rem;
        }


        .items{
            height 0.44rem;
            line-height 0.44rem;
            font-size 0.15rem;
            color #333;
            font-weight bold;

            p{
                float right 
            }

            .nullValue{
                color #999;
                font-size 0.14rem;
            }
        }

        .inp_ul{

            .items{
                border-bottom 0.01rem solid #e6e6e6
            }

            .items:last-child{
                border none;
            }
        }
    }

    .imgShow{
        overflow hidden;
        height:0.36rem;
        
        li{
            float left;
            width 0.32rem;
            height 0.3rem;
            border-radius 5px;
            margin-right 0.1rem;
            overflow hidden;
            margin-top:2px;

            img{
                width:100%;
                height:100%;
            }
        }
    }

    .record_box{
        overflow hidden;
        margin-bottom 0.15rem;

        span{
            float right;
            color: rgb(96, 158, 247);
        }
    }

    .reason{

        p{
            font-size 0.15rem;
            color #333;
            font-weight bold;
            margin-bottom 0.1rem;
        }
        
        textarea{
            width 100%;
            height 100px;
            padding 0;
            font-size 0.14rem;
            color #333;
            line-height 0.2rem;
            border none;
            outline none;
            resize none;
            word-wrap: break-word;
            word-break:break-all
        }
    }

</style>
