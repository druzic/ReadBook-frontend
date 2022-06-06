import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/addMember",
    name: "AddMember",
    component: () => import("../views/AddMember.vue"),
  },
  {
    path: "/members",
    name: "Members",
    component: () => import("../views/Members.vue"),
  },
  {
    path: "/addBook",
    name: "AddBook",
    component: () => import("../views/AddBook.vue"),
  },
  {
    path: "/books",
    name: "Books",
    component: () => import("../views/Books.vue"),
  },
  {
    path: "/issued",
    name: "Issued",
    component: () => import("../views/Issued.vue"),
  },
  {
    path: "/report",
    name: "Report",
    component: () => import("../views/Report.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
