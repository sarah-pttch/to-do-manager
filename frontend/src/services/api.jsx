import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/todos'
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: false
})

export const toDoService = {
    create: (data) => api.post('', data),
    getAll: () => api.get(''),
    getById: (id) => api.get(`/${id}`),
    update: (id, data) => api.put(`/${id}`, data),
    delete: (id) => api.delete(`/${id}`)
}

export default api;