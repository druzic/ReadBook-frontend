import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import moment from "moment";
import axios from "axios";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

axios.defaults.baseURL = "https://readbookfipu.herokuapp.com";
//axios.defaults.baseURL = "http://localhost:3000";
Vue.config.productionTip = false;
moment.locale("en");
Vue.prototype.moment = moment;

Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
