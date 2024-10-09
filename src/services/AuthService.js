import axiosInstance from './axios';
import store from '../stores/index'; // Правильный путь к файлу хранилища

export const AuthService = {
    login(identifier, password) {
        return axiosInstance.post('/auth/login', {
            identifier,
            password
        }).then(response => {
            console.log('Получен identifier:', identifier);
            store.commit('login', { identifier });
            return response;
        });
    },
    register(username, email, password, matchingPassword) {
        return axiosInstance.post('/auth/register', {
            username,
            email,
            password,
            matchingPassword
        });
    }
};
