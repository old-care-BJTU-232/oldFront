<template>
    <div class="background">
        <el-row>
            <el-col :span="8" :offset="8" style="margin-top: 150px">
                <h3>登录</h3>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="账号" prop="id">
                        <el-input type="text" v-model="ruleForm.id" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  export default {
    data() {
      var validateId = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
            id: '',
            password: '',
        },
        rules: {
          id: [
            { validator: validateId, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$post('/login',this.ruleForm).then(response => {
                console.log(response);
                sessionStorage.setItem('username',this.ruleForm.id)
                if(response.success===true){
                    this.$router.push('/index');
                }else {
                    this.$message.error('账号或密码错误');
                }
            }).catch(err=>{
                console.log(err);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>
    .background{
        height: 715px;
        background:url(../assets/preview.jpg) no-repeat top center;
        /*background:url(../assets/u=2065983498,2143891031&fm=26&fmt=auto&gp=0.webp) no-repeat top center;*/
        /*background-color: grey;*/
        background-size: 100% 100%;
    }
    h3{
        font-size: 32px;
    }
    .el-form {
        border: 1px solid black;
        padding: 50px 50px 30px 0px;
        border-radius: 10px;
        /*background-color: #f1f2f4;*/
    }

</style>
