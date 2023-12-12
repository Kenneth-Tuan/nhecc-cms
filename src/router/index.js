import { createWebHistory, createRouter } from "vue-router";
import { storeToRefs } from "pinia";

import LandingPage from "@/views/LandingPage.vue";
import { i18n, updateLang } from "@/locales/index";
// import { useUserStore } from "@/stores/user";
// import { useMiscStore } from "@/stores/misc";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const {
  global: { availableLocales, fallbackLocale },
} = i18n;

const routes = [
  {
    path: "/",
    redirect: {
      name: "landingPage",
      params: { lang: fallbackLocale.value },
    },
  },
  {
    path: "/:lang",
    children: [
      {
        path: "nhecc",
        name: "landingPage",
        component: LandingPage,
        meta: {
          layout: DefaultLayout,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  //   const userStore = useUserStore();
  //   const { getToken, signIn, fetchUserProfile } = userStore;
  //   const { isUserProfileFetched } = storeToRefs(userStore);

  //   const miscStore = useMiscStore();
  //   const { redirectToLoginPage } = miscStore;

  const {
    params: { lang },
  } = to;
  //   const token = getToken();

  // adjust locale
  if (!availableLocales.includes(lang)) {
    console.error(
      `invalid lang in url, redirect to fallback locale:${fallbackLocale.value}`
    );
    next(`${fallbackLocale.value}/nhecc/`);
  } else {
    updateLang(lang);
  }

  //   if (!token) {
  //     if (import.meta.env.DEV) {
  //       await signIn();
  //     } else {
  //       redirectToLoginPage();
  //       return;
  //     }
  //   }

  //   if (!isUserProfileFetched.value) {
  //     await fetchUserProfile();
  //   }

  next();
});

export default router;
