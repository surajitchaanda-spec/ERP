import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ApiClientConfig {
  baseURL: string;
  getToken?: () => Promise<string | null> | string | null;
}

export class ApiClient {
  private client: AxiosInstance;
  private getToken?: ApiClientConfig['getToken'];

  constructor(config: ApiClientConfig) {
    this.client = axios.create({ baseURL: config.baseURL });
    this.getToken = config.getToken;

    this.client.interceptors.request.use(async (request) => {
      if (this.getToken) {
        const token = await this.getToken();
        if (token) {
          request.headers = request.headers ?? {};
          request.headers.Authorization = `Bearer ${token}`;
        }
      }
      return request;
    });
  }

  public async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  public async post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  public async put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  public async patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.patch<T>(url, data, config);
  }

  public async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }
}

export const createApiClient = (config: ApiClientConfig) => new ApiClient(config);
