<template>
  <section class="padding_bottom_content">
    <img style="min-height:1.36rem" @click="go_newsdetail(banner)" :src=banner.imgUrl  class="banner_img" />
    <div @click="go_exhibition" class="find_con_div">
      <ul>
        <li class="find_color_div chose_blue_color">
        </li>
        <li class="find_color_div22">展会</li>
      </ul>
      <ul>
        <li class="find_color_div33">更多</li>
        <li>
          <svg style="width: 0.15rem;height: 0.15rem" class="icon" aria-hidden="false">
            <use xlink:href="#icon-into"></use>
          </svg>
        </li>
      </ul>
    </div>
    <div @click="go_newsdetail(exhibitionData)" class="exhit_div">
      <img v-if="exhibitionData.coverImg!=''"
           style="border-radius: 0.03rem;overflow: hidden;width: 100%;height: 1.83rem"
           :src=exhibitionData.coverImg|img_format
      />
      <img v-else="exhibitionData.coverImg!=''"
           style="border-radius: 0.03rem;overflow: hidden;width: 100%;height: 1.83rem" src="../../assets/pic3.png"/>
      <div>
        <span class="over_width">{{exhibitionData.title}}</span>
      </div>
    </div>


    <div @click="go_supply" class="find_con_div">
      <ul>
        <li class="find_color_div chose_red_color">
        </li>
        <li class="find_color_div22">供需</li>
      </ul>
      <ul>
        <li class="find_color_div33">更多</li>
        <li>
          <svg style="width: 0.15rem;height: 0.15rem" class="icon" aria-hidden="false">
            <use xlink:href="#icon-into"></use>
          </svg>
        </li>
      </ul>
    </div>
    <div>
      <ul class="tender_div1" v-for="(item,index) in supplyData" :key="index"  @click="go_newsdetail(item)">
        <li v-html="item.title" class="item-title"></li>
        <li class="simple-ellipsis" v-html="item.content"></li>
      </ul>
    </div>


    <div @click="go_tender" class="find_con_div">
      <ul>
        <li class="find_color_div">
        </li>
        <li class="find_color_div22">招投标</li>
      </ul>
      <ul>
        <li class="find_color_div33">更多</li>
        <li>
          <svg style="width: 0.15rem;height: 0.15rem;color:red" class="icon" aria-hidden="false">
            <use xlink:href="#icon-into"></use>
          </svg>
        </li>
      </ul>
    </div>
    <div>
      <ul class="tender_div1" v-for="(item,index) in tenderData" :key="index" @click="go_newsdetail(item)">
        <li v-html="item.title" class="item-title"></li>
        <li class="simple-ellipsis" v-html="item.content"></li>
      </ul>
    </div>
  </section>
</template>

