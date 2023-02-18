<template>
  <div class="masker" v-show="show" @click="show = false">
    <el-form
      class="update-password-form"
      label-width="80px"
      :model="form"
      :rules="rules"
      ref="updatePasswordForm"
      @click.native.stop=""
    >
      <i class="iconfont icon-guanbi close" @click="show = false"></i>
      <h2>修改密码</h2>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="form.email"
          clearable
          placeholder="请输入邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input
          v-model="form.password"
          clearable
          placeholder="请输入新密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="form.confirmPassword"
          clearable
          placeholder="请在此输入密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="code-row">
          <el-input
            v-model="form.code"
            clearable
            placeholder="请输入验证码"
          ></el-input>
          <el-button
            :loading="getCodeLoading"
            :disabled="!!timer"
            @click="sendEmailCode"
            class="send-code"
            type="primary"
            >{{ timer ? countDown + "s" : "发送验证码" }}</el-button
          >
        </div>
      </el-form-item>
      <el-form-item label="" prop="">
        <el-button
          @click.native="clickUpdatePassword"
          type="primary"
          :loading="updatePasswordLoading"
          >确定</el-button
        >
        <el-button @click.native="toLogin" type="primary">去登录</el-button>
        <!-- <el-button @click.native="goBack">返回</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["visible"],
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
      timer: null,
      countDown: 59,
      getCodeLoading: false,
      updatePasswordLoading: false,
      form: {
        password: "",
        confirmPassword: "",
        email: "",
        code: ""
      },
      rules: {
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
    clickUpdatePassword() {
      this.$refs.updatePasswordForm.validate(valid => {
        if (valid) {
          this.updatePassword(this.form);
        } else {
          return false;
        }
      });
    },
    toLogin() {
      // this.$router.push({ name: "login", query: this.$route.query });
      this.show = false;
      this.$store.commit("setShowLogin", true);
    },
    goBack() {
      history.back();
    },
    updatePassword(params) {
      this.updatePasswordLoading = true;
      this.$ajax({
        url: this.$api.user.updatePassword,
        method: "post",
        data: params
      })
        .then(res => {
          console.log(res);
          this.$message.success("修改成功");
          this.toLogin();
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.updatePasswordLoading = false;
        });
    },
    sendEmailCode() {
      this.$refs.updatePasswordForm.validateField("email", errorInfo => {
        if (!errorInfo) {
          this.getCodeLoading = true;
          this.$ajax({
            url: this.$api.email.sendCode,
            method: "post",
            data: { email: this.form.email }
          })
            .then(res => {
              this.$message.success("发送成功");
              clearInterval(this.timer);
              this.countDown = 59;
              this.timer = setInterval(() => {
                this.countDown--;
                if (this.countDown <= 0) {
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000);
            })
            .catch(console.log)
            .finally(() => {
              this.getCodeLoading = false;
            });
        }
      });
    }
  },
  watch: {
    show(n) {
      if (n) {
        this.$refs.updatePasswordForm.resetFields();
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
.update-password-form {
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

.avatar-list {
  display: flex;
  align-items: center;
}

.avatar-item {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
  margin-left: 10px;
  cursor: pointer;
}
.avatar-item.active::after {
  content: "";
  display: block;
  width: 110%;
  height: 110%;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #67c23a;
}
</style>
