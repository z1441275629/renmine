<template>
  <div class="register-page">
    <el-form
      class="register-form"
      label-width="120px"
      :model="form"
      :rules="rules"
      ref="registerForm"
    >
      <h2>注册账号</h2>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name" clearable placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" clearable placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="form.confirmPassword"
          clearable
          placeholder=""
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" clearable placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="code-row">
          <el-input v-model="form.code" clearable placeholder=""></el-input>
          <el-button @click="sendEmailCode" class="send-code" type="primary"
            >发送验证码</el-button
          >
        </div>
      </el-form-item>
      <el-form-item label="" prop="">
        <el-button @click.native="clickRegister" type="primary">注册</el-button>
        <el-button @click.native="toLogin" type="primary">去登录</el-button>
        <el-button @click.native="goBack">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      form: {
        name: "",
        password: "",
        confirmPassword: "",
        email: "",
        code: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请设置密码" }],
        confirmPassword: [
          {
            required: true,
            message: "请再次输入密码",
            validator: validatePass2
          }
        ],
        email: [{ required: true, type: "email", message: "请输入正确的邮箱" }],
        code: [{ required: true, message: "请输入验证码" }]
      }
    };
  },
  methods: {
    clickRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.register(this.form);
        } else {
          return false;
        }
      });
    },
    toLogin() {
      this.$router.push("/login");
    },
    goBack() {
      history.back();
    },
    register(params) {
      this.$ajax({
        url: this.$api.user.register,
        method: "post",
        data: params
      })
        .then(res => {
          console.log(res);
          this.$message.success("注册成功");
          this.toLogin();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getRoleList() {
      this.$ajax({
        url: this.$api.common.roleList,
        method: "get",
        params: {}
      })
        .then(res => {
          console.log(res);
        })
        .catch(console.log);
    },
    sendEmailCode() {
      this.$refs.registerForm.validateField("email", errorInfo => {
        if (!errorInfo) {
          this.$ajax({
            url: this.$api.email.sendCode,
            method: "post",
            data: { email: this.form.email }
          })
            .then(res => {
              this.roleList = res.data || [];
            })
            .catch(console.log);
        }
      });
    }
  }
};
</script>

<style scoped>
.register-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
h2 {
  text-align: center;
  margin-bottom: 10px;
}
.code-row {
  display: flex;
  align-items: center;
}
.send-code {
  margin-left: 1em;
}
</style>
