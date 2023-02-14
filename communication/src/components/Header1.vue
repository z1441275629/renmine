<template>
  <div class="head">
    <div class="nav">
      <div class="level1">
        <div class="level1-nav" @click="clickNav">
          <span>首页</span>
        </div>
        <!-- <span class="level1-en">{{ item.en }}</span> -->
      </div>
      <div class="right">
        <template v-if="$store.state.token">
          <avatar
            :name="$store.state.username"
            :avatar="$store.state.avatar"
            :size="40"
            class="avatar"
          ></avatar>
          <el-button type="text" @click="logout">退出登录</el-button>
        </template>
        <template v-else>
          <el-button type="text" @click="loginVisible = true">登录</el-button>
          <el-button type="text" @click="registerVisible = true"
            >注册</el-button
          >
        </template>
      </div>
    </div>

    <login :visible.sync="loginVisible"></login>
    <register :visible.sync="registerVisible"></register>
  </div>
</template>

<script>
import login from "./login.vue";
import register from "./regist.vue";
import Avatar from "./Avatar.vue";
export default {
  components: {
    login,
    register,
    Avatar
  },
  computed: {
    loginVisible: {
      get() {
        return this.$store.state.showLogin;
      },
      set(val) {
        this.$store.commit("setShowLogin", val);
      }
    },
    registerVisible: {
      get() {
        return this.$store.state.showRegister;
      },
      set(val) {
        this.$store.commit("setShowRegister", val);
      }
    }
  },
  data() {
    return {
      showTip: false,
      timer: null,
      navList: [
        {
          cn: "首页",
          en: "Home",
          path: ""
        },
        {
          cn: "互 帮 互 助",
          en: "Renmine helps Renmine",
          path: ""
        },
        {
          cn: "交 流 论 坛",
          en: "Communication Forum",
          path: "/communication"
        },
        {
          cn: "心 理 辅 导",
          en: "Counselling",
          path: ""
        },
        {
          cn: "矿 仔 保 险",
          en: "Renmine Insurance",
          path: ""
        }
      ]
    };
  },
  methods: {
    logout() {
      this.$store.commit("logout");
    },
    show() {
      this.showTip = true;
    },
    hide() {
      this.showTip = false;
    },
    tip() {
      // this.show();
      // clearTimeout(this.timer);
      // this.timer = setTimeout(() => {
      //   this.hide();
      // }, 2000);
      this.$message.info("即将到来 \r\n coming soon");
    },
    clickNav(nav) {
      this.$router.push("/");
      // if (nav.path) {
      //   this.$router.push(nav.path);
      // } else {
      //   this.tip();
      // }
      // this.tip();
    }
  }
};
</script>

<style scoped>
.head {
  background: #f5f5f5;
  position: sticky;
  left: 0;
  top: 0;
  z-index: 100;
}
.nav {
  height: 80px;
  background-color: rgba(255, 255, 255, 0.3);
  width: 100%;
  width: 800px;
  margin: auto;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  justify-content: space-between;
  font-size: 20px;
  box-shadow: 0 3px 3px rgba(255, 255, 255, 0.3);
  /* color: #fff; */
}

.nav .level1 {
  padding: 0 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-align: center;
}
/* .nav .level1 span {
        text-align: justify;
      } */
/* .nav .level1 .justify {
        display: flex;
        justify-content: space-between;
      } */
.level1-nav {
  padding: 0 10px;
  line-height: 1.6;
}
.level1-nav:hover {
  background: #ddd;
}
.nav .level1 .level1-en {
  font-size: 14px;
}

.right {
  display: flex;
  align-items: center;
}
.avatar {
  font-size: 14px;
  margin-right: 1em;
}
</style>
