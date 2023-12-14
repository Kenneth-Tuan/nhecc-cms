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
    songList: [],
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
    service.songList = [];
    service.members = [];

    addSong();
  }

  function addSong(songInfo) {
    if (service.songList.length >= MAX_SONGS) return;
    const newSong = new OriginalSongInfo({
      ...songInfo,
      key: keys[Math.floor(Math.random() * 12)],
    });
    service.songList.push(newSong);
  }

  const isSongListAddable = computed(() => service.songList.length < MAX_SONGS);

  return {
    service,
    isSongListAddable,

    initService,
    addSong,
  };
});
