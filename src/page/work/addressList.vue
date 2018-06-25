<template>
    <section>
        <!-- 树形数据 -->
        <div v-show="!isSearch">
             <TopHead mark="mark" v-on:history_back="history_back_click" :bgcolor="bgcolor" title="选择联系人" :show='states'></TopHead>
             <div class="address_content">
                 <div class="go_search_box">
                        <div class="go_search_input" @click="isSearch=!isSearch">
                            <svg style="font-size: 0.17rem" class="icon"
                                aria-hidden="false">
                                <use xlink:href="#icon-sousuo"></use>
                            </svg>
                            <span>&nbsp&nbsp搜索联系人</span>
                        </div>
                 </div>
                 <!-- 主内容 -->
                 <div class="contacts-main">
                     <div class="head-office" @click="all_bool=!all_bool">
                         {{datalist.companyName}}

                             <svg id="jt" style="width: 0.15rem;height: 0.15rem" class="icon"
                                aria-hidden="false" :style="all_bool?'transform:rotate(90deg)':'transform:rotate(0deg)'">
                                <use xlink:href="#icon-back"></use>
                            </svg>
                     </div>

                     <div v-show="all_bool" :key="item.id"  v-for="(item,index) in datalist.offices" class="main-ul">
                             <div :class="item.open?'main-li open':'main-li'" @click.stop="openList(index,-1)">
                                 {{item.name}}  
                                    <svg id="jt"  style="width: 0.15rem;height: 0.15rem" class="icon"
                                        aria-hidden="false">
                                        <use xlink:href="#icon-back"></use>
                                    </svg>
                             </div>
                            <div v-show="item.open" v-if="item.offices.length" v-for="(child,num) in item.offices">
                                <div :class="child.open?'main-li open main-li-pd30':'main-li main-li-pd30'"  @click.stop="openList(index,num)">
                                        {{child.name}}
                                        <svg id="jt"  style="width: 0.15rem;height: 0.15rem" class="icon"
                                            aria-hidden="false">
                                            <use xlink:href="#icon-back"></use>
                                        </svg>
                                </div>

                                <div v-show="child.open" v-for="(per,sub) in child.persons" >
                                    <div class="person-li" @click="select(index,sub,per,num)">
                                        <svg v-show="per.isSelect" style="font-size: 0.19rem;padding-right: 0.15rem" class="icon">
                                            <use xlink:href="#icon-chenggong"></use>
                                        </svg>
                                        <svg v-show="!per.isSelect" style="font-size: 0.19rem;padding-right: 0.15rem" class="icon">
                                            <use xlink:href="#icon-meiyouxuanzhong"></use>
                                        </svg>
                                        <img :src=per.profileImg|man_photo_format v-show="per.profileImg"/>
                                        <img v-show="!per.profileImg" src="../../assets/tou.png"/>
                                        <div>{{per.name}}</div>
                                    </div>
                                </div>
                            </div>

                            <div v-show="item.open"  v-if="!item.offices.length" v-for="(per,sub) in item.persons">
                                <div class="person-li" v-show="per" @click="select(index,sub,per,-1)">
                                    <svg v-show="per.isSelect" style="font-size: 0.19rem;padding-right: 0.15rem" class="icon">
                                        <use xlink:href="#icon-chenggong"></use>
                                    </svg>
                                    <svg v-show="!per.isSelect" style="font-size: 0.19rem;padding-right: 0.15rem" class="icon">
                                        <use xlink:href="#icon-meiyouxuanzhong"></use>
                                    </svg>
                                    <img :src=per.profileImg|man_photo_format v-show="per.profileImg"/>
                                    <img v-show="!per.profileImg" src="../../assets/tou.png"/>
                                    <div>{{per.name}}</div>
                                </div>
                            </div>
                     </div>
                      <ul class="im_bottom">
                            <div v-if="chose_array.length>0 & type_num" @click="history_back" :style="{background: bgcolor}" class="bottom_button2">确定 <span
                            >({{chose_array.length}})</span>
                            </div>

                            <div v-if="approver_array.length>0 & !type_num" @click="history_back" :style="{background: bgcolor}" class="bottom_button2">确定 <span
                            >({{approver_array.length}})</span>
                            </div>

                            <div v-if="(chose_array.length<=0&type_num)|(approver_array.length<=0&!type_num)" class="bottom_button2" :style="{opacity: 0.6,background: bgcolor}" style="">确定{{chose_array.length}}
                            </div>
                            <div class="bottom_button">

                            </div>
                            <li @click="reduce(item)"  v-if="type_num" v-for="item in chose_array" class="chose">
                            <div style="height: 0.15rem">
                                <svg style="font-size: 0.15rem;position: relative;top: 0.08rem;left: 0.135rem" class="icon">
                                <use xlink:href="#icon-shanchu"></use>
                                </svg>
                            </div>
                            <img src="../../assets/tou.png" v-show="!item.profileImg"/>
                            <img :src=item.profileImg|man_photo_format v-show="item.profileImg"/>
                            <div class="name">{{item.name}}</div>
                            </li>
                            <li @click="reduce(item)" v-if="!type_num"  v-for="item in approver_array" class="approver">
                            <div style="height: 0.15rem">
                                <svg style="font-size: 0.15rem;position: relative;top: 0.08rem;left: 0.135rem" class="icon">
                                     <use xlink:href="#icon-shanchu"></use>
                                </svg>
                            </div>
                            <img src="../../assets/tou.png" v-show="!item.profileImg"/>
                            <img :src=item.profileImg|man_photo_format v-show="item.profileImg"/>
                            <div class="name">{{item.name}}</div>
                            </li>

                            <li style="width:1.25rem"></li>
                        </ul>
                 </div>
             </div>
        </div>
        <!-- 搜索数据 -->
        <div v-show="isSearch">
            <div class="search_input">
                <svg style="font-size: 0.17rem" class="icon"
                    aria-hidden="false">
                    <use xlink:href="#icon-sousuo"></use>
                </svg>
                <input placeholder="搜索联系人" />
                <a class="cancel_btn" @click="isSearch=!isSearch">取消</a>
            </div>
            <div class="line-box"></div>
            <div class="search_res">
                <ul>

                </ul>
            </div>
        </div>
    </section>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  import TopHead  from '../../components/topheader.vue';
  
    export default {
        data() {
            return {
                isSearch:false,
                type_num:1, //抄送人为1 审批人为0
                bgcolor: "",
                datalist: [], //获取的通讯录数据
                all_bool: true, //是否是展开的
                seach_value: '', //输入框
                chosed_list_mark: [], //抄送人 备份一个
                chose_array: [],  //抄送人
                approver_array : [], //审批人
                approver_list_mark : [], //审批人 备份一个
                name: '',
                seach_list_man: [], //被搜索到的人
                states : ''
            }
        },
        components: {
            TopHead
        },
        mounted:function(){
            let that = this;
            this.axios.get(this.Service.organAddress,{
                params:{
                    showGroup : true,
                }
            }).then(function(data){
                if(data.data.h.code == 200) {
                    let arrs = data.data.b;

                    for(let i = 0,len=arrs.offices.length;i<len;i++){
                            arrs.offices[i].open = false;
                        if(arrs.offices[i].offices.length){
                                for(let j=0;j<arrs.offices[i].offices.length;j++){
                                    arrs.offices[i].offices[j].open = false;
                                    for(let k=0;k<arrs.offices[i].offices[j].persons.length;k++){
                                        arrs.offices[i].offices[j].persons[k].isSelect = false;
                                    }
                                }
                        }else{
                            for(let j=0; j<arrs.offices[i].persons.length; j++){
                                    arrs.offices[i].persons[j].isSelect = false;
                            }  
                        }
                    }
                    that.datalist = arrs;
                }
            })
        },
        methods: {
           ...mapMutations([
                'change_man','approver_man'
            ]),
            openList:function(index,num){ //打开关闭分组
                console.log(index,num)
                if(num!=-1){
                    this.datalist.offices[index].offices[num].open=!this.datalist.offices[index].offices[num].open;
                }else{
                    this.datalist.offices[index].open=!this.datalist.offices[index].open;
                }
            },
            select:function(index,sub,el,num){ //选中某人

                if(num == -1){
                    this.datalist.offices[index].persons[sub].isSelect=!this.datalist.offices[index].persons[sub].isSelect
                }else{
                    this.datalist.offices[index].offices[num].persons[sub].isSelect=!this.datalist.offices[index].offices[num].persons[sub].isSelect
                }
            }
        },
        computed: mapState(["chosed_man_state",'approver_man_state'])
        
    }
