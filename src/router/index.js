import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue")
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/Admin.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/", "/about"];
  const authRequired = !publicPages.includes(to.path);
  const adminPages = ["/admin"];

  const loggedIn = store.getters.isAuthenticated;

  if (adminPages.includes(to.path)) {
    if (store.getters.isAdmin) {
      return next();
    } else {
      return next("/");
    }
  }

  if (!loggedIn && authRequired) {
    return next("/");
  }

  next();
});

export default router;
