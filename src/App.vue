<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        keepAlive: false
      }
    },
    components: {},
    mounted(){

    }
  }
</script>
<style>
  body,#app{
    height: 100%;
  }
</style>
