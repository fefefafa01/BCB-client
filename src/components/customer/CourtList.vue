<script setup>
import { useRouter } from 'vue-router';
import { reactive, computed } from 'vue';
import CourtCard from '@/components/customer/CourtCard.vue';
import vueAwesomePaginate from '@/components/items/vue-awesome-paginate.vue';

const props = defineProps({
  courtsDetail: {
    type: Array,
    required: true
  },
  hasCursor: {
    type: Boolean
  }
});

const router = useRouter();

const paginate = reactive({
  currentPage: 1,
  perPage: 4
});

const redirectToCourt = (item) => {
  if (localStorage.getItem('date')) {
    localStorage.setItem('yardDetail', JSON.stringify(item));
    router.push({ path: '/courtBooking', query: { value: JSON.stringify(item.name) } });
  } else {
    alert('Vui lòng nhập ngày đặt sân');
  }
};

const itemsPaginate = computed(() => {
  const start = paginate.perPage * (paginate.currentPage - 1);
  const end = paginate.perPage * paginate.currentPage;
  return props.courtsDetail.slice(start, end);
});
</script>

<template>
  <CourtCard
    v-for="(item, index) in itemsPaginate"
    :key="index"
    :detail="item"
    :item="index % 2 === 0 ? 'item1' : 'item2'"
    for-booking
    @click="redirectToCourt(item)"
  />
  <div class="lg:px-6 p-3">
    <vueAwesomePaginate
      v-model="paginate.currentPage"
      :total-items="props.courtsDetail.length"
      :items-per-page="paginate.perPage"
      :max-pages-shown="3"
    />
  </div>
</template>
