<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  details: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="w-full md:w-5/12 px-5 py-4 mr-3 border-solid border-[1px] border-white>">
    <div v-for="(detail, index) in details" :key="index" class="text-white mb-3">
      <div class="float-left w-24 text-left text-[18px] font-semibold">
        {{ detail.label }}
      </div>
      <div class="table-cell text-[18px]">
        {{ detail.value }}
      </div>
    </div>
  </div>
</template>
