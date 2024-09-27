import axiosInstance from './axios';

export const AuthService = {
    login(identifier, password) {
        return axiosInstance.post('/auth/login', {
            identifier,
            password
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
