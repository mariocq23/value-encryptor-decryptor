const axios = require('axios');

const axiosInstance = axios.default.create({
    baseURL: 'http://localhost:49160'
});

module.exports = axiosInstance;