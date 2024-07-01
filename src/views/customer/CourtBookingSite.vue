<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

import CourtCard from '@/components/customer/CourtCard.vue';

const detail = ref({});
const regulation = ref('');

const courtDetailStatus = async () => {
  detail.value = JSON.parse(localStorage.getItem('yardDetail'));
  regulation.value = detail.value.regulation.replaceAll('\n', '<br>');
};

onMounted(() => {
  courtDetailStatus();
});
</script>

<template>
  <div class="relative w-full h-auto pt-10 pb-16 flex flex-col items-center">
    <div class="flex h-auto w-[1100px]">
      <CourtCard item="item1" :detail="detail" />
    </div>
    <div
      class="p-[10px] mt-[50px] rounded-[20px] h-[200px] w-4/5 bg-[rgb(69,_162,_157)] text-[mistyrose]"
    >
      <span
        style="
          display: flex;
          width: 100%;
          text-align: center;
          justify-content: center;
          font-size: 25px;
        "
      >
        Quy định:
      </span>
      <div class="mt-[10px] w-full text-xl" v-html="regulation"></div>
    </div>
  </div>
</template>
