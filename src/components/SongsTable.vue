<script setup>
import { keys } from "@/constants/misc";

const props = defineProps({
  songs: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div
    v-for="(song, index) in songs"
    class="u-flex u-flex-row u-items-center u-justify-start u-flex-nowrap u-gap-x-16px"
  >
    <span>{{ index + 1 }}</span>
    <q-input v-model="song.name" type="text" label="song_name" outlined dense />
    <!-- <q-select v-model="song.name" :options="options" label="Standard" filled /> -->
    <q-select
      v-model="song.key"
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
      v-model="song.sheet"
      :options="keys"
      type="text"
      outlined
      dense
      label="song_sheet_version"
    >
    </q-select>

    <q-btn flat dense color="primary" :ripple="false" no-caps>
      <q-icon name="delete" />
    </q-btn>
  </div>
</template>
