import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    user: null,
    isAuth: false,
    loading: true,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setAuthToken(state, payload) {
      if (payload) {
        axios.defaults.headers.common["x-auth-token"] = payload;
      } else {
        delete axios.defaults.headers.common["x-auth-token"];
      }
      state.token = payload;
    },
    setIsAuth(state, payload) {
      state.isAuth = payload;
    },
    setIsLoading(state, payload) {
      state.loading = payload;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuth = false;
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    isAuth(state) {
      return state.isAuth;
    },
    loading(state) {
      return state.loading;
    },
  },
  actions: {
    async getUserData({ commit }) {
      if (localStorage.getItem("token")) {
        commit("setAuthToken", localStorage.getItem("token"));
      }
      try {
        const res = await axios.get("http://localhost:3000/user/login");
        commit("setIsAuth", true);
        commit("setUser", res.data);
        commit("setIsLoading", false);
        //console.log(res.data);
      } catch (error) {
        commit("setIsAuth", false);
        commit("setUser", null);
        commit("setIsLoading", false);
      }
    },
  },
  modules: {},
});
