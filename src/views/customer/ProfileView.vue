<script setup>
import { reactive, ref } from 'vue';
import axios from 'axios';

import ProfileBar from '@/components/customer/ProfileBar.vue';
import ProfileDashBoard from '@/components/customer/ProfileDashBoard.vue';

const backend = import.meta.env.VITE_SERVER;
</script>

<template>
  <div class="flex pt-12 pb-5 justify-center items-center">
    <div class="flex w-4/5">
      <ProfileBar />
      <ProfileDashBoard />
    </div>
  </div>
</template>
