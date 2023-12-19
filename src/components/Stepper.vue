<script setup>
import { ref, onMounted } from "vue";

import { useServiceStore } from "@/stores/service";
import { storeToRefs } from "pinia";
import HymnsTable from "./HymnsTable.vue";
import ServiceForm from "./ServiceForm.vue";
import BandMembers from "./BandMembers.vue";

const { service, initService, addHymn, addMember } = useServiceStore();
const { isHymnListAddable, isMembersAddable } = storeToRefs(useServiceStore());

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

onMounted(() => {
  initService();
});
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
        class=""
      >
        <ServiceForm :service="service" />

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
        <HymnsTable :hymns="service.hymnList" />

        <q-btn
          @click="addHymn()"
          color="primary"
          :ripple="false"
          :disable="!isHymnListAddable"
          class="u-mt-8px"
          no-caps
          dense
          flat
        >
          <q-icon name="add_circle" class="u-mr-8px" />
          <span>
            {{ "add_hymn" }}
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
        <BandMembers :members="service.members" />

        <q-btn
          @click="addMember()"
          color="primary"
          :ripple="false"
          :disable="!isMembersAddable"
          class="u-mt-8px"
          no-caps
          dense
          flat
        >
          <q-icon name="add_circle" class="u-mr-8px" />
          <span>
            {{ "add_member" }}
          </span>
        </q-btn>

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
