import Api from './Api';
import storage from 'react-native-modest-storage';
import jwt_decode from 'jwt-decode';

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  data: Manager;
}

interface Manager {
  auth_token: string;
  name: string;
  id: string;
  email: string;
}

class ManagerApi {
  api: Api;
  constructor() {
    this.api = new Api();
  }

  login({ email, password }: LoginParams) {
    return this.api.client
      .post('/api/v1/managers/authenticate', {
        email,
        password,
      })
      .then((res: LoginResponse) => {
        const { data: manager } = res;
        const { auth_token } = manager;
        const currentUser = {
          ...manager,
          type: 'manager',
        };
        storage.set('currentUser', currentUser);
        this.setDefaultHeader(auth_token);
        return manager;
      });
  }

  setDefaultHeader(authToken: string) {
    this.api.setDefaultHeader(authToken);
  }

  getActivityLogs() {
    return this.api.get(`/activity_logs`).then(res => res.data);
  }

  getShifts() {
    return this.api.get(`/shifts`).then(res => res.data.data);
  }

  getEmployees() {
    return this.api.get(`/employees`).then(res => res.data);
  }

  addEmployee({
    name,
    username,
    password,
    passwordConfirmation: password_confirmation,
  }) {
    return this.api
      .post(`/employees`, {
        employee: {
          name,
          username,
          password,
          password_confirmation,
          manager_id: this.managerId,
        },
      })
      .then(res => res);
  }

  deleteEmployee(employeeId) {
    return this.api.client
      .delete(`/api/v1/employees/${employeeId}`)
      .then(res => res);
  }

  async addTrackedItem(itemName) {
    const response = await this.api.post(`/tracked_items`, {
      tracked_item: { name: itemName },
    });
    return response.data;
  }

  getTrackedItems() {
    return this.api.get('/tracked_items').then(res => res.data);
  }

  deleteTrackedItem(id) {
    return this.api.delete(`/tracked_items/${id}`).then(res => res);
  }
}

export default new ManagerApi();
