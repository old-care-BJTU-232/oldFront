<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>老人信息维护</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-bottom: 20px">
      <el-button type="danger" icon="el-icon-plus" size="mini"  @click="addHandle()"></el-button>
      <el-button type="primary" icon="el-icon-s-data" size="mini"  @click="openChart('age')">年龄统计</el-button>
      <el-button type="primary" icon="el-icon-s-data" size="mini"  @click="openChart('gender')">性别统计</el-button>
      <el-button type="primary" icon="el-icon-s-data" size="mini"  @click="openChart('healthState')">健康状况统计</el-button>
    </div>

    <el-card class="box-card">
      <!-- 表格显示区域-->
      <el-table :data="tableData" style="width: 100%"  :default-sort = "{prop: 'state', order: 'descending'}">
<!--        <el-table-column type="index"></el-table-column>-->
        <el-table-column prop="id" label="id" width="50"></el-table-column>
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
      <el-dialog title="增加老人信息" :visible.sync="addDialogVisible" width="50%">
        <div>
          <el-form class="dialogInfo" label-position="left" label-width="70px" ref="formRef" :rules="rules" :model="addForm" >
<!--            <el-form-item label="ID" prop="id" style="width: 150px">-->
<!--              <el-input v-model="addForm.ID" disabled></el-input>-->
<!--            </el-form-item>-->
            <el-form-item label="姓名*" prop="username" style="width: 150px">
              <el-input v-model="addForm.username" ></el-input>
            </el-form-item>
            <el-form-item label="性别*" prop="gender" style="width: 150px">
              <el-input v-model="addForm.gender"></el-input>
            </el-form-item>
            <el-form-item label="房间号" prop="room_number" style="width: 150px">
              <el-input v-model="addForm.room_number"></el-input>
            </el-form-item>
            <el-form-item label="电话*" prop="phone">
              <el-input v-model="addForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="身份证" prop="id_card">
              <el-input v-model="addForm.id_card" ></el-input>
            </el-form-item>
            <el-form-item label="出生日期" prop="birthday">
<!--              <el-date-picker-->
<!--                      v-model="pointedForm.birthday"-->
<!--                      align="right"-->
<!--                      type="date"-->
<!--                      placeholder="选择日期"-->
<!--                      :picker-options="pickerOptions">-->
<!--              </el-date-picker>-->
              <el-input v-model="addForm.birthday" suffix-icon="el-icon-date"></el-input>
            </el-form-item>
            <el-form-item label="入院日期" prop="checkin_date">
<!--              <el-date-picker-->
<!--                      v-model="pointedForm.checkin_date"-->
<!--                      align="right"-->
<!--                      type="date"-->
<!--                      placeholder="选择日期"-->
<!--                      :picker-options="pickerOptions">-->
<!--              </el-date-picker>-->
              <el-input v-model="addForm.checkin_date" suffix-icon="el-icon-date"></el-input>
            </el-form-item>
            <el-form-item label="出院日期" prop="checkout_date">
<!--              <el-date-picker-->
<!--                      v-model="pointedForm.id_card"-->
<!--                      align="right"-->
<!--                      type="date"-->
<!--                      placeholder="选择日期"-->
<!--                      :picker-options="pickerOptions">-->
<!--              </el-date-picker>-->
              <el-input v-model="addForm.checkout_date" suffix-icon="el-icon-date"></el-input>
            </el-form-item>
            <el-form-item label="健康状况" prop="health_state">
              <el-input v-model="addForm.health_state"></el-input>
            </el-form-item>
            <el-form-item label-width="120px" label="第一监护人姓名" prop="firstguardian_name">
              <el-input v-model="addForm.firstguardian_name" ></el-input>
            </el-form-item>
            <el-form-item label-width="130px" label="与第一监护人关系" prop="firstguardian_relationship">
              <el-input v-model="addForm.firstguardian_relationship" ></el-input>
            </el-form-item>
            <el-form-item label-width="120px" label="第一监护人电话" prop="firstguardian_phone">
              <el-input v-model="addForm.firstguardian_phone" ></el-input>
            </el-form-item>
            <el-form-item label-width="120px" label="第一监护人微信" prop="firstguardian_wechat">
              <el-input v-model="addForm.firstguardian_wecaht" ></el-input>
            </el-form-item>
            <el-form-item label-width="120px" label="第二监护人姓名" prop="secondguardian_name">
              <el-input v-model="addForm.secondguardian_name" ></el-input>
            </el-form-item>
            <el-form-item label-width="130px" label="与第二监护人关系" prop="secondguardian_relationship">
              <el-input v-model="addForm.secondguardian_relationship" ></el-input>
            </el-form-item>
            <el-form-item label-width="120px" label="第二监护人电话" prop="secondguardian_phone">
              <el-input v-model="addForm.secondguardian_phone" ></el-input>
            </el-form-item>
            <el-form-item label-width="120px" label="第二监护人微信" prop="firstguardian_wechat">
              <el-input v-model="addForm.secondguardian_wecaht" ></el-input>
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
      <el-dialog title="修改老人信息" :visible.sync="modifyDialogVisible" width="50%">
        <div>
          <el-form class="dialogInfo" label-position="left" label-width="70px" ref="formRef" :rules="rules" :model="pointedForm" >
