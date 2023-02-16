// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import store from "./store";

Vue.use(ElementUI);

import request from "@/utils/ajax";
// Vue.prototype.$ajax = request;
// 丢弃高频率的请求
Vue.prototype.$ajax = (function() {
  const requestHistory = {};
  return function(config = {}, ...options) {
    // 拦截优先级 fastReq > get 即get方式如果添加了fastReq，也会拦截
    // console.log(params);
    if (requestHistory[config.url]) {
      // 不需要拦截频繁请求的请加一个 fastReq: true
      console.log(config.url, "重复性请求");
      if (config.fastReq) {
        // 不允许频繁请求
        return Promise.reject({ code: 666, msg: "操作太频繁" });
      } else {
        // 没有声明是否允许频繁请求（默认get方式允许，其他不允许）
        if (config.method || config.method.toLowerCase() == "get") {
        } else {
          return Promise.reject({ code: 666, msg: "操作太频繁" });
        }
      }
    }
    requestHistory[config.url] = 1;
    return request(config, ...options).finally(() => {
      delete requestHistory[config.url];
    });
  };
})();

import api from "@/data/api";
Vue.prototype.$api = api;

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    // 需要权限
    if (store.state.token) {
      // 具备权限
      next();
    } else {
      // 不具备权限
      // next({
      //   name: "login",
      //   query: {
      //     redirect: to.fullPath
      //   }
      // });
      store.commit("setRedirect", to.fullPath);
      store.commit("setShowLogin", true);
      next(false);
    }
  } else {
    // 不需要权限
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
