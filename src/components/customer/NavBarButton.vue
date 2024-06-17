<script setup>
import { ref } from 'vue';
import { mdiAccount } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';

const path = ref({ mdiAccount: mdiAccount });

defineProps({
  divClassName: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: 'TIN TỨC'
  },
  hasDiv: {
    type: Boolean
  },
  hasLogo: {
    type: Boolean
  }
});
</script>

<template>
  <div
    v-if="hasDiv"
    :class="[divClassName]"
    class="text-[#000000cc] left-0 tracking-normal leading-normal absolute whitespace-nowrap w-20 transition p-2 min-w-20 max-w-40 min-h-12 max-h-20"
  >
    <div v-if="hasLogo">
      <svg-icon
        type="mdi"
        :path="path.mdiAccount"
        class="w-[30px] h-[30px]"
        alt="Icon Account"
      />
    </div>
    <p>{{ text }}</p>
  </div>
</template>
