<template>
  <div class="">
    <el-form :model="form" :rules="rules">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name" clearable placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" clearable placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" clearable placeholder=""></el-input>
        <el-button @click="sendEmailCode">发送验证码</el-button>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="form.code" clearable placeholder=""></el-input>
      </el-form-item>
      <el-row>
        <el-col
          ><el-button @click.native="clickRegister" type="primary"
            >注册</el-button
          ></el-col
        >
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        password: "",
        email: "",
        code: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请设置密码" }],
        email: [{ required: true, message: "请输入邮箱" }],
        code: [{ required: true, message: "请输入验证码" }]
      }
    };
  },
  methods: {
    clickRegister() {
      console.log(this.form);
      this.register(this.form);
    },
    register(params) {
      this.$ajax({
        url: this.$api.user.register,
        method: "post",
        data: params
      })
        .then(res => {
          console.log(res);
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
      if (!this.form.email) {
        this.$message.warning("请输入邮箱");
        return;
      }
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
  }
};
</script>

<style scoped></style>
