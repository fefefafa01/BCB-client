<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import NavBar from '@/components/customer/NavBar.vue';

const backend = import.meta.env.VITE_SERVER;

const options = {
  rewind: true
};

const notifData = ref([]);
console.log(backend);
onMounted(async () => {
  try {
    const notification = await axios.get(backend + 'home/notif');
    notifData.value = notification.data.notifData;
    console.log(notification);
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div class="back_ground">
    <NavBar />
    <div class="w-full h-auto mt-[115px] pt-[50px] pb-[20px]">
      <div class="w-full h-[500px]">
        <Splide :options="{ options }" aria-label="My Favorite Images">
          <SplideSlide v-for="data in notifData" :key="data.notification_id">
            <img
              class="h-[500px] object-fill block w-full"
              :src="data.link_img"
              :alt="`Sample ${data.notification_id}`"
            />
          </SplideSlide>
        </Splide>
      </div>
    </div>
  </div>
</template>
