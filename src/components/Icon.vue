<script setup>
import { defineAsyncComponent } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

function getComponent(name) {
  if (name)
    return defineAsyncComponent(() => {
      return import(`@/assets/icons/${name}.svg`);
    });
}
</script>

<template>
  <component :is="getComponent(name)" />
</template>
