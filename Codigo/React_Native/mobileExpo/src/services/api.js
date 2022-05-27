import axios from "axios";

const api = axios.create({
    baseURL : 'http://10.84.30.63:3333',
});

export default api;