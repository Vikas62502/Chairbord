import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse
} from 'axios'
import { getCache, setCache } from '../helper/Storage' // You might need a function to store the new token

const refreshToken = async (): Promise<string | null> => {
  try {
    // Make an API call to refresh the token. Replace with your refresh token endpoint
    const response = await axios.post('/refresh-token', {
      // Include necessary data like the refresh token
    })
    const newToken = response.data.token
    // Store the new token in cache/local storage
    await setCache('token', newToken)
    return newToken
  } catch (error) {
    console.error('Token refresh failed:', error)
    return null
  }
}

const onRequest = async (
  config: InternalAxiosRequestConfig<any>
): Promise<InternalAxiosRequestConfig<any>> => {
  const token = await getCache('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`)
  return Promise.reject(error)
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.info(`[response] [${JSON.stringify(response)}]`)
  return response
}

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  // Check if the error is due to token expiration (usually 401 Unauthorized)
  if (error.response?.status === 401) {
    console.log('Token expired, attempting to refresh token...')

    // Attempt to refresh the token
    const newToken = await refreshToken()
    if (newToken) {
      // Retry the failed request with the new token
      const config: any = error.config
      config.headers['Authorization'] = `Bearer ${newToken}`

      // Retry the request with the new token
      return axios(config)
    } else {
      console.error('Failed to refresh token. Please login again.')
    }
  }

  console.error(`[response error] [${JSON.stringify(error)}]`)
  return Promise.reject(error)
}

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}
