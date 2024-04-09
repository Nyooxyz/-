import { createRouter, createWebHistory } from 'vue-router';


const routes = [
  {
    path: '/',
    component: () => import("@/components/LeHome.vue"),
  },
  {
    path: '/godle',
    component: () => import("@/components/GodleApp.vue"),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;