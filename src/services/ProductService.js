import axios from './axios';
axios.defaults.baseURL = 'http://localhost:8080'; // Убедитесь, что это корректный URL бэкенда

export default {
    async getAllCategories() {
        try {
            const response = await axios.get('/categories/');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            throw error;
        }
    },
    async getAllProducts() {
        try {
            const response = await axios.get('/products/');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            throw error;
        }
    },
    async getCategoryChildren(categoryId) {
        try {
            const response = await axios.get(`/categories/${categoryId}/children`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch category children:', error);
            throw error;
        }
    },
    async getProductsByCategory(categoryId) {
        try {
            const response = await axios.get(`/products/category/${categoryId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // если вы используете куки для аутентификации
            });
            return response.data;
        } catch (error) {
            console.error('Failed to fetch products:', error);
            throw error;
        }
    },
};
