import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/reminders'
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: false
})

export const reminderService = {
    create: (data) => api.post('', data),
    getAll: () => api.get(''),
    delete: (id) => api.delete(`/${id}`)
}

export default api;