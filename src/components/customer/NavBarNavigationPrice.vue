<script setup>
import { ref, onMounted } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCurrencyJpy } from '@mdi/js';

const path = ref({ mdiCurrencyJpy: mdiCurrencyJpy });
</script>

<template>
  <div>
    <div
      class="relative duration-[400ms] hover:text-customTextHover cursor-pointer flex items-center"
      @click="togglePlaceMenu"
      type="button"
    >
      <svg-icon
        type="mdi"
        :path="path.mdiCurrencyJpy"
        class="w-[30px] h-[30px]"
        alt="Icon location"
      />
      <div class="font-bold text-[21px] ml-2">
        <p>{{ 'Giá' }}</p>
      </div>
    </div>
  </div>
</template>
