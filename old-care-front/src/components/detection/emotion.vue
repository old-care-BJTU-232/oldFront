<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>老人情绪检测</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row>
        <el-col :span="5" v-for="(o, index) in 8" :key="o" :offset="index%4 > 0 ? 1 : 0" style="margin-bottom: 15px">
          <el-card :body-style="{ padding: '0px' }">
            <img src="http://49.232.157.63:8400/images/e81a4a80c972406ebf83695b8e109262.png" class="image">
            <div style="padding: 14px;" id="imageSpan">
              <span>事件：</span>
              <span>老人姓名：</span>
              <time class="time">时间：{{ currentDate }}</time>
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
        currentDate: '2000-01-15 15:53:51',
        tableData: [
          {
            id: 1,
            name: '180',
            gender: '男',
            phone: '17857242620',
            id_card: '330523200001107817',
            birthday: '2000-01-10',
            checkin_date: '2020-01-10',
            checkout_date: '2020-01-10',
            imgset_dir: '',
            profile_photo: '',
            DESCRIPTION:'XXXXX'
          },
          {
            id: 2,
            pname: '小bai',
            breed: '哈士奇',
            age: '10',
            sex: '公',
            pic: '0',
            pTime: '2020-01-10',
            confirmTime: '2020-01-10',
            user: 'admin',
            reqNum: '0'
          }
        ],
      }
    },
    methods: {
    },
    created () {
      this.$http.get('home/petsInforGet/' + window.sessionStorage.getItem('sid'))
          .then(res => {
            const data = res.data
            console.log(data)
            if (data.status === 200) {
              this.tableData = data.pets
            }
          }, error => console.log(error))
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
