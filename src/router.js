import { createRouter, createWebHistory } from 'vue-router'; // Import from 'vue-router'

// Import your components
import HomePage from './components/HomePage.vue';
import KotobaDoru from './components/KotobaDoru.vue';


const routes = [
  { path: '/', component: HomePage },
  { path: '/game', component: KotobaDoru },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
