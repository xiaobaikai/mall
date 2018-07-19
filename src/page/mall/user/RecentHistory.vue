<template>
  <div class="recent-wrapper">
    <div class="history-list" :class="{'padding-bottom':list.length>5}" v-if="list.length>0">
      <router-link :to="{path:'/goodsdetail',query:{goodsId: item.goodsId}}" class="list-item" v-for="(item,index) in list" :key="index">
        <div class="left">
          <img :src="imgPrefix + item.goodsImageMore[0]" alt="">
        </div>
        <div class="right">
          <div class="desc">{{item.goodsName}}</div>
          <div class="sub">
            <div class="price" v-if="item.priceNegotiable === 0">￥{{item.goodsStorePrice}}</div>
            <div class="price" v-if="item.priceNegotiable === 1">待询价</div>
            <div class="buy" v-if="item.priceNegotiable === 0">
              <i class="iconfont icon-gouwucheicon"  @click.prevent="addToCart(index,'addCartItems')"></i>
              <button class="buy-now" @click.prevent="buyNow(index,'buy_now')">立即购买</button>
            </div>
            <div class="buy" v-if="item.priceNegotiable === 1">
              <i class="iconfont icon-xunjiadan-weixuanzhong" @click.prevent="addToCart(index,'addInquiry')"></i>
              <button class="buy-now" @click.prevent="buyNow(index,'inquiryNow')">立即询价</button>
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <div class="no-data" v-if="list.length<1">暂无浏览记录</div>
    <footer-tab :category="3"></footer-tab>
  </div>
</template>
<script>
  const FooterTab = () => import("../../../components/mall/FooterTab.vue");
  export default {
    name: "RecentHistory",
    components:{
      FooterTab
    },
    data(){
      return{
//        list: JSON.parse(localStorage.getItem("browser_history")),
        list: localStorage.getItem("browser_history") ? JSON.parse(localStorage.getItem("browser_history")) : [],
        imgPrefix: localStorage.getItem("imgPrefix"),
      }
    },
    methods:{
	    addToCart(index,type){
		    console.log(index);
		    this.axios.post(this.baseURL.mall + "/m/cart/"+type+this.Service.queryString({
			    token:this.mallToken.getToken(),
			    goodsId:this.list[index].goodsId,
			    count:1,
			    specId:this.list[index].specId
		    })).then(res=>{
			    console.log(res);
			    if(res.data.h.code==200){
				    this.$toast(res.data.b.msg);
				    //this.$refs.footertab.getGoodsNumber();
			    }else  if(res.data.h.code === 50 || res.data.h.code === 30){
				    if(this.isApp.state){
					    window.location.href = "epipe://?&mark=login";
				    }else{
					    this.$router.replace("/accountlogin?loginUrl="+encodeURIComponent(window.location.href));
				    }
			    }else{
				    this.$toast(res.data.h.msg);
			    }
		    })
	    },
	    buyNow(index,type){
		    console.log(index);
		    this.axios.post(this.baseURL.mall + "/m/cart/"+type+this.Service.queryString({
			    token:this.mallToken.getToken(),
			    goodsId:this.list[index].goodsId,
			    count:1,
			    specId:this.list[index].specId
		    })).then(res=>{
			    console.log(res);
			    if(res.data.h.code==200){
				    localStorage.setItem("settleOrder",JSON.stringify(res.data.b));
				    if(localStorage.getItem("settleOrder")){
					    this.$router.push({path:'/ConfirmOrder'});
				    }
			    }else  if(res.data.h.code === 50 || res.data.h.code === 30){
				    if(this.isApp.state){
					    window.location.href = "epipe://?&mark=login";
				    }else{
					    this.$router.replace("/accountlogin?loginUrl="+encodeURIComponent(window.location.href));
				    }
			    }else{
				    this.$toast(res.data.h.msg);
			    }
		    })
	    },
    },
    created(){
      document.title = "最近浏览";
      console.log(JSON.parse(localStorage.getItem("browser_history")));
    },
  }
</script>
<style lang="stylus" scoped>
  .history-list{
    background white;
  }
  .padding-bottom{
    padding-bottom 45px;
  }
  .list-item{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 1.2rem;
    padding-left: 0.1rem;
  }
  .left{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width 1.2rem;
    img{
      width: 1.1rem;
      /*height: 1.1rem;*/
      margin-right: 0.1rem;
      background: #dedede;
    }
  }
  .right{
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    height: 1rem;
    padding: 0.1rem 0;
    padding-right: 0.1rem;
    width calc(100% - 1.3rem);
    &::after{
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background: #e9e9e9;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      -webkit-transform-origin: center;
      transform-origin: center;
    }
    .desc{
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-size: 0.14rem;
      line-height: 0.18rem;
      color: #333;
    }
    .sub{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }
    .price{
      font-size: 0.18rem;
      color: #d74a45;
    }
    .buy{
      font-size: 0;
      i{
        font-size .18rem;
        color #999;
        margin-right .18rem;
      }
    }
    .buy-now{
      width: 0.75rem;
      height: 0.3rem;
      text-align: center;
      line-height: 0.3rem;
      font-size: 0.14rem;
      background: #d74a45;
      color: #fff;
      border-radius: 2px;
      border: none;
    }
  }
  .no-data{
    text-align: center;
    height: 1rem;
    line-height: 1rem;
    color: #999;
  }
</style>
