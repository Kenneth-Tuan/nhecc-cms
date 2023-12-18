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

    addHymn();
  }

  function addHymn(hymnInfo) {
    if (service.hymnList.length >= MAX_SONGS) return;
    const newSong = new OriginalSongInfo({
      ...hymnInfo,
      key: keys[Math.floor(Math.random() * 12)],
    });
    service.hymnList.push(newSong);
  }

  function updateHymn(updateValue, columnName, hymnId) {
    service.hymnList = service.hymnList.map((hymn) => {
      if (hymn.id === hymnId) {
        return { ...hymn, [columnName]: updateValue };
      }
      return hymn;
    });
  }

  function removeHymn(hymnId) {
    if (service.hymnList.length <= 1) {
      service.hymnList = [];
      addHymn();
    }
    service.hymnList = service.hymnList.filter((hymn) => hymn.id !== hymnId);
  }

  const isHymnListAddable = computed(() => service.hymnList.length < MAX_SONGS);
  const isHymnListRemoveable = computed(() => service.hymnList.length > 1);

  return {
    service,
    isHymnListAddable,
    isHymnListRemoveable,

    initService,
    addHymn,
    updateHymn,
    removeHymn,
  };
});
