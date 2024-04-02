import { createRouter, createWebHistory } from 'vue-router'; // Import from 'vue-router'

// Import your components
import 語ドル from './components/語ドル.vue';
import Header from './components/AppHeader.vue';


const routes = [
  { path: '/', components: {
    default: 語ドル,
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
