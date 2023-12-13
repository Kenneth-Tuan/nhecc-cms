<script setup>
import { ref } from "vue";

import { serviceTypeOptions, venues } from "@/constants/misc";
import { ServiceStatusEnum } from "@/enums/AppEnum";
import DatePicker from "./DatePicker.vue";
import { useServiceStore } from "@/stores/service";

const { service } = useServiceStore();

const step = ref(1);
const done1 = ref(false);
const done2 = ref(false);
const done3 = ref(false);

function reset() {
  done1.value = false;
  done2.value = false;
  done3.value = false;
  step.value = 1;
}
</script>

<template>
  <div class="q-pa-md">
    <q-btn
      label="Reset"
      push
      color="white"
      text-color="primary"
      @click="reset"
      class="q-mb-md"
    />

    <q-stepper v-model="step" header-nav ref="stepper" color="primary" animated>
      <q-step
        :name="1"
        title="Select campaign settings"
        icon="settings"
        :done="done1"
      >
        <div class="u-grid u-grid-cols-12 u-gap-16px">
          <q-input
            outlined
            v-model="service.name"
            label="service_name"
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
            class="u-flex u-flex-row u-items-center u-justify-center u-col-span-6"
          >
            <div class="u-flex u-flex-col u-items-center">
              <span>{{ "rehearsal_time_start" }}</span>
              <DatePicker v-model="service.rehearsalTime.start" />
            </div>
            <div class="u-flex u-flex-col u-items-center">
              <span>{{ "rehearsal_time_end" }}</span>
              <DatePicker v-model="service.rehearsalTime.end" />
            </div>
          </div>
          <div
            class="u-flex u-flex-row u-items-center u-justify-center u-col-span-6"
          >
            <div class="u-flex u-flex-col u-items-center">
              <span>{{ "service_time_start" }}</span>
              <DatePicker v-model="service.serviceTime.start" />
            </div>
            <div class="u-flex u-flex-col u-items-center">
              <span>{{ "service_time_end" }}</span>
              <DatePicker v-model="service.serviceTime.end" />
            </div>
          </div>
        </div>

        <q-stepper-navigation align="right">
          <q-btn
            @click="
              () => {
                done1 = true;
                step = 2;
              }
            "
            color="primary"
            label="Continue"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Create Song List"
        icon="create_new_folder"
        :done="done2"
      >
        <div v-for="song in service.songList" class="">
          <p></p>
        </div>

        <q-btn flat dense color="primary" :ripple="false" no-caps>
          <span>
            {{ "+ Add Song" }}
          </span>
        </q-btn>

        <q-stepper-navigation align="right">
          <q-btn flat @click="step = 1" color="primary" label="Back" />
          <q-btn
            @click="
              () => {
                done2 = true;
                step = 3;
              }
            "
            class="q-ml-sm"
            color="primary"
            label="Continue"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="3" title="Create an ad" icon="add_comment" :done="done3">
        Try out different ad text to see what brings in the most customers, and
        learn how to enhance your ads using features like ad extensions. If you
        run into any problems with your ads, find out how to tell if they're
        running and how to resolve approval issues.

        <q-stepper-navigation>
          <q-btn flat @click="step = 2" color="primary" label="Back" />
          <q-btn
            color="primary"
            class="q-ml-sm"
            @click="done3 = true"
            label="Finish"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>
