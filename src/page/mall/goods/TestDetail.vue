<template>
  <div class="par">
    <div class="" v-for="(list,i) in dataArr2">
      <p>{{list.title}}</p>
      <ul>
        <li v-for="(item,j) in list.arr">
          <span :class="[checkedArr[i] == j?'sel':'']" @click="selt(item,i,j)">{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        itemName:'',
        checkedArr:[],
        dataArr2:[
          {
            "title":"颜色",
            "arr":[
              {
                "id":1,
                "name":"boss1"
              },
              {
                "id":2,
                "name":"boss1"
              },
              {
                "id":3,
                "name":"boss1"
              }
            ]
          },
          {
            "title":"尺码",
            "arr":[
              {
                "id":13,
                "name":"33"
              },
              {
                "id":22,
                "name":"34"
              },
              {
                "id":33,
                "name":"36"
              }
            ]
          },
          {
            "title":"容量",
            "arr":[
              {
                "id":132,
                "name":"330"
              },
              {
                "id":223,
                "name":"340"
              },
              {
                "id":334,
                "name":"360"
              }
            ]
          }
        ]
      }
    },
    methods:{
      selt(item,i,j){
        //this.itemName=item.name;
        console.log(1111);
        console.log(this.checkedArr[i],j);
        // this.checkedArr[i] = j;
        this.$set(this.checkedArr,i,j);
      },
      resetCheckedArr(){
        this.dataArr2.forEach((item,index) => {
          this.checkedArr[index] = 0
        })
      }
    }
  }
</script>

<style lang="css">
  span.sel{
    color: red;
  }
</style>
