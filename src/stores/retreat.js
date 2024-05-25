import { defineStore } from "pinia";
import { reactive, computed } from "vue";

export const useRetreatStore = defineStore("retreatStore", () => {
  const formState = reactive({
    display: false,
    name: "",
    tel: "",
    id: "",
    traffic: "",
    passengerNum: 1,
    room: "",
    trafficList: ["我需要接駁", "我可以協助接駁", "我不需要接駁"],
    roomList: ["我需要睡袋", "我需要床墊", "我可以提供床墊"],
    itemNum: 1,
  });

  return { formState };
});
