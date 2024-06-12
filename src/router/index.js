import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
import HomeView from '@/views/customer/HomeView.vue';

const routes = [
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
  }
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
