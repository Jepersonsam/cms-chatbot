// src/services/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // ganti sesuai URL API kamu
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}` // jika pakai auth
  }
})

export default api