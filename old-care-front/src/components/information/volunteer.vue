<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>义工信息维护</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-bottom: 20px">
      <el-button type="danger" icon="el-icon-plus" size="mini"  @click="addHandle()"></el-button>
      <el-button type="primary" icon="el-icon-s-data" size="mini"  @click="openChart('age')">年龄统计</el-button>
      <el-button type="primary" icon="el-icon-s-data" size="mini"  @click="openChart('gender')">性别统计</el-button>
    </div>
    <el-card class="box-card">
      <!-- 表格显示区域-->
      <el-table :data="tableData" style="width: 100%"  :default-sort = "{prop: 'state', order: 'descending'}">
        <!--        <el-table-column type="index"></el-table-column>-->
        <el-table-column prop="id" label="id" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名" width="80"></el-table-column>
        <el-table-column prop="gender" label="性别" width="50"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="id_card" sortable label="身份证" width="170"></el-table-column>
        <el-table-column prop="birthday" sortable label="出生日期" width="100"></el-table-column>
        <el-table-column prop="checkin_date" sortable label="访问日期" width="100"></el-table-column>
        <el-table-column prop="checkout_date" sortable label="离开日期" width="100"></el-table-column>
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
      <el-dialog title="增加工作人员信息" :visible.sync="addDialogVisible" width="50%">
        <div>
          <el-form id="AddDialog" label-position="left" label-width="75px" ref="formRef" :rules="rules" :model="addForm" >
            <el-form-item label="姓名*" prop="name" style="width: 150px">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender" style="width: 150px">
              <el-input v-model="addForm.gender"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="addForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="身份证*" prop="id_card">
              <el-input v-model="addForm.id_card" ></el-input>
            </el-form-item>
            <el-form-item label="出生日期*" prop="birthday">
              <el-input v-model="addForm.birthday" suffix-icon="el-icon-date"></el-input>
            </el-form-item>
            <el-form-item label="入职日期" prop="checkin_date">
              <el-input v-model="addForm.checkin_date" suffix-icon="el-icon-date"></el-input>
            </el-form-item>
            <el-form-item label="离职日期" prop="checkout_date">
              <el-input v-model="addForm.checkout_date" suffix-icon="el-icon-date"></el-input>
            </el-form-item>
            <el-form-item label="简述" prop="DESCRIPTION">
              <el-input type="textarea" v-model="addForm.DESCRIPTION" ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="修改工作人员信息" :visible.sync="modifyDialogVisible" width="50%">
        <div>
          <el-form id="dialog1" label-position="left" label-width="70px" ref="formRef" :rules="rules" :model="pointedForm" >
            <el-form-item label="id" prop="id" style="width: 150px">
              <el-input v-model="pointedForm.id" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name" style="width: 150px">
              <el-input v-model="pointedForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender" style="width: 150px">
              <el-input v-model="pointedForm.gender"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="pointedForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="身份证" prop="id_card">
              <el-input v-model="pointedForm.id_card" ></el-input>
            </el-form-item>
            <el-form-item label="出生日期" prop="birthday">
              <el-input v-model="pointedForm.birthday" suffix-icon="el-icon-date"></el-input>
            </el-form-item>
            <el-form-item label="访问日期" prop="checkin_date">
              <el-input v-model="pointedForm.checkin_date" suffix-icon="el-icon-date"></el-input>
            </el-form-item>
            <el-form-item label="离开日期" prop="checkout_date">
              <el-input v-model="pointedForm.checkout_date" suffix-icon="el-icon-date"></el-input>
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
        addDialogVisible: false,
        modifyDialogVisible: false,
        deleteDialogVisible: false,
        echartDialogVisible: false,
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
        pointedForm: {

        },
        addForm: {
         name: 'hs',
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
      async getAllInfo () {
        const result = await this.$get('volunteer/findAll')
        if (result.success === true) {
          console.log(result.data);
          this.tableData=result.data;
          this.tableData.forEach(item=>{
            console.log(item.birthday != null);
            if(item.birthday!=null){
              item.birthday=item.birthday.substring(0,10);
            }
            if(item.checkin_date!=null){
              item.checkin_date=item.checkin_date.substring(0,10);
            }
            if(item.checkout_date!=null){
              item.checkout_date=item.checkout_date.substring(0,10);
            }
          })
        } else if(result.success === false){
          this.$message.error('获得员工信息失败')
        } else{
          this.$message.error('网络失联')
        }
      },
      async modifySubmit () {
        const result = await this.$post('volunteer/update', this.pointedForm)
        if (result.success === true) {
          this.$message.success('修改成功')
          this.modifyDialogVisible = false
        } else if(result.success === false){
          this.$message.error('修改失败')
        } else{
          this.$message.error('网络失联')
        }
      },
      async addSubmit () {
        if(this.addForm.birthday === ''||this.addForm.username === '' ||this.addForm.id_card === ''){
          this.$message.info('缺少必填项');
          return;
        }
        const result = await this.$post('volunteer/add', this.addForm)
        if (result.success === true) {
          this.$message.success('增加成功')
          await this.getAllInfo()
        } else if(result.success === false){
          this.$message.error('增加失败')
        } else{
          this.$message.error('网络失联')
        }
        this.addDialogVisible = false
      },
      async deleteSubmit () {
        const result = await this.$get('volunteer/delete', {
          id:this.pointedForm.id
        })
        if (result.success === true) {
          this.$message.success(result.msg)
          await this.getAllInfo()
          this.deleteDialogVisible = false
        } else if(result.success === false){
          this.$message.error(result.msg)
        } else{
          this.$message.error('网络失联')
        }
      },
      async getChartNum () {
        const result = await this.$get('volunteer/number')
        if (result.success === true) {
          // console.log(result.data)
          this.charts=result.data
          console.log(this.charts)
        } else if(result.success === false){
          this.$message.error(result.msg)
        } else{
          this.$message.error('网络失联')
        }
      },
      addHandle () {
        // this.addForm = ''
        this.addDialogVisible = true
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
      drawGenderChart(){
        let gender=this.charts.gender
        // 以下三步即可完成echarts的初始化使用,代码注释的详解别忘了看看
        const  myCharts = this.$echarts.init(this.$refs.myCharts);
        myCharts.clear()
        let options = {
          title: {
            text: '义工性别信息统计分析',   //图表顶部的标题
            subtext: '注册数据'    //副标题
          },
          tooltip: {   //鼠标悬浮框的提示文字
            trigger: 'axis'
          },
          legend: {
            data:['性别分布']
          },
          series: [  //驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
            {
              name:"人数",
              type: "pie",  //pie->饼状图  line->折线图  bar->柱状图
              data:[
                {
                  value:gender.男,
                  name:'男'
                },
                {
                  value:gender.女,
                  name:'女'
                }
              ],
              itemStyle:{
                normal:{
                  label:{
                    show: true,
                    formatter: '{b} : {c} ({d}%)'
                  },
                  labelLine :{show:true}
                }
              }
            }
          ]}
        myCharts.setOption(options);
      },
      drawAgeChart(){
        let age=this.charts.age
        // 以下三步即可完成echarts的初始化使用,代码注释的详解别忘了看看
        const  myCharts = this.$echarts.init(this.$refs.myCharts);
        myCharts.clear()
        let options = {
          title: {
            text: '义工年龄信息统计分析',   //图表顶部的标题
            subtext: '注册数据'    //副标题
          },
          tooltip: {   //鼠标悬浮框的提示文字
            trigger: 'axis'
          },
          legend: {
            data:['年龄分布']
          },
          xAxis : [{  //x轴坐标数据
            type : 'category',
            boundaryGap : false,
            data : ['20岁-29岁','30岁-39岁','40岁-49岁','50岁以上']
          }],
          yAxis : [{   //y轴坐标数据
            type : 'value',
            axisLabel : {
              formatter:function (value) {
                return value.toFixed(0)+' 人';
              }
            }
          }],
          series: [  //驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
            {
              name:"人数",
              type: "line",  //pie->饼状图  line->折线图  bar->柱状图
              data:[age.one,age.two,age.three,age.four],
            }
          ]}
        myCharts.setOption(options);
      },
      openChart(type){
        this.echartDialogVisible = true;
        // this.$refs.myCharts.html("");
        this.$nextTick(() => {
          //  执行echarts方法
          if(type === 'age'){
            this.drawAgeChart()
          }
          else if(type === 'gender'){
            this.drawGenderChart()
          }else if(type === 'healthState'){
            this.drawHealthStateChart()
          }

        })
      }
    },
    created () {
      this.getAllInfo()
    },
    mounted() {
      this.getChartNum()
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
