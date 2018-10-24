<template>
    <section>
        <div v-for="item in leaveData" :key="item.applyId">
            <div v-if="item.typecode == 1"   @click="leaveDetail(item.applyId,item.title)" class="affairs_content"  :key="item.id">
                <div class="affirs_child">
                    <div>
                        <div class="affairs_title">
                            <img :src="item.profileImg"/>
                            <h2>{{item.title}}的请假审批</h2>
                            <time >{{item.applyTime | timeFormat}}</time>
                        </div>
                        <div class="affairs_infor">
                            <p>请假类型 :<span style="color:#609ef6">{{item.leaveType}}</span></p>
                        
                            <p >审批时间 :<span>{{item.applyTime}}</span></p>
                        </div>
                    </div>
                    <div   class="skip" >
                        查看详情
                    </div>

                </div>
            </div>

            <div v-if="item.typecode == 2"  class="affairs_content"  @click="letterDetail(item.applyId,item.title)" >
                <div class="affirs_child">
                    <div>
                        <div class="affairs_title">
                            <img :src="item.profileImg"/>
                            <h2>{{item.title}}的请示函</h2>
                            <time >{{item.applyTime | timeFormat}}</time>
                        </div>
                        <div class="affairs_infor">
                        <div class="request_infor lineHeight">
                            <span>主&emsp;&emsp;题 :</span>
                            <p class="line1"> {{item.theme}}</p>
                        </div>
                            <div class="request_infor margin10">
                                <span>请示内容 :</span>
                                <p class="line2" style="line-height:0.2rem;" v-html="item.content"></p>
                            </div>
                        </div>
                    </div>
                    <div  class="skip" tag="div">
                        查看详情
                    </div>

                </div>
            </div>

             <div v-if="item.typecode == 3"  @click="contractDetail(item.applyId,item.title)" class="affairs_content"  >
                <div class="affirs_child">
                    <div>
                        <div class="affairs_title">
                            <img :src="item.profileImg"/>
                            <h2>{{item.title}}的合同审批</h2>
                            <time >{{item.applyTime | timeFormat}}</time>
                        </div>
                        <div class="affairs_infor">
                        <div class="request_infor lineHeight">
                            <span class="lesp">合同名称 :</span>
                            <p class="line1"> {{item.contractName}}</p>
                        </div>
                            <div class="request_infor margin10">
                                <span>项目责任人 :</span>
                                <p class="line2" style="line-height:0.2rem;">{{item.title}}</p>
                            </div>
                        </div>
                    </div>
                    <div    class="skip" tag="div">
                        查看详情
                    </div>
                </div>
            </div>

            <div  class="affairs_content" v-if="item.typecode==4"  @click="goOutWorkDetails(item.applyId,item.title)"  >
               
                <div class="affirs_child">
                    <div>
                        <div class="affairs_title">
                            <img :src="item.profileImg"/>
                            <h2>{{item.title}}的公出审批</h2>
                            <time >{{item.applyTime | timeFormat}}</time>
                        </div>
                        <div class="affairs_infor">
                            <div class="request_infor lineHeight">
                                <span>公出事由 :</span>
                                <p class="line1" v-html="item.outsideReason"></p>
                            </div>
                            <div class="request_infor lineHeight">
                                <span >公出类型 :</span>
                                <p class="line1"> {{item.outsideType}}</p>
                            </div>
                            <div class="request_infor lineHeight">
                                <span >公出地点 :</span>
                                <p class="line1"> {{item.outsideAddress}}</p>
                            </div>
                            <div class="request_infor lineHeight">
                                <span >开始时间 :</span>
                                <p class="line1"> {{item.beginTime |slice}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="skip" tag="div">
                        查看详情
                    </div>

                </div>
            </div>
            <div v-if="item.typecode == 5" @click="tripDetails(item.applyId,item.title)"   class="affairs_content" >
                <div class="affirs_child">
                        <div>
                            <div class="affairs_title">
                                <img :src="item.profileImg"/>
                                <h2>{{item.title}}的出差审批</h2>
                                <time >{{item.applyTime | timeFormat}}</time>
                            </div>
                            <div class="affairs_infor">
                                <div class="request_infor lineHeight">
                                    <span >标&emsp;&emsp;题 :</span>
                                    <p class="line1"> {{item.theme}}</p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span >出差地点 :</span>
                                    <p class="line1"> {{item.outsideAddress}}</p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span >开始时间 :</span>
                                    <p class="line1"> {{item.beginTime |slice}}</p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span >结束时间 :</span>
                                    <p class="line1"> {{item.endTime |slice}}</p>
                                </div>
                                <div class="request_infor margin10">
                                    <span>出差事由 :</span>
                                    <p class="line2" style="line-height:0.2rem;" v-html="item.content"></p>
                                </div>
                            </div>
                        </div>
                        <div  class="skip" tag="div">
                            查看详情
                        </div>
                </div>
            </div>
             <div v-else-if="item.typecode == 6" @click="stampDetails(item.applyId,item.title)"   class="affairs_content" >
                <div class="affirs_child">
                        <div>
                            <div class="affairs_title">
                                <img :src="item.profileImg"/>
                                <h2>{{item.title}}的用印申请</h2>
                                <time >{{item.applyTime | timeFormat}}</time>
                            </div>
                            <div class="affairs_infor">
                                <div class="request_infor lineHeight">
                                    <span >文件名称 :</span>
                                    <p class="line1"> {{item.sealFileName}}</p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span >文件类别 :</span>
                                    <p class="line1"> {{item.fileCategory}}</p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span >文件数量 :</span>
                                    <p class="line1"> {{item.fileQuantity }}</p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span >印章名称 :</span>
                                    <p class="line1"> {{item.sealName}}</p>
                                </div>
                            </div>
                        </div>
                        <div  class="skip" tag="div">
                            查看详情
                        </div>
                </div>
            </div>
            <div v-else-if="item.typecode == 7" @click="reimburseDetails(item.applyId,item.title)"   class="affairs_content" >
                <div class="affirs_child">
                        <div>
                            <div class="affairs_title">
                                <img :src="item.profileImg"/>
                                <h2>{{item.title}}的费用报销申请</h2>
                                <time >{{item.applyTime | timeFormat}}</time>
                            </div>
                            <div class="affairs_infor">
                                <div class="request_infor lineHeight">
                                    <span >报销金额 :</span>
                                    <p class="line1"> {{item.reimburseAmount}} 元</p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span >日&emsp;&emsp;期 :</span>
                                    <p class="line1"> {{item.reimburseDate | slice}}</p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span >报销类别 :</span>
                                    <p class="line1"> {{item.reimburseType}}</p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span >费用明细 :</span>
                                    <p class="line1"> {{item.reimburseDesc }}</p>
                                </div>
                            </div>
                        </div>
                        <div  class="skip" tag="div">
                            查看详情
                        </div>
                </div>
            </div> 
            <div v-else-if="item.typecode == 8" @click="payApplyDetails(item.applyId,item.title)"   class="affairs_content" >
                <div class="affirs_child">
                        <div>
                            <div class="affairs_title">
                                <img :src="item.profileImg"/>
                                <h2>{{item.title}}的付款申请</h2>
                                <time >{{item.applyTime | timeFormat}}</time>
                            </div>
                            <div class="affairs_infor">
                                <div class="request_infor lineHeight">
                                    <span >付款金额 : </span>
                                    <p class="line1">{{item.payAmount}} 元</p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span>付款方式 :</span>
                                    <p class="line1"> {{item.payType}}</p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span >付款日期 :</span>
                                    <p class="line1">{{item.payDate |slice }} </p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span>收款人全称 :</span>
                                    <p class="line1">{{item.receiverName}}</p>
                                </div>
                            </div>
                        </div>
                        <div  class="skip" tag="div">
                            查看详情
                        </div>
                </div>
                
            </div>
            <div v-else-if="item.typecode == 9" @click="dimissionDetails(item.applyId,item.title)"   class="affairs_content" >
                <div class="affirs_child">
                        <div>
                            <div class="affairs_title">
                                <img :src="item.profileImg"/>
                                <h2>{{item.title}}的离职申请</h2>
                                <time >{{item.applyTime | timeFormat}}</time>
                            </div>
                            <div class="affairs_infor">
                                <div class="request_infor lineHeight">
                                    <span >职&emsp;&emsp;务 : </span>
                                    <p class="line1">{{item.position}} </p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span>入职日期 :</span>
                                    <p class="line1"> {{item.hireDate |slice}}</p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span >合同到期日 :</span>
                                    <p class="line1">{{item.contractEndDate |slice }} </p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span>最后工作日 :</span>
                                    <p class="line1">{{item.dimissionDate |slice }}</p>
                                </div>
                            </div>
                        </div>
                        <div  class="skip" tag="div">
                            查看详情
                        </div>
                </div>
            </div>  

        </div>
         <infinite-loading  spinner="bubbles" :on-infinite="onInfinite" ref="infiniteLoading">
            <span slot="no-more" class="no-more">
            暂无更多加载
            </span>
            <span slot="no-results" class="no-results">
            暂无更多加载
            </span>
        </infinite-loading>
    </section>
  
</template>


<script>
  import InfiniteLoading from 'vue-infinite-loading';

export default {
        data(){
            return{
                leaveData:[],
                pageNo:1,
            } 
        },
         components: {
            InfiniteLoading
        },
        methods:{
            dataFor(arr){
                let data = [],res=[];
                for(let i= 0;i<arr.length;i++){
                    let obj = {};
                    for(let j = 0;j<arr[i].extend.length;j++){
                        obj[arr[i].extend[j].key] = arr[i].extend[j].value
                    }
                    data.push(obj)
                }

                data.forEach(item=>{
                    if(item.auditStatus=='1'||item.auditStatus=='2'||item.auditStatus=='3'){
                        res.push(item)
                    }
                })

                return res;
            },
            leaveDetail(id,name){
                window.location.href = "epipe://?&mark=leaveDetails&_id="+id+'&data='+JSON.stringify({text:0});
            },
            letterDetail(id,name){
                window.location.href = "epipe://?&mark=leOfReDetails&_id="+id+'&data='+JSON.stringify({text:0});
            },
            contractDetail(id,name){
                window.location.href = "epipe://?&mark=contractDetails&_id="+id+'&data='+JSON.stringify({text:0});
            },
             goOutWorkDetails(id){
                window.location.href = "epipe://?&mark=goOutWorkDetails&_id="+id+'&data='+JSON.stringify({text:0});
            },
            tripDetails(id){
                window.location.href = "epipe://?&mark=tripDetails&_id="+id+'&data='+JSON.stringify({text:0});
            },
            stampDetails(id){
                window.location.href = "epipe://?&mark=stampDetails&_id="+id+'&data='+JSON.stringify({text:0});
            },
             reimburseDetails(id){
                window.location.href = "epipe://?&mark=reimburseDetails&_id="+id+'&data='+JSON.stringify({text:0});
            },
            payApplyDetails(id){
                window.location.href = "epipe://?&mark=payApplyDetails&_id="+id+'&data='+JSON.stringify({text:0});
            },
            dimissionDetails(id){
                window.location.href = "epipe://?&mark=dimissionDetails&_id="+id+'&data='+JSON.stringify({text:0});
            },
            onInfinite(){
                let that = this;
                //供需
                this.axios.get(this.Service.affairsList,{
                    params:{
                        pageNo:this.pageNo+1,
                    }
                }).then(function(res){

                        setTimeout(() => {
                                if (res.data.b.data.length == 0) {
                                    that.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                                } else if (res.data.b.data) {
                                    let arr = that.dataFor(res.data.b.data)
                                    that.leaveData = that.leaveData.concat(arr)
                                    that.pageNo++;
                                    that.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                                }
                        }, 200);
                    }).catch(function (error) {
                        console.log(error);
                    });
                    
                }
            },

        mounted:function(){
            let that = this;
            this.axios.get(this.Service.affairsList).then(function(res){
                that.leaveData = that.dataFor(res.data.b.data);
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
            slice : function(value){
                return value.slice(0,-3)
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
        -webkit-box-shadow: 0 0 0.2rem rgba(15,196,125,.1);    
        box-shadow 0 0 0.2rem rgba(15,195,124,.1);
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

     .no-results,.no-more{
        display:block;
        margin:0.15rem 0;
    }
</style>

