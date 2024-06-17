<script setup>
import { computed } from 'vue';
import ProfileInfor from '@/components/customer/ProfileInfor.vue';

const props = defineProps({
  userDetails: {
    type: Array,
    required: true
  }
});

const groupedDetails = computed(() => {
  const groups = [];
  for (let i = 0; i < props.userDetails.length; i += 2) {
    groups.push(props.userDetails.slice(i, i + 2));
  }
  return groups;
});
</script>

<template>
  <div class="relative flex w-100">
    <ProfileInfor v-for="(group, index) in groupedDetails" :key="index" :details="group" />
  </div>
</template>
