<template>
  <div class="login-page">
    <el-form :model="form" :rules="rules" label-width="120px" ref="loginForm">
      <h2>登录</h2>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="form.email"
          clearable
          placeholder="请输入邮箱或者账户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          clearable
          placeholder=""
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="">
        <el-button @click.native="clickLogin" type="primary">登录</el-button>
        <el-button @click.native="toRegister" type="primary">去注册</el-button>
        <el-button @click.native="goBack">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["from"],
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      rules: {
        email: [{ required: true, message: "请输入邮箱" }],
        password: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  methods: {
    clickPhoneLogin() {
      console.log(this.form);
      this.phoneLogin(this.form);
    },
    clickLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.login();
        }
      });
    },
    toRegister() {
      this.$router.push("/regist");
    },
    login() {
      this.$ajax({
        url: this.$api.user.login,
        method: "post",
        data: {
          email: this.form.email,
          password: this.form.password
        }
      })
        .then(res => {
          console.log(res);
          const { token, username, id: userId } = res.data;
          this.$store.commit("setUserData", {
            token,
            username,
            userId
          });
          this.$router.push(this.$route.query.redirect || "/communication");
        })
        .catch(err => {
          console.log(err);
        });
    },
    goBack() {
      history.back();
    }
  },
  created() {}
};
</script>

<style scoped>
.login-page {
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
</style>
