<template>
  <div class="mall-index">
    <div class="search-container" :class="{'search-container-active':searchContainerActive}">
      <div class="search-bar" @click="linkSearch">
        <i class="iconfont icon-sousuoicon"></i>
        <input type="text" class="search-input">
      </div>
    </div>
    <div class="banner">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(slide,index) in banner" :key="index">
          <a :href="slide.advUrl" v-if="slide.advUrl">
            <img :src="bannerPrefix + slide.advImg" v-if="slide">
          </a>
          <img :src="bannerPrefix + slide.advImg" v-else>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="floor-container">
      <div v-for="(floor,index) in floors">
        <floor-model1 v-if="floor.floorLayout === 'H51'" :floorObj="floor" :imgPrefix="imgPrefix"></floor-model1>
        <floor-model2 v-else-if="floor.floorLayout === 'H52'" :floorObj="floor" :imgPrefix="imgPrefix"></floor-model2>
        <floor-model3 v-else-if="floor.floorLayout === 'H53'" :floorObj="floor" :imgPrefix="imgPrefix"></floor-model3>
        <floor-model4 v-else="floor.floorLayout === 'H54'" :floorObj="floor" :imgPrefix="imgPrefix"></floor-model4>
      </div>
    </div>
    <footer-tab :category="0"></footer-tab>
  </div>
</template>
<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  const FooterTab = () => import("../../../components/mall/FooterTab.vue");
  const FloorModel1 = () => import("../../../components/mall/FloorModel1.vue");
  const FloorModel2 = () => import("../../../components/mall/FloorModel2.vue");
  const FloorModel3 = () => import("../../../components/mall/FloorModel3.vue");
  const FloorModel4 = () => import("../../../components/mall/FloorModel4.vue");
  export default{
    name: "MallHome",
    components:{
      swiper,
      swiperSlide,
      FooterTab,
      FloorModel1,
      FloorModel2,
      FloorModel3,
      FloorModel4
    },
    data(){
      return{
        searchContainerActive: false,
        showSearch: false,
        swiperOption: {
          autoplay:true,
          pagination: {
            el: '.swiper-pagination',
          }
        },
        banner: [],
        floors: [],
        imgPrefix: "",
        bannerPrefix: "",
      }
    },
    methods:{
      getScrollTop(){
        let vm = this;
        const banner = document.querySelector(".banner");
        if(banner){
          const bannerHeight = banner.scrollHeight;
          setTimeout(() =>{
            window.onscroll = function () {
              let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
              if(scrollTop>bannerHeight){
                vm.searchContainerActive = true;
                return;
              }else{
                vm.searchContainerActive = false;
              }
            }
          },200);
        }
      },
      /*跳转搜索页*/
      linkSearch(){
        this.$router.push({path:'/mallsearch'});
      },
      /*获取楼层数据*/
      getFloor(){
        this.axios.get(this.baseURL.mall + '/m/index/indexFloors').then(res =>{
          console.log("楼层数据",res);
          if(res.data.h.code === 200){
            this.floors = res.data.b.floors;
            this.imgPrefix = res.data.b.imgPrefix;
          }
        })
      },
      /*获取banner轮播*/
      getBanner(){
        this.axios.get(this.baseURL.mall + '/m/index/indexBanners').then(res =>{
          console.log("banner数据",res);
          if(res.data.h.code === 200){
            this.bannerPrefix = res.data.b.imgPrefix;
            this.banner = res.data.b.banners;
          }
        })
      }
    },
    created(){
      
      document.title = '优优商城';
      this.getBanner();
      this.getFloor();
    },
    mounted(){
      /*微信端从商品详情页面返回首页会大概率的导致首页空白，原因未知，一下代码为解决该Bug*/
      setTimeout(() =>{
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      },0);
      this.$nextTick(() =>{
        this.getScrollTop();
      });

     
    }
  }
</script>
<style>
  .swiper-pagination-bullet-active{
    background: white;
  }
</style>
<style lang="stylus" scoped>
  .mall-index{
    background: #f5f5f8;
  }
  .banner{
    width: 100%;
    height: 1.85rem;
    .swiper-container{
      height: inherit;
    }
  }
  .floor-banner{
    .swiper-container{
      height: inherit;
    }
  }
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
      position relative;
      z-index 99;
      width: 3rem;
      height inherit;
      font-size 0.14rem;
      color: #ccc;
      outline none;
      background transparent;
    }
  }
  .search-container-active{
    background: rgba(255,255,255,1);
    &::after{
      content: "";
      position absolute;
      left 0;
      bottom -1px;
      width 100%;
      height 1px;
      background #e5e5e5;
      transform scaleY(0.5);
      transform-origin center;
    }
    .search-bar{
      background: #F2F2F5;
    }
  }
  .floor-container{
    padding 0 0.15rem;
    padding-bottom 50px;
  }
  .swiper-slide img{
    width: 100%;
    max-height 100%;
  }
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
    .floor-container{
      padding-bottom 84px;
    }
  }
</style>
