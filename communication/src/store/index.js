import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token: "",
    username: "",
    avatar: "",
    userId: 0
  },
  mutations: {
    setUserData(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.username = payload.username;
      state.avatar = payload.avatar;
    }
  }
});
