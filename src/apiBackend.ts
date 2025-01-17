import axios from 'axios';

// Create an instance of axios with default configuration
const apiAuth = axios.create({
  baseURL: 'http://localhost:8000/api/auth/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiBook = axios.create({
  baseURL: 'http://localhost:8000/api/auth/',
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json'
  },
});

export {apiAuth, apiBook};
