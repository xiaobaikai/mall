
<template>
    <section style="height:100%">
        <div class="header">
            <div class="header_back" @click="go_back()">
                <svg style="color:#fff;height:0.2rem;width:0.2rem;margin-top:0.05rem;"  class="icon" aria-hidden="false">
                    <use xlink:href="#icon-zuoyoujiantou"></use>
                </svg>
            </div>
            <div class="search-main">
                <div class="search">
                    <div class="search_icon">
                        
                    </div>
                    <form action="#" @submit.prevent="searchClick()">
                        <input ref="input" @focus="isShowPrompt=true" type="search"  placeholder="请输入关键字">
                    </form>
                </div>
            </div>
            <div class="search_btn" @click="searchClick()">
                <span>搜索</span>
            </div>
        </div>

        <div class="main" v-if="isShowPrompt">
            <div class="search_prompt search_hot">
                <h3>热门搜索</h3>
                <ul>
                    <li>你说啊</li>
                    <li>智慧城市</li>
                    <li>不然那</li>
                </ul>
            </div>
            <div class="search_prompt search_history">
                <h3>历史搜索</h3>
                <div class="items" v-for="(item,index) in historyData">
                    <span>{{item}}</span>
                    <div class="items_close" @click="delHistory(index)">
                        <svg style="heigth:0.1rem;"  class="icon" aria-hidden="false">
                            <use xlink:href="#icon-x"></use>
                        </svg>
                    </div>
                </div>
               
            </div>
        </div>

        <div class="search_res" v-if="!isShowPrompt">
                <div class="home_content_news-1">
                    <ul  @click="go_news()" class="home_title_con4">
                        <div><img src="https://qiniu.epipe.cn/5438816659248766976?imageslim&imageView2/1/w/268/h/160" width="100%"></div>
                        <div>
                            <div class="home_title_con5 over_width" >箭头睡懒觉了极是是是发生的发生的乐空间</div>
                            <div class="home_title_con6 simple-ellipsis">了房间了圣诞节福利雷锋精神的来访接待室了废旧塑料2来得及分类山东矿机</div>
                            <div class="home_title_con7 over_width sub-desc">
                                <div>
                                    <span>国际</span>
                                    <span>&nbsp; 2018-02-23</span>
                                </div>
                                <div>
                                    <span>&nbsp; 
                                    <svg style="font-size: 0.15rem;" class="icon" aria-hidden="false">
                                        <use xlink:href="#icon-yuedu"></use>
                                    </svg> 200
                                    </span>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>

                <div   class="exhit_div">
                    <img style="border-radius: 0.03rem;overflow: hidden;width: 100%;height: 1.83rem" src="https://qiniu.epipe.cn/5453725696759160832?imageslim&imageView2/1/w/690/h/360" />
                    <img style="border-radius: 0.03rem;overflow: hidden;width: 100%;height: 1.83rem"  src="../../assets/pic3.png" />
                    <div>
                        <span class="over_width">中国碳博会友好城市行走进江苏南京、镇江</span>
                    </div>
                </div>

                <ul  @click="go_newsdetail()" class="tender_div1">
                    <li class="over_width" >几斤几两发你烦烦烦塑料颗粒</li>
                     <li class="simple-ellipsis">冯老师大家疯了似的解放胜利大街十来份就算了路圣诞节烦死了都放假了圣诞节粉丝滤镜乐山大佛建设路口</li>
                </ul>

                <div class="item market"  @click="go_newsdetail(value)">
                    <h2>发顺丰的放松放松</h2>
                    <div class="item_infor">
                        <span>2018-6-25</span>
                        <span class="spanRight">
                            <svg style="width: 0.2rem;height: 0.14rem" class="icon" aria-hidden="false">
                                <use xlink:href="#icon-yuedu"></use>
                            </svg>239
                        </span>
                    </div>
                </div>

                <div class="item interview"  @click="go_newsdetail(item)">
                    <div class="img-show">
                        <img src="https://qiniu.epipe.cn/5408433809756454912" />
                    </div>
                    <div class="item-content">
                        <h2>代理商的酸辣粉机</h2>
                        <div class="item-text">发上来的房间的十来份简历的设计费了圣诞节福利三等奖了房间乱收费教科书的蓝精灵法律手段房间里</div>
                        <div class="item_infor">
                            <span>2018-09-20</span>
                            <span class="spanRight">
                                <svg style="width: 0.2rem;height: 0.14rem" class="icon" aria-hidden="false">
                                    <use xlink:href="#icon-yuedu"></use>
                                </svg>396
                            </span>
                        </div>
                    </div>
                </div>
                
                <div class="cont agencies" >
                    <div class="img-show">       
                        <img src="https://qiniu.epipe.cn/5408309973509668864"/>
                    </div>
                    <div class="item-text">
                        <h2>国家安全生产监督管理局</h2>
                        <article>
                            根据《国务院关于机构设置的通知》（国发〔2008〕）11号），设立国家安全生产监督管理总局（正部级），为国务院直属机构。
                        </article>
                    </div>
                </div>
        </div>

    </section>
