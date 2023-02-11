<template>
  <div class="">
    <div>来自：{{ from }}</div>
    <el-form :model="form" :rules="rules">
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
      <el-row>
        <el-col>
          <el-button @click.native="clickEmailLogin" type="primary"
            >邮箱登录</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    {{ $store.state.userId }}
  </div>
</template>

<script>
export default {
  props: ["from"],
  data() {
    return {
      form: {
        password: "",
        email: ""
      },
      rules: {
        password: "",
        email: ""
      }
    };
  },
  methods: {
    clickPhoneLogin() {
      console.log(this.form);
      this.phoneLogin(this.form);
    },
    clickEmailLogin() {
      this.emailLogin();
    },
    emailLogin() {
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
          localStorage.setItem(token, res.data.token);
          const { token, username, id: userId } = res.data;
          this.$store.commit("setUserData", {
            token,
            username,
            userId
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {}
};
</script>

<style scoped></style>
