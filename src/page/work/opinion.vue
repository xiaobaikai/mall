<template>
    <section>
        <TopHead
        :bgcolor = colors
        title='审批意见'
        ></TopHead>
        <div class="main">
            <div class="content">
                <textarea :placeholder="placeholder" v-model="textVal" maxlength="500"></textarea>
                <p class="counts"><span v-bind:style="{color:colors}">{{counts}} / 500</span></p>
            </div>
            <a :style="{color:colors,borderColor:colors}" class="btn" @click="affirm()">
                {{btnText}}
            </a>
        </div>
    </section>
</template>
<script>
    import TopHead  from '../../components/topheader.vue'  //header导航栏

export default {
        data(){
            return {
                counts : 0,
                textVal : '',
                id : '',
                colors:'#fd545c',
                btnText:'同意申请',
                placeholder:'请输入批准'
            }
        },
        methods : {
            affirm : function(){

                if(this.counts<=0){
                    this.$toast("审批意见不能为空!")
                    return false;
                }

                if(this.$route.query.pageType=='consent'){
                    this.success()
                }else{
                    this.refuse();
                }
            },
            refuse:function(){
                if(this.$route.query.type=='contract'){
                    this.submits(2,'contractDetails')

                }else if(this.$route.query.type=="outside"){
                    this.submits(3,'goOutWorkDetails')
                }
                else if(this.$route.query.type=="letter"){
                    this.submits(1,'leOfReDetails')
                }else if(this.$route.query.type=="trip"){
                    this.submits(4,'tripDetails')
                }else if(this.$route.query.type=="stamp"){
                    this.submits(5,'stampDetails')
                }else if(this.$route.query.type=="reimburse"){
                    this.submits(6,'reimburseDetails')
                }else if(this.$route.query.type=="payApply"){
                    this.submits(7,'payApplyDetails')
                }else if(this.$route.query.type=="dimission"){
                    this.submits(8,'dimissioneDetails')
                }
                else{
                    this.submits(0,'leaveDetails')
                }
            },
            consentAjax:function(applyType,details){
                let that = this;
                 this.axios.post('/work/audit'+this.Service.queryString({
                    applyId:this.id,
                    type:2,
                    reason:encodeURI(this.textVal),
                    applyType:applyType,
                    receiverIds:this.$route.query.receiverIds,
                    auditerIds:this.$route.query.auditerIds,
                })).then(function(res){

                    if(res.data.h.code!=200){
                            that.$toast(res.data.h.msg)
                    }else if(res.data.h.code==200){   
                        that.$toast('审批通过!')
                        window.location.href = "epipe://?&mark=workUpdate";
                        setTimeout(()=>{
                            window.location.href = "epipe://?&mark="+details+"&_id="+that.id+'&data='+JSON.stringify({text:1});;
                        },500)
                    }

                });
            },
            success:function(){
                 if(this.$route.query.type=='contract'){
                    this.consentAjax(2,'contractDetails')
                }else if(this.$route.query.type=="outside"){
                    this.consentAjax(3,'goOutWorkDetails')
                }else if(this.$route.query.type=="letter"){
                    this.consentAjax(1,'leOfReDetails')
                }else if(this.$route.query.type=="trip"){
                    this.consentAjax(4,'tripDetails')
                }else if(this.$route.query.type=="stamp"){
                    this.consentAjax(5,'stampDetails')
                }else if(this.$route.query.type=="reimburse"){
                    this.consentAjax(6,'reimburseDetails')
                }else if(this.$route.query.type=="payApply"){
                    this.consentAjax(7,'payApplyDetails')
                }else if(this.$route.query.type=="dimission"){
                    this.consentAjax(8,'dimissionDetails')
                }
                else{
                    this.consentAjax(0,'leaveDetails')
                }
            },
            submits:function(applyType,details){
                    let that = this;
                    this.axios.post('/work/audit'+that.Service.queryString({
                        applyType:applyType,
                        type:3,
                        applyId:this.id,
                        reason:encodeURI(this.textVal),
                    })).then(function(res){
                        if(res.data.h.code==200){
                            window.location.href = "epipe://?&mark=workUpdate";
                            that.$toast('已拒绝该审批!')                            
                            setTimeout(()=>{
                                window.location.href = "epipe://?&mark="+details+"&_id="+that.id+'&data='+JSON.stringify({text:1});
                            },500) 
                        }else{
                            that.$toast(res.data.h.msg)
                        }
                    })
            },
        },
        mounted:function(){
            this.id = this.$route.query.id;
            this.colors = this.$route.query.color;
            if(this.$route.query.pageType=='consent'){
                this.btnText = '确认同意'
                this.placeholder = '请输入同意理由'
                this.textVal ='同意'
            }else{
                this.btnText = '确认拒绝'
                this.placeholder = '请输入拒绝理由'
            }
        },
        components:{
            TopHead
        },
        watch : {
            textVal : function(){
                this.counts = this.textVal.length
            }
        }
}
</script>

<style lang="stylus" scoped>
    .main{
        margin-top 0.59rem;
        padding 0 0.15rem;
    }
    .content{
        padding 0.15rem;
        -webkit-box-shadow: 0 0 0.2rem rgba(238,78,54,.1);    
        box-shadow 0 0 0.2rem rgba(238,78,54,.1);
        background-color #fff;
        margin-bottom 0.3rem;

        textarea{
            width 100%;
            min-height 1rem;
            border none 
            outline none
            resize none
            font-size 0.15rem;
            color #999;
            line-height 0.2rem;
        }

        .counts{
            text-align right 
            font-size 0.14rem;
            color #fd545c
        }
    }

    .btn{
        position relative
        display block
        height 0.5rem;
        line-height 0.5rem;
        text-align center
        color #fd545c
        font-size 0.18rem
        border 1px solid #fd545c;

    }

    // .btn:before{
    //     content: " ";
    //     position: absolute;
    //     left: 0;
    //     top: 0;
    //     width 200%;
    //     height: 200%;
    //     border 1px solid #fd545c;
    //     border-radius: 4px;
    //     color: #D9D9D9;
    //     -webkit-transform-origin: 0 0;
    //     transform-origin: 0 0;
    //     -webkit-transform: scale(0.5);
    //     transform: scale(0.5);
    // }
</style>
