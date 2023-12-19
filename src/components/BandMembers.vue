<script setup>
import { storeToRefs } from "pinia";

import { useServiceStore } from "@/stores/service";

const serviceStore = useServiceStore();
const { updateMemberInfo, removeMember } = serviceStore;
const { isMembersRemoveable } = storeToRefs(serviceStore);

const props = defineProps({
  members: {
    type: Array,
    required: true,
  },
});

function onInput(updateValue, columnName, id) {
  updateMemberInfo(updateValue, columnName, id);
}

function onUpdate(updateValue, columnName, id) {
  updateMemberInfo(updateValue, columnName, id);
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
          :model-value="hymn.name"
          @input-value="(val) => onInput(val, 'name', member.id)"
          @update:model-value="(val) => onUpdate(val, 'name', member.id)"
          :options="hymnlist"
          input-debounce="0"
          @filter="filterFn"
          label="hymn_name"
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
                  v-html="highlightFiltered(scope.opt.label, hymn.name)"
                />
                <q-item-label caption>{{ scope.opt.dsp }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <!-- <template v-slot:selected-item="scope">
          {{ scope.opt.label }}
        </template> -->
        </q-select>

        <q-select
          v-model="hymn.key"
          :options="keys"
          input-class="u-text-center"
          class="u-min-w-75px!"
          hide-dropdown-icon
          outlined
          dense
        >
          <template v-slot:append>
            <span class="u-text-14px">
              {{ "key" }}
            </span>
          </template>
        </q-select>

        <q-select
          v-if="!!hymn.name"
          v-model="hymn.sheet"
          :options="dummyHymnSheet"
          map-options
          options-html
          outlined
          dense
          label="hymn_sheet_version"
          class="u-min-w-170px!"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <div class="u-flex u-flex-row u-justify-between">
                  {{ scope.opt.file_type_dsp }}
                  <q-icon
                    name="description"
                    color="primary"
                    @click="onClickSheet(scope.opt.file_name)"
                  />
                </div>
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:selected-item="scope">
            {{ scope.opt.file_type_dsp }}
          </template>
        </q-select>

        <q-btn
          flat
          dense
          color="primary"
          :ripple="false"
          no-caps
          :disable="!isHymnListRemoveable"
          @click="removeMember(hymn.id)"
        >
          <q-icon name="delete" />
        </q-btn>
      </div>
    </transition-group>
  </div>
</template>

<style lang="scss" scoped></style>
