
<template>
    <section>
        <TopHead
        bgcolor='#fd545c'
        title='请假类型'
        ></TopHead>
        <div class="main">
            <ul class="list">
                <li v-for="(item,index) in data" @click="clickEvent(index,item.name)">
                    <div class="li">
                        <span>
                        {{item.name}} 
                        </span>
                        <svg class="icon icon-back" aria-hidden="false" v-if="index==indexs">
                            <use xlink:href="#icon-xuanzhong1"></use>
                        </svg>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>

import TopHead  from '../../components/topheader.vue'  //header导航栏
export default {
        data(){
            return{
            indexs : -1,
            data : [],
            t_index: 0,
            t_name: "",
         }
        },
        components : {
            TopHead
        },
        methods : {          
            clickEvent(index,name){
                this.t_index = index;
                this.t_name = name;
                window.history.back(-1);
            },
            updata(){
                let vm = this;
                eventBus.$emit('leaveType',{
                    index: vm.t_index,
                    name: vm.t_name
                });
            }
            
        },
        mounted : function(){
          this.indexs = this.$route.query.indexs
          let that = this;
           this.axios.get('/work/leave/type/list').then(function(res){
                if(res.data.h.code =200 ) that.data = res.data.b.data;
            })
        },
        beforeDestroy() {
            this.updata();
        },

}
</script>


<style lang="stylus" scoped>
    .main{
        margin-top 0.59rem;
        padding 0 0.15rem;
    }

    .list{
         -webkit-box-shadow: 0 0 0.2rem rgba(238,65,54,.1);    
        box-shadow 0 0 0.2rem rgba(238,65,54,.1);
        background-color #fff;
    }

    li{
        height 0.43rem;
        line-height 0.43rem;
        font-size 0.15rem;
        padding-left 0.15rem;
        color #333;

        svg{
            float right;
            margin-top 0.14rem;
            margin-right 0.15rem;
        }
    }

    .li{
        border-bottom 1px solid  #e6e6e6;        
    }
</style>
