import axios, { AxiosInstance } from 'axios';

let instance: undefined | AxiosInstance;

const api = () => instance || axios.create({ baseURL: 'http://localhost:8080' });

export const initApi = (token: string) => {
  instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      Authorization: token,
    },
  });
};

export default api;