</template>


<script>
export default {
    data(){
        return {

            isShowPrompt:true,
            historyData :[],

        }
    },

    mounted(){
        this.getHistory();

        setTimeout(e=>{
            this.$refs.input.focus()
        },1000)
                
    },
    methods:{
        go_back(){
            window.location.href = "epipe://?&mark=history_back";
        },
        getHistory(){ //获取历史记录
            this.historyData = localStorage.getItem('homeSearch').split('|')
        },
        setHistory(str){ //存入历史记录

            for(let i = 0;i<this.historyData.length;i++){

                if(str==this.historyData[i]){
                    this.historyData.splice(i,1)
                    this.historyData.unshift(str)
                    localStorage.setItem('homeSearch',this.historyData.join('|'))
                    return;
                }
            }

            this.historyData.unshift(str)
            if(this.historyData.length>13){
                this.historyData = this.historyData.splice(0,13)
            }
            localStorage.setItem('homeSearch',this.historyData.join('|'))

        },
        delHistory(index){//删除历史记录
            this.historyData.splice(index,1)
            localStorage.setItem('homeSearch',this.historyData.join('|'))
        },
        searchClick(){ //点击搜索
            let searchValue = this.$refs.input.value;
            this.$refs.input.blur();
            if(searchValue==''){
                this.$toast('你搜索的内容不能为空')
                return
            }
            this.setHistory(searchValue)
            this.isShowPrompt = false;
        },
    }

  
}
</script>


<style lang="stylus" scoped>

    .header{
        display flex;
        padding 0.07rem 0.15rem;
        height 0.44rem;
        background-color #0fc37c;
        box-sizing: border-box;
        line-height 0.3rem;


        .search-main{
            flex 1
        }

        .search{
            position relative
            width:2.5rem;
            height 0.3rem;
            border-radius 0.3rem;
            background-color #0c9c63; 
            overflow hidden;
            margin 0 auto;

            .search_icon{
                position absolute;
                width:0.15rem;
                height 0.15rem;
                background-image url(../../assets/search_icon.png)
                background-size 0.15rem 0.15rem;
                top:8px;
                left:10px;
            }

            input{
                position absolute;
                width 2.1rem;
                height 100%;
                background-color #0c9c63;
                color #fff;
                font-size 0.14rem;
                border none;
                outline none;
                left:0.3rem;
                -webkit-appearance:none;
            }
            input::-webkit-input-placeholder{color:#fff;}
            input::-webkit-search-cancel-button {display: none;}
            input::-moz-placeholder{  
                color:#fff;
            }
            input:-moz-placeholder{  
                color:#fff;
            }
            input:-ms-input-placeholder{ 
                color:#fff;
            }
        }

        .search_btn{
            font-size 0.16rem;
            color:#fff;
        }
    }

    .main{
        padding-top 1px;
        height 100%;
       
    }

    .search_prompt{
        font-size 0.14rem;
        color:#666;

        h3{
            text-indent 0.15rem;
            margin-top:0.1rem;
            margin-bottom:0.05rem;
            font-size:0.15rem;
        }
    }

    .search_hot{

        ul{
            display flex;
            height 0.4rem;
            line-height 40px;
        }

        li{
            flex 1
            text-align center;
            background-color #fff;
            border-right 1px solid #eee;
        }

        li:last-child{
            border none;
        }
    }

    .search_history{
        overflow hidden

        .items{
            width:50%;
            float left;
            height 0.4rem;
            line-height 0.4rem;
            background-color #fff;
            text-indent 0.15rem;
            overflow hidden;
            border-right 1px solid #eee;
            border-bottom 1px solid #eee;
            box-sizing: border-box;
        }

        .items:nth-child(odd){
            margin 0;
        }

        span{
            float left;
            width 82%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .items_close{
            width 17%;
            height 100%;
            float right;
        }
        
        svg{
            display block;
            margin 0.13rem auto;

        }
    }

// 头条
 
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

