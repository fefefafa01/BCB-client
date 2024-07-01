<script setup>
import ProfileInforGroups from '@/components/customer/ProfileInforGroups.vue';
import ProfileHistory from '@/components/customer/ProfileHistory.vue';

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  details: {
    type: [Object, Array]
  },
  isContent: {
    type: Boolean,
    default: false
  },
  isHistory: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div class="relative flex mt-5">
    <h2
      class="text-white font-medium [border-left:3px_solid_white] pl-5 text-[30px] leading-normal mt-0 mx-0 mb-0 min-h-7 text-left"
    >
      {{ label }}
    </h2>
    <a class="text-[18px] text-white absolute bottom-0 right-0 hover:text-customBgHover" href="">
      {{ isContent ? 'Chỉnh sửa' : isHistory ? 'Xem tất cả' : '' }}
    </a>
  </div>
  <hr class="mx-0 my-1.5" />
  <ProfileInforGroups v-if="isContent" :user-details="details" />
  <ProfileHistory v-else-if="isHistory" :history-details="details" />
</template>