<!--            <el-form-item label="头像" prop="profile_photo" style="display: block;">-->
<!--              <el-upload-->
<!--                      class="avatar-uploader"-->
<!--                      action="http://49.232.157.63:8400/upload"-->
<!--                      :show-file-list="false"-->
<!--                      :on-success="handleAvatarSuccess"-->
<!--                      :before-upload="beforeAvatarUpload">-->
<!--                <img v-if="pointedForm.profile_photo" :src="pointedForm.profile_photo" class="avatar">-->
<!--                <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--              </el-upload>-->
<!--            </el-form-item>-->
            <el-form-item label="id" prop="id" style="width: 150px">
              <el-input v-model="pointedForm.id" disabled></el-input>
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
        addDialogVisible: false,
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
        addForm: {
          // ID: 1,
          username: '李四',
          gender: '男',
          phone: '17857242620',
          id_card: '330523200001107817',
          birthday: '2000-01-10',
          // checkin_date: '2020-01-10',
          // checkout_date: '2020-01-10',
          // room_number: '232',
          // health_state: 'good',
          // imgset_dir: '',
          // profile_photo: '',
          // firstguardian_name: '1',
          // firstguardian_relationship: '兄弟',
          // firstguardian_phone: '1453515',
          // firstguardian_wechat: 'xx',
          // secondguardian_name: '2',
          // secondguardian_relationship: '兄弟',
          // secondguardian_phone: '1453515x',
          // secondguardian_wechat: 'xx',
          // DESCRIPTION:'XXXXX'
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
        },
        charts:{
          totalnumber:'',
          gender:{
            '男':1,
            '女':2
          },
          health_state: {
            '健康':1,
            '良好':1,
            '一般':1,
            '差':1,
            '很差':1,
          },
          age: {
            one:0,
            two:0,
            three:1,
            four:2,
            five:5,
            six:0
          }

        }
      }
    },
    methods: {
      async getAllInfo () {
        const result = await this.$get('old/findAll')
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
          this.$message.error('获得老人信息失败')
        } else{
          this.$message.error('网络失联')
        }
      },
      async addSubmit () {
        if(this.addForm.birthday === ''||this.addForm.username === '' ||this.addForm.id_card === ''){
          this.$message.info('缺少必填项');
          return;
        }
        const result = await this.$post('old/add', this.addForm)
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
      async modifySubmit () {
        const result = await this.$post('old/update', this.pointedForm)
        if (result.success === true) {
          this.$message.success('修改成功')
          this.modifyDialogVisible = false
        } else if(result.success === false){
          this.$message.error('修改失败')
        } else{
          this.$message.error('网络失联')
        }
      },
      async deleteSubmit () {
        const result = await this.$get('old/delete', {
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
        const result = await this.$get('old/number')
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
            text: '老人性别信息统计分析',   //图表顶部的标题
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
            text: '老人信息统计分析',   //图表顶部的标题
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
            data : ['50岁-59岁','60岁-69岁','70岁-79岁','80岁-89岁','90岁-99岁','100以上']
          }],
          yAxis : [{   //y轴坐标数据
            type : 'value',
            axisLabel : {
              formatter:function (value) {
                return value.toFixed(0)+' 人';
              }
              // formatter: '{value} 人'
            }
          }],
          series: [  //驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
            {
              name:"人数",
              type: "line",  //pie->饼状图  line->折线图  bar->柱状图
              data:[age.one,age.two,age.three,age.four,age.five,age.six],
            }
          ]}
        myCharts.setOption(options);
      },
      drawHealthStateChart(){
        let state=this.charts.health_state
        // 以下三步即可完成echarts的初始化使用,代码注释的详解别忘了看看
        const  myCharts = this.$echarts.init(this.$refs.myCharts);
        myCharts.clear()
        let options = {
          title: {
            text: '老人健康状态统计分析',   //图表顶部的标题
            subtext: '注册数据'    //副标题
          },
          tooltip: {   //鼠标悬浮框的提示文字
            trigger: 'axis'
          },
          legend: {
            data:['健康状态']
          },
          xAxis : [{  //x轴坐标数据
            type : 'category',
            boundaryGap : false,
            data : ['健康','良好','一般','差','很差']
          }],
          yAxis : [{   //y轴坐标数据
            type : 'value',
            axisLabel : {
              formatter: '{value} 人'
            }
          }],
          series: [  //驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
            {
              name:"人数",
              type: "line",  //pie->饼状图  line->折线图  bar->柱状图
              data:[state.健康,state.良好,state.一般,state.差,state.很差],
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
      },
      // 上传头像
      handleAvatarSuccess(res, file) {
        this.pointedForm.profile_photo = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    created () {
      this.getAllInfo();
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
  .dialogInfo .el-form-item {
    display: inline-block;
    margin-right: 10px;
  }

  /*头像上传*/
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
