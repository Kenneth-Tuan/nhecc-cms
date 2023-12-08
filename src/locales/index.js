import { createI18n } from "vue-i18n";
import { Quasar } from "quasar";
import dayjs from "dayjs";
import dayjsHk from "dayjs/locale/zh-hk";
import dayjsCn from "dayjs/locale/zh-cn";
import dayjsJa from "dayjs/locale/ja";
import dayjsEs from "dayjs/locale/es";
import dayjsDe from "dayjs/locale/de";

import enGlobalMessage from "@/shared/locales/en-us.json";
// import hkGlobalMessage from "@/shared/locales/zh-hk.json";
// import cnGlobalMessage from "@/shared/locales/zh-cn.json";
// import deGlobalMessage from "@/shared/locales/de-de.json";
// import jpGlobalMessage from "@/shared/locales/ja-jp.json";
// import esGlobalMessage from "@/shared/locales/es-es.json";

import enMessage from "@/locales/en-us.json";
// import hkMessage from "@/locales/zh-hk.json";
// import cnMessage from "@/locales/zh-cn.json";
// import jpMessage from "@/locales/ja-jp.json";
// import esMessage from "@/locales/es-es.json";

const messages = {
  "en-us": enGlobalMessage,
  //   "zh-hk": hkGlobalMessage,
  //   "zh-cn": cnGlobalMessage,
  //   "de-de": deGlobalMessage,
  //   "ja-jp": jpGlobalMessage,
  //   "es-es": esGlobalMessage,
};

export const i18n = createI18n({
  locale: "en-us",
  fallbackLocale: "en-us",
  messages,
  legacy: false,
});

i18n.global.mergeLocaleMessage("en-us", enMessage);
// i18n.global.mergeLocaleMessage("zh-hk", hkMessage);
// i18n.global.mergeLocaleMessage("zh-cn", cnMessage);
// i18n.global.mergeLocaleMessage("ja-jp", jpMessage);
// i18n.global.mergeLocaleMessage("es-es", esMessage);

function getQuasarLangByLocalLang(lang) {
  const langObj = {
    "en-us": "en-US",
    "zh-hk": "zh-TW",
    "zh-cn": "zh-CN",
    "ja-jp": "ja",
    "de-de": "de",
    "es-es": "es",
  };

  return langObj[lang];
}

export function updateQuasarLang(lang) {
  const quasarLang = getQuasarLangByLocalLang(lang);
  const modules = import.meta.glob([
    "../../node_modules/quasar/lang/en-US.mjs",
    "../../node_modules/quasar/lang/zh-CN.mjs",
    "../../node_modules/quasar/lang/zh-TW.mjs",
    "../../node_modules/quasar/lang/ja.mjs",
    "../../node_modules/quasar/lang/de.mjs",
    "../../node_modules/quasar/lang/es.mjs",
  ]);
  const module = modules[`../../node_modules/quasar/lang/${quasarLang}.mjs`];

  if (!!module) {
    module().then((lang) => {
      Quasar.lang.set(lang.default);
    });
  }
}

export function updateDayjsLang(lang) {
  const dayjsLang = getDayjsLangByLocalLang(lang);
  dayjs.locale(dayjsLang);
}

export function getDayjsLangByLocalLang(lang) {
  const langObj = {
    "en-us": "en-us",
    "zh-hk": "zh-hk",
    "zh-cn": "zh-cn",
    "ja-jp": "ja",
    "de-de": "de",
    "es-es": "es",
  };

  return langObj[lang];
}

export function updateLang(lang) {
  i18n.global.locale.value = lang;
  updateQuasarLang(lang);
  updateDayjsLang(lang);
}
