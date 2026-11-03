import axios from "axios";
import { API_CONFIG, STORAGE_KEYS, FRONT_ROUTES } from "../config/constants.js";

// Creación de la instancia unificada de Axios
const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT
});

//servicio para obtener los logs del sistema
export const LogsService = {
    getLogs: (params = {}) =>
        api.get("/logs", { params }).then(res => res.data)
};

// Interceptor: Inyecta automáticamente el token de LocalStorage 
// en cada petición
api.interceptors.request.use((config) => {
    const token = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor: Manejo de estados de error globales 
// (Token Expirado / Inválido -> 403)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 403) {
            localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
            window.location.href = FRONT_ROUTES.LOGIN;
        }
        return Promise.reject(error);
    }
);

// Capa expositora de servicios (Contratos limpios)
export const CatalogService = {
    //
    getBooks: (params) => api.get("/books", { params }).then(res => res.data),
    createBook: (data) => api.post("/books", data).then(res => res.data),
    updateBook: (id, data) => api.put(`/books/${id}`, data).then(res => res.data),
    deleteBook: (id) => api.delete(`/books/${id}`).then(res => res.data),

    //servicio para obtener los items de autores, generos, sagas y estantes
    getItems: (entity) => api.get(`/${entity}`).then(res => res.data),
    createItem: (entity, name) => api.post(`/${entity}`, { name }).then(res => res.data),
    updateItem: (entity, id, name) => api.put(`/${entity}/${id}`, { name }).then(res => res.data),
    deleteItem: (entity, id) => api.delete(`/${entity}/${id}`).then(res => res.data)
};

export const AuthService = {
    login: (credentials) => api.post("/auth/login", credentials).then(res => res.data)
};
