import Vue from "vue";
import Router from "vue-router";
import layout from "@/layout/basic";
import AllNavLayout from "@/layout/AllNav";

Vue.use(Router);

export default new Router({
  mode: "history", // hash
  routes: [
    {
      path: "/",
      name: "layoutAllNav",
      redirect: "/index",
      component: AllNavLayout,
      children: [
        {
          path: "/index",
          name: "index",
          component: () => import("@/views/index.vue")
        }
      ]
    },

    {
      path: "/communication",
      name: "layout",
      redirect: "/communicationList",
      component: layout,
      children: [
        {
          path: "/communicationList",
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
        }
      ]
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
