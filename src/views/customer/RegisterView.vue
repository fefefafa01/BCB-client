<script setup>
import { reactive, ref } from 'vue';
import { mdiAccount, mdiMail, mdiAsterisk, mdiFormTextboxPassword } from '@mdi/js';
import axios from 'axios';

import NavBar from '@/components/customer/NavBar.vue';
import FooterBar from '@/components/customer/FooterBar.vue';
import FormField from '@/components/customer/FormField.vue';
import CardBox from '@/components/customer/CardBox.vue';
import FormControl from '@/components/customer/FormControl.vue';
import BaseButton from '../../components/customer/BaseButton.vue';

const backend = import.meta.env.VITE_SERVER;

const profileForm = reactive({
  name: '',
  email: '',
  password: '',
  confirmPasswords: ''
});
const status = ref('');

const register = async () => {
  //check register info
  if (profileForm.password !== profileForm.confirmPasswords) {
    status.value = 'Mật khẩu không trùng khớp';
  } else {
    try {
      const response = await axios.post(backend + 'auth/register', {
        name: profileForm.name,
        email: profileForm.email,
        password: profileForm.password
      });
      if (response.data.registered) {
        alert('Đăng ký thành công');
        window.location.assign('login');
      }
    } catch (error) {
      console.error(error);
    }
  }
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
        <h2 class="text-customBgHover text-[1.5em]">
          CHÀO MỪNG ĐẾN VỚI BCB
        </h2>
        <h2 class="text-customBgHover text-[1.5em]">
          ĐĂNG KÝ NGAY!
        </h2>
        <form
          action=""
          class="w-1/2"
        >
          <CardBox
            is-form
            @submit.prevent="register"
          >
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
                <BaseButton
                  color="info"
                  type="submit"
                  label="Đăng Ký"
                />
              </BaseButtons>
            </template>
          </CardBox>
        </form>
        <span class="flex flex-row gap-[5px] text-[1.25em]">Bằng việc đăng ký, bạn đã đồng ý với Cocoon về</span>
        <span class="flex flex-row gap-[5px] text-[1.25em]">
          <p class="text-[red] cursor-pointer">Điều khoản dịch vụ</p>
          <span>và</span>
          <p class="text-[red] cursor-pointer">Chính sách bảo mật</p>
        </span>
        <span class="flex flex-row gap-[5px] text-[1.25em]">BẠN ĐÃ CÓ TÀI KHOẢN?</span>
        <a
          class="text-customBgHover cursor-pointer"
          @click="redirectToLogin"
        >ĐĂNG NHẬP</a>
      </div>
    </div>
  </div>
  <FooterBar />
</template>
