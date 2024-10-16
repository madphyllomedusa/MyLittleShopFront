import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import MainPage from "@/pages/MainPage.vue";
import ProductPage from "@/pages/ProductPage.vue";
import ProductContainer from "@/components/ProductContainer.vue";

const routes = [
    { path: '/', name: 'Main', component: MainPage },
    { path: '/products/', name: 'ProductPage', component: ProductPage},
    { path: '/auth/login', name: 'Login', component: LoginPage },
    { path: '/auth/register', name: 'Register', component: RegisterPage },
    {
        path: '/products/category/:categoryId',
        name: 'ProductCategory',
        component: ProductContainer,
        props: route => ({ categoryId: Number(route.params.categoryId) }),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
