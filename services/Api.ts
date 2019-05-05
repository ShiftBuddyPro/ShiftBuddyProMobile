import axios, { AxiosInstance } from 'axios';

export default class Api {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://www.shiftbuddypro.com',
    });
  }

  setDefaultHeader(authToken: string) {
    this.client.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  }

  get(route: string) {
    return this.client.get(route);
  }

  post(route: string, params: object) {
    return this.client.post(route, params);
  }

  put(route: string, params: object) {
    return this.client.put(route, params);
  }

  delete(route: string) {
    return this.client.delete(route);
  }
}
