<script setup>
import { ref } from "vue";
import { keys } from "@/constants/misc";
import {
  dummyHymns,
  dummyHymnDescription,
  dummyHymnSheet,
} from "@/mocks/domains/hymn/data";

// const stringOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];

const stringOptions = [
  "Google",
  "Facebook",
  "Twitter",
  "Apple",
  "Oracle",
].reduce((acc, opt) => {
  for (let i = 1; i <= 5; i++) {
    acc.push(opt + " " + i);
  }
  return acc;
}, []);

const props = defineProps({
  hymns: {
    type: Array,
    required: true,
  },
});

const options = ref(stringOptions);
const model = ref(null);

function filterFn(val, update, abort) {
  if (val.length < 2) {
    abort();
    return;
  }
  update(() => {
    const needle = val.toLocaleLowerCase();
    options.value = stringOptions.filter(
      (v) => v.toLocaleLowerCase().indexOf(needle) > -1
    );
  });
}

function setModel(val) {
  model.value = val;
}

function highlightFiltered(opt) {
  const label = opt.label.replaceAll(
    props.modelValue?.toUpperCase(),
    `<span style='font-weight: 600 !important'>${props.modelValue?.toUpperCase()}</span>`
  );
  return label;
}
</script>

<template>
  <div
    v-for="(hymn, index) in hymns"
    class="u-flex u-flex-row u-items-center u-justify-start u-flex-nowrap u-gap-x-16px"
  >
    <span>{{ index + 1 }}</span>

    <q-select
      :model-value="model"
      use-input
      hide-selected
      fill-input
      input-debounce="0"
      :options="options"
      @filter="filterFn"
      @input-value="setModel"
      label="hymn_name"
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
            <q-item-label v-html="highlightFiltered(scope.opt)" />
          </q-item-section>
        </q-item>
      </template>
    </q-select>

    <q-select
      v-model="hymn.key"
      :options="keys"
      type="text"
      outlined=""
      dense
      hide-dropdown-icon
    >
      <template v-slot:append>
        <span class="u-text-14px">
          {{ "key" }}
        </span>
      </template>
    </q-select>

    <q-select
      v-model="hymn.sheet"
      :options="dummyHymnSheet"
      map-options
      options-html
      outlined
      dense
      label="hymn_sheet_version"
    >
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section>
            {{ scope.opt.file_type_dsp }}
          </q-item-section>
        </q-item>
      </template>
      <template v-slot:selected-item="scope">
        {{ scope.opt.file_type_dsp }}
      </template>
    </q-select>

    <q-btn flat dense color="primary" :ripple="false" no-caps>
      <q-icon name="delete" />
    </q-btn>
  </div>
</template>
