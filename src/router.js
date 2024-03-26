import { createRouter, createWebHistory } from 'vue-router'; // Import from 'vue-router'

// Import your components
import HomePage from './components/HomePage.vue';
import KotobaDoru from './components/KotobaDoru.vue';
import Footer from './components/AppFooter.vue';
import Header from './components/AppHeader.vue';


const routes = [
  { path: '/', component: HomePage },
  { path: '/game', components: {
    default: KotobaDoru,
    footer: Footer,
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
