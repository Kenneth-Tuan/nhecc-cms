import { defineStore } from "pinia";
import { reactive } from "vue";

export const useServiceStore = defineStore("serviceStore", () => {
  const service = reactive({
    name: "",
    type: "",
    status: "",
    location: "",
    rehearsalTime: { start: "", end: "" },
    serviceTime: { start: "", end: "" },
    remarks: "",
    songList: [],
    members: [],
  });

  return { service };
});
