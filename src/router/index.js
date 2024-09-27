import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';

const routes = [
    { path: '/auth/login', name: 'Login', component: LoginPage },
    { path: '/auth/register', name: 'Register', component: RegisterPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
