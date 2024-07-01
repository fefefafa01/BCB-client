<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMapMarker, mdiMagnify } from '@mdi/js';

const router = useRouter();

const district = ref(['Tất cả', 'Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6']);
const selectedDistrict = ref('');
const districtTemp = ref(district.value);
const isMenuVisible = ref(false);
const path = ref({ mdiMapMarker: mdiMapMarker, mdiMagnify: mdiMagnify });
const menuRef = ref(null);

onMounted(() => {
  const storedDistrict = localStorage.getItem('selectedDistrict');
  if (storedDistrict) {
    selectedDistrict.value = storedDistrict;
  }
  document.addEventListener('onClick', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('onClick', handleClickOutside);
});

const togglePlaceMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
};

const handleKeyUp = (event) => {
  const searchedVal = event.target.value.toLowerCase();
  districtTemp.value = district.value.filter((data) => data.toLowerCase().includes(searchedVal));
};

const updateName = (newSelectedDistrict) => {
  selectedDistrict.value = newSelectedDistrict;
  isMenuVisible.value = false;

  const curPath = window.location.hash;
  if (curPath === '#/courts') {
    // Corrected the hash path
    window.location.reload();
  } else {
    router.push({ path: '/courts', query: { value: newSelectedDistrict } });
  }
};

const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    isMenuVisible.value = false;
  }
};
</script>

<template>
  <div class="text-white w-auto max-w-40">
    <div
      class="relative duration-[400ms] hover:text-customTextHover cursor-pointer flex items-center"
      @click="togglePlaceMenu"
    >
      <svg-icon
        type="mdi"
        :path="path.mdiMapMarker"
        class="w-[30px] h-[30px]"
        alt="Icon location"
      />
      <div class="font-bold text-[21px] ml-2">
        <p>{{ selectedDistrict || 'Địa điểm' }}</p>
      </div>
    </div>

    <div
      class="absolute z-50 p-5 rounded-lg bg-white text-[#0b0c10] shadow-lg"
      :class="isMenuVisible ? 'block' : 'hidden'"
    >
      <div class="relative flex mb-2">
        <svg-icon
          type="mdi"
          :path="path.mdiMagnify"
          class="m-[13px] absolute inline-block w-[1.5em] h-[1.5em]"
          alt="Icon Search"
        />
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
