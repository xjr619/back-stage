<template>
  <div class="login">
    <h3>后台管理</h3>
   <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" class="login_form" :rules="rule" ref="ruleForm">
  <el-form-item label="用户名" prop="uname" class="login_name">
    <el-input v-model="formLabelAlign.uname"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="upwd" class="login_pwd">
    <el-input v-model="formLabelAlign.upwd"></el-input>
  </el-form-item>
  <el-form-item class="button_group">
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>
<script>
export default {
  data() {
    // 校验账号
    function unameFn(rule, value, callback) {
      if (value == "") {
        callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    }
    // 校验密码
    function upwdFn(rule, value, callback) {
      if (value == "") {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    }
    return {
      labelPosition: "top",
      formLabelAlign: {
        uname: "",
        upwd: ""
      },
      rule: {
        // 定义校验规则
        uname: [
          { validator: unameFn, trigger: "blur" },
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        upwd: [
          { validator: upwdFn, trigger: "blur" },
          { required: true, message: "请输入用户密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 登录验证
    login() {
      this.$http.post(this.$api.login, this.formLabelAlign).then(res => {
        if (res.status == 0) {
          this.$alert("登录成功，跳转到首页");
          this.$router.push('/admin');
        } else {
          this.$alert(res.data.message);
        }
      });
    },
    // 点击重置重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 提交表单时的验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 全部校验成功进行登录的密码定义
          this.login();
        } else {
          this.$alert("校验失败");
        }
      });
    }
  }
};
</script>
<style scoped>
.login {
  padding: 10px;
  width: 450px;
  height: 250px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #fff;
  border-radius: 4px;
}
.login_form {
  position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  padding: 0 10px;
  box-sizing: border-box;
  transform: translate(-50%, -50%);
}
.el-form-item {
  margin-bottom: 0;
}
h3 {
  text-align: center;
  width: 100%;
  color: #fff;
  position: absolute;
  top: -50px;
}
.login_pwd {
    color: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
}

.button_group {
  text-align: center;
  margin-bottom: 10px;
}
</style>
