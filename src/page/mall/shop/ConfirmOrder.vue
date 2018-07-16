<template>
  <div class="confirm-order">
    <router-link to="ReceivingAdress" tag="div" class="receiving-info">
      <div v-for="(obj,i) in addressList" :key="i" v-if="addressList.length>0 && i==0">
        <p class="p1">
          <span>{{obj.trueName}}</span>
          <span>{{obj.mobPhone}}</span>
        </p>
        <p class="p2">{{obj.areaInfo}}{{obj.address}}</p>
      </div>
      <div v-if="addressList.length==0">请选择收货地址</div>
      <div>
        <i class="iconfont icon-jinru"></i>
      </div>
     </router-link>
    <div class="line"></div>
    <div class="order-list">
      <div class="settleOneStroe" v-for="(obj,i) in cartList" :key="i">
        <div class="shop-name">{{obj.storeName}}</div>
        <div class="goods-info" v-for="(item,j) in obj.list" :key="j">
          <div class="goods-pho">
            <img :src="imgPrefix+item.goodsImages" >
          </div>
          <div class="goods-coninfo">
            <div class="info">
              <p class="p1">{{item.goodsName}}</p>
              <p class="p2" v-html="item.specInfo"></p>
            </div>
            <div class="price-num">
              <div class="price">
                <span>￥</span><span>{{item.goodsPrice}}</span>
                <div class="promotion-flag" v-if="item.promotionType === 'YH'">券</div>
                <div class="promotion-flag" v-if="item.promotionType === 'ZK'">折</div>
                <div class="promotion-flag" v-if="item.promotionType === 'TG'">团</div>
              </div>
              <div class="num">
                <span>x</span><span>{{item.goodsNum}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="invoice-info">
      <div>配送服务</div>
      <div>快递运输</div>
    </div>
    <div class="invoice-info">
      <a href="#/Invoice">
        <div>发票信息</div>
        <div>{{invoiceType}}<i class="iconfont icon-jinru"></i></div>
      </a>
    </div>
    <div class="invoice-info">
      <div>折扣优惠</div>
      <div>￥{{priceInfo.promoAmount}}<i class="iconfont icon-jinru" v-if="priceInfo.promoAmount !== 0"></i></div>
    </div>
    <div class="invoice-info coupon-price">
      <div>优惠券</div>
      <div>￥{{priceInfo.couponAmount}}<i class="iconfont icon-jinru" v-if="priceInfo.couponAmount !== 0"></i></div>
    </div>
    <div class="total-price">
      <div><span>商品金额</span><span>￥{{priceInfo.goodsAmount}}</span></div>
      <div><span>运　　费</span><span>￥0.00</span></div>
      <div><span>优　　惠</span><span>￥{{priceInfo.discount}}</span></div>
      <div><span></span><span><i>付款金额：</i>￥{{priceInfo.goodsTotalPrice}}</span></div>
    </div>
    <div class="wx-pay" @click="submitPayWx"  v-if="!isNotApp"><div>微信支付</div></div>
    <div class="wx-pay" @click="submitPayZfb" v-if="isNotApp"><div>支付宝支付</div></div>
  </div>
</template>
<script>
  export default {
    data:function () {
      return{
	      formUrl:'',
	      token:'',
	      addressId:'',
	      imgPrefix:'',   //图片地址前缀
	      cartList:'',    //结算订单列表
	      addressList:'', //收件地址
        priceInfo:'',       //付款信息
	      invoiceType:'不开发票',
	      cartIds:[],
	      openInv:0,
	      invoiceId:'',
	      isNotApp:false
      }
    },
    methods:{
      getSettlement(){
        let settleOrder=JSON.parse(localStorage.getItem("settleOrder"));
        this.imgPrefix=settleOrder.imgPrefix;
        this.cartList=settleOrder.cartVoList;
        for(let i=0;i<this.cartList.length;i++){
          for(let j=0;j<this.cartList[i].list.length;j++){
            this.cartIds.push(this.cartList[i].list[j].cartId);
          }
        }
        this.priceInfo=settleOrder.map;
        this.axios.post(this.baseURL.mall + "/m/my/queryUserAddress"+this.Service.queryString({
          token:this.mallToken.getToken(),
        })).then(res=>{
          console.log(res);
          if(res.data.h.code==200){
            this.addressList=res.data.b;
            //this.addressId=this.addressList[0].addressId;
          }else  if(res.data.h.code === 50 || res.data.h.code === 30){
	          if(this.isApp.state){
		          window.location.href = "epipe://?&mark=login";
	          }else{
		          this.$router.replace("/verificationlogin?loginUrl="+encodeURIComponent(window.location.href));
	          }
          }else{
            this.$toast(res.data.h.msg);
          }
        })
      },
      submitPayZfb(){
	      if(this.addressList.length>0){
		      this.axios.post(this.baseURL.mall + "/m/my/appAlipay"+this.Service.queryString({
			      token:this.mallToken.getToken(),
			      cartIds:this.cartIds.join(','),
			      addressId:this.addressList[0].addressId,
			      openInv:this.openInv,
			      invoiceId:this.invoiceId
		      })).then(res=>{
			      console.log('支付宝',res);
			      if(res.data.h.code === 200){
				      let data={};
				      data.orderSn=res.data.b.orderSn;
				      data.imgPrefix=this.imgPrefix;
				      console.log(data);
				      data=JSON.stringify(data);
				      console.log(data);
				      window.location.href = "epipe://?&mark=aliPay&data="+data+"&url="+res.data.b.orderStr;
			      }else if(res.data.h.code === 30 || res.data.h.code === 50){
				      if(this.isApp.state){
					      window.location.href = "epipe://?&mark=login";
				      }else{
					      this.$router.replace("/verificationlogin?loginUrl="+encodeURIComponent(window.location.href));
				      }
			      }
		      })
        }else{
		      this.$toast('请选择收货地址');
        }
      },
      submitPayWx(){
        //alert(this.openInv);
        //console.log(this.addressList);
        if(this.addressList.length>0){
	        this.axios.post(this.baseURL.mall + "/m/my/getCode"+this.Service.queryString({
		        token:this.mallToken.getToken(),
		        cartIds:this.cartIds.join(','),
		        addressId:this.addressList[0].addressId,
		        openInv:this.openInv,
		        invoiceId:this.invoiceId
	        })).then(res=>{
		        console.log(res);
		        if(res.data.h.code==200) {
//            localStorage.removeItem('invoiceListArr');
			        window.location.href = res.data.b;
		        }else if(res.data.h.code === 30 || res.data.h.code === 50){
			        if(this.isApp.state){
				        window.location.href = "epipe://?&mark=login";
			        }else{
				        this.$router.replace("/verificationlogin?loginUrl="+encodeURIComponent(window.location.href));
			        }
		        }
	        })
        }else{
	        this.$toast('请选择收货地址');
        }
      },
      queryInvoice(){
        this.axios.post(this.baseURL.mall + "/m/my/queryInvoice"+this.Service.queryString({
          token:this.mallToken.getToken()
        })).then(res=>{
          console.log('发票信息',res);
          if(res.data.h.code==200){
            if(res.data.b){
              localStorage.setItem("setInvoiceId",res.data.b.invId);
              let dataInvoice=res.data.b;
              this.invoiceId=dataInvoice.invId;
              if(dataInvoice.invState==2){
                this.invoiceType='普通发票 个人';
                this.openInv=1;
              }else if(dataInvoice.invState==1 && dataInvoice.invRecProvince==''){
                this.invoiceType='普通发票 公司';
                this.openInv=1;
              }else if(dataInvoice.invState==1 && dataInvoice.invRecProvince!=''){
                this.invoiceType='增值税专用发票';
                this.openInv=1;
              }else if(dataInvoice.invState==''){
                this.openInv=0;
                this.invoiceType='不开发票';
              }
            }else{
              localStorage.setItem("setInvoiceId",'');
              this.openInv=0;
              this.invoiceId='';
            }
          }
        })
      }
    },
    created(){
	    document.title="确认订单";
	    if(this.isApp.state){
		    this.isNotApp=true;
	    }
	    this.token=this.mallToken.getToken();
	    this.formUrl=this.baseURL.mall+"/m/my/h5Alipay";
	    this.getSettlement();
	    this.queryInvoice();
    }
  }
</script>
<style lang="stylus" scoped>
    input{
        -webkit-appearance: none;
        outline none;
        background transparent;
    }
  .confirm-order{
    overflow hidden;
    -webkit-overflow-scrolling:tocuh;
    .receiving-info{
      display flex;
      justify-content space-between;
      align-items baseline;
      padding .15rem .1rem;
      background #fff;
      a{
        display block;
        width 100%;
        height 100%;
      }
      div{
        height 100%;
      }
      div:first-child{
        p{
          font-size .15rem;
          color #333;
          line-height 1.27;
        }
        .p1{
          span{
            font-weight bold;
          }
        }
        .p2{
        }
      }
      div:last-child{
        width 15px;
        i{
          color #ccc;
          font-size .12rem;
          line-height .35rem;
        }
      }
    }
    .line{
      width 100%;
      height .05rem;
      background url("../../../assets/recive-line.png") repeat-x;
      background-size auto 100%;
      background-color #fff;
    }
    .order-list{
      .settleOneStroe{
        overflow hidden;
        width 100%;
      }
      .shop-name{
        height .45rem;
        line-height .45rem;
        padding-left .1rem;
        font-size .14rem;
        color: #333;
        border-bottom 1px solid #e5e5e5;
        font-weight bold;
        margin-top .1rem;
        background #fff;
      }
      .goods-info{
        padding .15rem .1rem;
        overflow hidden;
        border-bottom 1px solid #e5e5e5;
        background #fff;
        .goods-pho{
          width .7rem;
          height .7rem;
          float left;
          overflow hidden;
          margin-right .2rem;
          img{
            width 100%;
            height 100%;
          }
        }
        .goods-coninfo{
          margin-left .9rem;
          .info{
            p{
              font-size .12rem;
            }
            .p1{
              color #333;
              line-height .2rem;
              text-align justify;
            }
            .p2{
              color #999;
              margin-top .06rem;
            }
          }
          .price-num{
            overflow hidden;
            margin-top .2rem;
            .price{
              float left;
              color #d74a45;
              position relative;
              .promotion-flag{
                width 0.2rem;
                height 0.18rem;
                line-height 0.18rem;
                border-radius 2px;
                text-align  center;
                font-size .11rem;
                background #e54545;
                color #fff;
                position absolute;
                top .02rem;
                right -0.28rem;
              }
              span:first-child{
                font-size .12rem;
              }
              span:last-child{
                font-size .16rem;
              }
            }
            .num{
              float right;
              color #999;
              margin-right .1rem;
              span:first-child{
                font-size .14rem;
              }
              span:last-child{
                font-size .15rem;
              }
            }
          }
        }
      }
      .goods-info:last-child{
        border-bottom none;
      }
    }
    .invoice-info{
      margin-top .1rem;
      background #fff;
      overflow hidden;
      border-bottom 1px solid #e5e5e5;
      height .45rem;
      a{
        display block;
        width 100%;
        height 100%;
      }
      div{
        height .45rem;
        line-height .45rem;
        padding 0 .1rem;
        i{
          font-size .12rem;
          color #ccc;
        }
      }
      div:first-child{
        float left;
        font-size .16rem;
        color #333;
      }
      div:last-child{
        float right;
        font-size .12rem;
        color #333;
      }
    }
    .invoice-info:last-child{
      margin-top 0;
      border none;
    }
    .coupon-price{
      margin-top 0;
    }
    .total-price{
      margin-top .1rem;
      background #fff;
      padding 0 .1rem;
      overflow hidden;
      div{
        margin-top .15rem;
        overflow hidden;
        span:first-child{
          float left;
          font-size .16rem;
          color #333;
        }
        span:last-child{
          float right;
          font-size .16rem;
          color #d74a45;
          font-weight bold;
        }
        i{
          font-style normal;
          color #333;
          font-weight bold;
        }
      }
    }
    .wx-pay{
      padding .25rem .1rem;
      background #fff;
      div,input{
          width 100%;
          height .45rem;
          line-height .45rem;
          text-align center;
          color #fff;
          font-size .16rem;
          background #54b736;
          border-radius 4px;
      }
     }
  }
</style>
