import { message } from 'antd'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'

const TIMEOUT = 10 // 超时时间,单位 s

export interface ErrorWrap<T> { res: T; err: Error }

const instance = axios.create({
  timeout: TIMEOUT * 1000,
  validateStatus: status => status < 500, // 默认是 [200,300)
})

/** 设置默认的host */
const setDefaultHost = (host: string) => (instance.defaults.baseURL = host)

/** 错误处理 */
instance.interceptors.response.use(
  // status < 500
  (response) => {
    const { status /** request */ } = response

    const data = response.data

    if (status !== 200 && status !== 201) {
      const err = Error(data?.message) // 使用code, message容易变
      // @ts-expect-error
      err.response = response
      throw err
    }
    return response
  },
  // status >= 500
  (error: AxiosError) => {
    // 有返回data,但不是 200
    if (error.response) {
      const data = error.response.data
      throw new Error(data?.message)
    }

    // 断网
    if (!window.navigator.onLine)
      throw new Error('网络异常，请检查网络是否正常连接')

    // 超时
    if (error.message?.includes('timeout'))
      throw new Error('请求超时，请重新尝试')

    return Promise.reject(error)
  },
)

type RequestConfig = AxiosRequestConfig & { hideError?: boolean }

/**
 * 封装业务request
 */
async function request<T, P = false>(url: string, config: RequestConfig): Promise<ErrorWrap<T>> {
  const { method = 'POST', headers = {}, data: requestData, hideError, ...restConfig } = config

  const withCredentials = config.withCredentials || instance.defaults.withCredentials

  headers['X-URL'] = window.location.hash?.slice(1)

  try {
    const params = {
      url,
      method,
      headers,
      [method === 'GET' ? 'params' : 'data']: requestData,
      ...restConfig,
      withCredentials: withCredentials ?? !instance.defaults.headers.common.Authorization,
    }

    const { data } = await instance.request<T>(params)
    return { res: data } as ErrorWrap<T>
  }
  catch (error: any) {
    __DEV__ && console.warn(error)

    !hideError && message.error(error?.message)
    return { err: error } as ErrorWrap<T>
  }
}

function Post<T, P = false>(uri: string, data: object = {}, config?: RequestConfig) {
  return request<T, P>(uri, { method: 'POST', data, ...config })
}

function Get<T, P = false>(uri: string, data?: object, config?: RequestConfig) {
  return request<T, P>(uri, { method: 'GET', data, ...config })
}

function Delete<T, P = false>(uri: string, data?: object, config?: RequestConfig) {
  return request<T, P>(uri, { method: 'DELETE', data, ...config })
}

function Put<T, P = false>(uri: string, data?: object, config?: RequestConfig) {
  return request<T, P>(uri, { method: 'PUT', data, ...config })
}

request.setDefaultHost = setDefaultHost
request.instance = instance

export { Post, Get, Put, Delete }
export default request
