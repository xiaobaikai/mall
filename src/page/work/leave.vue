

<template>
    <section>
        <TopHead
        bgcolor
        title="请假" 
         ></TopHead>
        <div class="content">          
            <router-link :to="{ path:'/option', query: {indexs:leaveIndex}}" class="styles" tag="div">
                <div class="items">
                    请假类型
                    <p>
                        <span class="nullValue">{{leaveName}}</span>
                    <svg class="icon icon-back" aria-hidden="false">
                            <use xlink:href="#icon-right"></use>
                    </svg>
                    </p>
                </div>
           </router-link>
            <div class="styles inp_ul">
                <div class="items">
                    开始时间
                    <p>
                        <span class="nullValue">请选择开始时间</span>
                        <svg class="icon icon-back" aria-hidden="false">
                            <use xlink:href="#icon-right"></use>
                        </svg>
                    </p>
                </div>

                <div class="items">
                    结束时间
                    <p>
                        <span class="nullValue">请选择结束时间</span>
                        <svg class="icon icon-back" aria-hidden="false">
                            <use xlink:href="#icon-right"></use>
                        </svg>
                    </p>
                </div>
                <div class="items">
                    时长
                    <p>
                        <span class="nullValue">0</span>
                        <svg class="icon icon-back" aria-hidden="false">
                            <use href=""></use>
                        </svg>
                    </p>
                </div>
            </div>
            
            <div class="styles pad reason">
                <p>请假事由</p>
                <textarea placeholder="请输入请假事由">

                </textarea>
                <ul class="imgShow">
                    <li>
                        <svg class="icon icon-back" aria-hidden="false" style="width:100%;height:100%">
                            <use xlink:href="#icon-xiangji"></use>
                        </svg>
                    </li>
                </ul>
            </div>  
            <CopeMan 
                :has_journal="!has_journal"
                color="#609ef7"
                :data_list=chosed_list
                v-on:remove_item="remove_item"
                :special_class='1'
                :types = '3'
            ></CopeMan>
            <CopeMan 
                :has_journal="!has_journal"
                color="#609ef7"
                :data_list=chosed_list
                v-on:remove_item="remove_item"
                :special_class='1'
                :types = '2'
            ></CopeMan>
        </div>


        <WorkButton
        v-if="!has_journal"
        v-on:left_click="save_btn"
        v-on:right_click="submit_btn"
        left_title="存草稿"
        right_title="提交"
        bgcolor="#fd545c"
      ></WorkButton>
    </section>
</template>

<script>
  import TopHead  from '../../components/topheader.vue'  //header导航栏
  import WorkButton  from '../../components/worknews/work_button.vue'   //提交按钮
  import CopeMan  from '../../components/worknews/copy_man.vue'    //抄送人

export default {
    data(){
        return {
            work_value :'',
            chosed_list: [], //抄送人
            leaveIndex : '2', //假期类型
            leaveName : '请选择',
        }
    },
    components: {
      WorkButton,
      CopeMan,
      TopHead
    },
    methods : {
        save_btn(){ //保存草稿
            console.log('保存')
        },
        submit_btn(){ //提交
            console.log('提交')
        },

    },
    created(){
        eventBus.$on('leaveType', res =>{
            console.log(res);
            this.leaveIndex = res.index;
            this.leaveName = res.name;
         
        });
    },
    mounted : function(){
        let that = this;
    },
     beforeDestroy() {
      eventBus.$off('leaveType');
    },
}
</script>

<style scoped lang="stylus">

    .content{
        margin-top 0.59rem;
        margin-bottom 0.3rem;
        padding 0 0.15rem;

        .styles{
            padding 0 0.15rem;
            margin-bottom 0.15rem;
             -webkit-box-shadow: 0 0 0.2rem rgba(238,65,54,.1);    
             box-shadow 0 0 0.2rem rgba(238,65,54,.1);
             background-color #fff;
        }

        .pad{
              padding 0.15rem;
        }


        .items{
            height 0.44rem;
            line-height 0.44rem;
            font-size 0.15rem;
            color #333;
            font-weight bold;

            p{
                float right 
            }

            .nullValue{
                color #999;
                font-size 0.14rem;
            }
        }

        .inp_ul{

            .items{
                border-bottom 0.01rem solid #e6e6e6
            }

            .items:last-child{
                border none;
            }
        }
    }

    .imgShow{
        overflow hidden;
        
        li{
            float left;
            width 0.32rem;
            height 0.32rem;
            border-radius 0.05rem;
            margin-right 0.1rem;
        }
    }

    .reason{

        p{
            font-size 0.15rem;
            color #333;
            font-weight bold;
            margin-bottom 0.1rem;
        }
        
        textarea{
            width 100%;
            height 100px;
            padding 0;
            font-size 0.14rem;
            color #999;
            border none;
            outline none;
            overflow-y scroll;
            resize none;
            margin-bottom 0.15rem;
        }
    }

</style>
