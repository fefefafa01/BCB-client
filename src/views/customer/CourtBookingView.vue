<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

import CourtCard from '@/components/customer/CourtCard.vue';
import BaseButton from '../../components/customer/BaseButton.vue';

const backend = import.meta.env.VITE_SERVER;
const router = useRouter();

const user = JSON.parse(localStorage.getItem('user'));
const detail = ref({});
const regulation = ref('');
const date = ref('');
const times = ref([]);
const courtList = ref([]);
const slots = ref([]);

const courtDetailStatus = async () => {
  detail.value = JSON.parse(localStorage.getItem('yardDetail'));
  regulation.value = detail.value.regulation.replaceAll('\n', '<br>');
  date.value = localStorage.getItem('date');

  for (var i = detail.value.start_time; i <= detail.value.end_time; i++) {
    times.value.push(`${i}:00`);
  }
  try {
    const res = await axios.get(backend + 'courts/courtDetail', {
      params: {
        item: detail.value,
        date: date.value
      }
    });
    var booked = res.data.bookedData;

    for (const court of res.data.courts) {
      courtList.value.push(initializeRows(court, detail.value.end_time, detail.value.start_time));
    }

    // for (var i = 0; i < booked.length; i++) {
    //   courtList.value[booked[i].court.court_num - 1].schedule[booked[i].timeslot-];
    // }
    for (const bookedItem of booked) {
      const slotIndex = courtList.value.findIndex(
        (slot) => slot.court_id === bookedItem.court.court_id
      );
      const timeIndex = courtList.value[slotIndex].schedule.findIndex(
        (time) => time.timeslot === bookedItem.timeslot
      );

      var slot = courtList.value[slotIndex].schedule[timeIndex];
      slot.type = 'booked';
      slot.active = true;
    }
  } catch (error) {
    console.error(error);
  }
};

const initializeRows = (court, end, start) => {
  const circleArray = Array(end - start + 1)
    .fill()
    .map((_, index) => ({
      type: 'circle',
      active: false,
      timeslot: `${start + index}:00 - ${start + index + 1}:00`,
      selectTime: null
    }));
  return {
    name: court.court_num,
    schedule: circleArray,
    court_id: court.court_id
  };
};

const timeComponentClass = (status) => {
  const base = ['absolute', 'top-0', 'left-0', 'bottom-0', 'right-0', 'cursor-pointer'];

  if (status.active) {
    if (status.type == 'filled') {
      base.push('bg-[#c5c6c7]');
    } else if (status.type == 'booked') {
      base.push('bg-red-600 cursor-default');
    } else base.push('bg-[#c5c6c7]');
  } else if (!status.active) {
    base.push('bg-[#45a29e] hover:bg-[#1f2833]');
  } else return base;

  return base;
};

const selectTime = (id, time, courtIndex, timeIndex, status) => {
  var slot = { court_id: id, time: `${time} - ${parseInt(time) + 1}:00` };
  if (JSON.parse(localStorage.getItem('user')).loggedIn) {
    if (courtIndex !== -1 && timeIndex !== -1) {
      var item = courtList.value[courtIndex].schedule[timeIndex];
      if (status.type !== 'booked') {
        item.active = !item.active;
        if (item.active) {
          item.type = 'filled';
          item.selectTime = new Date(); // Ghi nhận thời gian khi chọn slot

          slots.value.push(slot);
          temporaryBooking(slot);
          // Hủy bỏ slot sau 2 tiếng
          setTimeout(
            () => {
              item.active = false;
              item.type = 'circle';
              item.selectTime = null;
              const slotIndex = slots.value.findIndex(
                (slot) => slot.court_id === id && slot.time === `${time} - ${parseInt(time) + 1}:00`
              );
              if (slotIndex !== -1) slots.value.splice(slotIndex, 1);
            },
            2 * 60 * 60 * 1000 //2 tiếng
          );
        } else if (!item.active) {
          item.type = 'circle';
          item.selectTime = null;
          const slotIndex = slots.value.findIndex(
            (slot) => slot.court_id === id && slot.time === `${time} - ${parseInt(time) + 1}:00`
          );
          if (slotIndex !== -1) slots.value.splice(slotIndex, 1);
          cancelBooking(slot);
        }
      }
    }
  } else {
    localStorage.setItem('booking', true);
    router.push('/login');
  }
};

const releaseSlot = (courtIndex, timeIndex) => {
  const item = courtList.value[courtIndex].schedule[timeIndex];
  if (item.active && item.selectedTime) {
    const now = new Date();
    const diff = (now - new Date(item.selectedTime)) / (1000 * 60 * 60); // Số giờ trôi qua
    if (diff >= 2) {
      item.active = false;
      item.type = 'circle';
      item.selectedTime = null;
      const slotIndex = slots.value.findIndex(
        (slot) =>
          slot.court_id === courtList.value[courtIndex].court_id &&
          slot.time === `${times.value[timeIndex]} - ${parseInt(times.value[timeIndex]) + 1}:00`
      );
      if (slotIndex !== -1) slots.value.splice(slotIndex, 1);
    }
  }
};

