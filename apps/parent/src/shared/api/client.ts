import axios from 'axios';
import Constants from 'expo-constants';
import { API_CONFIG } from './config';
import { getAuthToken } from '../storage/authStorage';

const client = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout
});

client.interceptors.request.use(async (config) => {
  const token = await getAuthToken();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    };
  }
  const { manifest } = Constants;
  if (manifest?.extra?.environment) {
    config.headers = {
      ...config.headers,
      'x-environment': manifest.extra.environment
    };
  }
  return config;
});

export { client };
