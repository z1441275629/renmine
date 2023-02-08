import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: "hash", // history
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        auth: false,
      }
    },
    {
      path: '/regist',
      name: 'regist',
      component: () => import('@/views/user/regist.vue'),
      meta: {
        auth: false,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/user/login.vue'),
      meta: {
        auth: false,
      }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/user/list.vue'),
      meta: {
        auth: true,
      }
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('@/views/demo.vue'),
      meta: {
        auth: true,
      },
    },
    {
      path: '/score',
      name: 'score',
      alias: "/sc",
      component: () => import('@/views/score/list.vue'),
      meta: {
        auth: true,
      },
      beforeEnter: (to, from,  next) => {
        console.log(to);
        next();
      }
    },
    {
      path: '/s',
      // redirect: '/score',
      // redirect: {
      //   name: "score"
      // },
      redirect: to => {
        // return "score";
        // return {
        //   // path: "/score",
        //   name: "score"
        // };
        if(to.query.jj){
          return "score"
        }else{
          return "user"
        }
      },
      meta: {
        auth: true,
      }
    },
    {
      path: '/user-login',
      name: 'userLogin',
      component: () => import('@/views/user/login.vue'),
      props: route => {
        return {
          from: "weixin"
        }
      },
      meta: {
        auth: false,
      }
    },
  ]
})
