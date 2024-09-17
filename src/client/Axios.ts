'use client'
import axios from 'axios'
import { setupInterceptorsTo } from './interceptor'



// const customBaseUrl = 'http://192.168.31.51'
// const customBaseUrl = 'http://10.0.2.2'
const customBaseUrl = 'http://192.168.29.41'
// const customBaseUrl = 'http://43.204.133.228'



export const client = axios.create({
  baseURL: `${customBaseUrl}:3001/v1/api`,
  // timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  }
})
setupInterceptorsTo(client)

export const authClient = axios.create({
  baseURL: `${customBaseUrl}:3001/v1/api`,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  }
})
