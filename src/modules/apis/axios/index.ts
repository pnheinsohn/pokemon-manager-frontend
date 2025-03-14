import { AxiosError } from "axios";

import axios from "axios";
import { camelizeKeys, decamelizeKeys } from "humps";

const createAxiosInstance = (subpath: string) => axios.create({
  baseURL: `/admin${subpath}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors for error handling and case conversion
const addInterceptors = (instance: ReturnType<typeof axios.create>) => {
  // Request interceptor to convert camelCase to snake_case
  instance.interceptors.request.use(
    (config) => {
      if (config.data) {
        config.data = decamelizeKeys(config.data);
      }
      if (config.params) {
        config.params = decamelizeKeys(config.params);
      }
      return config;
    }
  );

  // Response interceptor to convert snake_case to camelCase
  instance.interceptors.response.use(
    (response) => {
      response.data = camelizeKeys(response.data);
      return response;
    },
    (error: AxiosError) => {
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;
      return Promise.reject(new Error(`An unexpected error occurred: ${errorMessage}`));
    }
  );
  return instance;
};

const createInstance = (subpath: string) => addInterceptors(createAxiosInstance(subpath));

export const pokemonsApiInstance = createInstance('/pokemons');
export const reportsApiInstance = createInstance('/reports');
