
<template>
    <div class="affairs_box">
        <div class='header myaffairs_head' v-bind:style="{ background: bg_color}" >
            <div class="back" @click="goback()">
            <svg class="icon icon-back" aria-hidden="false">
                <use xlink:href="#icon-zuoyoujiantou"></use>
            </svg>
            </div>
            草稿箱
        </div>

        <div class="affairs_content">
             <div v-if="item.extend[0].value == 1"  v-for="(item,index) in draftsData" class="affairs_item myaffairs_shadow">
                 <div class="affirs_child">
                    <div class="affairs_title">
                        <img :src="item.extend[4].value" @click="go_user(item.userId)"/>
                        <h2 >我的请假审批</h2>
                        <time >{{item.extend[10].value | timeFormat}}</time>
                    </div>
                    <div class="affairs_infor">
                        <p>请假类型:<span style="color:#609ef6" v-text='item.extend[5].value'></span></p>
                        <p>开始时间:<span>{{item.extend[8].value | slice}}</span></p>
                        <p>结束时间:<span>{{item.extend[9].value |slice}}</span></p>
                    </div>
                </div>

                <div @click="goLeaveDraft(item.extend[1].value)" class="skip" tag="div">
                    查看详情
                </div>
            </div>

            <div v-if="item.extend[0].value == 2"  v-for="(item,index) in draftsData" class="affairs_item myaffairs_shadow">
                 <div class="affirs_child">
                    <div class="affairs_title">
                        <img :src="item.extend[4].value" @click="go_user(item.userId)"/>
                        <h2 >我的请示函</h2>
                        <time >{{item.extend[10].value | timeFormat}}</time>
                    </div>
                     <div class="affairs_infor">
                       <div class="request_infor lineHeight">
                           <span>主&emsp;&emsp;题 :</span>
                           <p class="line1">{{item.extend[12].value}}</p>
                       </div>
                        <div class="request_infor margin10">
                            <span class="lesp">请示内容 :</span>
                            <p class="line2" style="line-height:0.2rem;">{{item.extend[13].value}}</p>
                        </div>
                    </div>
                </div>

                <div @click="goLetterDraft(item.extend[1].value)" class="skip" tag="div">
                    查看详情
                </div>
            </div>

            <div v-if="item.extend[0].value == 3"  v-for="(item,index) in draftsData" class="affairs_item myaffairs_shadow">
                 <div class="affirs_child">
                    <div class="affairs_title">
                        <img :src="item.extend[4].value" @click="go_user(item.userId)"/>
                        <h2 >我的合同审批</h2>
                        <time >{{item.extend[10].value | timeFormat}}</time>
                    </div>
                     <div class="affairs_infor">
                       <div class="request_infor lineHeight">
                           <span>&emsp;合同名称 :</span>
                           <p class="line1">{{item.extend[12].value}}</p>
                       </div>
                        <div class="request_infor margin10">
                            <span>项目责任人 :</span>
                            <p class="line2" style="line-height:0.2rem;">{{item.extend[13].value}}</p>
                        </div>
                    </div>
                </div>

                <div @click="goContractDraft(item.extend[1].value)" class="skip" tag="div">
                    查看详情
                </div>
            </div>
        </div>
        <div class="footLine marginBot" v-if="draftsData.length>2">
            <span>我是有底线的</span>
        </div>

        <div class="footLine" v-if="!draftsData.length">
            <span>暂无内容</span>
        </div>

        <div class="footer">
            <router-link class='tab tab_user' tag="div" :to="{path:'myApply'}">

                <svg class="icon icon-user" aria-hidden="false">
                    <use  xlink:href="#icon-wodeshenqing-line"></use>
                </svg>
                <span>我的申请</span>
            </router-link>
            <div class="tab tab_drafts active" >
                <svg class="icon icon-drafts" aria-hidden="false">
                    <use  xlink:href="#icon-caogaoxiang-mian"></use>
                </svg>
                <span>草稿箱</span>
            </div>
        </div>
    </div>
</template>
<script>

    export default{
        data(){
            return{
                draftsData : [], //草稿箱数据
            }   
        },
        mounted(){

                let that = this;
                 this.axios.get('/work/apply/draft/list').then(function(res){
                        that.draftsData = res.data.b.data;
                        
                 })
        },
        methods:{
            goback(){
                window.location.href = "epipe://?&mark=history_back"
            },
            goLeaveDraft(id){
                window.location.href = "epipe://?&mark=leave&_id="+id;
            },
            goLetterDraft(id){
                window.location.href = "epipe://?&mark=letterOfRequest&_id="+id;
            },
            goContractDraft(id){
                window.location.href = "epipe://?&mark=contract&_id="+id;
            },
        },
        filters : {
            timeFormat : function(value) {
                let arr = ['一','二','三','四','五','六','日']
                let odate = value.split(" ")[0];
                let otime = new Date(odate);
                let time = new Date() - new Date(odate);
                time = parseInt( time/(24*60*60*1000))

                if(!time){
                    return value.slice(-8,-3)
                }else if(time == 1){
                    return '昨天 '+ value.slice(-8,-3)
                }else if(1<time<=7){
                    return  '星期'+arr[otime.getDay()]
                }else{ 
                    return value.slice(0,10)
                }
            },
            
            slice : function(value){
                return value.slice(0,-3)
            },
        }
    }

