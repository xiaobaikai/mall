<template>
  <div class="search-wrapper">
    <div class="search-wrapper">
      <div class="search-container">
        <div class="search-bar-vice">
          <i class="iconfont icon-sousuoicon"></i>
          <input type="text" class="search-input-vice" maxlength="20" v-model="searchKey">
          <i class="iconfont icon-guanbiicon" @click="clearInput" v-show="!showSuggestion"></i>
        </div>
        <div class="search-btn" @click="handleSearch">搜索</div>
      </div>
      <div class="no-search" v-if="!hasSearch">
        <div class="suggestion-content" v-if="showSuggestion">
          <div class="history" v-if="historyList.length>0">
            <p class="sub-title">最近搜索</p>
            <div class="suggestions">
              <div class="suggestion-item" v-for="(item,index) in historyList" :key="index" @click="handleSuggestion(item)">{{item}}</div>
            </div>
          </div>
          <div class="hot">
            <p class="sub-title">热门搜索</p>
            <div class="suggestions">
              <div class="suggestion-item" v-for="(item,index) in hotList" :key="index" @click="handleSuggestion(item.name)">{{item.name}}</div>
            </div>
          </div>
        </div>
        <div class="related-search" v-else>
          <div class="related-title">关于“{{searchKey | trim}}”的搜索</div>
          <div class="related-item"></div>
        </div>
      </div>
      <div class="has-search" v-else>
        <div class="selections">
          <div class="selection-item" @click="handleSorting('')">综合排序</div>
          <div class="selection-item" @click="handleSorting('salenum')">销量优先</div>
          <div class="selection-item" @click="handleSorting('goodsStorePrice')">价格优先</div>
        </div>
        <div class="search-result" ref="result">
          <router-link :to="{path:'/goodsdetail',query:{goodsId: item.goodsId}}" class="result-item" v-for="(item,index) in resultList" :key="index" v-if="resultList.length>0">
            <div class="goods-picture">
              <img :src="imgPrefix + item.goodsImage" alt="商品">
            </div>
            <div class="goods-details">
              <div class="goods-desc">{{item.goodsName}}</div>
              <div class="goods-opr">
                <div class="price">￥{{item.goodsStorePrice}}</div>
                <div class="buy">
                  <i class="iconfont icon-xiaogouwucheicon" @click.prevent="addToCart(index)"></i>
                  <span class="btn-buy"  @click.prevent="buyNow(index)">立即购买</span>
                </div>
              </div>
            </div>
          </router-link>
          <infinite-loading spinner="bubbles" @distance="1" @infinite="loadMore" ref="infiniteLoading">
        <span slot="no-more">
          暂无更多数据
        </span>
            <span slot="no-results">
          暂无结果
        </span>
          </infinite-loading>
          <!--<div class="no-result" v-if="resultList.length<1">暂无搜索结果</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const InfiniteLoading = () => import("vue-infinite-loading");
  export default{
    name: "Search",
    components:{
      InfiniteLoading
    },
    data(){
      return{
        showSuggestion: true,
        searchKey: this.$route.query.key || "",
        hasSearch: false,
        resultList: [],
        imgPrefix: "",
        historyList: localStorage.getItem("historySearch") ? localStorage.getItem("historySearch").split(',') : [],
        hotList: [],
        initOrder: true,
        saleOrder: true,
        priceOrder: true,
        pageNo: 1,
        order: "",
        sortField: "",
      }
    },
    watch:{
      searchKey(){
        if(!this.searchKey){
          this.hasSearch = false;
        }
        this.handleSearchKey();
      }
    },
    filters:{
      trim(str){
        return str.trim();
      }
    },
    created(){
      this.getHotKey();
      let keyword = this.$route.query.key;
      if(keyword){
        this.handleSearch();
      }
    },
    methods:{
      handleSearchKey(){
        setTimeout(() =>{
          if(this.searchKey){
            this.showSuggestion = false;
          }else{
            this.showSuggestion = true;
          }
        },200);
      },
      clearInput(){
        this.searchKey = "";
      },
      /*搜索*/
      handleSearch(){
        if(this.searchKey){
          this.hasSearch = true;
          let arr = localStorage.getItem("historySearch") ? localStorage.getItem("historySearch").split(",") : [];
          if(arr.indexOf(this.searchKey)<0){
            arr.unshift(this.searchKey);
          }
          if(arr.length > 10){
            arr = arr.slice(0,10);
          }
          this.historyList = arr;
          localStorage.setItem("historySearch",arr);
          this.pageNo = 1;
        }
      },
      /*排序*/
      handleSorting(field){
        console.log("field",field);
        this.sortField = field;
        if(field === 'salenum'){
          this.order = this.saleOrder ? 'asc' : 'desc';
          this.saleOrder = !this.saleOrder;
        }else if(field === 'goodsStorePrice'){
          this.order = this.priceOrder ? 'asc' : 'desc';
          this.priceOrder = !this.priceOrder;
        }else{
          this.order = "";
        }
        this.changeFilter();
      },
      /*加载更多*/
      loadMore($state){
        setTimeout(() =>{
          this.axios.post(this.baseURL.mall+"/m/search/goodsKeywordSearch"+this.Service.queryString({
            keyword: this.searchKey,
            pageNo: this.pageNo,
            sortField: this.sortField || "",
            sortOrder: this.order || ""
          })).then(res =>{
            console.log("搜索结果",res);
            if(res.data.h.code === 200){
              if(res.data.b.goods.length<1){
                $state.complete();
              }else{
                this.pageNo ++;
                this.imgPrefix = res.data.b.imgPrefix;
                this.resultList = this.resultList.concat(res.data.b.goods);
                $state.loaded();
              }
            }else{
              $state.complete();
            }
          });
        },200);
      },
      changeFilter() {
        this.pageNo = 1;
        this.resultList = [];
        this.$nextTick(() => {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
        });
      },
      handleSuggestion(key){
        this.searchKey = key;
        this.resultList = [];
        this.handleSearch();
      },
      /*请求热门搜索关键字*/
      getHotKey(){
        this.axios.get(this.baseURL.mall + '/m/search/hotKeywords').then(res =>{
          console.log("热门搜索关键字",res);
          if(res.data.h.code === 200){
            this.hotList = res.data.b;
          }
        })
      },
      addToCart(index){
        console.log(index);
        this.axios.post(this.baseURL.mall + "/m/cart/addCartItems"+this.Service.queryString({
          token:this.mallToken.getToken(),
          goodsId:this.resultList[index].goodsId,
          count:1,
          specId:this.resultList[index].specId
        })).then(res=>{
          console.log(res);
          if(res.data.h.code==200){
            this.$toast(res.data.b.msg);
          }else  if(res.data.h.code === 50 || res.data.h.code === 30){
            if(this.isApp.state){
              window.location.href = "epipe://?&mark=login";
            }else{
              this.$router.replace("/accountlogin");
            }
          }else{
            this.$toast(res.data.h.msg);
          }
        })
      },
      buyNow(index){
        console.log(index);
        this.axios.post(this.baseURL.mall + "/m/cart/buy_now"+this.Service.queryString({
          token:this.mallToken.getToken(),
          goodsId:this.resultList[index].goodsId,
          count:1,
          specId:this.resultList[index].specId
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
              this.$router.replace("/accountlogin");
            }
          }else{
            this.$toast(res.data.h.msg);
          }
        })
      }
    },
  }
