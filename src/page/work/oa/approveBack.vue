<template>
    <section>
        <TopHead
        :bgcolor=color
        title='退回'
        ></TopHead>
        <div class="main">
            <div class="content">
                <textarea placeholder="请输入退回理由" v-model="textVal" maxlength="500"></textarea>
                <p class="counts"><span v-bind:style="{color:color}">{{counts}} / 500</span></p>
            </div>
            <a :style="{color:color,borderColor:color}" class="btn" @click="affirm()">
                确认退回
            </a>
        </div>
    </section>
</template>
<script>
    import TopHead  from '../../../components/topheader.vue'  //header导航栏

export default {
        data(){
            return {
                counts : 0,
                textVal : '',
                id : '',
                color:'#fd545c'
            }
        },
        methods : {
            affirm : function(){
                if(this.counts<=0){
                    this.$toast("请填写退回理由!")
                    return false;
                }else{
                    
                    if(this.$route.query.type=='contract'){
                        this.goBack(2)
                    }else if(this.$route.query.type=='outside'){
                        this.goBack(3)
                    }else if(this.$route.query.type=='letter'){
                        this.goBack(1)
                    }else if(this.$route.query.type=='leave'){
                        this.goBack(0)
                    }else if(this.$route.query.type=="trip"){
                        this.goBack(4)
                    }else if(this.$route.query.type=="stamp"){
                        this.goBack(5)
                    }else if(this.$route.query.type=="reimburse"){
                        this.goBack(6)
                    }else if(this.$route.query.type=="payApply"){
                        this.goBack(7)
                    }else if(this.$route.query.type=="dimission"){
                        this.goBack(8)
                    }
                }
            },
            goBack(type){
                let that = this;
                this.axios.post('/work/audit'+that.Service.queryString({
                    applyId:this.id,
                    type:5,
                    applyType:type,
                    reason:encodeURI(this.textVal),
                })).then(function(res){
                    if(res.data.h.code==200){
                        that.$toast('退回成功!')
                        window.location.href = "epipe://?&mark=workUpdate";
                        setTimeout(()=>{
                             window.location.href = "epipe://?&mark=goWork"
                        },200)      
                    }else{
                        that.$toast(res.data.h.msg)
                    }
                })
            }

        },
        mounted:function(){
            this.id = this.$route.query.id;
            this.color = this.$route.query.color
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
        font-size 0.18rem;
        border 1px solid #fd545c;
    }


</style>
