<script setup>
import { RouterView } from 'vue-router';

import NavBar from '@/components/customer/NavBar.vue';
import FooterBar from '@/components/customer/FooterBar.vue';
</script>

<template>
  <NavBar />
  <div class="mt-28">
    <RouterView />
  </div>
  <FooterBar />
</template>
