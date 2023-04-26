import { createRouter, createWebHistory } from "vue-router";
// @ts-ignore
import Home from "../views/Home.vue";
// @ts-ignore
import New from "../views/New.vue";
// @ts-ignore
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
