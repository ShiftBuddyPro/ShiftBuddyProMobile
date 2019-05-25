import Api from './Api';
import storage from 'react-native-modest-storage';
import store from 'modules/store';
import { setCurrentManager } from 'modules/manager';
import {
  LoginParams,
  LoginResponse,
  Manager,
  EmployeesResponse,
  Employee,
  ShiftsResponse,
  Shift,
  ActivitiesResponse,
} from 'types';

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
        const currentUser = {
          ...manager,
          type: 'manager',
        };
        storage.set('currentUser', currentUser);
        this.setManager(currentUser);
        return manager;
      });
  }

  setManager(currentUser: Manager) {
    this.api.setDefaultHeader(currentUser.auth_token);
    store.dispatch(setCurrentManager(currentUser));
  }

  managerId() {
    return store.getState().manager.managerData.id;
  }

  managerUrl(suffix: string) {
    return `/api/v1/managers/${this.managerId()}/${suffix}`;
  }

  getActivityLogs() {
    return this.api
      .get(this.managerUrl('activity_logs'))
      .then((res: ActivitiesResponse) => res.data);
  }

  getShifts() {
    return this.api
      .get(this.managerUrl('shifts'))
      .then((res: ShiftsResponse) => res.data.data);
  }

  getEmployees() {
    return this.api
      .get(this.managerUrl(`employees`))
      .then((res: EmployeesResponse) => res.data);
  }

  getEmployee(employeeId) {
    return this.api
      .get(`/api/v1/employees/${employeeId}`)
      .then(res => res.data.data.attributes);
  }

  addEmployee({
    name,
    username,
    password,
    passwordConfirmation: password_confirmation,
  }) {
    return this.api
      .post(this.managerUrl(`/employees`), {
        employee: {
          name,
          username,
          password,
          password_confirmation,
          manager_id: this.managerId(),
        },
      })
      .then(res => res);
  }

  editEmployee({
    name,
    password,
    passwordConfirmation: password_confirmation,
    employeeId,
  }) {
    return this.api.put(`/api/v1/employees/${employeeId}`, {
      employee: {
        name,
        password,
        password_confirmation,
        employee_id: employeeId,
      },
    });
  }

  removeEmployee(employeeId) {
    return this.api.client
      .delete(`/api/v1/employees/${employeeId}`)
      .then(res => res);
  }

  async addTrackedItem(itemName) {
    const response = await this.api.post(this.managerUrl(`/tracked_items`), {
      tracked_item: { name: itemName },
    });
    return response.data;
  }

  getTrackedItems() {
    return this.api
      .get(this.managerUrl('/tracked_items'))
      .then(res => res.data);
  }

  deleteTrackedItem(id) {
    return this.api
      .delete(this.managerUrl(`/tracked_items/${id}`))
      .then(res => res);
  }
}

const managerApi = new ManagerApi();

export default managerApi;
