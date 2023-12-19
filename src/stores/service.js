import { defineStore } from "pinia";
import { reactive, computed } from "vue";

import { OriginalHymnInfo, OriginalBandMember } from "@/classes/Service";
import { keys } from "@/constants/misc";

export const useServiceStore = defineStore("serviceStore", () => {
  const MAX_SONGS = 10;
  const MAX_MEMBERS = 10;

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
    addMember();
  }

  function addHymn(hymnInfo) {
    if (service.hymnList.length >= MAX_SONGS) return;
    const newSong = new OriginalHymnInfo({
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

  function addMember(memberInfo) {
    if (service.members.length >= MAX_MEMBERS) return;
    const newMember = new OriginalBandMember(memberInfo);
    service.members.push(newMember);
  }

  function updateMemberInfo(updateValue, columnName, memberId) {
    service.members = service.members.map((member) => {
      if (member.id === memberId) {
        return { ...member, [columnName]: updateValue };
      }
      return member;
    });
  }

  function removeMember(memberId) {
    if (service.members.length <= 1) {
      service.members = [];
      addMember();
    }
    service.members = service.members.filter(
      (member) => member.id !== memberId
    );
  }

  const isHymnListAddable = computed(() => service.hymnList.length < MAX_SONGS);
  const isHymnListRemoveable = computed(() => service.hymnList.length > 1);

  const isMembersAddable = computed(() => service.members.length < MAX_MEMBERS);
  const isMembersRemoveable = computed(() => service.members.length > 1);

  return {
    service,
    isHymnListAddable,
    isHymnListRemoveable,
    isMembersAddable,
    isMembersRemoveable,

    initService,
    addHymn,
    updateHymn,
    removeHymn,
    addMember,
    updateMemberInfo,
    removeMember,
  };
});
