import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/customer/HomeView.vue';
import CustomerView from '@/views/CustomerView.vue';
import { toValue } from 'vue';

const routes = [
  {
    path: '/',
    name: '',
    component: CustomerView,
    children: [
      {
        path: '/',
        name: '',
        component: HomeView
      },
      {
        meta: {},
        path: '/home',
        name: 'BCB',
        component: HomeView
      },
      {
        meta: { title: 'Login' },
        path: '/login',
        component: () => import('@/views/customer/LoginView.vue')
      },
      {
        meta: { title: 'Forget Password' },
        path: '/forgetPwd',
        component: () => import('@/views/customer/ForgetPwdView.vue')
      },
      {
        meta: { title: 'Register' },
        path: '/register',
        component: () => import('@/views/customer/RegisterView.vue')
      },
      {
        meta: { title: 'Profile' },
        path: '/profile',
        component: () => import('@/views/customer/ProfileView.vue')
      },
      {
        meta: { title: 'Courts' },
        path: '/courts',
        component: () => import('@/views/customer/CourtsView.vue'),
        props: (route) => ({ value: route.query.value })
      },
      {
        meta: { title: 'Court Booking' },
        path: '/courtBooking',
        component: () => import('@/views/customer/CourtBookingView.vue'),
        props: (route) => ({ value: route.query.value })
      }
    ]
  }

  // {
  //   meta: { title: 'Booking History' },
  //   path: '/history',
  //   component: () => import('@/views/customer/HistoryView.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  }
});
router.beforeEach((to, from, next) => {
  const titleFromParams = to.params?.pageTitle;

  if (titleFromParams) {
    document.title = `$(titleFromParams) - ${document.title}`;
  } else {
    document.title = to.meta?.title ?? 'BCB';
  }

  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
  next();
});

export default router;
