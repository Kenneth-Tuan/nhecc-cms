<script setup>
import { reactive } from "vue";

import DatePicker from "@/components/DatePicker.vue";
import { submitForm } from "@/apis/googleApi.js";

const map = {
  field1: "entry.810266239",
  field2: "entry.897057866",
  field3: "entry.514404376",
  field4: "entry.615366442",
};

const response = reactive({
  operationState: "",
  operationTime: "",
  operator: "",
  others: "",
});

const operationStateList = [
  { label: "更換濾芯", value: "更換濾芯" },
  { label: "濾芯逆襲", value: "濾芯逆襲" },
];

const operators = [
  { label: "萬永哥", value: "萬永哥" },
  { label: "廠商", value: "廠商" },
  { label: "其他", value: "其他" },
];

const onFinish = async (values) => {
  submitForm({
    "entry.810266239": response.operationState,
    "entry.897057866": response.operationTime,
    "entry.514404376": response.operator,
    "entry.615366442": response.others,
  });
};
</script>

<template>
  <div class="u-flex u-flex-col u-items-center u-flex-gap-y-16px">
    <h2 class="u-text-36px u-fw-700">濾芯定期檢查 (TEST)</h2>
    <q-select
      v-model="response.operationState"
      :options="operationStateList"
      filled
      label="濾芯狀況"
      clearable
      class="u-w80%"
    />
    <DatePicker
      v-model="response.operationTime"
      label="施作時間"
      class="u-w80%"
    />
    <q-select
      v-model="response.operator"
      :options="operators"
      filled
      label="施作人"
      clearable
      class="u-w80%"
    />
    <q-input
      v-model="response.others"
      filled
      autogrow
      label="備註"
      clearable
      class="u-w80%"
    />
    <q-btn color="primary" icon-right="send" label="SUBMIT" @click="onFinish" />
  </div>
</template>

<style lang="scss" scoped></style>
