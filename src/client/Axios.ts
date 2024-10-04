'use client'
import axios from 'axios'
import { setupInterceptorsTo } from './interceptor'

const customBaseUrl = 'https://cbpl.chairbord.in/v1/api'
<<<<<<< Updated upstream
// const customBaseUrl = 'http://192.168.1.23:3001/v1/api'
=======
// const customBaseUrl = 'http://192.168.0.65:3001/v1/api'
//  const customBaseUrl = 'http://192.168.29.41:3001/v1/api'
>>>>>>> Stashed changes

export const client = axios.create({
  baseURL: `${customBaseUrl}`,
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
