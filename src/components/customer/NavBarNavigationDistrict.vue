<script setup>
import { ref, onMounted } from 'vue';

const district = ref(['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6']);
const selectedDistrict = ref('');
const districtTemp = ref([]);
const isMenuVisible = ref(false);

onMounted(() => {
  selectedDistrict.value = localStorage.getItem('selectedDistrict');
  districtTemp.value = district.value;
});
</script>

<template>
  <div class="text-white h-14 relative w-40 max-w-40 flex items-center">
    <div
      class="duration-[400] round-2xl hover:bg-customBgHover hover:text-customTextHover"
      type="button"
    >
      <img
        class="top-[16px] left-0 w-[30px] h-[30px]"
        alt="Icon location"
        src="https://c.animaapp.com/UGutMkT8/img/---icon--location--1@2x.png"
      />
      <div
        class="absolute top-1/2 transform -translate-y-1/2 font-bold font-comfortaa text-lg ml-[40px] whitespace-normal select-btn"
      >
        {{ selectedDistrict || 'Địa điểm' }}
      </div>
    </div>
    <div
      class="hidden w-[160%] px-20 mt-80 rounded-lg bg-white text-[#0b0c10]"
      :class="{ block: isMenuVisible }"
    >
      <div class="relative flex">
        <span
          class="text-[#999] m-13 absolute inline-block w-[1.5em] h-[1.5em] bg-no-repeat bg-contain bg-black"
        ></span>
        <input type="text" placeholder="Tìm kiếm" @keyup="handleKeyUp" />
      </div>
      <ul class="mt-10 pl-0 max-h-60 overflow-y-auto options">
        <li
          class="text-base h-12 rounded-md flex items-center cursor-pointer"
          v-for="(dis, index) in districtTemp"
          :key="index"
          @click="updateName(dis)"
        >
          {{ dis }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.options::-webkit-scrollbar {
  width: 7px;
}
.options::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 25px;
}
.options::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 25px;
}
.options li:hover {
  background: #f2f2f2;
}
</style>
