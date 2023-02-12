import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history", // hash
  routes: [
    {
      path: "/",
      name: "Home",
      redirect: "/communication"
    },
    {
      path: "/communication",
      name: "communication",
      component: () => import("@/views/communication/list.vue")
    },
    {
      path: "/communication/:id",
      name: "communicationDetail",
      component: () => import("@/views/communication/detail.vue"),
      meta: {
        auth: true
      }
    },
    {
      path: "/regist",
      name: "regist",
      component: () => import("@/views/user/regist.vue"),
      meta: {
        auth: false
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/user/login.vue"),
      meta: {
        auth: false
      }
    }
    // {
    //   path: "/user",
    //   name: "user",
    //   component: () => import("@/views/user/list.vue"),
    //   meta: {
    //     auth: true
    //   }
    // }
  ]
});
