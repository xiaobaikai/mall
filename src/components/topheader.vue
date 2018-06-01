<style scoped>
  .header_top {
    position: fixed;
    top: 0;
    width: 100%;
    height: 0.44rem;
    text-align: center;
    line-height: 0.44rem;
    color: #fff;
    font-size: 0.185rem;
    letter-spacing: 0.012rem;
    background-color: #609ef7;
    display: flex;
    z-index:2;
  }

  .header_top > li {
    flex: 1;
  }

  .header_top > li:first-child:active {
    opacity: 0.5;
  }
</style>
<template>
  <div v-if="show!='pro'">
    <div class="header_top" :style="{background:bgcolor}">
      <li @click="history_back">
        <svg style="font-size: 0.17rem;margin-left: -0.2rem" class="icon"
             aria-hidden="false">
          <use xlink:href="#icon-zuoyoujiantou"></use>
        </svg>
      </li>
      <li style="flex: 4.5">{{title}}</li>
      <li @click="show_edit">
        <svg v-if="is_button" style="font-size: 0.17rem;color: #fff" class="icon"
             aria-hidden="false">
          <use xlink:href="#icon-caidan"></use>
        </svg>
      </li>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    props: ["title", "native", "mark", "bgcolor", "is_button",'show','bgColor'],
    methods: {
      history_back: function () {
        
        if (this.mark == "mark"||this.native =='mark') {
          this.$emit("history_back")
        } else {
          if (this.native == "native") {
            window.location.href = "epipe://?&mark=history_back"
          } else {
            window.history.back()
          }
        }
      },
      show_edit: function () {
        if (this.is_button) {
          this.$emit("show_edit")
        }
      }
    },
    mounted(){
      // console.log(this.show)
    }
  }
</script>
