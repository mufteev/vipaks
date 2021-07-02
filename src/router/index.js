import { createRouter, createWebHistory } from 'vue-router';
import Profile from '@/components/Profile.vue';
import Team from '@/components/Team.vue';

const routes = [
  { path     : '/',
    component: Profile
  },
  { path     : '/team',
    component: Team
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
