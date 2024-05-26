<script setup>
import RetreatPoster from "@/assets/img/RetreatPoster.png";
import { useRetreatStore } from "@/stores/retreat.js";
import { storeToRefs } from "pinia";

import CountDownTimer from "@/components/CountDownTimer.vue";

const retreatStore = useRetreatStore();
const { v$ } = storeToRefs(retreatStore);
const { formState, submit, isExpired } = retreatStore;
</script>

<template>
  <div class="u-h100% u-relative">
    <div
      class="u-my8px u-c-#5D7659 u-bg-white u-fw700 u-text-36px u-text-center"
    >
      LED 公佈欄
    </div>

    <q-img
      :src="RetreatPoster"
      spinner-color="primary"
      spinner-size="82px"
      class="u-mb36px"
    />

    <p class="u-text-center u-text-48px u-c-#5D7659 u-bg-white u-fw700">
      行程表
    </p>

    <q-separator inset color="gray" class="u-my16px" />

    <q-timeline layout="comfortable" side="right" color="secondary">
      <q-timeline-entry color="secondary" side="left" heading>
        6/7 FRI</q-timeline-entry
      >

      <q-timeline-entry
        title="晚餐"
        subtitle="2000 ~ 2100"
        side="left"
        icon="restaurant"
      >
        <!-- <div>晚餐</div> -->
      </q-timeline-entry>

      <q-timeline-entry
        title="整理"
        subtitle="2100 ~ 2200"
        side="right"
        icon="shower"
      >
        <div class="u-text-14px u-c-gray">整理行李、寢具，盥洗</div>
      </q-timeline-entry>

      <q-timeline-entry color="secondary" side="left" heading
        >6/8 SAT</q-timeline-entry
      >

      <q-timeline-entry
        title="晨更"
        subtitle="0630 ~ 0730"
        side="left"
        icon="sunny"
      >
        <!-- <div></div> -->
      </q-timeline-entry>

      <q-timeline-entry
        title="晨更分享"
        subtitle="0730 ~ 0830"
        side="left"
        icon="restaurant"
      >
        <!-- <div></div> -->
      </q-timeline-entry>

      <q-timeline-entry
        title="早餐"
        subtitle="0830 ~ 1000"
        side="left"
        icon="restaurant"
      >
        <!-- <div></div> -->
      </q-timeline-entry>

      <q-timeline-entry
        title="主題活動一"
        subtitle="1000 ~ 1200"
        side="left"
        color="orange"
        icon="done_all"
      >
        <!-- <div></div> -->
      </q-timeline-entry>

      <q-timeline-entry
        title="午餐及午休時間"
        subtitle="1200 ~ 1330"
        side="left"
        icon="restaurant"
      >
        <!-- <div></div> -->
      </q-timeline-entry>

      <q-timeline-entry
        title="田園生活"
        subtitle="1330 ~ 1530"
        icon="grass"
        side="right"
      >
        <!-- <div></div> -->
      </q-timeline-entry>

      <q-timeline-entry
        title="下午茶"
        subtitle="1530 ~ 1630"
        side="left"
        icon="coffee"
      >
        <div></div>
      </q-timeline-entry>

      <q-timeline-entry title="準備晚餐" subtitle="1630 ~ 1730" side="left">
        <div></div>
      </q-timeline-entry>

      <q-timeline-entry
        title="晚餐"
        subtitle="1730 ~ 1900"
        side="left"
        icon="restaurant"
      >
        <div></div>
      </q-timeline-entry>

      <q-timeline-entry
        title="主題活動二"
        subtitle="1900 ~ 2100"
        side="left"
        color="orange"
        icon="star"
      >
        <!-- <div></div> -->
      </q-timeline-entry>

      <q-timeline-entry
        title="盥洗"
        subtitle="2100 ~ 2200"
        side="right"
        icon="shower"
      >
      </q-timeline-entry>

      <q-timeline-entry heading class="u-text-left"> 6/9 SUN</q-timeline-entry>

      <q-timeline-entry
        title="晨更"
        subtitle="0630 ~ 0730"
        side="left"
        icon="sunny"
      >
      </q-timeline-entry>

      <q-timeline-entry
        title="早餐"
        subtitle="0730 ~ 0800"
        side="right"
        icon="restaurant"
      >
      </q-timeline-entry>

      <q-timeline-entry
        title="主日崇拜"
        subtitle="0800 ~ 1000"
        side="right"
        icon="book"
      >
        <div class="u-text-14px u-c-gray">實體敬拜，線上主日</div>
      </q-timeline-entry>

      <q-timeline-entry
        title="收拾行李"
        subtitle="1000 ~ 1030"
        side="right"
        icon="luggage"
      >
      </q-timeline-entry>

      <q-timeline-entry title="出發淺水灣" subtitle="1030 ~ 1130" side="right">
      </q-timeline-entry>

      <q-timeline-entry
        title="午餐"
        subtitle="1130 ~ 1230"
        side="right"
        icon="restaurant"
      >
      </q-timeline-entry>

      <q-timeline-entry
        title="玩水"
        subtitle="1300 ~ 1600"
        side="right"
        icon="beach_access"
      >
      </q-timeline-entry>

      <q-timeline-entry title="回程" subtitle="1600 ~ 1700" side="right">
      </q-timeline-entry>

      <q-timeline-entry
        title="解散"
        subtitle="1800"
        side="right"
        color="orange"
      >
      </q-timeline-entry>
    </q-timeline>

    <div class="u-mt36px u-c-white">-</div>

    <q-btn
      rounded
      :disable="isExpired"
      color="secondary"
      text-color="white"
      :icon-right="isExpired ? 'cancel' : 'touch_app'"
      class="u-mxauto u-my-16px u-fixed u-bottom-0 u-left-50% u-translate--50% u-z-1 u-backdrop-blur-10"
      @click="formState.display = true"
    >
      <span v-if="isExpired" class="u-fw700 u-px8px u-text-20px">報名截止</span>
      <span v-else class="u-fw700 u-px8px u-text-20px">我要報名</span>
    </q-btn>
    <div
      class="u-fixed u-bottom--8px u-left-50% u-translate--50% u-z-1 u-backdrop-blur-10 u-w100% u-flex u-justify-center u-flex-nowrap"
    >
      <p class="u-text-nowrap">剩餘報名時間：</p>
      <CountDownTimer />
    </div>
  </div>

  <q-dialog
    v-model="formState.display"
    backdrop-filter="blur(4px) saturate(150%)"
    :persistent="true"
  >
    <q-card class="u-w90% u-h90%">
      <q-toolbar>
        <q-toolbar-title
          ><span class="text-weight-bold">報名表單</span>
        </q-toolbar-title>

        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>

      <q-card-section class="u-flex u-flex-col u-flex-gap-y-20px">
        <q-input
          v-model="formState.name"
          color="secondary"
          label="姓名*"
          :error="v$.name?.$error"
          :error-message="v$.name?.$errors?.[0]?.$message"
          placeholder="吳聾聲"
        />
        <q-input
          v-model="formState.tel"
          color="secondary"
          label="手機號碼*"
          mask="####-###-###"
          :error="v$.tel?.$error"
          :error-message="v$.tel?.$errors?.[0]?.$message"
          placeholder="0987-654-321"
        />
        <div class="">
          <q-input
            v-model="formState.id"
            color="secondary"
            label="身分證字號*"
            mask="A#########"
            :error="v$.id?.$error"
            :error-message="v$.id?.$errors?.[0]?.$message"
            placeholder="A123456789"
          />

          <p class="u-mt16px u-text-12px u-c-gray u-whitespace-pre-line">
            {{ formState.remarks3 }}
          </p>
        </div>

        <q-input
          v-model="formState.birthday"
          mask="####/##/##"
          :error="v$.birthday?.$error"
          :error-message="v$.birthday?.$errors?.[0]?.$message"
          label="出生年月日*"
          color="secondary"
          placeholder="YYYY/MM/DD"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="formState.birthday" color="secondary">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="secondary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <div class="u-flex u-flex-col">
          <q-select
            v-model="formState.traffic"
            :options="formState.trafficList"
            label="接駁相關*"
            color="secondary"
            :error="v$.traffic?.$error"
            :error-message="v$.traffic?.$errors?.[0]?.$message"
          />
          <transition name="fade" mode="out-in">
            <q-select
              v-if="
                formState.traffic.includes('我可以協助接駁') &&
                !formState.traffic.includes('我需要被接駁')
              "
              v-model="formState.passengerNum"
              :options="[1, 2, 3, 4]"
              label="乘客人數"
              color="secondary"
              :error="v$.passengerNum?.$error"
              :error-message="v$.passengerNum?.$errors?.[0]?.$message"
            />
          </transition>

          <p class="u-mt16px u-text-12px u-c-gray u-whitespace-pre-line">
            {{ formState.remarks1 }}
          </p>
        </div>
        <div class="u-flex u-flex-col">
          <q-select
            v-model="formState.room"
            :options="formState.roomList"
            label="住宿相關*"
            color="secondary"
            :error="v$.room?.$error"
            :error-message="v$.room?.$errors?.[0]?.$message"
          />

          <p class="u-mt16px u-text-12px u-c-gray u-whitespace-pre-line">
            {{ formState.remarks5 }}<br />
          </p>
          <transition name="fade" mode="out-in">
            <p
              v-if="formState.room === '我需要床墊'"
              class="u-text-12px u-c-gray u-whitespace-pre-line"
            >
              {{ formState.remarks4 }}<br />
              <a :href="formState.remarks2" target="_blank">蝦皮鏈接</a>
            </p>
          </transition>
        </div>

        <div class="">
          <q-checkbox
            v-model="formState.badAble"
            label="我可以提供床墊"
            color="secondary"
            dense
          />

          <transition name="fade" mode="out-in">
            <q-select
              v-if="formState.badAble"
              v-model="formState.itemNum"
              :options="[1, 2, 3, 4]"
              label="床墊數量"
              color="secondary"
              :error="v$.itemNum?.$error"
              :error-message="v$.itemNum?.$errors?.[0]?.$message"
            />
          </transition>
        </div>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          @click="submit()"
          color="secondary"
          icon-right="send"
          label="發送表單"
          :loading="formState.loading"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped></style>
