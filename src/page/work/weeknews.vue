<style scoped lang="stylus">
  @import "../../style/variable.styl";
  .img_ul
    display flex
    flex-direction row
    margin 0.15rem
    margin-top 0
    padding-bottom 0.1rem
    border-radius 0.03rem
    flex-wrap wrap
    padding-left 0.04rem
    background-color: #fff
    li
      width 0.7rem
      border-radius 0.03rem
      overflow hidden
      margin-left 0.11rem
      height 0.55rem
      margin-top 0.1rem

  .day_chose_img
    margin 0.15rem 0.15rem 0 0.15rem
    background-color #fff
    display flex
    border-radius 0.03rem
    padding 0.15rem
    flex-direction row
    align-items center
    &:active
      background-color $bg_color
    .day_chose_span2
      font-size 0.14rem
      color $font_color_6
      padding-right 0.15rem
    .day_chose_span
      font-size 0.15rem
      color $font_color_3
      font-weight bold
      flex 1
</style>
<template>
  <section class="padding_bottom_content">
    <TopHead native="native" title="周报" bgcolor="#fd545c"></TopHead>
    <div style="margin-top: 0.44rem">
      <TimeTab time_type="week" font_color="#fd545c" v-on:data_time="day_data_time"></TimeTab>
    </div>
    <div>
      <WorkInput
        placeholder="请在此处输入您的工作总结~"
        title="本周工作总结"
        color="#fc9698"
        v-on:text_change="text_change"
        :is_input=!has_journal
        maxlength="1000"
        :work_value="journal_detail.workSummary?journal_detail.workSummary:''"
        :work_text="journal_detail.workSummary?journal_detail.workSummary:''"
      ></WorkInput>
      <WorkInput
        placeholder="请在此处输入您的下周工作计划~"
        title="下周工作计划"
        color="#fc9698"
        v-on:text_change="text_change"
        :is_input=!has_journal
        maxlength="1000"
        :work_value="journal_detail.nextPlan?journal_detail.nextPlan:''"
        :work_text="journal_detail.nextPlan?journal_detail.nextPlan:''"
      ></WorkInput>
      <ul v-if="!has_journal" class="day_chose_img" @click="get_camera">
        <li class="day_chose_span">选择图片</li>
        <li class="day_chose_span2">已添加{{URL.length}}张</li>
        <li class="day_chose_span3">
          <svg style="font-size: 0.22rem" class="icon" aria-hidden="false">
            <use xlink:href="#icon-tianjiazhaopian"></use>
          </svg>
        </li>
      </ul>
      <ul v-if="URL.length>0&has_journal" class="day_chose_img" @click="get_camera">
        <li class="day_chose_span">图片</li>
      </ul>
      <ul v-if="URL.length>0" class="img_ul">
        <li @click="go_imgdetail(index)" v-for="(itme,index) in URL">
          <img :src=itme|journal_img style="width: 100%;height: 100%"/>
        </li>
      </ul>
      <WorkInput
        v-on:text_change="text_change"
        :is_input=!has_journal
        title="备注"
        maxlength="40"
        color="#fc9698"
        placeholder="请输入您的备注~"
        :work_value="journal_detail.remarks?journal_detail.remarks:''"
        :work_text="journal_detail.remarks?journal_detail.remarks:''"
      ></WorkInput>
      <CopeMan
        :has_journal="!has_journal"
        color="#fd545c"
        :data_list=chosed_list
        v-on:remove_item="remove_item"
      ></CopeMan>
      <WorkButton
        v-if="!has_journal"
        v-on:left_click="left_click_button"
        v-on:right_click="right_click_button"
        left_title="存草稿"
        right_title="发送"
        bgcolor="#fd545c"
      ></WorkButton>
    </div>
  </section>
