<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";

import { keys } from "@/constants/misc";
import {
  dummyHymns,
  dummyHymnDescription,
  dummyHymnSheet,
} from "@/mocks/domains/hymn/data";
import { useServiceStore } from "@/stores/service";

const serviceStore = useServiceStore();
const { updateHymn, removeHymn } = serviceStore;
const { isHymnListRemoveable } = storeToRefs(serviceStore);

const props = defineProps({
  hymns: {
    type: Array,
    required: true,
  },
});

const adaptedHymns = dummyHymns.map((hymn) => {
  return {
    label: hymn.hymn_title_main,
    value: hymn.hymn_title_main,
    lyrics: hymn.hymn_lyrics_main,
    dsp: hymn.hymn_lyrics_main_dsp,
  };
});

const hymnlist = ref(adaptedHymns);

function filterFn(val, update, abort) {
  // if (val.length < 2) {
  //   abort();
  //   return;
  // }
  update(() => {
    const needle = val.toLocaleLowerCase();
    hymnlist.value = adaptedHymns.filter(
      (hymn) => hymn.value.toLocaleLowerCase().indexOf(needle) > -1
    );
  });
}

function onInput(updateValue, columnName, id) {
  updateHymn(updateValue, columnName, id);
}

function onUpdate(updateValue, columnName, id) {
  updateHymn(updateValue, columnName, id);
}

function highlightFiltered(hymnTitle, inputValue) {
  const label = hymnTitle.replaceAll(
    inputValue?.toUpperCase(),
    `<span class='u-fw-700! u-c-blue!' >${inputValue?.toUpperCase()}</span>`
  );
  return label;
}

function onClickSheet(url) {
  console.log("test -- onClickSheet", url);
  window.open(url, "_blank");
}
</script>

<template>
  <div class="u-flex u-flex-col u-flex-gap-y-16px">
    <transition-group name="fade">
      <div
        v-for="(hymn, index) in hymns"
        :key="hymn.id"
        class="u-flex u-flex-row u-items-center u-justify-start u-flex-nowrap u-gap-x-16px"
      >
        <span>{{ index + 1 }}</span>

        <q-select
          :model-value="hymn.name"
          @input-value="(val) => onInput(val, 'name', hymn.id)"
          @update:model-value="(val) => onUpdate(val, 'name', hymn.id)"
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
          @click="removeHymn(hymn.id)"
        >
          <q-icon name="delete" />
        </q-btn>
      </div>
    </transition-group>
  </div>
</template>
