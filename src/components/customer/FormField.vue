<script setup>
import { computed, useSlots } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: null
  },
  labelFor: {
    type: String,
    default: null
  },
  help: {
    type: String,
    default: null
  },
  forgetPassword: {
    type: Boolean,
    default: false
  }
});

const slots = useSlots();

const wrapperClass = computed(() => {
  const base = [];
  const slotsLength = slots.default ? slots.default().length : 0;

  if (slotsLength > 1) {
    base.push('grid grid-cols-1 gap-3');
  }
  if (slotsLength === 2) {
    base.push('md:grid-cols-2');
  }
  return base;
});

const redirectToForgetPwd = () => {
  const curPath = window.location.hash;
  if (curPath === '/forgetPwd') window.location.reload();
  else {
    window.location.assign('/forgetPwd');
  }
};
</script>

<template>
  <div class="mb-6 last:mb-0">
    <label
      v-if="label"
      :for="labelFor"
      class="block font-bold text-[1.25em] mb-2 text-left"
    >{{
      label
    }}</label>
    <div :class="wrapperClass">
      <slot />
    </div>
    <div class="flex justify-between">
      <div
        v-if="help"
        class="text-xs text-gray-500 mt-1 text-left"
      >
        {{ help }}
      </div>
      <div
        v-if="forgetPassword"
        class="cursor-pointer font-bold text-[1.1em]"
        @click="redirectToForgetPwd"
      >
        Quên mật khẩu
      </div>
    </div>
  </div>
</template>
