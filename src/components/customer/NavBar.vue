<script setup>
import NavBarButton from '@/components/customer/NavBarButton.vue';
import NavBarNavigation from '@/components/customer/NavBarNavigation.vue';
</script>

<template>
  <div
    class="fixed z-10 mt-[5px] shadow-md bg-[#0b0c10] rounded-[30px] h-[115px] w-full flex flex-row justify-evenly items-center"
  >
    <div type="button" @click="" class="relative flex items-center">
      <img
        class="h-[100px] max-w-28 cursor-pointer"
        alt="Img"
        src="https://c.animaapp.com/UGutMkT8/img/da6c9e2e3c8f4d8abaf5e7e4c325ee24--1--1-1@2x.png"
      />
    </div>
    <NavBarButton
      type="button"
      @click=""
      class="relative w-fit h-fit"
      divClassName="flex justify-center items-center text-white text-[22px] font-bold duration-500 rounded-2xl hover:bg-customBgHover hover:text-customTextHover cursor-pointer"
      text="Trang chủ"
      has-div
    />
    <NavBarNavigation
      class="bg-[#45a29e] relative rounded-[40px] h-24 w-[800px] flex items-center justify-evenly z-[3]"
      @click=""
    />

    <NavBarButton
      type="button"
      @click=""
      class="relative text-center flex items-center h-14 w-fit h-fit text-white"
      divClassName="flex justify-center items-center text-white text-[22px] font-bold duration-500 rounded-2xl hover:bg-customBgHover hover:text-customTextHover cursor-pointer text-pretty"
      text="Tham gia vào sân cầu lông"
      has-div
    />
    <NavBarButton
      type="button"
      @click=""
      class="relative w-fit h-fit"
      divClassName="flex justify-center items-center text-white text-[22px] font-bold w-32 h-12 duration-500 rounded-2xl hover:bg-customBgHover hover:text-customTextHover cursor-pointer"
      text="Đăng nhập"
      has-div
    />
  </div>
</template>
