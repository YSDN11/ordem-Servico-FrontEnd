import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.api
})

export default api;