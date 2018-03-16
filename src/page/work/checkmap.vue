<template>
  <section id="mapcontent">
    <div id="allmap">
    </div>
    <div class="text_map">
      <span>{{detail.signDate?detail.signDate.substring(5,7):''}}月{{detail.signDate?detail.signDate.substring(8,10):''}}日</span>
      <ul>
        <li style="font-weight: bold">{{detail.signDate?detail.signDate.substring(10):''}}</li>
        <li>
          {{detail.destName}}
        </li>
      </ul>
      <div class="text_map_div-1">
        <li><span>外勤任务</span></li>
        <li><span>类型：</span>{{detail.taskType==2?"拜访客户":"参加活动"}}</li>
        <li><span>开始时间：</span>{{detail.beginTime}}</li>
        <li><span>结束时间：</span>{{detail.endTime}}</li>
        <li><span>目的地：</span>{{detail.destination}}</li>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        detail: ''
      }
    },
    components: {}, mounted() {
      let that = this
      let id = this.$route.query.id
      /*
      * 取到经纬度和相关信息 渲染百度地图
      * */
      this.axios.get(this.Service.outSignInfo, {params: {id:id}}).then(function (data) {
        console.log(data)
        if (data.data.h.code == 200) {
          that.detail = data.data.b
          document.body.style.height="100%"
          document.getElementById("app").style.height="100%"
          // 百度地图API功能
          var map = new BMap.Map("allmap");
          var point = new BMap.Point(data.data.b.lon, data.data.b.lat);
          var marker = new BMap.Marker(point);  // 创建标注
          map.addOverlay(marker);              // 将标注添加到地图中
          map.centerAndZoom(point, 15);
        }

      })
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .anchorBL {
    display: none;
  }

  .BMapLabel {
    font-size: 0.15rem;
  }

  #mapcontent {
    overflow: hidden;
    height: 100%;
  }

  #allmap {
    width: 100%;
    overflow: hidden;
    margin: 0;
    height: 100%;
  }

  .text_map {
    opacity: 0.9;
    position: relative;
    top: -2.5rem;
    background-color: #fff;
    margin: 0 0.15rem 0 0.15rem;
    padding: 0.15rem;
    border-radius: 0.05rem;
  }

  .text_map span {
    font-size: 0.15rem;
  }

  .text_map ul {
    margin-top: 0.05rem;
    display: flex;
    flex-direction: row;
    padding-bottom: 0.15rem;
    border-bottom: 1px solid #eee;
  }

  .text_map ul li:first-child {
    width: 0.5rem;
    font-size: 0.15rem;
  }

  .text_map ul li:last-child {
    font-size: 0.15rem;
    color: #666;
  }

  .text_map_div-1 {
    padding-top: 0.12rem;
    line-height: 0.24rem;
    color: #333;
    font-size: 0.14rem;
  }

  .text_map_div-1 li span {
    font-weight: bold;
    color: #333;
    font-size: 0.15rem;
  }
</style>