const temporaryBooking = async (slot) => {
  try {
    const res = await axios.get(backend + 'courts/bookingSave', {
      params: {
        slot: slot, //court_id, time
        user_id: user.user_id,
        date: date.value
      }
    });
  } catch (error) {
    console.error(error);
  }
};

const cancelBooking = async (slot) => {
  try {
    const res = await axios.get(backend + 'courts/bookingCancel', {
      params: {
        slot: slot, //court_id, time
        date: date.value
      }
    });
  } catch (error) {
    console.error(error);
  }
};

const confirmBooking = () => {
  if (slots.value != '') {
    var confirmMsg = `Tổng số tiền là ${detail.value.average_price * slots.value.length} đồng\n Sân sẽ được giữ trong vòng 2 giờ trước khi thanh toán \n Bạn có muốn chuyển đến trang thanh toán?`;
    if (confirm(confirmMsg)) {
      var paymentInfo = {
        date: date.value,
        slots: slots.value,
        yard_id: detail.value.yard_id,
        total_cost: detail.value.average_price * slots.value.length,
        user_id: user.user_id
      };
      localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));
      router.push('payment');
    }
  } else {
    alert('Vui lòng chọn khung thời gian muốn đặt');
  }
};

onMounted(() => {
  courtDetailStatus();

  // Kiểm tra và giải phóng các slot sau 2 tiếng
  setInterval(
    () => {
      courtList.value.forEach((court, courtIndex) => {
        court.schedule.forEach((slot, timeIndex) => {
          releaseSlot(courtIndex, timeIndex);
        });
      });
    },
    60 * 1000 // Kiểm tra mỗi phút một lần
  );
});
</script>

<template>
  <div class="relative w-full h-auto pt-10 pb-16 flex flex-col items-center">
    <div class="flex h-auto w-[1100px]">
      <CourtCard item="item1" :detail="detail" />
    </div>
    <div
      class="p-[10px] mt-[50px] rounded-[20px] h-[200px] w-4/5 bg-[rgb(69,_162,_157)] text-[mistyrose]"
    >
      <span
        style="
          display: flex;
          width: 100%;
          text-align: center;
          justify-content: center;
          font-size: 25px;
        "
      >
        Quy định:
      </span>
      <div class="mt-[10px] w-full text-xl" v-html="regulation" />
    </div>
    <div class="mt-5">
      <table class="w-full text-center">
        <thead>
          <tr>
            <th
              class="bg-[#45a29e] h-[55px] text-[18px] w-[100px] text-center text-[#1f2833] border-[3px] border-[#1f2833]"
            >
              Sân/Giờ
            </th>
            <th
              v-for="time in times"
              :key="time"
              class="bg-[#45a29e] h-[55px] text-[18px] w-[90px] text-center text-[#1f2833] border-[3px] border-[#1f2833]"
            >
              {{ `${time} - ${parseInt(time) + 1}:00` }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(court, courtIndex) in courtList" :key="courtIndex">
            <td
              class="text-[18px] relative bg-[#45a29e] text-[#1f2833] border-[3px] border-[#1f2833] font-bold"
            >
              Sân {{ court.name }}
            </td>
            <td
              v-for="(timeCheck, timeIndex) in court.schedule"
              :key="timeIndex"
              class="relative hover:bg-[#1f2833] border-[3px] border-[#1f2833]"
            >
              <div
                :class="timeComponentClass(timeCheck)"
                @click="
                  selectTime(court.court_id, times[timeIndex], courtIndex, timeIndex, timeCheck)
                "
              >
                <div
                  class="w-[20px] h-[20px] rounded-[50%] absolute top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2"
                  :class="timeCheck.type === 'booked' ? 'hidden' : 'bg-[#c5c6c7]'"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex flex-col items-start text-white text-[25px] my-5">
      <div class="flex items-center mx-0 my-3">Ghi chú</div>
      <div class="flex items-center mx-0 my-3">
        <div
          class="w-10 h-10 border-2 border-solid border-black flex justify-center items-center mr-3 bg-[#45a29e]"
        >
          <div class="w-5 h-5 bg-[#c5c6c7] rounded-[50%]" />
        </div>
        Trống (có thể đặt)
      </div>
      <div class="flex items-center mx-0 my-3">
        <div
          class="w-10 h-10 border-2 border-solid border-black flex justify-center items-center mr-3 bg-[#c5c6c7]"
        />
        Lựa chọn của bạn
      </div>
      <div class="flex items-center mx-0 my-3">
        <div
          class="w-10 h-10 border-2 border-solid border-black flex justify-center items-center mr-3 bg-red-600"
        />
        Đã được đặt 
      </div>
    </div>
    <BaseButton color="info" label="Xác nhận" @click="confirmBooking" />
  </div>
</template>
