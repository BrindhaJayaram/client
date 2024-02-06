// axiosConfig.js
import axios from 'axios';

// Set global limit for Axios
axios.defaults.maxBodyLength = 50 * 1024 * 1024; // 50MB

export default axios;
