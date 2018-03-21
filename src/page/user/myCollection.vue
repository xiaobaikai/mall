<template>
  <section>
      <header>
          <div>全部</div>
          <div>文章</div>
          <div>图片</div>
      </header>
  </section>
</template>


<script>
export default {
  
}
</script>


<style lang="stylus" scoped>

     header{
         heigh 0.5rem;
         display flex
         border-bottom 1px solid #ddd;

         >div{
             flex  1;
             text-align center 
             font-size 0.14rem;
             color #333;
             line-height 0.5rem;
         }
     }

</style>
