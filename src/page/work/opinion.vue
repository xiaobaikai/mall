<template>
    <section>
        <TopHead
        bgcolor='#fd545c'
        title='审批意见'
        ></TopHead>
        <div class="main">
            <div class="content">
                <textarea placeholder="请输入拒绝理由" v-model="textVal" maxlength="200"></textarea>
                <p class="counts"><span>{{counts}} / 200</span></p>
            </div>
            <a class="btn" @click="affirm()">
                确认拒绝
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
            }
        },
        methods : {
            affirm : function(){
                if(this.counts<=0){
                    this.$toast("请填写拒绝理由!")
                    return false;
                }
                this.$route.query.isLetter?this.letter():this.leave();
            },
            letter:function(){
                    let that = this;
                    this.axios.post('/work/letter/result?letterId='+this.id+'&type=3&reason='+this.textVal).then(function(res){
                            window.location.href = "epipe://?&mark=workUpdate";
                            that.$toast('拒绝审批!')                            
                            setTimeout(()=>{
                                window.location.href = "epipe://?&mark=leOfReDetails&_id="+that.id+'&data=1';
                                
                            },500)      
                    })
                
            },
            leave:function(){
                this.axios.post('/work/leave /update?leaveId='+this.id+'&type=3&reason='+this.textVal).then(function(res){
                            window.location.href = "epipe://?&mark=workUpdate";
                            setTimeout(()=>{
                               window.location.href = "epipe://?&mark=leaveDetails&_id="+that.id+'&data=1';
                            },500)      
                    })
            }
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
