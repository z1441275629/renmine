<template>
  <div class="login-page">
    <el-form
      class="login-form"
      :model="form"
      :rules="rules"
      label-width="60px"
      ref="loginForm"
    >
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
          placeholder="请输入密码"
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
      this.$router.push({ name: "regist", query: this.$route.query });
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
          const { token, username, id: userId, avatar } = res.data;
          this.$store.commit("setUserData", {
            token,
            username,
            userId,
            avatar
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
.login-form {
  box-shadow: 0 0 5px 5px #ccc;
  border-radius: 12px;
  padding: 20px;
}
h2 {
  text-align: center;
  margin-bottom: 10px;
}
</style>
