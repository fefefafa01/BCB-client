<script setup>
import { ref, onMounted } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMapMarker } from '@mdi/js';

const district = ref(['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6']);
const selectedDistrict = ref('');
const districtTemp = ref(district.value);
const isMenuVisible = ref(false);
const path = ref(mdiMapMarker);

onMounted(() => {
  const storedDistrict = localStorage.getItem('selectedDistrict');
  if (storedDistrict) {
    selectedDistrict.value = storedDistrict;
  }
});

const togglePlaceMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
};

const handleKeyUp = (event) => {
  const searchedVal = event.target.value.toLowerCase();
  districtTemp.value = district.value.filter((data) => data.toLowerCase().includes(searchedVal));
};

const updateName = (selectedLi) => {
  selectedDistrict.value = selectedLi;
  localStorage.setItem('selectedDistrict', selectedLi);
  isMenuVisible.value = false;
  // Add redirect logic here if needed
};
</script>

<template>
  <div>
    <div
      class="relative duration-[400ms] hover:text-customTextHover cursor-pointer flex items-center"
      @click="togglePlaceMenu"
    >
      <svg-icon type="mdi" :path="path" class="" alt="Icon location" />
      <div class="font-bold text-lg ml-2">
        <p>{{ selectedDistrict || 'Địa điểm' }}</p>
      </div>
    </div>

    <div
      class="absolute p-5 rounded-lg bg-white text-[#0b0c10] shadow-lg"
      :class="isMenuVisible ? 'block' : 'hidden'"
    >
      <div class="relative flex mb-2">
        <span class="uil--search-alt"></span>
        <input
          class="w-full h-12 text-lg pl-10 border rounded-md"
          type="text"
          placeholder="Tìm kiếm"
          @keyup="handleKeyUp"
        />
      </div>
      <ul class="options max-h-[250px] overflow-y-auto">
        <li
          v-for="(dis, index) in districtTemp"
          :key="index"
          class="text-[21px] h-12 rounded-md flex items-center px-2 cursor-pointer hover:bg-gray-200"
          @click="updateName(dis)"
        >
          {{ dis }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.uil--search-alt {
  color: #999;
  margin: 13px;
  position: absolute;
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M21.07 16.83L19 14.71a3.08 3.08 0 0 0-3.4-.57l-.9-.9a7 7 0 1 0-1.41 1.41l.89.89a3 3 0 0 0 .53 3.46l2.12 2.12a3 3 0 0 0 4.24 0a3 3 0 0 0 0-4.29m-8.48-4.24a5 5 0 1 1 0-7.08a5 5 0 0 1 0 7.08m7.07 7.07a1 1 0 0 1-1.42 0l-2.12-2.12a1 1 0 0 1 0-1.42a1 1 0 0 1 1.42 0l2.12 2.12a1 1 0 0 1 0 1.42'/%3E%3C/svg%3E");
}

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
