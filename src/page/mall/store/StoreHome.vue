<template>
  <div>
    <div class="search-container">
      <div class="search-bar-vice">
        <i class="iconfont icon-sousuoicon"></i>
        <input type="text" class="search-input-vice" maxlength="20" v-model="searchKey">
        <i class="iconfont icon-guanbiicon" @click="clearInput" v-show="!showSuggestion"></i>
      </div>
      <div class="search-btn" @click="handleSearch">搜索</div>
    </div>
    <div class="store-info">
      <div class="info">
        <div><img src="../../../assets/defaultStore.png" alt="店铺头像"></div>
        <div>深圳前海优管旗舰店</div>
      </div>
      <div class="collecte">
        <div>
          <p>2150</p>
          <p>粉丝数</p>
        </div>
        <div>收藏店铺</div>
      </div>
    </div>
    <div class="banner-img"></div>
    <div class="floor-4-view">
      <div class="floor-title">
        <img src="" alt="">
      </div>
      <router-link :to="{path:'/goodsdetail',query:{goodsId: ''}}" class="item">
        <div class="item-content">
          <div class="item-img">
            <img src="" alt="">
          </div>
          <div class="item-title">换个地方还管饭得花个大姐夫</div>
          <div class="item-sub">
            <div class="item-price">￥58</div>
            <div class="buy">
              <svg class="icon icon-car" aria-hidden="false">
                <use xlink:href="#icon-gouwuche-xuanzhongicon"></use>
              </svg>
            </div>
          </div>
        </div>
      </router-link>
      <router-link :to="{path:'/goodsdetail',query:{goodsId: ''}}" class="item">
        <div class="item-content">
          <div class="item-img">
            <img src="" alt="">
          </div>
          <div class="item-title">换个地方还管饭得花个大姐夫</div>
          <div class="item-sub">
            <div class="item-price">￥58</div>
            <div class="buy">
              <svg class="icon icon-car" aria-hidden="false">
                <use xlink:href="#icon-gouwuche-xuanzhongicon"></use>
              </svg>
            </div>
          </div>
        </div>
      </router-link>
      <router-link :to="{path:'/goodsdetail',query:{goodsId: ''}}" class="item">
        <div class="item-content">
          <div class="item-img">
            <img src="" alt="">
          </div>
          <div class="item-title">换个地方还管饭得花个大姐夫</div>
          <div class="item-sub">
            <div class="item-price">￥58</div>
            <div class="buy">
              <svg class="icon icon-car" aria-hidden="false">
                <use xlink:href="#icon-gouwuche-xuanzhongicon"></use>
              </svg>
            </div>
          </div>
        </div>
      </router-link>
      <router-link :to="{path:'/goodsdetail',query:{goodsId: ''}}" class="item">
        <div class="item-content">
          <div class="item-img">
            <img src="" alt="">
          </div>
          <div class="item-title">换个地方还管饭得花个大姐夫</div>
          <div class="item-sub">
            <div class="item-price">￥58</div>
            <div class="buy">
              <svg class="icon icon-car" aria-hidden="false">
                <use xlink:href="#icon-gouwuche-xuanzhongicon"></use>
              </svg>
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <footer-tab :category="0"></footer-tab>
  </div>
</template>
<script>
	const FooterTab = () => import("../../../components/mall/FooterTab.vue");
	
	export default {
		name: "StoreHome",
		components:{
			FooterTab
		},
		data(){
			return{
   
			}
		},
		methods: {
			handleSearch(){
				this.axios.post(this.baseURL.mall+"/m/store/goodsList"+this.Service.queryString({
					storeId: 2098321823548416,
					goodsName: '管道',
					pageNo: 1,
					pageSize: 10
				})).then(res =>{
					  console.log('店铺搜索',res);
        })
      }
    },
    created(){
      document.title = '店铺首页';
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
  .icon-guanbiicon{
    color: #b3b3b3;
  }
  .store-info{
    height .45rem;
    padding .08rem .15rem;
    overflow hidden;
    margin-top 45px;
    box-sizing border-box;
    .info{
      height 100%;
      float left;
      div{
        float left;
        height 100%;
        line-height .29rem;
        font-size .14rem;
        color #333;
        margin-right .15rem;
        img{
          display block;
          height 100%;
        }
      }
    }
    .collecte{
      float right;
      height 100%;
      div{
        float left;
        text-align center;
        p{
          font-size .12px;
          color #ff8800;
          line-height 1.27;
        }
      }
      div:last-child{
        width .6rem;
        height .23rem;
        line-height .23rem;
        border-radius .15rem;
        background #ff8800;
        font-size  .12rem;
        color #fff;
        margin-left .15rem;
        position relative;
        top 50%;
        transform translateY(-50%);
      }
    }
  }
  .banner-img{
    height 1.6rem;
    background #ccc;
    img{
      height 100%;
    }
  }
  .floor-4-view{
    display: flex;
    justify-content space-between;
    flex-wrap wrap;
    padding 0 .15rem;
    .floor-title{
      width 100%;
      height: 0.6rem;
      img{
        width 100%;
        max-height 100%;
      }
    }
    .item{
      width: 1.675rem;
      height: 2.45rem;
      margin-bottom 0.1rem;
    }
    .item-content{
      box-sizing border-box;
      width: inherit;
      height inherit;
      padding: 0.15rem 0.14rem 0.16rem 0.14rem;
      background: white;
    }
    .item-img{
      width: 1.4rem;
      height: 1.4rem;
      margin: 0 auto;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .item-title{
      margin-top: .16rem;
      font-size: .14rem;
      line-height: .18rem;
      color: #666;
      display: -webkit-box;
      /* autoprefixer: off */
      -webkit-box-orient: vertical;
      /* autoprefixer: on */
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .item-sub{
      display flex;
      justify-content space-between;
    }
    .item-price{
      font-size 0.16rem;
      color: #333;
    }
    .item-menu{
      display flex;
      justify-content space-between;
      flex-wrap wrap;
      width: inherit;
      height inherit;
    }
    .menu-tab{
      width: 0.79rem;
      height: 0.53rem;
      margin-bottom 0.105rem;
      font-size 0.12rem;
      color #666;
      text-align center;
      line-height 0.53rem;
      background: white;
      border-radius 0.02rem;
    }
  }
</style>