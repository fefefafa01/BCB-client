<script setup>
import SvgIcon from '@jamescoyle/vue-icon';

const props = defineProps({
  path: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hasSpan: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div
    class="sub-menu-link flex items-center text-white hover: cursor-pointer"
    :class="hasSpan ? 'my-3' : 'my-0'"
  >
    <svg-icon type="mdi" :path="path" class="image w-10 h-8 rounded-full" alt="Icon Account" />
    <span class="p pl-1 text-left w-full text-[1.25em] transition-transform-500">{{ name }}</span>
    <span v-if="hasSpan" class="trans text-[22px] transition-transform-500">></span>
  </div>
</template>

<style>
.sub-menu-link:hover span {
  transform: translateX(5px);
}
</style>