<script>
  import Util from '../../js/Util.js'
  import store from '../../store/index'
  import {mapState} from 'vuex';
  export default {
    data () {
      return {
        banner: '',
        exhibitionData: {},
        supplyData: [],
        tenderData: [],
        loading: false,
        test: `<div><span style="background-color: transparent;">　　</span><span style="background-color: transparent;">发布时间：2017.12.14</span></div><div><span style="background-color: transparent;">&nbsp; &nbsp; &nbsp; &nbsp; 所在地：浙江杭州</span><br></div><div><span style="background-color: transparent;">&nbsp; &nbsp; &nbsp; &nbsp; 有效期：360天</span><br></div><div><br></div><div>　　浙江华丰新材料股份有限公司</div><div>　　联系人：郑珊红（来电时请说是从中国管道商务网看到我的）</div><div>　　电话：86-571-63328628</div><div>　　手机：15968855076</div><div>　　传真：86-571-63331088</div><div>　　地址：富阳市富春街道金秋大道37号</div><div>　　邮编：311400</div><div>　　E-mail：kaifabu@zjhfgy.com</div><div><br></div><div>　　详细说明：</div><div>　　玻璃纤维增强树脂混凝土-沉井施工法筒体</div><div>　　产品介绍</div><div>　　以玻璃纤维增强热固性树脂为内外层，以颗粒石英砂增强热固性树脂为中间层，采用振动工艺方法制成。</div><div>　　管道的直径范围为DN1200-DN4000，管道每根2米，采用经喷涂处理的不锈钢套筒连接。</div><div>　　产品代替钢筋水泥沉井、玻璃钢预制泵站，用于海绵城市雨水收集、城市污水收集一体预制泵站或保护筒体。</div><div><br></div><div>　　产品特点</div><div>　　1、耐腐蚀性优良，无需任何防腐，使用寿命长。</div><div>　　2、轻质高强度：是传统预制钢筋混凝土沉井重量的1/2，抗压强度高出2倍多；</div><div>　　3、密封性好：内外结构层采用玻纤与树脂增强，内外表面不会出现如钢筋水泥沉井那样细小裂纹；</div><div>　　4、无需大开挖，无需基坑围护，作业面积小，施工安全度高。</div><div>　　5、施工快捷，周期短，如4米口径，10米深，施工周期3-5天。而水泥混凝土沉井施工2-3个月。</div>`,
      }
    },
    components: {},
    created(){
      if (window.localStorage.exhibition) {
        this.exhibitionData = JSON.parse(window.localStorage.exhibition)[0]
      }
      if (window.localStorage.supply) {
        this.supplyData = JSON.parse(window.localStorage.supply)[0]
      }
      if (window.localStorage.tender) {
        this.tenderData = JSON.parse(window.localStorage.tender)[0]
      }
      if (window.localStorage.find_banner) {
        this.banner = JSON.parse(window.localStorage.find_banner)
      }
    },
    mounted(){
      let that = this;

      function getcontent_show() { //广告图
        return that.axios.get(that.Service.content_show + that.Service.queryString({type: 4, locationId: 40}));
      }

      function exhibition() {  //展会
        return that.axios.get(that.Service.content_headline + that.Service.queryString({type: 3, pageSize: 1}));
      }

      function supply() { //供需
        return that.axios.get(that.Service.content_headline + that.Service.queryString({type: 4, pageSize: 3}));
      }

      function tender() { //招投标
        return that.axios.get(that.Service.content_headline + that.Service.queryString({type: 2, pageSize: 3}));
      }
    /*
    * 一次性的把展会 供需 招投标
    * */
      that.axios.all([getcontent_show(), exhibition(), supply(), tender()]).then(that.axios.spread(function (banner, exhibitionData, supplyData, tenderData) {
      
        if (banner.data.b) {
            banner.data.b[0].imgUrl=banner.data.b[0].imgUrl+'?imageslim&imageView2/1/w/750/h/320'
            that.banner = banner.data.b[0]
            window.localStorage.find_banner = JSON.stringify(banner.data.b[0]);
          }
          if (exhibitionData.data.b) {
            that.exhibitionData = exhibitionData.data.b.data[0];
          }
          if (supplyData.data.b) {
            supplyData.data.b.data.map(function(item,index){
              item.content = Util.HTMLDecode(item.content).replace(/<[^>]+>/g, "").replace(/\s/g, "");
            });
            that.supplyData = supplyData.data.b.data
          }
          if (tenderData.data.b) {
            tenderData.data.b.data.map(function(item,index){
              item.content = Util.HTMLDecode(item.content).replace(/<[^>]+>/g, "").replace(/\s/g, "");
            });
            that.tenderData = tenderData.data.b.data;
          }
        }
      )).catch(function (error) {

      });
    },
    methods: {
      go_exhibition(){
        window.location.href = "epipe://?&mark=exhibition"
      },
      go_supply(){
        window.location.href = "epipe://?&mark=supply "
      },
      go_tender(){
        window.location.href = "epipe://?&mark=tender"
      },
      go_newsdetail(item){
        if (item.url) {
          console.log(item)
          if (item.url != "#") {
            let obj = {};
            obj.title = Util.Title_format(item.title);
            obj.imageUrl = item.imgUrl;
            obj.text =  '';
            let data = JSON.stringify(obj)
            window.location.href = "epipe://?&mark=newsdetail&title=" + obj.title +'&data'+data+ "&url=" + item.url;
          }
        } else {
          console.log(item)
          let obj = {};
          obj.title = Util.Title_format(item.title);
          obj.imageUrl = item.coverImg;
          console.log(item)
          obj.text =  Util.Title_format(item.content.slice(0,40));
          let data = JSON.stringify(obj)
          window.location.href = "epipe://?&mark=newsdetail&title=" + obj.title + "&_id=" + item.id+'&data='+data;
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  @import "../../style/variable.styl";
  .exhit_div {
    margin: 0.15rem 0.15rem 0 0.15rem;
    height: 1.83rem;
    position: relative;
    overflow: hidden;
    margin-top -0.005rem
  }
  .item-title{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .exhit_div div {
    height: 0.45rem;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    bottom: 0;
    line-height: 0.45rem;
  }

  .exhit_div div span {
    color: #fff;
    font-size: 0.15rem;
    padding: 0 0.14rem 0 0.14rem;
  }

  .find_con_div {
    margin-top: 0.08rem;
    height: 0.44rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 0.15rem;
    margin-right: 0.15rem;
    align-items: center;
  }

  .find_con_div:active {
    opacity $opacity_common
  }

  .tender_div1:active {
    background-color $opacity_bgcolor
  }
  .tender_div1:not(:last-child){
    border-bottom: 1px solid #dedede;
  }
  .find_con_div > ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .find_color_div {
    background-color: $green_color;
    width: 0.04rem;
    height: 0.24rem;
  }

  .find_color_div22 {
    margin-left: 0.1rem;
    font-size: 0.15rem;
  }

  .find_color_div33 {
    margin-right: 0.05rem;
    font-size: 0.15rem;
    color: #666;
  }

  .tender_div1 {
    margin: 0 0.15rem 0 0.15rem;
    padding: 0.15rem;
    background-color: #fff;
    border-radius: 0.027rem;
  }

  .tender_div1 li {
    color: #666;
    font-size: 0.13rem;
    margin-top: 0.058rem;
    line-height 0.2rem
  }

  .tender_div1 li:first-child {
    color: #333;
    font-size: 0.15rem;
    font-weight: bold;
    margin: 0;
  }

  .chose_blue_color
    background-color $blue_color

  .chose_green_color
    color $green_color

  .chose_red_color
    background-color $red_color
</style>
