import axios from './axios';
axios.defaults.baseURL = 'http://localhost:8080'; // Убедитесь, что это корректный URL бэкенда
const categoryChildrenCache = new Map();

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
        if (!categoryId || typeof categoryId !== 'number') {
            console.error('Invalid categoryId provided:', categoryId);
            return [];
        }

        if (categoryChildrenCache.has(categoryId)) {
            return categoryChildrenCache.get(categoryId);
        }

        try {
            const response = await axios.get(`/categories/${categoryId}/children`);
            categoryChildrenCache.set(categoryId, response.data);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch category children for ID ${categoryId}:`, error);
            throw error;
        }
    },

    async getProductsByCategory(categoryId) {
        try {
            const response = await axios.get(`/products/category/${categoryId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error('Failed to fetch products:', error);
            throw error;
        }
    },
};
