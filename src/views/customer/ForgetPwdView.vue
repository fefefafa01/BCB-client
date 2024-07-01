<script setup>
import { reactive, ref } from 'vue';
import { mdiMail, mdiAsterisk } from '@mdi/js';
import axios from 'axios';

import NavBar from '@/components/customer/NavBar.vue';
import FooterBar from '@/components/customer/FooterBar.vue';
import FormField from '@/components/customer/FormField.vue';
import CardBox from '@/components/customer/CardBox.vue';
import FormControl from '@/components/customer/FormControl.vue';
import BaseButton from '../../components/customer/BaseButton.vue';

const backend = import.meta.env.VITE_SERVER;

const profileForm = reactive({
  email: '',
  password: '',
  confirmPassword: ''
});
const status = ref('');

const forgetPwd = async () => {
  //check confirm password
  if (profileForm.password !== profileForm.confirmPassword) {
    status.value = 'Mật khẩu không trùng khớp';
  } else {
    try {
      const response = await axios.post(backend + 'auth/forgetPwd', {
        email: profileForm.email,
        password: profileForm.password
      });
      if (response.data.resetPwd) {
        alert('Đổi mật khẩu thành công');
        window.location.assign('/login');
      } else {
        alert('Đổi mật khẩu không thành công');
      }
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="pt-24 pb-16 w-1/2">
      <div class="text-white flex items-center flex-col text-[15px]">
        <h2 class="text-customBgHover text-[1.5em]">CHÀO MỪNG ĐẾN VỚI BCB</h2>
        <h2 class="text-customBgHover text-[1.5em]">ĐĂNG NHẬP NGAY!</h2>
        <form action="" class="w-1/2">
          <CardBox is-form @submit.prevent="forgetPwd">
            <FormField label="Email" help="Required. Your Email">
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
            <FormField label="Mật khẩu mới" help="Required. Your password">
              <FormControl
                v-model="profileForm.password"
                placeholder="Mật khẩu mới"
                :icon="mdiAsterisk"
                type="password"
                name="password"
                required
                autocomplete="password"
                transparent
              />
            </FormField>
            <FormField label="Nhập lại mật khẩu" help="Required. Your password">
              <FormControl
                v-model="profileForm.confirmPassword"
                placeholder="Nhập lại mật khẩu"
                :icon="mdiAsterisk"
                type="password"
                name="password"
                required
                autocomplete="password"
                transparent
              />
            </FormField>
            <template #footer>
              <BaseButtons>
                <BaseButton color="info" type="submit" label="TIẾP TỤC" />
              </BaseButtons>
            </template>
          </CardBox>
        </form>
      </div>
    </div>
  </div>
</template>
