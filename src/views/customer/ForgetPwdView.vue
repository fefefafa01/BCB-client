<script setup>
import { reactive } from 'vue';
import { mdiAccount, mdiMail, mdiAsterisk, mdiFormTextboxPassword, mdiGithub } from '@mdi/js';

import NavBar from '@/components/customer/NavBar.vue';
import FooterBar from '@/components/customer/FooterBar.vue';
import FormField from '@/components/customer/FormField.vue';
import CardBox from '@/components/customer/CardBox.vue';
import FormControl from '@/components/customer/FormControl.vue';
import BaseButton from '../../components/customer/BaseButton.vue';

const profileForm = reactive({
  email: '',
  password: '',
  confirmPassword: ''
});

const forgetPwd = () => {
  //check confirm password
  //async forgetPwd()
  //redirect to ResetPassword Success
  alert('Đổi mật khẩu thành công');
  window.location.assign('/login');
};
</script>

<template>
  <NavBar />
  <div class="flex items-center justify-center mt-28">
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
  <FooterBar />
</template>
