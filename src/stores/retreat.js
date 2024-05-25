import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  helpers,
  required,
  maxLength,
  minLength,
  alphaNum,
  numeric,
  alpha,
} from "@vuelidate/validators";
import { useQuasar } from "quasar";

import { submitRetreatForm } from "@/apis/googleApi";

export const useRetreatStore = defineStore("retreatStore", () => {
  const $q = useQuasar();

  const formState = reactive({
    display: false,
    loading: false,
    name: "",
    tel: "",
    id: "",
    traffic: [],
    passengerNum: 1,
    room: "",
    trafficList: ["我需要被接駁", "我不需要被接駁", "我可以協助接駁"],
    roomList: ["我需要睡袋", "我需要床墊", "我可以提供床墊", "我都不需要"],
    itemNum: 1,
    remarks1: `接駁的服務包含週五晚上上山以及週日出游。
    週五晚上需要接駁的弟兄姐妹們請於晚上 1930 大湖公園捷運站 1 號出口集合。`,
    remarks4: `床墊尺寸：L191*W77*H25 (單位: CM) 
     床墊價格：298 NT$ / PCS`,
    remarks2: "https://tw.shp.ee/5mq4tiG",
    remarks3: "身份證號用於保團體險，請確實填寫，謝謝！",
  });

  const rules = computed(() => ({
    name: {
      required: helpers.withMessage(() => "必填", required),
    },
    tel: {
      required: helpers.withMessage(() => "必填", required),
      maxLength: helpers.withMessage(() => "請輸入10位數手機號", maxLength(12)),
      minLength: helpers.withMessage(() => "請輸入10位數手機號", minLength(12)),
      // numeric: helpers.withMessage(() => "請輸入數字", numeric),
    },
    id: {
      required: helpers.withMessage(() => "必填", required),
      maxLength: helpers.withMessage(
        () => "請輸入10位身份證字號",
        maxLength(10)
      ),
      minLength: helpers.withMessage(
        () => "請輸入10位身份證字號",
        minLength(10)
      ),
      alphaNum: helpers.withMessage(() => "請輸入英文或數字", alphaNum),
    },
    traffic: {
      required: helpers.withMessage(() => "必填", required),
      wrongResult: helpers.withMessage(
        () => "請選擇正確選項",
        (val, obj) => {
          if (
            (val.includes("我可以協助接駁") ||
              val.includes("我不需要被接駁")) &&
            val.includes("我需要被接駁")
          )
            return false;
          return true;
        }
      ),
    },
    room: {
      required: helpers.withMessage(() => "必填", required),
    },
    passengerNum: {
      required: helpers.withMessage(() => "必填", required),
      numeric: helpers.withMessage(() => "請輸入數字", numeric),
    },
    itemNum: {
      required: helpers.withMessage(() => "必填", required),
      numeric: helpers.withMessage(() => "請輸入數字", numeric),
    },
  }));

  const v$ = useVuelidate(rules, formState);

  async function submit() {
    try {
      const isValid = await v$.value.$validate();
      console.log("isValid: ", isValid);
      if (isValid) {
        if (formState.traffic.includes("我需要被接駁"))
          formState.passengerNum = 0;

        formState.loading = true;
        submitRetreatForm({
          "entry.648725677": formState.name,
          "entry.108551800": formState.tel,
          "entry.1953137580": formState.id,
          "entry.263654559": formState.traffic.join(", "),
          "entry.1391140609": formState.passengerNum,
          "entry.1435968211": formState.room,
          "entry.488070935": formState.itemNum,
        });
        triggerNotify();
        formState.display = false;
      }
    } catch (error) {
      console.error("error: ", error);
    } finally {
      formState.loading = false;
      formState.name = "";
      formState.tel = "";
      formState.id = "";
      formState.traffic = [];
      formState.passengerNum = 1;
      formState.room = "";
      formState.itemNum = 1;
    }
  }

  function triggerNotify() {
    $q.dialog({
      title: "發送成功<em>!</em>",
      html: true,
      persistent: true,
    })
      .onOk(() => {
        // console.log('OK')
      })
      .onCancel(() => {
        // console.log('Cancel')
      })
      .onDismiss(() => {
        formState.loading = false;
        // console.log('I am triggered on both OK and Cancel')
      });
  }

  return {
    formState,
    v$,

    submit,
  };
});
