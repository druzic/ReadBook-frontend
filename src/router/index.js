import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      needUser: true,
      needAdmin: true,
    },
  },
  {
    path: "/addMember",
    name: "AddMember",
    component: () => import("../views/AddMember.vue"),
    meta: {
      needUser: true,
      needAdmin: true,
    },
  },
  {
    path: "/members",
    name: "Members",
    component: () => import("../views/Members.vue"),
    meta: {
      needUser: true,
      needAdmin: true,
    },
  },
  {
    path: "/addBook",
    name: "AddBook",
    component: () => import("../views/AddBook.vue"),
    meta: {
      needUser: true,
      needAdmin: true,
    },
  },
  {
    path: "/books",
    name: "Books",
    component: () => import("../views/Books.vue"),
    meta: {
      needUser: true,
    },
  },
  {
    path: "/issueBook",
    name: "IssueBook",
    component: () => import("../views/IssueBook.vue"),
    meta: {
      needUser: true,
      needAdmin: true,
    },
  },
  {
    path: "/issued",
    name: "Issued",
    component: () => import("../views/Issued.vue"),
    meta: {
      needUser: true,
      needAdmin: true,
    },
  },
  {
    path: "/reservation",
    name: "Reservations",
    component: () => import("../views/Reservations.vue"),
    meta: {
      needUser: true,
      needAdmin: true,
    },
  },
  {
    path: "/report",
    name: "Report",
    component: () => import("../views/Report.vue"),
    meta: {
      needUser: true,
      needAdmin: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      needUser: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeResolve((to, from, next) => {
  const user = store.getters.user;
  if (!user && to.meta.needUser) {
    return next("/login");
  }
  if (user && !to.meta.needUser) {
    return next("/books");
  }
  if (user && !user.isAdmin && to.meta.needAdmin) {
    return next("/books");
  }

  next();
});

export default router;
