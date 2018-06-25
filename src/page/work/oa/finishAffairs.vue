<template>
    <section>
        <div v-for="item in leaveData">
            <div v-if="item[0].value == 1"  class="affairs_content"  :key="item.id">
                <div class="affirs_child">
                    <div>
                        <div class="affairs_title">
                            <img :src="item[4].value"/>
                            <h2>{{item[3].value}}的请假审批</h2>
                            <time >{{item[10].value | timeFormat}}</time>
                        </div>
                        <div class="affairs_infor">
                            <p>请假类型 :<span style="color:#609ef6">{{item[5].value}}</span></p>
                        
                            <p >审批时间 :<span>{{item[10].value}}</span></p>
                        </div>
                    </div>
                    <div @click="leaveDetail(item[1].value,item[3].value)"   class="skip" >
                        查看详情
                    </div>

                </div>
            </div>

            <div v-if="item[0].value == 2"  class="affairs_content"   :key="item.id">
                <div class="affirs_child">
                    <div>
                        <div class="affairs_title">
                            <img :src="item[4].value"/>
                            <h2>{{item[3].value}}的请示函</h2>
                            <time >{{item[10].value | timeFormat}}</time>
                        </div>
                        <div class="affairs_infor">
                        <div class="request_infor lineHeight">
                            <span>主&emsp;&emsp;题 :</span>
                            <p class="line1"> {{item[12].value}}</p>
                        </div>
                            <div class="request_infor margin10">
                                <span>请示内容 :</span>
                                <p class="line2" style="line-height:0.2rem;">{{item[13].value}}</p>
                            </div>
                        </div>
                    </div>
                    <div @click="letterDetail(item[1].value,item[3].value)"   class="skip" tag="div">
                        查看详情
                    </div>

                </div>
            </div>

             <div v-if="item[0].value == 3"  class="affairs_content"   :key="item.id">
                <div class="affirs_child">
                    <div>
                        <div class="affairs_title">
                            <img :src="item[4].value"/>
                            <h2>{{item[3].value}}的合同审批</h2>
                            <time >{{item[10].value | timeFormat}}</time>
                        </div>
                        <div class="affairs_infor">
                        <div class="request_infor lineHeight">
                            <span class="lesp">合同名称 :</span>
                            <p class="line1"> {{item[14].value}}</p>
                        </div>
                            <div class="request_infor margin10">
                                <span>项目责任人 :</span>
                                <p class="line2" style="line-height:0.2rem;">{{item[3].value}}</p>
                            </div>
                        </div>
                    </div>
                    <div @click="contractDetail(item[1].value,item[3].value)"   class="skip" tag="div">
                        查看详情
                    </div>

                </div>
            </div>

        </div>
        <div class="footLine marginBot" v-if="leaveData.length>2">
            <span>我是有底线的</span>
        </div>

        <div class="footLine" v-if="!leaveData.length">
            <span>暂无内容</span>
        </div>
    </section>
  
</template>


<script>
export default {
        data(){
            return{
                leaveData:[],
            }
        },

        methods:{
            leaveDetail(id,name){
              
                window.location.href = "epipe://?&mark=leaveDetails&_id="+id+'&data='+JSON.stringify({text:0});
            },
            letterDetail(id,name){
                window.location.href = "epipe://?&mark=leOfReDetails&_id="+id+'&data='+JSON.stringify({text:0});
            },
            contractDetail(id,name){
                window.location.href = "epipe://?&mark=contractDetails&_id="+id+'&data='+JSON.stringify({text:0});
            }
        },

        mounted:function(){
            let that = this;
            this.axios.get(this.Service.affairsList).then(function(res){
                        let datas = res.data.b.data;
                        
                        for(let i=0; i< datas.length;i++){
                            if(datas[i].extend[7].value!='0'&&datas[i].extend[7].value!='00'){
                                that.leaveData.push(datas[i].extend)
                            }
                        }
                 })
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
                }else if(1<time&&time<=7){
                    return  '星期'+arr[otime.getDay()]
                }else{ 
                    return value.slice(0,10)
                }
            },
        }
}
</script>


<style lang="stylus" scoped>

.lesp{
        letter-spacing 3px;
    }


    .affirs_child{
        padding  0.15rem;
        padding-bottom 0;
        background-color #fff;
    }

    .affairs_content{
        margin-top: 0.15rem;
        padding 0 0.15rem;
        overflow hidden;
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
        padding-left:0.42rem;

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

    .footLine{
       height 0.13rem;
       font-size:0.13rem;
       position relative;
       text-align center;
       color #999;
       padding 0 0.15rem;
       margin-bottom:0.3rem;
       margin-top:0.35rem;

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
</style>

