<script setup>
import { ref, onMounted } from 'vue';

import NavBarButton from '@/components/customer/NavBarButton.vue';
import NavBarNavigation from '@/components/customer/NavBarNavigation.vue';

const isLoggedIn = ref(false);
const isSubMenuOpen = ref(false);
const user = JSON.parse(localStorage.getItem('user'));

const checkLoginStatus = () => {
  if (user.loggedIn) {
    isLoggedIn.value = user.loggedIn === true;
  } else {
    isLoggedIn.value = false;
  }
};

const toggleMenu = () => {
  isSubMenuOpen.value = !isSubMenuOpen.value;
};

const redirectToHome = () => {
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

onMounted(() => {
  checkLoginStatus();
});
</script>

<template>
  <div
    class="fixed z-100 shadow-md bg-[#0b0c10] rounded-b-[30px] h-[115px] w-screen flex flex-row justify-evenly items-center"
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
      @click=""
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
        div-class-name="flex justify-center items-center text-white text-[22px] font-bold w-32 h-12 duration-500 rounded-2xl hover:bg-customBgHover hover:text-customTextHover cursor-pointer"
        text="Cá nhân"
        has-div
        :has-profile="isSubMenuOpen ? true : false"
        @click="toggleMenu"
      />
      <div
        :class="[
          'absolute top-full right-0 w-[300px] float-left overflow-hidden transition-max-height',
          { 'max-h-400': isSubMenuOpen, 'max-h-0': !isSubMenuOpen }
        ]"
      >
        <div class="bg-customBgHover pl-5 pr-5 py-5 ml-[10px] mr-0 my-[10px] rounded-lg">
          <div class="flex items-center">
            <h3>{{ user.user_name }}</h3>
          </div>
        </div>
      </div>
    </div>

    <NavBarButton
      v-else
      type="button"
      class="relative w-fit h-fit"
      div-class-name="flex justify-center items-center text-white text-[22px] font-bold w-32 h-12 duration-500 rounded-2xl hover:bg-customBgHover hover:text-customTextHover cursor-pointer"
      text="Đăng nhập"
      has-div
      @click="redirectToLogin"
    />
  </div>
</template>
