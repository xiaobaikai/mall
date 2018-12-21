<template>
    <div>
        <div v-if="item.typecode == 1"   @click="goDetails(item,'leave')" class="affairs_content"  :key="item.id">
                <div class="affirs_child">
                    <div>
                        <div class="affairs_title">
                            <img :src="item.profileImg"/>
                            <h2>{{item.title}}的请假审批</h2>
                            <time >{{item.applyTime | timeSlice}}</time>
                        </div>
                        <div class="affairs_infor">
                            <p>请假类型 :<span style="color:#609ef6">{{item.leaveType}}</span></p>
                        
                            <p >审批时间 :<span>{{item.applyTime}}</span></p>
                        </div>
                    </div>
                    <div   class="skip" >
                        查看详情
                    </div>
                    <i v-if="item.readFlag=='0'&&isCopy"></i>
                </div>
            </div>

            <div v-if="item.typecode == 2"  class="affairs_content"  @click="goDetails(item,'leOfRe')" >
                <div class="affirs_child">
                    <div>
                        <div class="affairs_title">
                            <img :src="item.profileImg"/>
                            <h2>{{item.title}}的请示函</h2>
                            <time >{{item.applyTime | timeSlice}}</time>
                        </div>
                        <div class="affairs_infor">
                            <div class="request_infor lineHeight">
                                <span>主&emsp; &emsp;题 :</span>
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
                    <i v-if="item.readFlag=='0'&&isCopy"></i>
                </div>
            </div>

             <div v-if="item.typecode == 3"  @click="goDetails(item,'contract')" class="affairs_content"  >
                <div class="affirs_child">
                    <div>
                        <div class="affairs_title">
                            <img :src="item.profileImg"/>
                            <h2>{{item.title}}的合同审批</h2>
                            <time >{{item.applyTime | timeSlice}}</time>
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
                    <i v-if="item.readFlag=='0'&&isCopy"></i>
                </div>
            </div>

            <div  class="affairs_content" v-if="item.typecode==4"  @click="goDetails(item,'goOutWork')"  >
               
                <div class="affirs_child">
                    <div>
                        <div class="affairs_title">
                            <img :src="item.profileImg"/>
                            <h2>{{item.title}}的公出审批</h2>
                            <time >{{item.applyTime | timeSlice}}</time>
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
                                <p class="line1"> {{item.beginTime |timeSlice}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="skip" tag="div">
                        查看详情
                    </div>
                   <i v-if="item.readFlag=='0'&&isCopy"></i>

                </div>
            </div>
            <div v-if="item.typecode == 5" @click="goDetails(item,'trip')"   class="affairs_content" >
                <div class="affirs_child">
                        <div>
                            <div class="affairs_title">
                                <img :src="item.profileImg"/>
                                <h2>{{item.title}}的出差审批</h2>
                                <time >{{item.applyTime | timeSlice}}</time>
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
                                    <p class="line1"> {{item.beginTime |timeSlice}}</p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span >结束时间 :</span>
                                    <p class="line1"> {{item.endTime |timeSlice}}</p>
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
                   <i v-if="item.readFlag=='0'&&isCopy"></i>

                </div>
            </div>
             <div v-else-if="item.typecode == 6" @click="goDetails(item,'stamp')"   class="affairs_content" >
                <div class="affirs_child">
                        <div>
                            <div class="affairs_title">
                                <img :src="item.profileImg"/>
                                <h2>{{item.title}}的用印申请</h2>
                                <time >{{item.applyTime | timeSlice}}</time>
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
                   <i v-if="item.readFlag=='0'&&isCopy"></i>
                </div>
            </div>
            <div v-else-if="item.typecode == 7" @click="goDetails(item,'reimburse')"   class="affairs_content" >
                <div class="affirs_child">
                        <div>
                            <div class="affairs_title">
                                <img :src="item.profileImg"/>
                                <h2>{{item.title}}的报销申请</h2>
                                <time >{{item.applyTime | timeSlice}}</time>
                            </div>
                            <div class="affairs_infor">
                                <div class="request_infor lineHeight">
                                    <span >报销金额 :</span>
                                    <p class="line1"> {{item.reimburseAmount}} 元</p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span >日&emsp;&emsp;期 :</span>
                                    <p class="line1"> {{item.reimburseDate | timeSlice}}</p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span >报销类别 :</span>
                                    <p class="line1"> {{item.reimburseType}}</p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span >费用明细 :</span>
                                    <p class="line2" style="line-height:0.2rem;"> {{item.reimburseDesc }}</p>
                                </div>
                            </div>
                        </div>
                        <div  class="skip" tag="div">
                            查看详情
                        </div>
                   <i v-if="item.readFlag=='0'&&isCopy"></i>

                </div>
            </div> 
            <div v-else-if="item.typecode == 8" @click="goDetails(item,'payApply')"   class="affairs_content" >
                <div class="affirs_child">
                        <div>
                            <div class="affairs_title">
                                <img :src="item.profileImg"/>
                                <h2>{{item.title}}的付款申请</h2>
                                <time >{{item.applyTime | timeSlice}}</time>
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
                                    <p class="line1">{{item.payDate |timeSlice }} </p>
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
                   <i v-if="item.readFlag=='0'&&isCopy"></i>

                </div>
                
            </div>
            <div v-else-if="item.typecode == 9" @click="goDetails(item,'dimission')"   class="affairs_content" >
                <div class="affirs_child">
                        <div>
                            <div class="affairs_title">
                                <img :src="item.profileImg"/>
                                <h2>{{item.title}}的离职申请</h2>
                                <time >{{item.applyTime | timeSlice}}</time>
                            </div>
                            <div class="affairs_infor">
                                <div class="request_infor lineHeight">
                                    <span >职&emsp;&emsp;务 : </span>
                                    <p class="line1">{{item.position}} </p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span>入职日期 :</span>
                                    <p class="line1"> {{item.hireDate |timeSlice}}</p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span >合同到期日 :</span>
                                    <p class="line1">{{item.contractEndDate |timeSlice }} </p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span>最后工作日 :</span>
                                    <p class="line1">{{item.dimissionDate |timeSlice }}</p>
                                </div>
                            </div>
                        </div>
                        <div  class="skip" tag="div">
                            查看详情
                        </div>
                   <i v-if="item.readFlag=='0'&&isCopy"></i>
                </div>
            </div>
            <div v-else-if="item.typecode == 10" @click="goDetails(item,'borrow')"   class="affairs_content" >
                <div class="affirs_child">
                        <div>
                            <div class="affairs_title">
                                <img :src="item.profileImg"/>
                                <h2>{{item.title}}的借款申请</h2>
                                <time >{{item.applyTime | timeSlice}}</time>
                            </div>
                            <div class="affairs_infor">
                                <div class="request_infor lineHeight">
                                    <span >借款金额 : </span>
                                    <p class="line1">{{item.borrowAmount}} 元</p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span>借款日期 :</span>
                                    <p class="line1"> {{item.useDate  }}</p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span >归还日期 :</span>
                                    <p class="line1">{{item.returnDate  }} </p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span>借款事由 :</span>
                                    <p class="line2" style="line-height:0.2rem;">{{item.content  }}</p>
                                </div>
                                
                            </div>
                        </div>
                        <div  class="skip" tag="div">
                            查看详情
                        </div>
                   <i v-if="item.readFlag=='0'&&isCopy"></i>

                </div>
            </div>
             <div v-else-if="item.typecode == 11" @click="goDetails(item,'reception')"   class="affairs_content" >
                <div class="affirs_child">
                        <div>
                            <div class="affairs_title">
                                <img :src="item.profileImg"/>
                                <h2>{{item.title}}的接待申请</h2>
                                <time >{{item.applyTime | timeSlice}}</time>
                            </div>
                            <div class="affairs_infor">
                                <div class="request_infor lineHeight">
                                    <span >来宾单位 : </span>
                                    <p class="line1">{{item.visitorCompany}} </p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span>到访日期 :</span>
                                    <p class="line1"> {{item.visitDate |timeSlice }}</p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span >接待等级 :</span>
                                    <p class="line1">{{item.receptionLevel}} </p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span>预算费用 :</span>
                                    <p class="line1">{{item.totalBudget}} 元</p>
                                </div>
                            </div>
                        </div>
                        <div  class="skip" tag="div">
                            查看详情
                        </div>
                   <i v-if="item.readFlag=='0'&&isCopy"></i>

                </div>
            </div>
             <div v-else-if="item.typecode == 12" @click="goDetails(item,'absence')"   class="affairs_content" >
                <div class="affirs_child">
                        <div>
                            <div class="affairs_title">
                                <img :src="item.profileImg"/>
                                <h2>{{item.title}}的补卡申请</h2>
                                <time >{{item.applyTime | timeSlice}}</time>
                            </div>
                            <div class="affairs_infor">
                                <div class="request_infor lineHeight">
                                    <span> 提 &nbsp;交&nbsp;人 :</span><p class="line1">{{item.title}} </p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span>所属部门 :</span>
                                    <p class="line1">{{item.officeName }}</p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span >时&emsp; &emsp;间 :</span>
                                    <p class="line1">{{item.absenceDate|timeSlice }} </p>
                                </div>
                                <div class="request_infor lineHeight">
                                    <span>原&emsp; &emsp;因 :</span>
                                    <p class="line2" style="line-height:0.2rem;">{{item.absenceReason  }}</p>
                                </div>
                            </div>
                        </div>
                        <div  class="skip" tag="div">
                            查看详情
                        </div>
                   <i v-if="item.readFlag=='0'&&isCopy"></i>

                </div>
            </div>
    </div>
</template>

<script>
    export default {

            data(){
                return {

                }
            },
            methods:{
                goDetails(item,type){
                    this.$emit('goDetails',item,type)
                }
            },
            props:['item','isCopy'],
    }
</script>

<style scoped lang="stylus">
    .lesp{
        letter-spacing 3px;
    }

    .affirs_child{
        padding  0.15rem;
        padding-bottom 0;
        background-color #fff;
        -webkit-box-shadow: 0 0 0.2rem rgba(15,196,125,.1);    
        box-shadow 0 0 0.2rem rgba(15,195,124,.1);
        position relative

        i{
                position: absolute;
                width: 0.10rem;
                height: 0.10rem;
                top: 0;
                bottom:0;
                right:0.1rem;
                margin:auto;
                text-align: center;
                font-size: 0.12rem;
                background-color: #fd545c;
                color: #fff;
                border-radius: 50%;
        }
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
        position:relative;

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

     .no-results,.no-more{
        display:block;
        margin:0.15rem 0;
    }
</style>