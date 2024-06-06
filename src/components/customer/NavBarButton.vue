<script setup>
defineProps({
  divClassName: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: 'TIN TỨC'
  },
  hasDiv: {
    type: Boolean
  }
});
</script>

<template>
  <div
    v-if="hasDiv"
    :class="[divClassName]"
    class="text-[#000000cc] left-0 tracking-normal leading-normal absolute whitespace-nowrap w-20 transition p-2 min-w-20 max-w-40 min-h-12 max-h-20"
  >
    <p>{{ text }}</p>
  </div>
</template>
