<script setup>
const props = defineProps({
  step: {
    type: Number,
    default: 1,
  },
  done: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Create an ad group",
  },
  icon: {
    type: String,
    default: "create_new_folder",
  },
  continueBtnLabel: {
    type: String,
    default: "Continue",
  },
  backBtnLabel: {
    type: String,
    default: "Back",
  },
  isBackBtnVisible: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["after-continue", "after-back"]);

function onClickContinue() {
  emit("after-continue");
}

function onClickBack() {
  emit("after-back");
}
</script>

<template>
  <q-step
    :name="step"
    :title="title"
    caption="Optional"
    :icon="icon"
    :done="done"
  >
    <slot> </slot>

    <q-stepper-navigation align="right">
      <q-btn
        @click="onClickContinue()"
        color="primary"
        :label="continueBtnLabel"
      />
      <q-btn
        v-if="isBackBtnVisible"
        flat
        @click="onClickBack()"
        color="primary"
        :label="backBtnLabel"
        class="q-ml-sm"
      />
    </q-stepper-navigation>
  </q-step>
</template>
