<script setup>
import { serviceTypeOptions, venues } from "@/constants/misc";
import { ServiceStatusEnum } from "@/enums/AppEnum";
import DatePicker from "./DatePicker.vue";

const props = defineProps({
  service: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="u-grid u-grid-cols-12 u-gap-24px">
    <q-input
      v-model="service.name"
      label="service_name"
      outlined
      dense
      class="u-col-span-6"
    />
    <q-select
      outlined
      v-model="service.type"
      :options="serviceTypeOptions"
      label="service_type"
      dense
      class="u-col-span-6"
    />
    <div class="u-col-span-6 u-flex u-flex-row u-justify-around">
      <q-radio
        v-model="service.status"
        :val="ServiceStatusEnum.EDIT"
        label="Edit"
        color="orange"
      />
      <q-radio
        v-model="service.status"
        :val="ServiceStatusEnum.CLOSE"
        label="Close"
        color="red"
      />
      <q-radio
        v-model="service.status"
        :val="ServiceStatusEnum.SUBMIT"
        label="Submit"
        color="cyan"
      />
    </div>
    <q-select
      outlined
      v-model="service.location"
      :options="venues"
      label="service_location"
      dense
      class="u-col-span-6"
    />
    <div
      class="u-flex u-flex-row u-items-center u-justify-center u-flex-gap-x-16px u-col-span-6"
    >
      <div class="u-flex u-flex-col u-items-center">
        <span class="u-pb-8px">{{ "rehearsal_time_start" }}</span>
        <DatePicker v-model="service.rehearsalTime.start" />
      </div>
      <div class="u-flex u-flex-col u-items-center">
        <span class="u-pb-8px">{{ "rehearsal_time_end" }}</span>
        <DatePicker v-model="service.rehearsalTime.end" />
      </div>
    </div>
    <div
      class="u-flex u-flex-row u-items-center u-justify-center u-flex-gap-x-16px u-col-span-6"
    >
      <div class="u-flex u-flex-col u-items-center">
        <span class="u-pb-8px">{{ "service_time_start" }}</span>
        <DatePicker v-model="service.serviceTime.start" />
      </div>
      <div class="u-flex u-flex-col u-items-center">
        <span class="u-pb-8px">{{ "service_time_end" }}</span>
        <DatePicker v-model="service.serviceTime.end" />
      </div>
    </div>
  </div>
</template>
