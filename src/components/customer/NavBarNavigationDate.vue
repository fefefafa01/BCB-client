<script setup>
import { ref, onMounted, watch } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import flatpickr from 'flatpickr';
import { mdiCalendarMultiselectOutline } from '@mdi/js';

import 'flatpickr/dist/themes/light.css';

const path = ref({ mdiCalendarMultiselectOutline: mdiCalendarMultiselectOutline });
const selectedDate = ref('');

onMounted(() => {
  flatpickr('.flatpickr', {
    dateFormat: 'Y-m-d',
    minDate: 'today',
    onChange: (selectedDates, dateStr) => {
      selectedDate.value = dateStr;
    }
  });
});

watch(selectedDate, (newValue) => {
  localStorage.setItem('date', newValue);
});
</script>

<template>
  <div
    class="flatpickr relative duration-[400ms] hover:text-customTextHover cursor-pointer flex items-center"
    type="button"
  >
    <svg-icon
      type="mdi"
      :path="path.mdiCalendarMultiselectOutline"
      class="w-[30px] h-[30px]"
      alt="Icon location"
    />
    <div class="font-bold text-[21px] ml-2">
      <p>{{ selectedDate || 'Ngày tháng' }}</p>
    </div>
  </div>
</template>
