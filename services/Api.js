import axios from "axios";

export default class Api {
  constructor() {
    this.client = axios.create({
      baseURL: "https://www.shiftbuddypro.com"
      // baseURL: 'http://www.shiftbuddypro.com'
    });
  }

  setDefaultHeader(authToken) {
    this.client.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  }

  setBasePrefix(basePrefix) {
    this.basePrefix = basePrefix;
  }

  get(route) {
    return this.client.get(this.basePrefix + route);
  }

  post(route, params) {
    return this.client.post(this.basePrefix + route, params);
  }

  put(route, params) {
    return this.client.put(this.basePrefix + route, params);
  }

  delete(route) {
    return this.client.delete(this.basePrefix + route);
  }
}
