<template>
  <section>
      <header>
          <div @click="btnShow=1" :class="btnShow==1?'active':''">全部</div>
          <div @click="btnShow=2" :class="btnShow==2?'active':''">文章</div>
          <div @click="btnShow=3" :class="btnShow==3?'active':''">图片</div>
      </header>
      <div v-show="btnShow==1">
          <!-- <text-template :key="item.resId" v-for="item in datas" :item="item"></text-template> -->
          <div v-for="item in datas" class="item" v-if="item.resTitle" @click="go_details(item)">
              {{item.resTitle}}
          </div>

           <div class="no-more">暂无内容</div>
      </div>
      <div v-show="btnShow==2">
            <div v-for="item in datas" class="item" v-if="item.resTitle"  @click="go_details(item)">
              {{item.resTitle}}
          </div>
          <!-- <text-template :key="item.resId"  v-for="item in datas" :item="item"></text-template> -->
          <div class="no-more">暂无内容</div>
      </div>
      <div v-show="btnShow==3">

          <div class="no-more">暂无内容</div>
      </div>
  </section>
</template>


<script>
import TextTemplate from '../../components/textTemplate.vue';
export default {
        data(){
            return { 
                btnShow : 1,  //按钮选中
                datas : [],    //收藏数据
            }
        },

        mounted(){
            let that = this;
            this.axios.get('/user/collect/list?collecType=1').then(function(res){
                if(res.data.h.code==200){
                    that.datas = res.data.b;
                }
            })    
        },
        methods:{
             go_details(item){
                    window.location.href = "epipe://?&mark=newsdetail&title="+item.resTitle+"&_id="+item.resId+'&url='+item.resUrl

             }
        },
        components:{
            TextTemplate,
        }
}
</script>


<style lang="stylus" scoped>
     header{
         heigh 0.5rem;
         display flex
         border-bottom 1px solid #ddd;

         >div{
             flex  1;
             text-align center 
             font-size 0.16rem;
             color #666;
             line-height 0.5rem;
             position relative
         }
     }

     .item{
         height 0.6rem;
         line-height 0.6rem;
         background-color #fff
         font-size 0.15rem;
         color #333
         overflow: hidden;
         white-space: nowrap;
         text-overflow: ellipsis;
         margin 0 0.15rem;
         margin-bottom 0.1rem;
         padding 0 0.15rem;
         border-radius 0.04rem;
     }
    
    .no-more{
        text-align center;
        color #666;
        height 0.2rem;
        line-height 0.2rem;
        padding-bottom:0.15rem;
        margin-top 0.2rem;
    }

    .active{
        color #333;
    }

    .active:after{
        position absolute
        bottom 0
        left 0
        right 0
        margin  auto
        content ''
        width 0.4rem;
        height 2px;
        background-color #f80;
    }
    section>div{
        padding-top  0.15rem;
    }

</style>
