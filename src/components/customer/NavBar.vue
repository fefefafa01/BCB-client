<script setup>
import { ref, onMounted } from 'vue';
import { mdiAccount, mdiLogout, mdiHistory } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';

import NavBarButton from '@/components/customer/NavBarButton.vue';
import NavBarNavigation from '@/components/customer/NavBarNavigation.vue';
import ProfileItem from './ProfileItem.vue';

const isLoggedIn = ref(false);
const isSubMenuOpen = ref(false);
const user = JSON.parse(localStorage.getItem('user'));
const path = ref({ mdiAccount: mdiAccount, mdiLogout: mdiLogout, mdiHistory: mdiHistory });

const checkLoginStatus = () => {
  if (user) {
    if (user.loggedIn) {
      isLoggedIn.value = user.loggedIn === true;
    } else {
      isLoggedIn.value = false;
    }
  }
};

const toggleMenu = () => {
  isSubMenuOpen.value = !isSubMenuOpen.value;
};

const redirectToHome = () => {
  const items = ['selectedDistrict', 'date', 'yardDetail', 'paymentInfo'];
  items.forEach((item) => localStorage.removeItem(item));
  const curPath = window.location.hash;
  if (curPath === '/') window.location.reload();
  else {
    window.location.assign('/');
  }
};
const redirectToLogin = () => {
  const curPath = window.location.hash;
  if (curPath === '/login') window.location.reload();
  else {
    window.location.assign('/login');
  }
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
const logout = () => {
  localStorage.removeItem('user');
  const curPath = window.location.hash;
  if (curPath === '/' || curPath === '/home') window.location.reload();
  else {
    window.location.assign('/');
  }
};

onMounted(() => {
  checkLoginStatus();
});
</script>

<template>
  <div
    class="fixed z-100 shadow-md bg-[#0b0c10] rounded-b-[30px] h-[115px] w-screen flex flex-row justify-between items-center"
  >
    <div type="button" class="relative flex items-center" @click="redirectToHome">
      <img
        class="h-[100px] max-w-28 cursor-pointer"
        alt="Img"
        src="https://c.animaapp.com/UGutMkT8/img/da6c9e2e3c8f4d8abaf5e7e4c325ee24--1--1-1@2x.png"
      />
    </div>
    <NavBarButton
      type="button"
      class="relative w-fit h-fit"
      div-class-name="flex justify-center items-center text-white text-[22px] font-bold duration-500 rounded-2xl hover:bg-customBgHover hover:text-customTextHover cursor-pointer"
      text="Trang chủ"
      has-div
      @click="redirectToHome"
    />
    <NavBarNavigation
      class="bg-customBgHover relative rounded-[40px] h-24 w-[800px] flex items-center justify-evenly z-[3]"
    />

    <NavBarButton
      type="button"
      class="relative text-center flex items-center h-14 w-fit h-fit text-white"
      div-class-name="flex justify-center items-center text-white text-[22px] font-bold duration-500 rounded-2xl hover:bg-customBgHover hover:text-customTextHover cursor-pointer text-pretty"
      text="Tham gia vào sân cầu lông"
      has-div
      @click=""
    />
    <div v-if="isLoggedIn">
      <NavBarButton
        type="button"
        class="relative w-fit h-fit"
        div-class-name="flex justify-center items-center text-white text-[22px] font-bold w-32 h-12 duration-500 rounded-2xl hover:bg-customBgHover hover:text-customTextHover cursor-pointer mr-2.5"
        text="Cá nhân"
        has-div
        has-logo
        @click="toggleMenu"
      />
      <div
        :class="[
          'absolute top-full right-0 w-[250px] float-left overflow-hidden transition-max-height',
          { 'max-h-400': isSubMenuOpen, 'max-h-0': !isSubMenuOpen }
        ]"
      >
        <div class="bg-customBgHover pl-5 pr-5 py-5 ml-[10px] mr-0 my-[10px] rounded-lg">
          <div class="flex items-center">
            <svg-icon
              type="mdi"
              :path="path.mdiAccount"
              class="w-[40px] rounded-[50%] mr-[15px]"
              alt="Icon Account"
            />
            <h3 class="font-semibold">
              {{ user.user_name }}
            </h3>
          </div>
          <hr class="border-[0] h-[2px] w-full bg-[black] mx-[0] my-[10px]" />
          <ProfileItem
            class="sub-menu-link flex items-center text-white my-3 hover: cursor-pointer"
            :path="path.mdiAccount"
            name="Trang cá nhân"
            has-span
            @click="redirectToProfile"
          />
          <ProfileItem
            class="sub-menu-link flex items-center text-white my-3 hover: cursor-pointer"
            :path="path.mdiHistory"
            name="Lịch sử đặt sân"
            has-span
            @click="redirectToHistory"
          />
          <ProfileItem
            class="sub-menu-link flex items-center text-white my-3 hover: cursor-pointer"
            :path="path.mdiLogout"
            name="Logout"
            has-span
            @click="logout"
          />
        </div>
      </div>
    </div>

    <NavBarButton
      v-else
      type="button"
      class="relative w-fit h-fit"
      div-class-name="flex justify-center items-center text-white text-[22px] font-bold w-32 h-12 duration-500 rounded-2xl hover:bg-customBgHover hover:text-customTextHover cursor-pointer mr-2.5"
      text="Đăng nhập"
      has-div
      @click="redirectToLogin"
    />
  </div>
</template>
