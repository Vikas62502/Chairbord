import axios from 'axios'
import { setupInterceptorsTo } from './interceptor'

const customBaseUrl = 'http://192.168.0.171:3001/v1/api'

export const client = axios.create({
  baseURL: `${customBaseUrl}`,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  }
})
setupInterceptorsTo(client)