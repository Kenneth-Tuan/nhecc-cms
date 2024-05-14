import { createApp } from "vue";
import { Quasar, Dialog, Notify } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import "@/styles/base.scss";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
import App from "./App.vue";
import "virtual:uno.css";
import { i18n } from "@/locales";
import router from "@/router";

// import { loadMockService } from './mocks/browser'

if (
  process.env.NODE_ENV === "development" &&
  import.meta.env.VITE_APP_IS_MOCK === "TRUE"
) {
  // await loadMockService()
}

const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: { Dialog, Notify },
});

const pinia = createPinia();
pinia.use(
  createPersistedState({
    storage: sessionStorage,
  })
);
myApp.use(pinia);

myApp.use(router);

myApp.use(i18n);

myApp.mount("#app");
