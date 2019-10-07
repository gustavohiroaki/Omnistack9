import axios from 'axios';

const api = axios.create({
    baseURL: 'http://yourip:3333'
})

export default api