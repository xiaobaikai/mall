<template>
    <div>
        <TopHead
            :bgcolor = color
            title ='全部应用'
            native="native"
            :is_relative_approva="is_relative_approva"
            v-on:show_edit='compile'
        ></TopHead>

        <div style="margin-top:0.59rem">

            <div class="menu-item">
                    <p class="item-title"> <i></i> <span>常用应用</span>  </p>
                    <ul>
                        <li>
                         <svg style="font-size: 0.33rem;"  class="icon img" aria-hidden="false">
                            <use xlink:href="#icon-jiyao"></use>
                        </svg>
                        <span>我的审批</span>
                    </li>
                    <li>
                         <svg style="font-size: 0.33rem;"  class="icon img" aria-hidden="false">
                            <use xlink:href="#icon-gongzuohuibao"></use>
                        </svg>
                        <span>工作汇报</span>
                    </li>
                        <li v-for="(c,i) in addData" :key="i" @click="go_jump(c)">
                            <img :src="c.icon"/>
                            <span>{{c.name}}</span>
                            <svg style="font-size: 0.12rem;color:#609ef7" class="icon delete" aria-hidden="false" @click="delApps(c,i)" v-if="isRedact">
                                <use xlink:href="#icon-shanchu1"></use>
                            </svg>
                        </li>
                        <li v-if="addData.length<6">
                            <svg style="font-size: 0.33rem;" class="icon img" aria-hidden="false">
                                <use xlink:href="#icon-tianjiarenyuan"></use>
                            </svg>
                            添加
                        </li>
                    </ul>
            </div>

            <div class="menu-item" v-for="(item,index) in workData" :key="index" v-if="item.id>-1&&item.apps.length">
                    <p class="item-title"> <i></i> <span>{{item.name}}</span> <a class="manage"></a></p>
                    <ul :class="item.hideFlag==='1'?'opacity':''">
                        <li v-for="(c,i) in item.apps" :key="i" @click="go_jump(c)"  v-if="c.delFlag!='1'">
                            <img :src="c.icon"/>
                            <span>{{c.name}}</span>

                            <svg style="font-size: 0.12rem;color:#609ef7" class="icon delete" aria-hidden="false" @click="addApps(c,i)"  v-if="isRedact&&addData.length<6">
                                <use xlink:href="#icon-tianjia"></use>
                            </svg>
                        </li>
                    </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import TopHead  from '../../components/topheader.vue'  //header导航栏
    export default {
        data() {
            return {
                workData : [],
                oldData : [],
                is_relative_approva : {title:'编辑',isShow:true},
                addData : [],
                isRedact : false, //是否编辑状态
            }
        },
        created() {

        },
        mounted() {
             let _this = this;
            this.axios.get('/work/app/list').then(res=>{
                _this.workData = res.data.b.appCategorys;
                _this.oldData = JSON.parse(JSON.stringify(this.workData))
                _this.addData = res.data.b.appCategorys[0].apps;
            })
        },

        methods:{
            compile(){
                this.isRedact=!this.isRedact;

                if(this.is_relative_approva.title=='编辑'){
                    this.is_relative_approva.title = '完成'
                }else{
                    this.is_relative_approva.title = '编辑'
                    this.finish();
                }
            },
            go_jump(){
            },
            addApps(item,index){
                item.delFlag = '1';
                this.addData.push(item)
            },
            delApps(data,index){
                this.workData.forEach(element => {
                        element.apps.forEach(item =>{
                            if(item.id==data.id){
                                item.delFlag = '0';
                            }
                        })
                });
                this.addData.splice(index,1)
            },
            finish(){
                // let arr = [];
                let that = this;
                let arr = [],idStr='';
                this.oldData.forEach((item,index)=>{
                    item.apps.forEach((el,i)=>{
                        if(index!=0&&el.delFlag!=this.workData[index].apps[i].delFlag){
                            idStr+=el.id+'|';
                        }
                    })
                })

                if(idStr!='') arr.push({ids:idStr.slice(0,-1),type:'1'})
                let str = JSON.stringify(arr)

                 that.axios({
                        method:"post",
                        url:"/work/app/set",
                        headers:{
                            'Content-type': 'application/x-www-form-urlencoded'
                        },
                        data:{apps:str},
                    transformRequest: [function (data) {
                        let ret = ''
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                }).then((res)=>{ 
                    console.log(res)
                })

            }

        },
        components:{
            TopHead,
        }
        
    }
</script>

<style scoped lang="stylus">

    .manage{
        color #609ef7;
        font-size 0.14rem;
        float right;
        margin-top 0.02rem;
    }

    .opacity{
        opacity 0.6
    }

    .menu-item{
        box-sizing border-box;
        background-color #fff;
        margin 0 0.15rem;
        padding 0.15rem;
        border-raius 0.04rem;
        margin-bottom 0.15rem;

        .item-title{
            overflow hidden

            i{
                float left
                width 0.03rem;
                height 0.16rem;
                background-color #f80;
                border-radius 0.03rem;
                margin-top 0.03rem;
                margin-right 0.06rem;
            }

            span{
                float left
                font-size 0.16rem;
                color #333
            }
        }

        img,.img{
            display block;
            width 0.27rem;
            height 0.27rem;
            margin 0 auto;
            margin-bottom 0.03rem;
        }

        ul{
            overflow hidden

            li{
                float left;
                width 25%;
                text-align center;
                margin-top 0.15rem;
                position relative

                .delete{
                    position absolute;
                    top:-0.05rem;
                    right:0.15rem;
                }
            }

            span{
                fon-size 0.14rem;
                color #333
            }
        }
    }

</style>