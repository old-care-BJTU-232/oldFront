<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>老人信息维护</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="danger" icon="el-icon-delete" size="mini"  @click="openChart()"></el-button>
    <el-card class="box-card">
      <!-- 表格显示区域-->
      <el-table :data="tableData" style="width: 100%"  :default-sort = "{prop: 'state', order: 'descending'}">
<!--        <el-table-column type="index"></el-table-column>-->
        <el-table-column prop="ID" label="id" width="50"></el-table-column>
        <el-table-column prop="username" label="姓名" width="80"></el-table-column>
        <el-table-column prop="gender" label="性别" width="50"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="id_card" sortable label="身份证" width="170"></el-table-column>
        <el-table-column prop="birthday" sortable label="出生日期" width="100"></el-table-column>
        <el-table-column prop="checkin_date" sortable label="入院日期" width="100"></el-table-column>
        <el-table-column prop="checkout_date" sortable label="离院日期" width="100"></el-table-column>
        <el-table-column prop="room_number" label="房间号" width="120"></el-table-column>
        <el-table-column prop="health_state" label="健康状况" width="120"></el-table-column>
        <el-table-column label="操作" width="175">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="修改数据" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-s-comment" size="mini" @click="modifyHandle(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除该项" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini"  @click="deleteHandle(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--对话框区域-->
      <el-dialog title="修改老人信息" :visible.sync="modifyDialogVisible" width="50%">
        <div>
          <el-form id="dialog1" label-position="left" label-width="70px" ref="formRef" :rules="rules" :model="pointedForm" >
            <el-form-item label="ID" prop="id" style="width: 150px">
              <el-input v-model="pointedForm.ID" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="username" style="width: 150px">
              <el-input v-model="pointedForm.username"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender" style="width: 150px">
              <el-input v-model="pointedForm.gender"></el-input>
            </el-form-item>
            <el-form-item label="房间号" prop="room_number" style="width: 150px">
              <el-input v-model="pointedForm.room_number"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="pointedForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="身份证" prop="id_card">
              <el-input v-model="pointedForm.id_card" ></el-input>
            </el-form-item>
            <el-form-item label="出生日期" prop="birthday">
<!--              <el-date-picker-->
<!--                      v-model="pointedForm.birthday"-->
<!--                      align="right"-->
<!--                      type="date"-->
<!--                      placeholder="选择日期"-->
<!--                      :picker-options="pickerOptions">-->
<!--              </el-date-picker>-->
              <el-input v-model="pointedForm.birthday" suffix-icon="el-icon-date"></el-input>
            </el-form-item>
            <el-form-item label="入院日期" prop="checkin_date">
<!--              <el-date-picker-->
<!--                      v-model="pointedForm.checkin_date"-->
<!--                      align="right"-->
<!--                      type="date"-->
<!--                      placeholder="选择日期"-->
<!--                      :picker-options="pickerOptions">-->
<!--              </el-date-picker>-->
              <el-input v-model="pointedForm.checkin_date" suffix-icon="el-icon-date"></el-input>
            </el-form-item>
            <el-form-item label="出院日期" prop="checkout_date">
<!--              <el-date-picker-->
<!--                      v-model="pointedForm.id_card"-->
<!--                      align="right"-->
<!--                      type="date"-->
<!--                      placeholder="选择日期"-->
<!--                      :picker-options="pickerOptions">-->
<!--              </el-date-picker>-->
              <el-input v-model="pointedForm.id_card" suffix-icon="el-icon-date"></el-input>
            </el-form-item>
            <el-form-item label="健康状况" prop="health_state">
              <el-input v-model="pointedForm.health_state"></el-input>
            </el-form-item>
            <el-form-item label-width="120px" label="第一监护人姓名" prop="firstguardian_name">
              <el-input v-model="pointedForm.firstguardian_name" ></el-input>
            </el-form-item>
            <el-form-item label-width="130px" label="与第一监护人关系" prop="firstguardian_relationship">
              <el-input v-model="pointedForm.firstguardian_relationship" ></el-input>
            </el-form-item>
            <el-form-item label-width="120px" label="第一监护人电话" prop="firstguardian_phone">
              <el-input v-model="pointedForm.firstguardian_phone" ></el-input>
            </el-form-item>
            <el-form-item label-width="120px" label="第一监护人微信" prop="firstguardian_wechat">
              <el-input v-model="pointedForm.firstguardian_wecaht" ></el-input>
            </el-form-item>
            <el-form-item label-width="120px" label="第二监护人姓名" prop="secondguardian_name">
              <el-input v-model="pointedForm.secondguardian_name" ></el-input>
            </el-form-item>
            <el-form-item label-width="130px" label="与第二监护人关系" prop="secondguardian_relationship">
              <el-input v-model="pointedForm.secondguardian_relationship" ></el-input>
            </el-form-item>
            <el-form-item label-width="120px" label="第二监护人电话" prop="secondguardian_phone">
              <el-input v-model="pointedForm.secondguardian_phone" ></el-input>
            </el-form-item>
            <el-form-item label-width="120px" label="第二监护人微信" prop="firstguardian_wechat">
              <el-input v-model="pointedForm.secondguardian_wecaht" ></el-input>
            </el-form-item>
            <el-form-item label="简述" prop="DESCRIPTION">
              <el-input type="textarea" v-model="pointedForm.DESCRIPTION" ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="modifyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifySubmit">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="deleteDialogVisible" width="50%">
        <span>你确定要删除该项数据吗？</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteSubmit">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="统计报表" :visible.sync="echartDialogVisible" width="50%">
        <div id="myCharts" ref="myCharts" style="height: 400px;"></div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        modifyDialogVisible: false,
        deleteDialogVisible: false,
        echartDialogVisible: false,
        tableData: [
          {
            ID: 1,
            username: '180',
            gender: '男',
            phone: '17857242620',
            id_card: '330523200001107817',
            birthday: '2000-01-10',
            checkin_date: '2020-01-10',
            checkout_date: '2020-01-10',
            room_number: '232',
            health_state: 'good',
            imgset_dir: '',
            profile_photo: '',
            firstguardian_name: '1',
            firstguardian_relationship: '兄弟',
            firstguardian_phone: '1453515',
            firstguardian_wechat: 'xx',
            secondguardian_name: '2',
            secondguardian_relationship: '兄弟',
            secondguardian_phone: '1453515x',
            secondguardian_wechat: 'xx',
            DESCRIPTION:'XXXXX'
          }
        ],
        pointedForm: {
          id: 2,
          pname: '',
          breed: '哈士奇',
          age: '10',
          sex: '公',
          pic: '0',
          content: '巴拉巴拉',
          state: '',
          pdetail: '',
          reqNum: '0'
        },
        rules: {
          // name: [
          //   { required: true, message: '请输入名字，该项为必填', trigger: 'blur' }
          // ],
          breed: [
            { required: true, message: '请输入品种，该项为必填', trigger: 'blur' }
          ],
          age: [
            { required: true, message: '请输入年龄，该项为必填', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请输入性别，该项为必填', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入简述，该项为必填', trigger: 'blur' }
          ],
          pdetail: [
          ]
        }
      }
    },
    methods: {
      async modifySubmit () {
        const result = await this.$http.post('home/petsInforGet/modify', this.pointedForm)
        if (result.data.status === 200) {
          this.$message.success(result.data.msg)
        } else {
          this.$message.error('修改失败')
        }
        this.modifyDialogVisible = false
      },
      async deleteSubmit () {
        const result = await this.$http.post('home/petsInforGet/delete', this.pointedForm)
        console.log(result)
        if (result.data.status === 200) {
          this.$message.success(result.data.msg)
        } else {
          this.$message.error('删除失败')
        }
        this.deleteDialogVisible = false
      },
      modifyHandle (data) {
        this.modifyDialogVisible = true
        console.log(data)
        this.pointedForm = data
        if (data.pname === '---') {
          this.pointedForm.pname = ''
        } else {
          this.pointedForm.pname = data.pname
        }
      },
      deleteHandle (data) {
        console.log(data)
        this.pointedForm = data
        this.deleteDialogVisible = true
      },
      drawChart(){
        // 以下三步即可完成echarts的初始化使用,代码注释的详解别忘了看看
        const  myCharts = this.$echarts.init(this.$refs.myCharts);
        let options = {
          title: {
            text: '未来一周气温变化',   //图表顶部的标题
            subtext: '纯属虚构'    //副标题
          },
          tooltip: {   //鼠标悬浮框的提示文字
            trigger: 'axis'
          },
          legend: {
            data:['最高气温','最低气温']
          },
          xAxis : [{  //x轴坐标数据
            type : 'category',
            boundaryGap : false,
            data : ['周一','周二','周三','周四','周五','周六','周日']
          }],
          yAxis : [{   //y轴坐标数据
            type : 'value',
            axisLabel : {
              formatter: '{value} °C'
            }
          }],
          series: [  //驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
            {
              name:"最高气温",
              type: "line",  //pie->饼状图  line->折线图  bar->柱状图
              data:[11, 11, 15, 13, 12, 13, 10],
            },
            {
              name:"最低气温",
              type: "line",  //pie->饼状图  line->折线图  bar->柱状图
              data:[1, -2, 2, 5, 3, 2, 0],
            }
          ]}
        myCharts.setOption(options);
      },
      openChart(){
        this.echartDialogVisible = true;
        this.$nextTick(() => {
          //  执行echarts方法
          this.drawChart()
        })
      }

    },
    created () {
      // this.$http.get('home/petsInforGet/' + window.sessionStorage.getItem('sid'))
      //     .then(res => {
      //       const data = res.data
      //       console.log(data)
      //       if (data.status === 200) {
      //         this.tableData = data.pets
      //       }
      //     }, error => console.log(error))
    },
    mounted() {
      this.drawChart()
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
  #dialog1 .el-form-item {
    display: inline-block;
    margin-right: 10px;
  }
</style>
