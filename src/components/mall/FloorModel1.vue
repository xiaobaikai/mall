<template>
  <div class="floor">
    <div class="floor-title">
      <img :src="imgPrefix + floorObj.floorTitleImg" alt="">
    </div>
    <div class="floor-1-view">
      <div class="floor-1-container">
        <a :href="item.advUrl" class="item" v-for="(item,index) in floorObj.floorAdvs" :key="index">
          <div class="item-img-container">
            <div class="item-img">
              <img :src="imgPrefix + item.advImg" alt="">
            </div>
          </div>
          <div class="item-title">{{item.advTitle}}</div>
          <div class="item-price">{{item.advDescribe}}</div>
        </a>
      </div>
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
        <div class="swiper-pagination-1" slot="pagination" v-if="floorObj.floorBanners.length>1"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: "FloorModel1",
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
            el: '.swiper-pagination-1'
          }
        },
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .floor{
    overflow-x hidden;
    width 3.45rem;
  }
  .floor-title{
    width 100%;
    height: 0.6rem;
    line-height 0.6rem;
    img{
      width: 100%;
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
  .floor-1-view{
    overflow-x scroll;
    width 3.45rem;
    margin-bottom 0.1rem;
    background: white;
    border-radius: 2px;
    .floor-1-container{
      width 15rem;
    }
    .item{
      float left;
      width 1.2rem;
      padding 0.15rem 0;
      text-align center;
      line-height 1.27;
    }
    .item-img-container{
      width: 100%;
    }
    .item-img{
      width: 0.9rem;
      height: 0.9rem;
      margin: 0 auto;
      margin-bottom 0.15rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .item-title{
      margin-bottom 0.12rem;
      font-title: 0.12rem;
      color #666;
    }
    .item-price{
      font-size: 0.14rem;
      color: #d74a45;
    }
  }
  .floor-1-view .item:not(:last-child){
    .item-img-container{
      border-right: 1px solid #f5f5f8;
    }
  }
  .floor-1-view::-webkit-scrollbar{
    width 0;
    height 0;
  }
  .floor-banner{
    .swiper-container{
      height: 100%;
    }
  }
  .swiper-slide img{
    width: 100%;
    max-height 100%;
  }
</style>
