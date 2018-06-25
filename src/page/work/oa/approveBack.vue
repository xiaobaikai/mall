<template>
    <section>
        <TopHead
        bgcolor='#fd545c'
        title='退回'
        ></TopHead>
        <div class="main">
            <div class="content">
                <textarea placeholder="请输入退回理由" v-model="textVal" maxlength="150"></textarea>
                <p class="counts"><span>{{counts}} / 150</span></p>
            </div>
            <a class="btn" @click="affirm()">
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
            }
        },
        methods : {
            affirm : function(){
                if(this.counts<=0){
                    this.$toast("请填写退回理由!")
                    return false;
                }else{
                    
                    if(this.$route.query.type=='contract'){
                            this.contractBack()
                    }
                }
            },

            contractBack(){
                let that = this;
                this.axios.post('/work/audit'+that.Service.queryString({
                    applyId:this.id,
                    type:5,
                    applyType:2,
                    reason:this.textVal,
                })).then(function(res){
                    if(res.data.h.code==200){
                        that.$toast('退回成功!')
                        window.location.href = "epipe://?&mark=workUpdate";
                        setTimeout(()=>{
                            // window.location.href = "epipe://?&mark=contractDetails&_id="+that.id+'&data='+JSON.stringify({text:1});
                             window.location.href = "epipe://?&mark=goWork"
                            
                            // history.go(-3)
                        },200)      
                    }else{
                        that.$toast(res.data.h.msg)
                    }
                })
            },

        },
        mounted:function(){
            this.id = this.$route.query.id;
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
    }

    .btn:before{
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        width 200%;
        height: 200%;
        border 1px solid #fd545c;
        border-radius: 4px;
        color: #D9D9D9;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
    }
</style>
