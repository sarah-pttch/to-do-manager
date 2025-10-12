import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/tasks'
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: false
})

export const taskService = {
    create: (data) => api.post('', data),
    createLongterm: (data) => api.post('/longterm', data),
    getAll: () => api.get(''),
    getArchive: () => api.get('/completed'),
    getLongterm: () => api.get('/longterm'),
    update: (id, data) => api.put(`/${id}`, data),
}

export default api;