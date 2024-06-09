<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import NavBar from '@/components/customer/NavBar.vue';
import FooterBar from '@/components/customer/FooterBar.vue';

const backend = import.meta.env.VITE_SERVER;
console.log(backend);

const notifData = ref([]);
const newsData = ref([]);
const slicedNewsData = ref([]);

onMounted(async () => {
  try {
    const notification = await axios.get(backend + 'home/notif');
    notifData.value = notification.data.notifData;

    const news = await axios.get(backend + 'home/news');
    newsData.value = news.data.newsData;
    console.log(newsData.value);

    const sliceData = [];
    for (let i = 0; i < newsData.value.length; i += 3) {
      sliceData.push(newsData.value.slice(i, i + 3));
    }
    slicedNewsData.value = sliceData;
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div class="back_ground">
    <NavBar />
    <div class="w-screen h-auto mt-28 pt-12 pb-5">
      <div class="h-[500px]">
        <Splide :options="{ rewind: true }" aria-label="My Favorite Images">
          <SplideSlide v-for="data in notifData" :key="data.notification_id">
            <img
              class="h-[500px] object-fill block w-screen"
              :src="`/images/notifications/${data.link_img}`"
              :alt="`Sample ${data.notification_id}`"
            />
          </SplideSlide>
        </Splide>
      </div>
    </div>
    <div class="flex text-white w-screen h-auto text-4xl justify-center flex-col items-center">
      <p><strong>Bảng Tin</strong></p>
      <div class="w-screen">
        <ul
          class="flex items-center flex-nowrap flex-row justify-around pl-0"
          v-for="(group, index) in slicedNewsData"
          :key="index"
        >
          <div
            v-for="id in group"
            :key="id.news_id"
            class="relative h-[320px] w-[260px] text-center"
          >
            <div class="flex h-[80%] w-full flex-col-reverse flex-nowrap items-center">
              <div
                class="flex flex-col-reverse flex-nowrap justify-start bg-[#e2e2e2] h-[80%] w-full text-black text-[1.2rem] relative z-0"
              >
                <p>{{ id.description }}</p>
              </div>
              <img
                :src="`/images/news/${id.link_img}`"
                :alt="`Sample ${id.bantin_id}`"
                class="scale-[0.9] absolute z-[1] top-0"
              />
            </div>
          </div>
        </ul>
      </div>
    </div>
    <FooterBar />
  </div>
</template>
