<template>
  <section>
    <div @click="go_newsdetail(item)" v-for="item in newsData" class="exhit_div">
      <img v-if="item.coverImg!=''" style="border-radius: 0.03rem;overflow: hidden;width: 100%;height: 1.83rem" :src=item.coverImg|img_format />
      <img v-else="item.coverImg!=''"  style="border-radius: 0.03rem;overflow: hidden;width: 100%;height: 1.83rem"  src="../../assets/pic3.png" />
      <div>
        <span class="over_width" v-html="item.title"></span>
      </div>
    </div>
    <infinite-loading spinner="bubbles" :on-infinite="onInfinite" ref="infiniteLoading">
    <span slot="no-more">
      暂无更多加载
    </span>
      <span slot="no-results">
      暂无结果
    </span>
    </infinite-loading>
  </section>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading';
  import Util from '../../js/Util.js'
  let pageNo = 2
  export default {
    data () {
      return {
        newsData: ''
      }
    },
    components: {
      InfiniteLoading
    }, methods: {
      go_newsdetail(item){
        let title = Util.Title_format(item.title)
        let obj = {};
        obj.title = title;
        obj.imageUrl = item.coverImg;
        obj.text = Util.Title_format(item.content.slice(0,40));
        let data = JSON.stringify(obj)
        window.location.href = "epipe://?&mark=newsdetail&title=" + title + "&_id=" + item.id+'&data='+data;
      },
      onInfinite(){ //上拉加载更多
        let that = this;
        //首页头条
        console.log(pageNo)
        this.axios.get(this.Service.content_headline, {
          params: {
            type: 3,
            pageSize: 5,
            pageNo: pageNo
          }
        }).then(function (data) {
          setTimeout(() => {
            if (data.data.b.pageTotal == pageNo || data.data.b.pageSize > data.data.b.dataTotal) {
              that.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
            }
            if (data.data.b) {
              pageNo++
              that.newsData = that.newsData.concat(data.data.b.data)
              that.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
            }
          }, 700);
        }).catch(function (error) {
          console.log(error);
        });
      }
    },
    created(){
      if (window.localStorage.exhibition) {
        this.newsData = JSON.parse(window.localStorage.exhibition)
      }
    },
    mounted(){
      let that = this;
      //展会
      this.axios.get(this.Service.content_headline, {
        params: {
          type: 3,
          pageSize: 5,
          pageNo: 1
        }
      }).then(function (data) {
        console.log(data)
        if (data.data.b) {
          that.newsData = data.data.b.data
          window.localStorage.exhibition = JSON.stringify(data.data.b.data)
        }
      }).catch(function (error) {
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