</script>

<style scoped  lang="stylus">

    .address_content{
        margin-top: 0.45rem;
        margin-bottom 1rem;
    }

    .go_search_box{
        padding 0.15rem;

        .go_search_input{
            width 100%;
            height 0.35rem;
            line-height 0.35rem;
            text-align center;
            box-shadow: rgb(221, 221, 221) 0px 10px 16px,
            rgb(221, 221, 221) 0px 0px 10px,
            rgb(221, 221, 221) 0px 0px 10px;

            font-size 0.15rem;
            color #666;
            background-color #fff;
            border-radius 3px;
        }
    }

    .contacts-main{
        background-color #fff;

        .head-office{
            position relative;
            font-size 0.16rem;
            height 0.48rem;
            line-height 0.48rem;
            padding-left:0.15rem;
            border-bottom 0.01rem solid #d9d9d9;
        }
    }

    #jt{
        float right;
        position absolute;
        top:0;
        bottom:0;
        right:0.15rem;
        margin auto;
        transform rotate(0deg)
        transition transform 0.2s;
    }

    .open #jt{
        transform rotate(90deg)
    }
    

    .search_input{
        display flex;
        padding  0.08rem 0.15rem;
        background-color #fff;

        .cancel_btn{
            width 0.75rem;
            height 0.35rem;
            background-color #609ef7;
            border-radius 3px;
            color #fff 
            text-align center
            line-height 0.35rem;
            font-size 0.15rem;
        }

        input{
                flex 1;
                padding-left 0.4rem;
                background-color #f5f5f5;
                border-radius 3px;
                border none 
                outline none 
        }

        svg{
            position absolute;
            left 0.3rem;
            top 0.18rem;
        }
    }

    .line-box{
        border-top 1px solid #ddd;
        height 0.15rem;
        background-color #f5f5f5
    }

    .search_res{
        background-color #fff
    }

    .main-li{
            position relative;
            font-size 0.16rem;
            height 0.48rem;
            line-height 0.48rem;
            padding-left:0.27rem;
            border-bottom 0.01rem solid #d9d9d9;
    }

    .person-li{
        height 0.48rem
        line-height 0.48rem
        padding-left 0.45rem
        border-bottom 0.01rem solid #E6E6E6
        font-size 0.15rem
        display flex
        align-items center

        img{
          width 0.32rem
          height 0.32rem
          border-radius 0.32rem
        }

        div{
          height 0.48rem
          padding-left 0.15rem
          display flex
          justify-content center
          align-items center
          font-size 0.15rem
        }
    }

    .main-li-pd30{
        padding-left 0.4rem;
    }


.im_bottom {
    min-height 0.84rem
    width 100%
    position fixed
    bottom 0
    background-color #FFF
    white-space: nowrap;
    overflow scroll
    color #bbb
    padding 0 0.15rem 0rem 0.15rem
    box-shadow: 0 0 15px rgba(187, 187, 187, 0.7);
  }

  .im_bottom li {
    display inline-block
    width 0.575rem
    text-align center
  }

  .im_bottom img {
    width 0.32rem
    height 0.32rem
    border-radius 0.32rem
  }

  .im_bottom li .name {
    margin-top 0.05rem
    font-size 0.13rem
  }

  .bottom_button {
    position fixed
    height 0.77rem
    background-color #fff
    opacity 0.9
    width 1.2rem
    bottom 0
    right 0
    z-index 2
  }

  .bottom_button2 {
    right 0.15rem
    z-index 3
    position fixed
    width 0.9rem
    bottom 0.24rem
    height 0.34rem
    opacity 1
    border-radius 0.17rem
    background-color rgba(96, 158, 247, 1)
    text-align center
    line-height 0.34rem
    font-size 0.15rem
    color #ffffff
  }

</style>