<template>
    <section>
        <TopHead
        bgcolor='#fd545c'
        title='喵喵喵的请假'
        ></TopHead>
        <div class="content">
            <div class="styles">
                <div class="content_head">
                    <img class="imgHead" src="../../assets/tou.png">
                    <div>
                        <p class="nameTl">黎小莹</p>
                        <p class="res">等待毛泽东审批</p>
                    </div>
                </div>
            </div>
            <div class="styles infor">
                <div class="infor-box">
                    <span>审批编号</span>
                    <p>123456789999</p>
                </div>
                <div class="infor-box">
                    <span >部&emsp;&emsp;门</span>
                    <p>研发部</p>
                </div>
                <div class="infor-box">
                    <span>请假类型</span>
                    <p>事假</p>
                </div>
                <div class="infor-box">
                    <span>开始时间</span>
                    <p>2017-6-5 08:99</p>
                </div>
                <div class="infor-box">
                    <span>结束时间</span>
                    <p>2017-6-6 08:99</p>
                </div>
                <div class="infor-box">
                    <span >时&emsp;&emsp;长</span>
                    <p>1天</p>
                </div>
                <div class="infor-box">
                    <span>请假事由</span>
                    <p>我想要带你去浪漫的土耳其 然后一起去东京和巴黎 其实我特别喜欢迈阿密 </p>
                </div>
            </div>
            <div class="styles approve">
                <p class="title">审批人<span>（已添加5人）</span></p>
                <ul class="list">
                    <li v-for="(item,index) in 3">
                        <div class="approve_list">
                            <img class="imgHead" src="../../assets/tou.png">
                            <div class="approve_inf">
                                <span>黎小莹</span>
                                <span>发起申请</span>
                                <span>08-16 9:50</span>
                            </div>
                        </div>
                        <svg class="icon icon-back" aria-hidden="false" v-if="index!=2">
                            <use xlink:href="#icon-jiantou1"></use>
                        </svg>
                        <div class="reason" v-if="index==2">
                            好好待在公司 别瞎几把乱走
                            好好待在公司 别瞎几把乱走
                            好好待在公司 别瞎几把乱走
                            好好待在公司 别瞎几把乱走
                            好好待在公司 别瞎几把乱走
                        </div>
                    </li>
                    
                </ul>
            </div>
            <div class="styles copy">
                <p class="title">抄送人<span>（已抄送5人）</span></p>
                
                <ul class="list">
                    <li v-for="index in 1" class="list_item"> <img class="imgHead" src="../../assets/tou.png"><span>大傻子</span></li>
                    <li class="list_item"><img class="imgHead" src="../../assets/tou.png"><span>二愣子</span></li>
                    <li class="list_item"><img class="imgHead" src="../../assets/tou.png"><span>三蠢子</span></li>
                </ul>
                
            </div>
        </div>
        <div class="btn_box">
            <div v-if="btnType==0" class="revocation_btn" @click="isDialog=true">撤销</div>
            <a  v-if="btnType==1" class="consent_btn">同意</a>
            <a  v-if="btnType==1" class="refuse_btn">拒绝</a>
            <div style="clear:both"></div>
        </div>
        <div class="dialog" v-show="isDialog" @touchmove.prevent>
            <div class="dialog_box">
                <div class="dialog_content">确认撤销申请？</div>
                <div class="dialog_btn">
                    <a class="confirm_btn">确定</a>
                    <a class="cancel_btn" @click="isDialog=false">取消</a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

    import TopHead  from '../../components/topheader.vue'  //header导航栏

    export default {
        data(){
            return{
                isDialog : false,
                btnType : 0,
            }
        },

        components:{
            TopHead
        }
    }
</script>

<style scoped lang="stylus">

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
                }
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
            margin-bottom 0.3rem;
            padding 0 0.15rem;

            .styles{
                padding 0.15rem;
                margin-bottom 0.15rem;
                -webkit-box-shadow: 0 0 0.2rem rgba(238,65,54,.1);    
                box-shadow 0 0 0.2rem rgba(238,65,54,.1);
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
                text-align center
                font-size 0.14rem;

                span:first-child{
                    float left;
                    font-size 0.15rem;
                    color #333;
                }
                span:last-child{
                    float right;
                    color #666;
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
            
            .list_item{
                float left;
                font-size 0.13rem;
                color #333;
                text-align center;
                margin 0 0.12rem;
                margin-top 0.15rem;
            }
        }

        .btn_box{
            padding 0 0.15rem;
            margin-bottom 0.3rem;
            text-align center;
            

            .revocation_btn{
                position relative;
                height 0.5rem;
                font-size 0.18rem;
                color #666;
                line-height 0.5rem;
                letter-spacing 0.05rem;
                // border 1px solid #666;
                background-color #fff;
            }
           .refuse_btn:after,.revocation_btn:after{
                content: " ";
                position: absolute;
                left: 0;
                top: 0;
                width 200%;
                height: 200%;
                border 1px solid #666;
                border-radius: 4px;
                color: #D9D9D9;
                -webkit-transform-origin: 0 0;
                transform-origin: 0 0;
                -webkit-transform: scale(0.5);
                transform: scale(0.5);
            }

            .consent_btn,.refuse_btn{
                height 0.5rem;
                line-height 0.5rem;
                border-radius 4px;
                font-size 0.18rem;
            }

            .consent_btn{
                float left;
                width 48%;
                background-color #0fc37c;
                color #fff;
            }

            .refuse_btn{
                position relative;
                float right;
                width 48%;
                color #fd545c;
            }

            .refuse_btn:after{
                border-color #fd545c;
            }
        }
</style>

