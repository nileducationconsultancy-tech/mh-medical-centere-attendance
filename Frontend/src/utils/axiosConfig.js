import axios from 'axios';

const getApiBaseUrl = () => {
    let envUrl = import.meta.env.VITE_API_URL;
    if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
        envUrl = envUrl.trim().replace(/\/+$/, '');
        if (envUrl.endsWith('/api')) {
            envUrl = envUrl.slice(0, -4);
        }
        return envUrl;
    }
    return '';
};

axios.defaults.baseURL = getApiBaseUrl();
axios.defaults.withCredentials = true;

// Attach Bearer token from localStorage to support cross-domain deployments seamlessly
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

import { usePopupStore } from '../store/popupStore';

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 409) {
            const msg = error.response.data?.message || 'Data conflict. Please refresh the page.';
            usePopupStore.getState().showAlert({
                title: 'Conflict Notice',
                message: msg,
                type: 'warning'
            });
        }
        return Promise.reject(error);
    }
);

export default axios;
