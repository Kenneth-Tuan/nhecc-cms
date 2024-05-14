<script setup>
import { ref } from "vue";
import dayjs from "dayjs";

const props = defineProps({
  modelValue: {
    type: String,
    default: dayjs().format("YYYY-MM-DD HH:mm"),
  },
});

const emit = defineEmits(["update:modelValue"]);

function onUpdate(newVal) {
  console.log(newVal);
  emit("update:modelValue", newVal);
}
</script>

<template>
  <q-input
    :model-value="modelValue"
    mask="####-##-## ##:##"
    @update:model-value="(val) => onUpdate(val)"
    filled
    clearable
  >
    <template v-slot:prepend>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date
            :model-value="modelValue"
            mask="YYYY-MM-DD HH:mm"
            @update:model-value="(val) => onUpdate(val)"
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>

    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time
            :model-value="modelValue"
            mask="YYYY-MM-DD HH:mm"
            format24h
            @update:model-value="(val) => onUpdate(val)"
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>
