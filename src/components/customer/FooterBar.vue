<script setup>
import { ref } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMapMarker, mdiCellphone, mdiEmailOutline } from '@mdi/js';

const path = ref({
  mdiMapMarker: mdiMapMarker,
  mdiCellphone: mdiCellphone,
  mdiEmailOutline: mdiEmailOutline
});

const redirectToAboutUs = () => {
  window.location.href = '#/aboutUs';
};
</script>

<template>
  <footer class="pt-5 pb-4 px-12 text-white bg-[#0b0c10]">
    <div class="text-left text-md">
      <div class="text-md-left flex justify-between">
        <div class="flex items-center flex-col">
          <h5 class="uppercase font-bold text-[20px]">Saigon Software</h5>
          <img src="/BCB.png" alt="this is logo" height="150" width="150" />
        </div>
        <div class="">
          <h5 class="uppercase mb-4 font-bold text-[20px] cursor-pointer hover:text-[#45a29e]">
            HỖ TRỢ KHÁCH HÀNG
          </h5>
          <p class="cursor-pointer text-[18px] hover:text-[#45a29e]">Hướng dẫn sử dụng</p>
          <p class="cursor-pointer text-[18px] hover:text-[#45a29e]">
            Chính sách bảo mật thông tin
          </p>
        </div>
        <div class="">
          <h5
            class="mb-4 font-bold pe-auto cursor-pointer text-[18px] text-[20px] hover:text-[#45a29e]"
            @click="redirectToAboutUs"
          >
            VỀ CHÚNG TÔI
          </h5>
          <p class="cursor-pointer text-[18px] hover:text-[#45a29e]">Sản phẩm</p>
          <p class="cursor-pointer text-[18px] hover:text-[#45a29e]">Tin tức</p>
          <p class="cursor-pointer text-[18px] hover:text-[#45a29e]">Hợp tác</p>
        </div>
        <div class="">
          <h5 class="uppercase mb-4 font-bold text-[20px] hover:text-[#45a29e]">LIÊN HỆ</h5>
          <div class="flex">
            <svg-icon
              type="mdi"
              :path="path.mdiMapMarker"
              class="w-[30px] h-[30px]"
              alt="Icon location"
            />
            <p class="ml-3 text-[18px]">
              268 Lý Thường Kiệt, Phường 14, Quận 10, TP. HCM, Việt Nam
            </p>
          </div>
          <div class="flex">
            <svg-icon
              type="mdi"
              :path="path.mdiCellphone"
              class="w-[30px] h-[30px]"
              alt="Icon Cellphone"
            />
            <p class="ml-3 text-[18px]">02838328228</p>
          </div>
          <div class="flex">
            <svg-icon
              type="mdi"
              :path="path.mdiEmailOutline"
              class="w-[30px] h-[30px]"
              alt="Icon Email"
            />
            <p class="ml-3 text-[18px]">dangkhoa0521@gmail.com</p>
          </div>
        </div>
      </div>
      <hr class="mb-4" />
      <div class="content-center">
        <div class="">
          <p class="text-[#45a29e]">
            Copyright &copy; 2023 All Rights Reserved. <strong>BADMINTON COURT BOOKING</strong>
          </p>
        </div>
        <div class="col-md-5 col-lg-4">
          <div class="text-center text-md-right">
            <ul class="list-unstyled list-inline">
              <li class="list-inline-item">
                <a href="#"><i class="fab fa-facebook text-black" style="font-size: 23px"></i></a>
              </li>
              <li class="list-inline-item">
                <a href="#"><i class="fab fa-twitter text-black" style="font-size: 23px"></i></a>
              </li>
              <li class="list-inline-item">
                <a href="#"><i class="fab fa-youtube text-black" style="font-size: 23px"></i></a>
              </li>
              <li class="list-inline-item">
                <a href="#"
                  ><i class="fab fa-linkedin-in text-black" style="font-size: 23px"></i
                ></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
