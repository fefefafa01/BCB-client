<script setup>
import { reactive, ref } from 'vue';

import ProfileContent from '@/components/customer/ProfileContent.vue';
import ProfileInforGroups from '@/components/customer/ProfileInforGroups.vue';

const user = JSON.parse(localStorage.getItem('user'));
const userDetails = reactive([
  { label: 'Họ và tên', value: user.user_name },
  { label: 'Email', value: user.user_email },
  { label: 'Tài khoản ', value: user.user_email }
]);

const items = ref([
  {
    imageSrc:
      'https://sonsanepoxy.vn/wp-content/uploads/2023/07/lap-dat-he-thong-den-chieu-san-cau-long.jpg',
    courtName: 'Sân cầu lông Thiên Vân',
    address: '57 Nguyễn Nghiêm, Phú Trung, Tân Phú, Thành phố Hồ Chí Minh',
    phoneNumber: '0913 404 924'
  },
  {
    imageSrc: 'https://limosa.vn/wp-content/uploads/2023/08/san-cau-long-cay-keo.jpg',
    courtName: 'Sân cầu lông ABC',
    address: '710/53/2, Lũy Bán Bích, Tân Thành, Tân Phú, Thành phố Hồ Chí Minh',
    phoneNumber: '0983 916 646'
  }
]);
</script>

<template>
  <div class="w-full">
    <ProfileContent label="THÔNG TIN CHUNG" :details="userDetails" is-content />
    <ProfileContent label="Lịch sử đặt sân" :details="items" is-history />
  </div>
</template>
