import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getEnvironmentConfig } from '../config/environment';

type CreateApiClientOptions = {
  baseURL?: string;
  tokenProvider?: () => Promise<string | undefined>;
};

export const createApiClient = (options: CreateApiClientOptions = {}): AxiosInstance => {
  const envConfig = getEnvironmentConfig();
  const client = axios.create({
    baseURL: options.baseURL ?? envConfig.apiBaseUrl,
    timeout: 10000
  });

  client.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    if (options.tokenProvider) {
      const token = await options.tokenProvider();
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`
        };
      }
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (envConfig.onApiError) {
        envConfig.onApiError(error);
      }
      return Promise.reject(error);
    }
  );

  return client;
};

export default createApiClient;
