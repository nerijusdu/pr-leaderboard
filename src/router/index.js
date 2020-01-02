import Vue from 'vue';
import VueRouter from 'vue-router';
import Settings from '../components/Settings.vue';
import Leaderboard from '../components/Leaderboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/leaderboard'
  },
  {
    path: '/leaderboard',
    component: Leaderboard,
    name: 'leaderboard'
  },
  {
    path: '/settings',
    component: Settings,
    name: 'settings'
  }
];

const router = new VueRouter({
  routes
});

export default router;
