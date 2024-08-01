'use client'
import axios from 'axios'
import { setupInterceptorsTo } from './interceptor'

export const client = axios.create({
  // baseURL: 'https://cbpl-backend.onrender.com/v1/api',
  baseURL: 'http://192.168.0.105:3000/v1/api',
  // baseURL: 'http://localhost:3000/v1/api',
  // timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  }
})
setupInterceptorsTo(client)

export const authClient = axios.create({
  baseURL: 'https://cbpl-backend.onrender.com/v1/api',
  // timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  }
})
