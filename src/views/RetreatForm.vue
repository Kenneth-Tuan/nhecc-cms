<script setup>
import RetreatPoster from "@/assets/img/RetreatPoster.png";
import { useRetreatStore } from "@/stores/retreat.js";

const { formState } = useRetreatStore();
</script>

<template>
  <div class="u-h100% u-bg-#5D7659">
    <div class="u-c-#5D7659 u-bg-white u-fw700 u-text-36px u-text-center u-sha">
      LED 公佈欄
    </div>
    <q-img :src="RetreatPoster" spinner-color="primary" spinner-size="82px" />

    <div class="u-w100% u-flex u-justify-center">
      <q-btn
        outline
        rounded
        color="white"
        text-color="white"
        icon-right="send"
        class="u-mxauto u-my-16px"
        @click="formState.display = true"
      >
        <span class="u-fw700 u-px8px u-text-20px">我要報名</span>
      </q-btn>
    </div>
  </div>
  <q-dialog
    v-model="formState.display"
    backdrop-filter="blur(4px) saturate(150%)"
    :persistent="true"
    class="u-w90%"
  >
    <q-card>
      <q-toolbar>
        <q-toolbar-title
          ><span class="text-weight-bold">報名表單</span>
        </q-toolbar-title>

        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>

      <q-card-section>
        <q-input v-model="formState.name" color="secondary" label="您的大名" />
        <q-input
          v-model="formState.tel"
          color="secondary"
          label="您的聯絡方式"
        />
        <q-input
          v-model="formState.id"
          color="secondary"
          label="您的身份證字號"
        />
        <div class="u-flex u-flex-col">
          <q-select
            v-model="formState.traffic"
            :options="formState.trafficList"
            label="接駁相關"
            color="secondary"
          />
          <q-select
            v-if="formState.traffic === '我可以協助接駁'"
            v-model="formState.passengerNum"
            :options="[1, 2, 3, 4]"
            label="乘客人數"
            color="secondary"
          />
        </div>
        <div class="u-flex u-flex-col">
          <q-select
            v-model="formState.room"
            :options="formState.roomList"
            label="住宿相關"
            color="secondary"
          />
          <q-select
            v-if="formState.room === '我可以提供床墊'"
            v-model="formState.itemNum"
            :options="[1, 2, 3, 4]"
            label="床墊數量"
            color="secondary"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped></style>
