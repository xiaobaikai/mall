<template>
  <div class="floor">
    <div class="floor-title">
      <img :src="imgPrefix + floorObj.floorTitleImg" alt="">
    </div>
    <div class="floor-3-view">
      <a :href="item.advUrl" class="item" v-for="(item,index) in floorObj.floorAdvs" :key="index">
        <p class="item-title" v-html="item.advTitle"></p>
        <p class="item-des" v-html="item.advDescribe"></p>
        <div class="item-img">
          <img :src="imgPrefix + item.advImg" alt="">
        </div>
      </a>
    </div>
    <div class="floor-banner">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(slide,index) in floorObj.floorBanners" :key="index">
          <a :href="slide.advUrl" v-if="slide.advUrl">
            <img :src="imgPrefix + slide.advImg" alt="">
          </a>
          <div v-else>
            <img :src="imgPrefix + slide.advImg" alt="">
          </div>
        </swiper-slide>
        <div class="swiper-pagination-3" slot="pagination" v-if="floorObj.floorBanners.length>1"></div>
      </swiper>
    </div>
  </div>
</template>
<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: "FloorModel3",
    props: ["floorObj","imgPrefix"],
    components:{
      swiper,
      swiperSlide,
    },
    data(){
      return{
        searchContainerActive: false,
        showSearch: false,
        swiperOption: {
          autoplay:true,
          pagination: {
            el: '.swiper-pagination-3'
          }
        },
      }
    },
  }
</script>
<style lang="stylus" scoped="true">
  .floor{
    overflow-x hidden;
    width 3.45rem;
  }
  .floor-title{
    width 100%;
    height: 0.6rem;
    line-height 0.6rem;
    img{
      width 100%;
      max-height 100%;
      vertical-align: middle;
    }
  }
  .floor-banner{
    width 3.45rem;
    height: 0.8625rem;
    border-radius 0.08rem;
    background: white;
    .swiper-container{
      height inherit;
    }
  }
  .floor-3-view{
    display flex;
    justify-content space-between;
    flex-wrap wrap;
    .item{
      width: 1.07rem;
      height: 1.55rem;
      padding-top 0.15rem;
      padding-bottom 0.1rem;
      margin-bottom 0.12rem;
      background: white;
      line-height 1.27;
      text-align center;
    }
    .item-title{
      margin-bottom 0.1rem;
      font-size: 0.14rem;
      font-weight bold;
      color: #333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .item-des{
      font-size: 0.12rem;
      color: #99;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .item-img{
      width: 0.9rem;
      height: 0.9rem;
      margin: 0 auto;
      margin-top: 0.24rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .swiper-slide img{
    width: 100%;
    max-height 100%;
  }
</style>
