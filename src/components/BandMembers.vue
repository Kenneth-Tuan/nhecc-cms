<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";

import { useServiceStore } from "@/stores/service";
import { dummyMembers } from "@/mocks/domains/members/data";
import { ROLES_OF_BAND } from "@/constants/serviceConst";
import Icon from "./Icon.vue";

const serviceStore = useServiceStore();
const { updateMemberInfo, removeMember } = serviceStore;
const { isMembersRemoveable } = storeToRefs(serviceStore);

const props = defineProps({
  members: {
    type: Array,
    required: true,
  },
});

const adaptedMembers = dummyMembers.map((member) => {
  return {
    label: member.Chinese_name,
    value: member.Chinese_name,
    band: member.band_name,
    dsp: member.English_name,
  };
});

const memrberList = ref(adaptedMembers);

function onInput(updateValue, columnName, id) {
  updateMemberInfo(updateValue, columnName, id);
}

function onUpdate(updateValue, columnName, id) {
  updateMemberInfo(updateValue, columnName, id);
}

function filterFn(val, update, abort) {
  // if (val.length < 2) {
  //   abort();
  //   return;
  // }
  update(() => {
    const needle = val.toLocaleLowerCase();
    memrberList.value = adaptedMembers.filter(
      (member) => member.value.toLocaleLowerCase().indexOf(needle) > -1
    );
  });
}

function highlightFiltered(memberName, inputValue) {
  const label = memberName.replaceAll(
    inputValue?.toUpperCase(),
    `<span class='u-fw-700! u-c-blue!' >${inputValue?.toUpperCase()}</span>`
  );
  return label;
}
</script>

<template>
  <div>Band members</div>

  <div class="u-flex u-flex-col u-flex-gap-y-16px">
    <transition-group name="fade">
      <div
        v-for="(member, index) in members"
        :key="member.id"
        class="u-flex u-flex-row u-items-center u-justify-start u-flex-nowrap u-gap-x-16px"
      >
        <span>{{ index + 1 }}</span>

        <q-select
          :model-value="member.name"
          @input-value="(val) => onInput(val, 'name', member.id)"
          @update:model-value="(val) => onUpdate(val, 'name', member.id)"
          :options="memrberList"
          input-debounce="0"
          @filter="filterFn"
          label="member_name"
          options-html
          hide-selected
          fill-input
          map-options
          emit-value
          use-input
          outlined
          dense
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label
                  v-html="highlightFiltered(scope.opt.label, member.name)"
                />
                <q-item-label caption>{{ scope.opt.band }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          :model-value="member.role"
          @update:model-value="(val) => onUpdate(val, 'role', member.id)"
          :options="ROLES_OF_BAND"
          :option-value="
            (opt) =>
              Object(opt) === opt && 'roleName' in opt ? opt.roleName : null
          "
          :option-label="
            (opt) =>
              Object(opt) === opt && 'roleName' in opt ? opt.roleName : null
          "
          input-class="u-text-center"
          class="u-min-w-75px!"
          label="member_role"
          hide-dropdown-icon
          map-options
          outlined
          dense
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section
                class="u-flex u-flex-row u-flex-nowrap u-items-center u-justify-start u-flex-gap-x-8px"
              >
                <q-item-label caption>
                  <img :src="scope.opt.icon" alt="" class="u-w-24px u-h-24px" />
                </q-item-label>
                <q-item-label>{{ scope.opt.roleName }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:selected-item="scope">
            <p
              class="u-flex u-flex-row u-flex-nowrap u-items-center u-justify-start u-flex-gap-x-8px"
            >
              <img
                v-if="!!scope.opt.icon"
                :src="scope.opt.icon"
                alt=""
                class="u-w-24px u-h-24px"
              />
              {{ scope.opt.roleName }}
            </p>
          </template>
        </q-select>

        <q-btn
          flat
          dense
          color="primary"
          :ripple="false"
          no-caps
          :disable="!isMembersRemoveable"
          @click="removeMember(member.id)"
        >
          <q-icon name="delete" />
        </q-btn>
      </div>
    </transition-group>
  </div>
</template>

<style lang="scss" scoped></style>
