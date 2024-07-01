<script setup>
import { reactive, ref } from 'vue';
import { mdiAccount, mdiMail, mdiAsterisk, mdiFormTextboxPassword, mdiGithub } from '@mdi/js';
import axios from 'axios';

import FormField from '@/components/customer/FormField.vue';
import CardBox from '@/components/customer/CardBox.vue';
import FormControl from '@/components/customer/FormControl.vue';
import BaseButton from '../../components/customer/BaseButton.vue';

const backend = import.meta.env.VITE_SERVER;

const profileForm = reactive({
  email: '',
  password: ''
});
const status = ref('');
const loggedIn = ref(false);

const login = async () => {
  try {
    const response = await axios.post(backend + 'auth/login', {
      email: profileForm.email,
      password: profileForm.password
    });
    console.log(response.data);
    if (response.data.loggedIn) {
      localStorage.setItem(
        'user',
        JSON.stringify({
          loggedIn: true,
          role: 'customer',
          user_name: response.data.name,
          user_email: response.data.email,
          user_id: response.data.customerId
        })
      );
      status.value = response.data.status;
      console.log(status.value);
      if (localStorage.getItem('booking')) {
        localStorage.removeItem('booking');
        window.history.go(-1);
      }
      window.location.assign('/home');
    } else {
      loggedIn.value = false;
      status.value = response.data.status;
    }
  } catch (error) {
    // Handle error
    console.error(error);
  }
};

const redirectToRegister = () => {
  window.location.assign('/register');
};
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="pt-24 pb-16 w-1/2">
      <div class="text-white flex items-center flex-col text-[15px]">
        <h2 class="text-customBgHover text-[1.5em]">CHÀO MỪNG ĐẾN VỚI BCB</h2>
        <h2 class="text-customBgHover text-[1.5em]">ĐĂNG NHẬP NGAY!</h2>
        <form action="" class="w-1/2">
          <CardBox is-form @submit.prevent="login">
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
            <FormField label="Password" help="Required. Your password" forget-password>
              <FormControl
                v-model="profileForm.password"
                placeholder="Password"
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
                <BaseButton color="info" type="submit" label="Đăng nhập" />
              </BaseButtons>
            </template>
          </CardBox>
        </form>
        <span>BẠN CHƯA CÓ TÀI KHOẢN?</span>
        <a class="text-customBgHover cursor-pointer" @click="redirectToRegister">ĐĂNG KÝ</a>
      </div>
    </div>
  </div>
</template>
