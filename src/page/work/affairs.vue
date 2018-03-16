
<template>
    <div class="affairs_box">
        <div :class='typeClass' v-bind:style="{ background: bg_color}" >
            <div class="back" @click="goback()">
            <svg class="icon icon-back" aria-hidden="false">
                <use xlink:href="#icon-zuoyoujiantou"></use>
            </svg>
            </div>
            {{title}}
        </div>
        <div class="affairs_content" v-show='this.btnShow'>
            <div :class='boxShadow' v-for="(item,index) in leaveData">
                <div class="affirs_child">
                    <div class="affairs_title">
                        <img :src="item[0]?item[3].value:item.profileImg"/>
                        <h2 v-text="item[0]?item[2].value+'的请假审批':'我的请假审批'"></h2>
                        <time v-if="item[0]">{{item[9].value | timeFormat}}</time>
                        <time v-if="!item[0]">{{item.applyTime | timeFormat}}</time>
                    </div>
                    <div class="affairs_infor">
                        <p>请假类型:<span style="color:#609ef6" v-text='item[0]?item[4].value:item.leaveType'></span></p>
                        <p v-if="num&&!item[0]">开始时间:<span>{{item.beginTime | slice}}</span></p>
                        <p v-if="num&&item[0]">开始时间:<span>{{item[6].value | slice}}</span></p>
                        <p v-if="num&&!item[0]">结束时间:<span>{{item.endTime |slice}}</span></p>
                        <p v-if="num&&item[0]">结束时间:<span>{{item[7].value | slice}}</span></p>
                        <p v-if="!num">审批时间:<span>{{item[10].value}}</span></p>
                        <p v-if="num&&num!=3" class="result">待审批</p>
                    </div>
                </div>
                <div class="skip">
                    参看详情 
                </div>
            </div>
        </div>
        <div class="affairs_content" v-show='!this.btnShow'>
             <div :class='boxShadow' v-for="(item,index) in draftsData">
                <div class="affirs_child">
                    <div class="affairs_title">
                        <img :src="item.profileImg"/>
                        <h2>我的请假审批</h2>
                        <time>{{item.applyTime | timeFormat}}</time>
                    </div>
                    <div class="affairs_infor">
                        <p>请假类型:<span style="color:#609ef6" v-text='item[0]?item[4].value:item.leaveType'></span></p>
                        <p>开始时间:<span>{{item.beginTime |slice}}</span></p>
                        <p>结束时间:<span>{{item.endTime |slice}}</span></p>
                    </div>
                </div>
                <div class="skip">
                    参看详情 
                </div>
            </div>
        </div>

        <div :class="types=='myApply'?'footLine marginBot':'footLine'" v-if="leaveData.length>3&&btnShow">
            <span>我是有底线的</span>
        </div>
        <div :class="types=='myApply'?'footLine marginBot':'footLine'" v-if="draftsData.length>3&&!btnShow">
            <span>我是有底线的</span>
        </div>
        <div class="footer" v-if='types == "myApply"'>
            <div :class='btnShow?"tab tab_user active":"tab tab_user"' @click="tabEven()">

                <svg class="icon icon-user" aria-hidden="false">
                    <use v-show="!btnShow" xlink:href="#icon-wodeshenqing-line"></use>
                    <use v-show="btnShow" xlink:href="#icon-wodeshenqing-mian"></use>
                </svg>
                <span>我的申请</span>
            </div>
            <div :class='btnShow?"tab tab_drafts":"tab tab_drafts active"' @click="tabEven()">
                <svg class="icon icon-drafts" aria-hidden="false">
                    <use v-show="btnShow"  xlink:href="#icon-caogaoxiang-line"></use>
                    <use v-show="!btnShow" xlink:href="#icon-caogaoxiang-mian"></use>
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
                title : '',
                types :'',
                typeClass : '',
                boxShadow : '',
                btnShow : true,
                num : 0,
                leaveData : [],
                draftsData : [],
            }   
        },
        mounted(){
            this.types = 'myApply'
            // this.title = location.href.slice(location.href.indexOf('?')+1)
            if(this.types == 'finishAffairs'){
                this.num = 0;
                this.title = '已办事宜';
                this.typeClass = 'header finish_head';
                this.boxShadow = 'affairs_item finish_shadow';
                let that = this;
                this.axios.get('/work/unhandle/list').then(function(res){
                        res.data.b.data.forEach((item,index) => {
                            if(item.extend[8].value!=0&&item.extend[8].value!='00')  that.leaveData.push(item.extend)
                            console.log(that.leaveData)   
                            that.leaveData.length                    
                        });
                 })
            
                return
            }

            if(this.types == 'unfinishAffairs'){
                this.num = 1;                
                this.title = '待办事宜';
                this.typeClass = 'header unfinish_head';
                this.boxShadow = 'affairs_item unfinish_shadow';
                let that = this;
                this.axios.get('/work/unhandle/list').then(function(res){
                        res.data.b.data.forEach((item,index) => {
                            if(item.extend[8].value==0&&item.extend[8].value!='00')  that.leaveData.push(item.extend)     
                            console.log(that.leaveData)                                                                 
                        });
                 })
                return
            }

            if(this.types == 'myApply'){
                this.num = 2;                                
                this.title = '我的申请';
                this.typeClass = 'header myaffairs_head';
                this.boxShadow = 'affairs_item myaffairs_shadow';
                let that = this;
                this.axios.get('/work/my/apply/list').then(function(res){
                        that.leaveData = res.data.b.data
                            console.log(that.leaveData)   
                        
                 })
                 this.axios.get('/work/apply/draft/list').then(function(res){
                        that.draftsData = res.data.b.data
                            console.log(that.leaveData)   
                        
                 })
            }

        },
        methods : {
            goback(){
                window.history.back(-1);
            },
            tabEven(flag){
                this.btnShow = !this.btnShow
                if(!this.btnShow){
                    this.title = '草稿箱';
                    this.num = 3;
                    return
                }
                this.num = 2;
                this.title = '我的申请';
            },
        },

        computer : {

        },
        filters : {
            timeFormat : function(value) {
                let odate = value.split(" ")[0];
                let time = new Date() - new Date(odate);
                time = parseInt( time/(24*60*60*1000))

                if(!time){
                    return value.slice(-8,-4)
                }else if(time == 1){
                    return '昨天'
                }else{ 
                    return value.slice(0,10)
                }
            },
            
            slice : function(value){
            //     value = value.slice(0,-3)
                
            //    let str = value.split(' ')

            //     return  str[0]+' '+str[1]

            return value.slice(0,-3)
            }
        }
        
    }

</script>


<style scoped lang="stylus">

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
            line-height 1em;
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

    .footer{
        position fixed;
        width 100%;
        height 0.5rem;
        bottom 0;
        left 0;
        font-size:0.11rem;
        border-top:0.01rem solid #ccc;
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

</style>