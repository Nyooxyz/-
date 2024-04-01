import { createRouter, createWebHistory } from 'vue-router'; // Import from 'vue-router'

// Import your components
import KotobaDoru from './components/KotobaDoru.vue';
import Header from './components/AppHeader.vue';


const routes = [
  { path: '/', components: {
    default: KotobaDoru,
    header: Header
   },
  }
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
