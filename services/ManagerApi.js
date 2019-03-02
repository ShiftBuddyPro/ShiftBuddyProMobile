import Api from "./Api";
import jwt_decode from "jwt-decode";

const throwErr = err => {
  throw err;
};

class ManagerApi {
  constructor() {
    this.api = new Api();
  }

  login({ email, password }) {
    return this.api.client
      .post("/api/v1/managers/authenticate", {
        email,
        password
      })
      .then(res => {
        const { auth_token } = res.data;
        const decodedToken = jwt_decode(auth_token);
        const { manager_id } = decodedToken;
        this.managerId = manager_id;
        this.api.setBasePrefix(`/api/v1/managers/${manager_id}`);
        this.api.setDefaultHeader(auth_token);
        return res;
      })
      .catch(throwErr);
  }

  getActivityLogs() {
    return this.api
      .get(`/activity_logs`)
      .then(res => res.data)
      .catch(throwErr);
  }

  getShifts() {
    return this.api
      .get(`/shifts`)
      .then(res => res.data.data)
      .catch(throwErr);
  }

  getEmployees() {
    return this.api
      .get(`/employees`)
      .then(res => res.data)
      .catch(throwErr);
  }

  addEmployee({
    name,
    username,
    password,
    passwordConfirmation: password_confirmation
  }) {
    return this.api
      .post(`/employees`, {
        employee: {
          name,
          username,
          password,
          password_confirmation,
          manager_id: this.managerId
        }
      })
      .then(res => res)
      .catch(throwErr);
  }

  deleteEmployee(employeeId) {
    return this.api.client
      .delete(`/api/v1/employees/${employeeId}`)
      .then(res => res)
      .catch(throwErr);
  }

  async addTrackedItem(itemName) {
    try {
      const response = await this.api.post(`/tracked_items`, {
        tracked_item: { name: itemName }
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  getTrackedItems() {
    return this.api
      .get("/tracked_items")
      .then(res => res.data)
      .catch(throwErr);
  }

  deleteTrackedItem(id) {
    return this.api
      .delete(`/tracked_items/${id}`)
      .then(res => res)
      .catch(throwErr);
  }
}

export default new ManagerApi();
