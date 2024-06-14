<script setup>
import { reactive } from 'vue';
import { mdiAccount, mdiMail, mdiAsterisk, mdiFormTextboxPassword } from '@mdi/js';

import NavBar from '@/components/customer/NavBar.vue';
import FooterBar from '@/components/customer/FooterBar.vue';
import FormField from '@/components/customer/FormField.vue';
import CardBox from '@/components/customer/CardBox.vue';
import FormControl from '@/components/customer/FormControl.vue';
import BaseButton from '../../components/customer/BaseButton.vue';

const profileForm = reactive({
  name: '',
  email: '',
  password: '',
  confirmPasswords: ''
});

const register = async () => {
  //check login info
  //register true -> go to login page
  window.location.assign('/login');
};

const redirectToLogin = () => {
  window.location.assign('/login');
};
</script>

<template>
  <NavBar />
  <div class="flex items-center justify-center mt-28">
    <div class="pt-24 pb-16 w-1/2">
      <div class="text-white flex items-center flex-col text-[15px]">
        <h2 class="text-customBgHover text-[1.5em]">CHÀO MỪNG ĐẾN VỚI BCB</h2>
        <h2 class="text-customBgHover text-[1.5em]">ĐĂNG KÝ NGAY!</h2>
        <form action="" class="w-1/2">
          <CardBox is-form @submit.prevent="register">
            <FormField label="Họ và tên">
              <FormControl
                v-model="profileForm.name"
                :icon="mdiAccount"
                placeholder="Họ và tên"
                type="text"
                name="name"
                required
                autocomplete="name"
                transparent
              />
            </FormField>
            <FormField label="Email">
              <FormControl
                v-model="profileForm.email"
                :icon="mdiMail"
                placeholder="Email"
                type="email"
                name="email"
                required
                autocomplete="email"
                transparent
              />
            </FormField>
            <FormField label="Mật khẩu">
              <FormControl
                v-model="profileForm.password"
                placeholder="Mật khẩu"
                :icon="mdiAsterisk"
                type="password"
                name="password"
                required
                autocomplete="password"
                transparent
              />
            </FormField>
            <FormField label="Nhập lại mật khẩu">
              <FormControl
                v-model="profileForm.confirmPasswords"
                placeholder="Nhập lại mật khẩu"
                :icon="mdiAsterisk"
                type="password"
                name="confirmPassword"
                required
                autocomplete="confirmPassword"
                transparent
              />
            </FormField>
            <template #footer>
              <BaseButtons>
                <BaseButton color="info" type="submit" label="Đăng Ký" />
              </BaseButtons>
            </template>
          </CardBox>
        </form>
        <span class="flex flex-row gap-[5px] text-[1.25em]"
          >Bằng việc đăng ký, bạn đã đồng ý với Cocoon về</span
        >
        <span class="flex flex-row gap-[5px] text-[1.25em]">
          <p class="text-[red] cursor-pointer">Điều khoản dịch vụ</p>
          <span>và</span>
          <p class="text-[red] cursor-pointer">Chính sách bảo mật</p>
        </span>
        <span class="flex flex-row gap-[5px] text-[1.25em]">BẠN ĐÃ CÓ TÀI KHOẢN?</span>
        <a @click="redirectToLogin" class="text-customBgHover cursor-pointer">ĐĂNG NHẬP</a>
      </div>
    </div>
  </div>
  <FooterBar />
</template>
