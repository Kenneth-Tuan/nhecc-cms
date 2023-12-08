<script setup></script>

<template>
  <!-- Navigation is just for local test -->
  <component :is="$route.meta.layout || 'div'">
    <router-view />
  </component>
</template>
