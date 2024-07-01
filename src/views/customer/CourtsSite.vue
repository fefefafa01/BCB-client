<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

import CourtList from '@/components/customer/CourtList.vue';

const backend = import.meta.env.VITE_SERVER;

const props = defineProps({
  value: {
    type: String,
    required: true
  }
});

const place = ref([]);

const listOfCourts = async () => {
  try {
    const res = await axios.get(backend + 'listOfCourt', {
      params: {
        district: props.value
      }
    });
    place.value = res.data.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  listOfCourts();
});

watch(
  () => props.value,
  () => {
    listOfCourts();
  }
);
</script>

<template>
  <div>
    <div class="w-full h-auto pt-10 flex flex-col items-center text-white text-[22px]">
      <span class="text-[40px]">Danh sách sân cầu lông</span>
    </div>
    <div class="relative h-auto pt-10 pb-28 px-40 flex flex-col items-center">
      <CourtList :courts-detail="place" has-cursor />
    </div>
  </div>
</template>
