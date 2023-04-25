import { createRouter, createWebHistory } from "vue-router";
// @ts-ignore
import Home from "../components/Home.vue";
const routes = [
  {
    path: "/",
    component: Home,
  },
];
export const router = createRouter({
  history: createWebHistory(),
  routes,
});
