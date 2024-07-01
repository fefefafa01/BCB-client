<script setup>
import { reactive, ref } from 'vue';
import { mdiAccount, mdiHistory, mdiLogout, mdiLockReset } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';

import ProfileItem from '@/components/customer/ProfileItem.vue';

const path = ref({
  mdiAccount: mdiAccount,
  mdiHistory: mdiHistory,
  mdiLogout: mdiLogout,
  mdiLockReset: mdiLockReset
});
const user = JSON.parse(localStorage.getItem('user'));
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const redirectToProfile = () => {
  const curPath = window.location.hash;
  if (curPath === '/profile') window.location.reload();
  else {
    window.location.assign('/profile');
  }
};
const redirectToHistory = () => {
  const curPath = window.location.hash;
  if (curPath === '/history') window.location.reload();
  else {
    window.location.assign('/history');
  }
};
const redirectToResetPwd = () => {
  window.location.assign('/resetPwd');
};
const logout = () => {
  localStorage.removeItem('user');
  const curPath = window.location.hash;
  if (curPath === '/' || curPath === '/home') window.location.reload();
  else {
    window.location.assign('/');
  }
};
</script>

<template>
  <div class="flex flex-col justify-start relative mr-8 h-20">
    <div
      class="flex flex-row flex-nowrap items-center bg-[#45a29e] w-80 h-20 rounded-[10px] p-[10px] cursor-pointer"
      @click="toggleMenu"
    >
      <svg-icon type="mdi" :path="path.mdiAccount" class="w-10 h-8" alt="User Image" />
      <div
        class="text-[white] text-center text-[1.5em] w-full duration-[400ms] hover:text-customTextHover"
      >
        <span>Tài khoản của</span>
        <h3>{{ user.user_name }}</h3>
      </div>
      <div
        :class="[
          'flex flex-col absolute pt-3 top-full max-h-0 w-full overflow-hidden transition-max-height z-100',
          { 'max-h-[400px]': isMenuOpen }
        ]"
      >
        <ProfileItem
          class="flex items-center no-underline text-[white]"
          :path="path.mdiAccount"
          name="Thông tin chung"
          @click="redirectToProfile"
        />
        <hr class="border-0 h-0.5 w-full bg-[#45a29e] mx-0 my-5" />
        <ProfileItem
          class="flex items-center no-underline text-[white]"
          :path="path.mdiHistory"
          name="Lịch sử đặt sân"
          @click="redirectToHistory"
        />
        <hr class="border-0 h-0.5 w-full bg-[#45a29e] mx-0 my-5" />
        <ProfileItem
          class="flex items-center no-underline text-[white]"
          :path="path.mdiLockReset"
          name="Đổi mật khẩu"
          @click="redirectToResetPwd"
        />
        <hr class="border-0 h-0.5 w-full bg-[#45a29e] mx-0 my-5" />
        <ProfileItem
          class="flex items-center no-underline text-[white]"
          :path="path.mdiLogout"
          name="Đăng xuất"
          @click="logout"
        />
        <hr class="border-0 h-0.5 w-full bg-[#45a29e] mx-0 my-5" />
      </div>
    </div>
  </div>
</template>
