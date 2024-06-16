<script setup>
import { reactive, ref } from 'vue';
import axios from 'axios';

import NavBar from '@/components/customer/NavBar.vue';
import FooterBar from '@/components/customer/FooterBar.vue';
import ProfileBar from '@/components/customer/ProfileBar.vue';
import ProfileHistory from '@/components/customer/ProfileHistory.vue';

const backend = import.meta.env.VITE_SERVER;
</script>

<template>
  <NavBar />
  <div class="flex mt-28 pt-12 pb-5 justify-center">
    <ProfileBar />
  </div>
  <FooterBar />
</template>
