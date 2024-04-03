import { createRouter, createWebHistory } from 'vue-router'; // Import from 'vue-router'

// Import your components
import Godle from './components/GodleApp.vue';
import Header from './components/AppHeader.vue';


const routes = [
  { path: '/', components: {
    default: Godle,
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