</script>

<style lang="stylus" scoped="true">
  .search-container{
    z-index 9;
    box-sizing border-box;
    display flex;
    justify-content space-between;
    align-items center;
    position fixed;
    left 0;
    top 0;
    width: 100%;
    height: 45px;
    padding: 0 0.15rem;
    background: white;
    border-bottom 1px solid #e5e5e5;
    .search-bar{
      width: 3.25rem;
      height: 29px;
      margin 0 auto;
      line-height 29px;
      padding 0 0.1rem;
      background: rgba(255,255,255,0.7);
      border-radius 0.145rem;
    }
    .icon-search{
      width: 14px;
      height: 15px;
    }
    .search-input{
      width: 3rem;
      height inherit;
      font-size 0.14rem;
      color: #ccc;
      outline none;
      background transparent;
    }
  }
  .search-bar-vice{
    width: 2.65rem;
    height: 29px;
    white-space nowrap;
    line-height 29px;
    padding 0 0.1rem;
    border-radius 0.145rem;
    background: #f2f2f5;
    .search-input-vice{
      width 2.25rem;
      height inherit;
      font-size 0.14rem;
      color: #333;
      outline none;
      background transparent;
    }
  }
  .search-btn{
    width: 0.5rem;
    height: 29px;
    border-radius 4px;
    background: #d74a45;
    color: white;
    line-height 29px;
    text-align center;
  }
  .suggestion-content{
    margin-top 46px;
    padding 0.2rem 0.15rem;
    background: white;
    border-bottom 1px solid #e5e5e5;
  }
  .sub-title{
    font-size: 0.11rem;
    color: #666;
    margin-bottom 0.15rem;
  }
  .hot .sub-title{
    margin-top 0.2rem;
  }
  .suggestions{
    font-size 0;
  }
  .suggestion-item{
    display inline-block;
    height: 0.3rem;
    line-height 0.3rem;
    padding: 0 4px;
    margin-right: 0.1rem;
    margin-bottom: 0.1rem;
    text-align center;
    font-size 0.12rem;
    color #666;
    border: 1px solid #e5e5e5;
    background #efefef;
    cursor pointer;
  }
  .related-search{
    margin-top: 46px;
    background: white;
    border-bottom: 1px solid #e5e5e5;
  }
  .related-title,.related-item{
    height: 40px;
    margin-left 0.15rem;
    line-height: 40px;
    font-size: 14px;
  }
  .related-title{
    color: #666;
    border-bottom: 1px dotted #e5e5e5;
  }
  .related-item{
    color: #d74745;
  }
  .related-item:not(:last-child){
    border-bottom: 1px dotted #e5e5e5;
  }
  .icon-guanbiicon{
    color: #b3b3b3;
  }
  .has-search{
    margin-top 46px;
    background: white;
  }
  .selections{
    display flex;
    justify-content space-between;
    align-items center;
    position fixed;
    left 0;
    top 45px;
    z-index 9;
    width: 100%;
    height: 40px;
    line-height 40px;
    text-align center;
    border-bottom 1px solid #e5e5e5;
    background: white;
  }
  .selection-item{
    flex: 1;
  }
  .result-item{
    display flex;
    justify-content space-between;
    height: 1.2rem;
  }
  .goods-picture{
    width: 1.35rem;
    img{
      display block;
      width: 1.1rem;
      height: 1.1rem;
      margin: 0.05rem auto;
      background: #dedede;
    }
  }
  .goods-details{
    display flex;
    flex-direction column;
    justify-content space-between;
    width: 2.25rem;
    padding-right 0.15rem;
    border-bottom 1px solid #e5e5e5;
  }
  .goods-desc{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin-top 0.15rem;
    font-size: 14px;
    line-height: 18px;
    color: #333;
  }
  .goods-opr{
    display flex;
    justify-content space-between;
  }
  .price{
    margin-bottom 0.18rem;
    font-size: 0.18rem;
    line-height: 1;
    color: #d74845;
  }
  .buy{
    font-size: 0;
  }
  .icon-xiaogouwucheicon{
    margin-right: 0.2rem;
  }
  .btn-buy{
    display inline-block;
    width: 0.75rem;
    height: 0.3rem;
    margin-bottom 0.1rem;
    line-height 0.3rem;
    font-size: 0.14rem;
    text-align center;
    background: #d74a45;
    border-radius: 4px;
    color: white;
  }
  .search-result{
    -webkit-overflow-scrolling: touch;
    padding-top 40px;
  }
  .no-result{
    text-align: center;
    height: 1rem;
    line-height: 1rem;
    color: #999;
  }
</style>
