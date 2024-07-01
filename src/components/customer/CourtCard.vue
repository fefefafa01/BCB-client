<script setup>
import { computed, ref } from 'vue';
import { mdiPhoneClassic, mdiMapMarker } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';

const props = defineProps({
  detail: {
    type: Object,
    default: Object
  },
  item: {
    type: String,
    default: ''
  },
  forBooking: {
    type: Boolean
  }
});

const path = ref({ mdiPhoneClassic: mdiPhoneClassic, mdiMapMarker: mdiMapMarker });

console.log(props.item);

const componentClass = computed(() => {
  const base = [
    'flex',
    'h-48',
    'w-full',
    'transition-transform-500',
    'hover:z-10',
    'hover:scale-[1.02]',
    'hover:duration-500',
    'hover:drop-shadow-md'
  ];
  if (props.item === 'item1') {
    base.push('bg-customBgHover');
  } else if (props.item === 'item2') {
    base.push('bg-customBgHover2');
  }
  if (props.forBooking) {
    base.push('cursor-pointer');
  }

  return base;
});
</script>

<template>
  <div :class="componentClass">
    <div class="flex justify-center item-center w-56">
      <div class="justify-center h-[90%] w-full">
        <img
          class="pl-5 pr-5 w-full h-full block rounded-[50%]"
          :src="detail.link_img"
          alt="CourtBadminton"
        />
      </div>
    </div>
    <div class="pt-5 pr-1.5 pb-1.5 pl-5 item-center flex-[82%] text-white text-[1.5em]">
      <div class="text-[1.5em] text-left">
        {{ detail.name }}
      </div>
      <p class="text-left flex">
        <svg-icon type="mdi" :path="path.mdiMapMarker" />

        <i class="text-white text-[23px] mr-1.5" />
        {{ detail.address }}
      </p>
      <p class="text-left flex">
        <svg-icon type="mdi" :path="path.mdiPhoneClassic" />
        <i class="text-white text-[23px] mr-1.5" />
        {{ detail.phone_num }}
      </p>
    </div>
  </div>
</template>
