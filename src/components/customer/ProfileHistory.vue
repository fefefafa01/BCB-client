<script setup>
import CourtCard from '@/components/customer/CourtCard.vue';

const props = defineProps({
  historyDetails: {
    type: Array
  }
});
</script>

<template>
  <CourtCard
    v-for="(item, index) in historyDetails"
    :key="index"
    :details="item"
    :items="index % 2 === 0 ? 'item1' : 'item2'"
  />
</template>
