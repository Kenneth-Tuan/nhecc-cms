import { defineStore } from "pinia";
import { reactive, computed } from "vue";

import { OriginalSongInfo } from "@/classes/Service";
import { keys } from "@/constants/misc";

export const useServiceStore = defineStore("serviceStore", () => {
  const MAX_SONGS = 10;

  const service = reactive({
    name: "",
    type: "",
    status: "",
    location: "",
    rehearsalTime: { start: "", end: "" },
    serviceTime: { start: "", end: "" },
    remarks: "",
    hymnList: [],
    members: [],
  });

  function initService() {
    service.name = "";
    service.type = "";
    service.status = "";
    service.location = "";
    service.rehearsalTime.start = "";
    service.rehearsalTime.end = "";
    service.serviceTime.start = "";
    service.serviceTime.end = "";
    service.remarks = "";
    service.hymnList = [];
    service.members = [];

    addSong();
  }

  function addSong(hymnInfo) {
    if (service.hymnList.length >= MAX_SONGS) return;
    const newSong = new OriginalSongInfo({
      ...hymnInfo,
      key: keys[Math.floor(Math.random() * 12)],
    });
    service.hymnList.push(newSong);
  }

  const isSongListAddable = computed(() => service.hymnList.length < MAX_SONGS);

  return {
    service,
    isSongListAddable,

    initService,
    addSong,
  };
});