</template>
<script>
  let save_day = (index, text, that) => {
    if (that.work_value.length == 0) {
      that.$toast("请输入工作总结");
    } else if (that.next_work_value.length == 0) {
      that.$toast("请输入下周工作计划");
    } else if (that.chosed_list.length == 0) {
      that.$toast("请选择抄送人");
    } else {
      let string_id = ""
      for (var i = 0; i < that.chosed_list.length; i++) {
        string_id = string_id + "|" + that.chosed_list[i].userId
      }
      string_id = string_id.slice(1)
      let string_img = ""
      for (var i = 0; i < that.URL.length; i++) {
        string_img = string_img + "|" + that.URL[i]
      }
      string_img = string_img.slice(1)
      that.axios.post(that.Service.reportAdd + that.Service.queryString({
          workSummary: that.work_value,
          nextPlan: that.next_work_value,
          remarks: that.mark_value,
          reportType: 2,
          id: that.journal_detail.id ? that.journal_detail.id : "",
          reportTimeStr: that.reportTimeStr,
          reportTime: that.reportTime,
          receiveUserIds: string_id,//id串
          imgUrl: string_img,//图片串
          isDraft: index
        })).then(function (data) {
        console.log(data)
       if (data.data.h.code == 200) {
          that.$alert(text).then(
            function () {
              window.sessionStorage.mark_value = ""
              window.sessionStorage.next_mark_value = ""
              window.sessionStorage.work_value = ""
              window.location.href = "epipe://?&mark=history_back"
            }
          )
        }
      })
    }
  }
  let getdetail = (that) => {
    that.axios.get(that.Service.reportQuery, {
      params: {
        reportType: 2,
        reportTime: that.reportTime
      }
    }).then(function (data) {
      console.log(data.data.b)
     if (data.data.h.code == 200) {
        that.URL = []
        that.work_value = ''
        that.mark_value = ''
        if (window.localStorage.chosed_list) {
          that.chosed_list = JSON.parse(window.localStorage.chosed_list)
        }
        that.has_journal = true
        that.journal_detail = {}
        if (data.data.b == null) {
          that.has_journal = false
        } else if (data.data.b) {
          that.URL = data.data.b.imgData
          if (data.data.b.isDraft == 1) {
            data.data.b.workSummary = Util.HTMLDecode(data.data.b.workSummary)
            data.data.b.nextPlan = Util.HTMLDecode(data.data.b.nextPlan)
            data.data.b.remarks = Util.HTMLDecode(data.data.b.remarks)
            that.journal_detail = data.data.b
            that.chosed_list = data.data.b.receiverData
            that.has_journal = false
            that.work_value = data.data.b.workSummary.replace(/\n/g, '<br/>')
            that.next_work_value = data.data.b.nextPlan.replace(/\n/g, '<br/>')
            that.mark_value = data.data.b.remarks.replace(/\n/g, '<br/>')
          } else {
            that.journal_detail = data.data.b
            that.chosed_list = data.data.b.receiverData
            that.has_journal = true
          }
        }
      }
    })
  }
  import {mapState, mapMutations} from 'vuex';
  import Util  from '../../js/Util.js'
  import TimeTab  from '../../components/worknews/time_tab.vue'
  import TopHead  from '../../components/topheader.vue'
  import WorkInput  from '../../components/worknews/work_input.vue'
  import WorkButton  from '../../components/worknews/work_button.vue'
  import CopeMan  from '../../components/worknews/copy_man.vue'
  export default {
    data () {
      return {
        URL: [],//图片地址
        work_value: '',
        next_work_value: '',//下月工作总结
        mark_value: '',
        reportTimeStr: '',//汇报时间 字符串
        reportTime: '',//汇报时间 yyyy-MM-dd
        chosed_list: [], //抄送人
        chosed_list_two: [], //抄送人
        has_journal: true,
        journal_detail: {}
      }
    },
    components: {
      TimeTab,
      WorkInput,
      WorkButton,
      CopeMan,
      TopHead
    },
    methods: {
      day_data_time: function (data, text) { //子组件接收时间数据
        let that = this;
        console.log(data)
        console.log(text)
        this.reportTime = data
        this.reportTimeStr = text
        getdetail(that)
      },
      text_change: function (data, title) { //实时监听工作内容输入
        console.log(data)
        console.log(title)
        if (title == "本周工作总结") {
          window.sessionStorage.work_value = data
          if (data.length >= 1000) {
            this.$toast("最多输入1000字~")
          }
          this.work_value = data.replace(/\n/g, '<br/>')
        } else if (title == "下周工作计划") {
          window.sessionStorage.next_work_value = data
          if (data.length >= 1000) {
            this.$toast("最多输入1000字~")
          }
          this.next_work_value = data.replace(/\n/g, '<br/>')
        } else {
          window.sessionStorage.mark_value = data
          if (data.length >= 40) {
            this.$toast("最多输入40字~")
          }
          this.mark_value = data.replace(/\n/g, '<br/>')
        }
      },
      get_camera: function () { //调用手机摄像头
        let that = this;
        if (that.URL.length >= 8) {
          this.$alert("最多选择8张图片")
        } else {
          window.location.href = "epipe://?&mark=camera&num=" + that.URL.length
          window["epipe_camera_callback"] = URL => {
            that.URL = that.URL.concat(URL);
            if (window.sessionStorage.work_value) {
              this.journal_detail = Object.assign(this.journal_detail, {workSummary: window.sessionStorage.work_value})
            }
            if (window.sessionStorage.next_work_value) {
              this.journal_detail = Object.assign(this.journal_detail, {nextPlan: window.sessionStorage.next_work_value})
            }
            if (window.sessionStorage.mark_value) {
              this.journal_detail = Object.assign(this.journal_detail, {remarks: window.sessionStorage.mark_value})
            }
          }
        }
      },
      go_imgdetail: function (index) {
        let obj = {index_num: index, data: this.URL, type: this.has_journal ? "0" : "1"}
        window.location.href = "epipe://?&mark=imgdetail&url=" + JSON.stringify(obj);
      },
      left_click_button: function () {
        let that = this;
        this.$confirm("是否确定存入草稿")
          .then(function () {
            save_day(1, "存入草稿成功", that)
          }).catch(
          function () {
          }
        )

      },
      right_click_button: function () {
        let that = this;
        this.$confirm("是否确定发送")
          .then(function () {
            save_day(0, "发送成功", that)
          }).catch(
          function () {
          }
        )
      },
      ...mapMutations([
        'change_man'
      ]),
      remove_item: function (itme, index) {
        this.chosed_list.splice(index, 1);
        this.change_man(this.chosed_list)
      }
    },
    mounted(){
      let that = this;
      this.axios.get(this.Service.reportReceiver).then(function (data) { //查询抄送人
        if (data.data.h.code == 10) {
          window.location.href = "epipe://?&mark=login_out"
        } else if (data.data.h.code == 200) {
          that.chosed_list = data.data.b.data
          window.localStorage.chosed_list = JSON.stringify(that.chosed_list)
          that.change_man(that.chosed_list)
        }
      })
      getdetail(that)
      window["epipe_removephoto_callback"] = index => { //原生的调用删除图片的方法
        that.URL.splice(parseInt(index), 1)
        if (window.sessionStorage.work_value) {
          this.journal_detail = Object.assign(this.journal_detail, {workSummary: window.sessionStorage.work_value})
        }
        if (window.sessionStorage.next_work_value) {
          this.journal_detail = Object.assign(this.journal_detail, {nextPlan: window.sessionStorage.next_work_value})
        }
        if (window.sessionStorage.mark_value) {
          this.journal_detail = Object.assign(this.journal_detail, {remarks: window.sessionStorage.mark_value})
        }
      }
    },
    computed: mapState(["chosed_man_state"]),
    activated(){
      this.chosed_list = this.chosed_man_state
      if (window.sessionStorage.work_value) {
        this.journal_detail = Object.assign(this.journal_detail, {workSummary: window.sessionStorage.work_value})
      }
      if (window.sessionStorage.next_work_value) {
        this.journal_detail = Object.assign(this.journal_detail, {nextPlan: window.sessionStorage.next_work_value})
      }
      if (window.sessionStorage.mark_value) {
        this.journal_detail = Object.assign(this.journal_detail, {remarks: window.sessionStorage.mark_value})
      }
    }
  }
</script>
