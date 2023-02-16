<template>
  <div id="app">
    <transition name="slide">
      <router-view />
      <!-- <router-view name="prelogin" /> -->
    </transition>

    <login :visible.sync="loginVisible"></login>
    <register :visible.sync="registerVisible"></register>
  </div>
</template>

<script>
import login from "@/components/login.vue";
import register from "@/components/regist.vue";
export default {
  name: "App",
  components: {
    login,
    register
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
  }
};
</script>

<style>
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}
.slide-leave, .slide-enter-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-100%);
  opacity: 0;
}

* {
  padding: 0;
  margin: 0;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ellipsis2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.ellipsis3 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

html,
body {
  width: 100%;
  height: 100%;
  font-size: 14px;
}
body {
  font-size: 16px;
  min-width: 1200px;
  background: no-repeat center / 112%;
}
:root {
  --primary: #409eff;
}
a {
  text-decoration: none;
  color: var(--primary);
}
</style>
