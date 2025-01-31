import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import New from "../views/New.vue";
import Single from "../views/Single.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/story/:id",
    name: "Single",
    component: Single,
  },
  {
    path: "/new",
    name: "New",
    component: New,
  },
];
export const router = createRouter({
  history: createWebHistory(),
  routes,
});
