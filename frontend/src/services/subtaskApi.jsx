import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/subtasks'
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: false
})

export const subtaskService = {
    create: (data) => api.post('', data),
}

export default api;