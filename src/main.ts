import { createApp } from "vue";
import { createPinia } from "pinia";
// @ts-ignore-next-line
import App from "./App.vue";
import { router } from "./router/router";
const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
