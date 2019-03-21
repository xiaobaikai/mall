<template>
  <section>
      <header>
          <div @click="option(0)" :class="sourceType==0?'active':''">全部</div>
          <div @click="option(1)" :class="sourceType==1?'active':''">聊天记录</div>
          <div @click="option(2)" :class="sourceType==2?'active':''">图片视频</div>
          <div @click="option(3)" :class="sourceType==3?'active':''">链接</div>
      </header>
      <div  class="main">
          <div v-for="item in datas" class="item"  @click="go_details(item)" :key="item.resId">
              <div class="list-li">
                <div v-if="item.resType==5" style="line-height:0.6rem;">
                  <img src="../../assets/yuyinmoren.png"/> {{item.mediaTime}} 秒
                </div>
                <div v-if="item.resType=='2'">
                    <img :src="item.resUrl" />
                </div>

                <div  v-if="item.resType!=5&item.resType!=2&item.resType!=7" >
                    <img :src="item.converImgUrl" v-if="item.resType==1">
                    <p class="overflow"> {{item.resTitle}} </p>
                </div>
                <div v-if="item.resType=='7'">
                    <img src="../../assets/morendt.png" >
                    <p class="overflow"> {{item.resTitle}} </p>
                </div>

                <span v-if="item.source!='null'" class="source">{{item.source}}</span>
                <span>{{item.collectTime|timeFormat}}</span>
              </div>
    
          </div>


           <div class="no-more">暂无内容</div>
      </div>
  
  </section>
</template>


<script>
import TextTemplate from '../../components/textTemplate.vue';
export default {
        data(){
            return { 
                sourceType : 0,  //按钮选中
                datas : [],    //收藏数据
            }
        },
 
        mounted(){
            let that = this;
            this.axios.get('/user/collect/list',{
                params:{
                    collecType:0,
                    sourceType:0,
                }
            }).then(function(res){
                if(res.data.h.code==200){
                    that.datas = res.data.b;
                }
            })    
        },
        methods:{
             go_details(item){
                    if(item.resType==1){
                        window.location.href = "epipe://?&mark=newsdetail&title="+item.resTitle+"&_id="+item.resId+'&url='+item.resUrl
                    }else if(item.resType){
                         window.location.href = "epipe://?&mark=imCollect&data="+JSON.stringify(item)
                    }
             },
             option(type){
                 this.sourceType = type;
                 let that = this;
                 
                let sourceType = type==3?2:type;

                let collecType = type==2?2:0;
                collecType = type==3?1:collecType;
                 
                 this.axios.get('/user/collect/list',{
                    params:{
                        collecType,
                        sourceType,
                    }
                }).then(function(res){
                    if(res.data.h.code==200){
                        that.datas = res.data.b;
                    }
                })   

             }
        },
        filters : {
            timeFormat : function(value) {
                let arr = ['一','二','三','四','五','六','日']
                let odate = value.split(" ")[0];
                let otime = new Date(odate);
                let time = new Date() - new Date(odate);
                time = parseInt( time/(24*60*60*1000))

                if(!time){
                    return "今天"
                }else if(time == 1){
                    return '昨天 '+ value.slice(-8,-3)
                }else if(1<time<=7){
                    return  '二天前'
                }else{ 
                    return value.slice(0,10)
                }
            },
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

     .overflow{
         overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
     }


    .main{
        padding  0.15rem;
    }

     .chat{
         margin 0 0.15rem;
         background-color #fff;
         border-radius 0.05rem;
         height 0.6rem;
         padding 0.12rem;
         box-sizing border-box

         p{
             font-size 0.15rem;
         }

         span{
             font-size 0.12rem;
             color #999;
         }
     }

     .voice{

         img{
             width 0.3rem;
             height 0.3rem;
             margin-right 0.12rem;
         }
     }

     .list-li{

         >div{
             width 100%;
             display flex;

             p{
                 flex 1
                 word-wrap:break-word
                 word-break:break-all
                 text-align justify
             }
         }

         img{
             width 0.6rem;
             height 0.6rem;
             margin-right 0.12rem;
         }

         span{
                 font-size 0.12rem;
                 color #999;
             }
     }

     .item{
        //  height 0.6rem;
         background-color #fff
         font-size 0.15rem;
         color #333
         overflow: hidden;
         text-overflow: ellipsis;
         margin-bottom 0.1rem;
         padding 0.12rem;
         border-radius 0.04rem;

         
     }

     .source{
         margin-right 0.12rem;
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
