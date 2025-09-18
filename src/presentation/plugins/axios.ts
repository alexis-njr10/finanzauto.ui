import axios from "axios";
import Constants from 'expo-constants';

const profile = Constants.expoConfig?.extra?.profile ?? 'development';
const apiUrl = Constants.expoConfig?.extra?.apiUrl?.[profile];
const appId = Constants.expoConfig?.extra?.appId?.[profile];
const withCredentials = Constants.expoConfig?.extra?.withCredentials ?? false;

axios.defaults.baseURL = apiUrl;
axios.defaults.withCredentials = withCredentials;
axios.defaults.responseType = 'json';

axios.interceptors.request.use((config) => {
  config.headers['app-id'] = appId;
   if (__DEV__) {
    console.log(`📡 [Request] ${config.method?.toUpperCase()} ${config.url}`, config);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log(`✅ [Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
      });
    }
    return response?.data ?? null;
  },
  (error) => {
    if (__DEV__) {
      console.error(`❌ [Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
        status: error.response?.status,
        data: error.response?.data,
      });
    }
    return Promise.reject(error);
  }
);

export default axios;