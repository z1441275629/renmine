<template>
  <div class="head">
    <div class="nav">
      <div class="site-logo">
        <a href="/" class="brand" rel="start" style="opacity: 1;">
          <span class="logo-line-before"
            ><i class="" style="transform: translateX(100%);"></i
          ></span>
          <h1 class="site-title" style="opacity: 1; top: 0px;">Renmine</h1>
          <span class="logo-line-after"
            ><i class="" style="transform: translateX(100%);"></i
          ></span>
        </a>
      </div>
      <div class="nav-list">
        <div class="level1" v-for="item in navList" :key="item.cn">
          <div class="level1-nav" @click="clickNav">
            <i v-if="item.icon" class="iconfont" :class="item.icon"></i>
            <span>{{ item.cn }}</span>
          </div>
          <!-- <span class="level1-en">{{ item.en }}</span> -->
        </div>
        <div class="user-info">
          <template v-if="$store.state.token">
            <!-- <avatar
              :name="$store.state.username"
              :avatar="$store.state.avatar"
              :size="40"
              class="avatar"
            ></avatar> -->
            <!-- <el-button type="text" @click="logout">退出登录</el-button> -->
            <div class="level1-nav" @click="logout">
              <i class="iconfont btn icon-dengchu"></i>
              <span>{{ $store.state.username }}</span>
            </div>
          </template>
          <template v-else>
            <div
              class="level1-nav"
              @click="$store.commit('setShowLogin', true)"
            >
              <i class="iconfont btn icon-denglu"></i>
              <span>登录</span>
            </div>
            <div
              class="level1-nav"
              @click="$store.commit('setShowRegister', true)"
            >
              <i class="iconfont btn icon-zhuce"></i>
              <span>注册</span>
            </div>
            <!-- <el-button type="text" @click="loginVisible = true">登录</el-button>
            <el-button type="text" @click="registerVisible = true"
              >注册</el-button
            > -->
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "./Avatar.vue";
export default {
  components: {
    Avatar
  },
  data() {
    return {
      showTip: false,
      timer: null,
      navList: [
        {
          cn: "首页",
          en: "Home",
          icon: "icon-shouye2",
          path: ""
        }
        // {
        //   cn: "互 帮 互 助",
        //   en: "Renmine helps Renmine",
        //   path: ""
        // },
        // {
        //   cn: "交 流 论 坛",
        //   en: "Communication Forum",
        //   path: "/communication"
        // },
        // {
        //   cn: "心 理 辅 导",
        //   en: "Counselling",
        //   path: ""
        // },
        // {
        //   cn: "矿 仔 保 险",
        //   en: "Renmine Insurance",
        //   path: ""
        // }
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
  /* background-color: rgba(255, 255, 255, 0.3); */
  width: 100%;
  width: 800px;
  margin: auto;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  justify-content: space-between;
  /* font-size: 20px; */
  /* box-shadow: 0 3px 3px rgba(255, 255, 255, 0.3); */
  /* color: #fff; */
}

.site-logo {
  display: flex;
  flex-shrink: 0;
  padding: 0 10px;
  font-size: 22px;
}
.logo-line-before,
.logo-line-after {
  display: block;
  margin: 0 auto;
  overflow: hidden;
  width: 75%;
  height: 4px;
}
.logo-line-before i,
.logo-line-after i {
  background: #222;
  display: block;
  height: 2px;
  position: relative;
  left: -100%;
}
.logo-line-after i {
  height: 3px;
}
.site-logo h1 {
  font-family: "Lato", "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 1.375em;
  color: #222;
}

.nav-list {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-left: 200px;
}
.level1 {
  /* padding: 0 20px; */
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 14px;
}
.level1-nav {
  color: #555;
}
.level1-nav:hover {
  color: #222;
}
.level1-nav {
  padding: 0 10px;
  /* line-height: 1.6; */
  line-height: 26px;
  cursor: pointer;
  margin-left: 10px;
}
.level1-nav:hover {
  background: #ddd;
}
.level1-nav.active {
  background: #ddd;
  color: #555;
}
.nav .level1 .level1-en {
  font-size: 14px;
}

.user-info {
  display: flex;
  align-items: center;
}
.avatar {
  font-size: 14px;
  margin-right: 1em;
}
</style>
