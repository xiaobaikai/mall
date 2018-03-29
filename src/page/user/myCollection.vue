<template>
  <section>
      <header>
          <div class="">全部</div>
          <div class="">文章</div>
          <div class="">图片</div>
      </header>
      <div>
          <text-template  v-for="item in datas" :item="item"></text-template>
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
                html : '',    //模板数据

            }
        },

        mounted(){
            let that = this;
            let str='';
            this.axios.get('http://192.168.3.29:8280/member/v1/user/collect/info?collecType=0').then(function(res){
                if(res.data.h.code==200){
                    that.datas = res.data.b;
                }
            })    
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
             font-size 0.14rem;
             color #333;
             line-height 0.5rem;
         }
     }
     .home_title_con4 {
    background-color: #fff;
    padding: 4% 0 4% 0;
    margin-top: 4%;
    clear: both;
    height: 0.85rem;
  }

  .home_title_con4 > div:first-child {
    margin-left: 4%;
    width: 37.5%;
    border-radius: 0.025rem;
    height: 0.85rem;
    float: left;
    overflow: hidden;
    background-color: #fff;
  }

  .home_title_con4 > div:last-child {
    margin-right: 4%;
    width: 52.5%;
    float: left;
    margin-left: 2%;
  }
  .home_title_con4:active {
    background-color $opacity_bgcolor
  }
  .home_title_con5 {
    width: 100%;
    font-size: 0.15rem;
    font-weight: bold;
    margin-top: -0.01rem;
  }
  .home_title_con6 {
    color: #666;
    font-size: 0.14rem;
    margin-top: 0.063rem;
    line-height 0.178rem
    min-height 0.345rem
  }
  .home_title_con7 {
    color: #999;
    font-size: 0.12rem;
    margin-top: 0.09rem;
  }
  .sub-desc{
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;

  }

  //展会
 .exhit_div {
    margin: 0.15rem 0.15rem 0 0.15rem;
    height: 1.83rem;
    position: relative;
    overflow: hidden;
  }

  .exhit_div div {
    height: 0.45rem;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    bottom: 0;
    line-height:0.45rem;
  }

  .exhit_div div span {
    color: #fff;
    font-size: 0.16rem;
    padding: 0 0.14rem 0 0.14rem;
  }

// 供需

.tender_div1 {
    margin: 0.15rem 0.15rem 0 0.15rem;
    padding: 0.15rem;
    background-color: #fff;
    border-radius: 0.027rem;
  }

  .tender_div1 li {
    color: #666;
    font-size: 0.14rem;
    margin-top: 0.058rem;
    line-height 0.2rem
  }

  .tender_div1 li:first-child {
    color: #333;
    font-size: 0.15rem;
    font-weight: bold;
    margin: 0;
  }
  .tender_div1:active {
    background-color $opacity_bgcolor
  }

  //行情

  .market{
        margin  0.15rem;
        margin-bottom 0;
        padding 0.15rem 0.1rem;
        background-color: #fff;
        border-radius 4px;
        -webkit-box-shadow: 0 0 0.2rem rgba(255,136,0,.1);    
        box-shadow 0 0 0.2rem rgba(255,136,0,.1);
    }

    .market .item_infor{
        font-size 0.13rem;
        color #999;
    }

    .market .item_tag{
        color #ffa51e;
        margin-right 0.2rem;
    }
    .market .spanRight{
        float right ;
    }

   .market h2{
        height 0.48rem;
        font-size 0.15rem;
        color #333;
        line-height 0.24rem;
    }

    //访谈

     .interview{
        display flex;
        margin 0.15rem;
        margin-bottom 0;
        padding 0.15rem 0.1rem;
        background-color #fff;
        border-radius 4px;
        -webkit-box-shadow: 0 0 0.2rem rgba(255,136,0,.1);    
        box-shadow 0 0 0.2rem rgba(255,136,0,.1);
    }

    .interview .img-show{
        width 0.9rem;
        height 0.9rem;
        margin-right 0.1rem;

        img{
            width 100%;
            height 100%;
            border-radius 4px;
        }
    } 

   .interview .item-content{
        width:2.25rem;

        h2{
            font-size 0.15rem;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }

        .item-text{
             height 0.36rem;
            font-size 0.14rem;
            line-height 0.18rem;
            color #666;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            margin 0.09rem 0;
            text-align justify;
        }
    }

    .interview .item_infor{
        font-size 0.13rem;
        color #999;
    }

    .interview .item_tag{
        color #ffa51e;
        margin-right 0.2rem;
    }
    .interview .spanRight{
        float right;
    }

    // 政府机构

    .agencies{
        display flex;
        padding 0.15rem;
        margin-bottom 0.15rem;
        background-color #fff;
        -webkit-box-shadow: 0 0 0.2rem rgba(252,83,91,0.1);    
        box-shadow 0 0 0.2rem rgba(252,83,91,0.1);   
        margin: 0.15rem 0.15rem 0px;
        padding: 0.15rem 0.1rem;
        border-radius: 4px;
    }


    .agencies .item-text{
        width 2.25rem;

         h2{
            font-size 0.15rem;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }

        article {
            font-size 0.14rem;
            line-height 0.18rem;
            color #666;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            margin 0.09rem 0;
            text-align justify;
        }
    }

    .agencies .img-show{
        width 0.9rem;
        height 0.9rem;
        margin-right 0.1rem;

        img{
            width 100%;
            height 100%;
            border-radius 4px;
        }
    }

</style>
