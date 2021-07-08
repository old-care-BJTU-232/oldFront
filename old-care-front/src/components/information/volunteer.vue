<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>义工信息维护</el-breadcrumb-item>
    </el-breadcrumb>
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
              <el-date-picker
                      v-model="pointedForm.birthday"
                      align="right"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions">
              </el-date-picker>
              <!--              <el-input v-model="pointedForm.birthday" suffix-icon="el-icon-date"></el-input>-->
            </el-form-item>
            <el-form-item label="访问日期" prop="checkin_date">
              <el-date-picker
                      v-model="pointedForm.checkin_date"
                      align="right"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions">
              </el-date-picker>
              <!--              <el-input v-model="pointedForm.birthday" suffix-icon="el-icon-date"></el-input>-->
            </el-form-item>
            <el-form-item label="离开日期" prop="checkout_date">
              <el-date-picker
                      v-model="pointedForm.checkout_date"
                      align="right"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions">
              </el-date-picker>
              <!--              <el-input v-model="pointedForm.checkin_date" suffix-icon="el-icon-date"></el-input>-->
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
      }
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
  #dialog1 .el-form-item {
    display: inline-block;
    margin-right: 10px;
  }
</style>
