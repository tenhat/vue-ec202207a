import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '@/views/DetailsView.vue';
import SignUpVue from '@/views/SignUp.vue';
import LoginView from '@/views/LoginView.vue';
import CartView from '@/views/CartView.vue';
import ConfirmView from '@/views/ConfirmView.vue';
import ThankYouVue from '@/views/ThankYou.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/details',
    name: 'details',
    component: DetailView,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpVue
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/confirm',
    name: 'confirm',
    component: ConfirmView
  },
  {
    path: '/thankyou',
    name: 'thankyou',
    component: ThankYouVue
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