</script>


<style scoped lang="stylus">

.lesp{
        letter-spacing 3px;
    }

    body{
        overflow hidden;
    }

    .affairs_box{
        overflow hidden;
    }

    .header{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 0.44rem;
        text-align: center;
        line-height: 0.44rem;
        color: #fff;
        font-size: 0.18rem;
        font-weight bold;
        letter-spacing: 0.012rem;
        
        .back{
            position: absolute;
            left: 0;
            width: 0.5rem;
            text-align: left;
            .icon-back{
                font-size: 0.17rem;
                font-weight:bold;
                margin-left: 0.1rem;
            }
        }
    }

    .unfinish_head{
        background: #fd545c;
    }

    .finish_head{
        background #0fc37c;
    }

    .myaffairs_head{
        background: #f80;        
    }

    .finish_shadow{
        -webkit-box-shadow: 0 0 0.2rem rgba(15,195,124,.1);        
         box-shadow 0 0 0.2rem rgba(15,195,124,.1);
    }

    .unfinish_shadow{
        -webkit-box-shadow: 0 0 0.2rem rgba(238,65,54,.1);    
        box-shadow 0 0 0.2rem rgba(238,65,54,.1);
    }

    .myaffairs_shadow{
        -webkit-box-shadow: 0 0 0.2rem rgba(255,136,0,.1);    
        box-shadow 0 0 0.2rem rgba(255,136,0,.1);
    }



    .affairs_content{
        margin-top: 0.59rem;
        padding 0 0.15rem;
        overflow hidden;
    }

    .affairs_item{
        background-color #fff;
        padding 0.15rem;
        padding-bottom 0;
        border-radius 0.04rem;
        margin-bottom:0.15rem;
    }



    .affairs_title{
        display: flex;
        height :0.32rem;
        line-height 0.32rem;
        margin-bottom:0.1rem;

        img{
            width: 0.32rem;
            height: 0.32rem;
            border-radius: 50%;
            margin-right :0.1rem;
        }

        h2{
            flex 1;
            font-size:0.16rem;
            font-weight:bold;
            color:#333;
        }

        time{
            font-size:0.14rem;
            color:#999;
            font-weight:bold;
        }
    }

    .affairs_infor{
        font-size:0.15rem;
        color:#333;
        padding-left:0.4rem;

        p{
            margin 0.1rem 0;
            line-height 1.2em;
        }

        span{
            margin-left:0.15rem;
        }

        .result{
            font-size:0.14rem;
            color:#fd545c;
            margin 0.15rem 0;
        }
    }

    .skip{
        height 0.39rem;
        line-height 0.4rem;
        font-size:0.14rem;
        text-align center;
        color #666;
        border-top: 0.01rem solid  #e6e6e6;
    }

    .footLine{
       height 0.13rem;
       font-size:0.13rem;
       position relative;
       text-align center;
       color #999;
       padding 0 0.15rem;
       margin-bottom:0.3rem;
       margin-top:0.15rem;

       span{
           position absolute;
           width:0.91rem;
           z-index 2;
           line-height 1em;
           left 0;
           right 0;
           margin auto;
           background-color #f5f5f5;
       }
    }

    .marginBot{
        margin-bottom 0.8rem;
    }

    .footLine:after{
        position absolute;         
        content '';
        z-index 1;
        height 0.01rem;
        width calc(100% - 0.3rem)
        left 0;
        right 0;
        top:0;
        bottom 0;
        margin auto;
        background-color #e6e6e6;       
    }

    .footer:after{
        display block;
        content '';
        position absolute;
        height 1px;
        width 200%;
        top 0;
        left -50%;
        transform scale(0.5);
        background-color #ccc;
        z-index 10
    }

    .footer{
        position fixed;
        width 100%;
        height 0.5rem;
        bottom 0;
        left 0;
        font-size:0.11rem;
        background-color #fff;
        z-index 3;

        .tab{
            float left;
            text-align center;
            height 100%;
            width 50%;
            padding-top:0.05rem;
        }

        .icon-user,.icon-drafts{
            display block;
            width 0.22rem;
            height 0.22rem;
            margin 0 auto;
            margin-bottom 0.03rem;
        }
        .active{
            color #f80;
        }

        .tab_user:hover{
            
        }
    }

    .line1{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .line2{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }

    .request_infor{
        display flex;
        font-size 0.15rem;
        margin-bottom 0.03rem;

        span{
            margin-right 0.15rem;
            margin-left 0;
        }


        p{
            flex 1;
            color #333;
            width:2.4rem;
            word-wrap:break-word;
            word-break: break-all;
            margin 0
        }
    }

    .lineHeight{
        line-height : 0.15rem;
        margin-bottom 0.1rem;
    }

    .margin10{
        margin-bottom 0.1rem;
    }

</style>