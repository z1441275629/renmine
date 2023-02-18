<template>
  <!-- <el-dialog title="登录" :visible.sync="show" :append-to-body="true"> -->
  <div class="masker" v-show="show" @click="show = false">
    <el-form
      class="login-form"
      :model="form"
      :rules="rules"
      label-width="60px"
      ref="loginForm"
      @click.native.stop=""
    >
      <i class="iconfont icon-guanbi close" @click="show = false"></i>
      <h2>登录</h2>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="form.email"
          clearable
          placeholder="请输入邮箱或者账户名"
          @keyup.enter.native="clickLogin"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          clearable
          placeholder="请输入密码"
          type="password"
          @keyup.enter.native="clickLogin"
        ></el-input>
      </el-form-item>
      <div class="btns">
        <el-button @click.native="clickLogin" type="primary">登录</el-button>
        <el-button @click.native="toRegister" type="primary">去注册</el-button>
        <el-button @click.native="clickForgetPassword" type="primary"
          >忘记密码</el-button
        >
        <!-- <el-button @click.native="goBack">返回</el-button> -->
      </div>
    </el-form>
  </div>
  <!-- </el-dialog> -->
</template>

<script>
export default {
  props: ["visible"],
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
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    }
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
      // this.$router.push({ name: "regist", query: this.$route.query });
      this.show = false;
      this.$store.commit("setShowRegister", true);
    },
    clickForgetPassword() {
      // this.$router.push({ name: "regist", query: this.$route.query });
      this.show = false;
      this.$store.commit("setShowUpdatePassword", true);
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
          this.show = false;
          this.$store.state.redirect &&
            this.$router.push(this.$store.state.redirect);
          this.$store.commit("setRedirect", null);
        })
        .catch(err => {
          console.log(err);
        });
    },
    goBack() {
      history.back();
    }
  },
  created() {},
  watch: {
    show(n) {
      if (n) {
        this.$refs.loginForm.resetFields();
      }
    }
  }
};
</script>

<style scoped>
.masker {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
}
.login-form {
  background-color: #fff;
  box-shadow: 0 0 5px 5px #ccc;
  border-radius: 12px;
  padding: 20px 20px 0;
  position: relative;
}
.close {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
h2 {
  text-align: center;
  margin-bottom: 10px;
}
.btns {
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
}
</style>
