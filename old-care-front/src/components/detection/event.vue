<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>老人情绪检测</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row>
        <el-col :span="5" v-for="(e, index) in eventList" :key="index" :offset="index%4 > 0 ? 1 : 0" style="margin-bottom: 15px">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="e.img_url" class="image">
<!--            <img src="http://49.232.157.63:8400/images/e81a4a80c972406ebf83695b8e109262.png" class="image">-->
            <div style="padding: 14px;" id="imageSpan">
              <span>事件：{{e.event_desc}}</span>
              <span>人员：{{e.old_name}}</span>
              <time class="time">时间：{{ e.event_date }}</time>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        type:0,
        eventList:[
          {
            id:2,
            event_date:'',
            event_desc:'',
            event_location:'',
            event_type:'',
            img_url:'',
            oldperson_id:'',
            old_name:''
          }
        ]
      }
    },
    watch: {
      $route(to,from){
        console.log(to);
        console.log(from);
        this.type=this.$route.params.type
        this.getEventlist()
      }
    },
    methods: {
      getEventlist(){
        this.$get('event/type',{
          type:this.type
        })
        .then(res => {
          const data = res.data
          console.log(data)
          this.eventList=data;
          this.eventList.forEach(item=>{
            // console.log(item.img_url)
            if(item.img_url != null && item.img_url != ''){
              item.img_url='http://49.232.157.63:8400/'+item.img_url;
            }else{
              item.img_url='http://49.232.157.63:8400/images/a3c44e2d538a4f43960c5a0e76b90c9c.png'
            }
          })
        }, error => console.log(error))
      }
    },
    created () {
      this.type=this.$route.params.type
      this.getEventlist()
    }
  }
</script>

<style lang="less" scoped>
  .el-breadcrumb {
    font-size: 18px;
    margin-bottom: 15px;
  }
  .el-card {
    box-shadow: 0 1px 1px rgba(0,0,0,0.15);
  }
  .image {
    width: 100%;
    width: 252px;
    height: 189px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
  #imageSpan span {
    display: block;
  }
</style>
