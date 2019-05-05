import Api from "./Api";
import jwt_decode from "jwt-decode";

const throwErr = err => {
  throw err;
};

class EmployeeApi {
  constructor() {
    this.api = new Api();
  }

  login({ username, password }) {
    return this.api.client
      .post("/api/v1/managers/employees/authenticate", {
        username,
        password
      })
      .then(res => {
        const { auth_token } = res.data;
        const decodedToken = jwt_decode(auth_token);
        const { employee_id } = decodedToken;
        this.employeeId = employee_id;
        this.api.setDefaultHeader(auth_token);
        return employee_id;
      })
      .catch(throwErr);
  }

  getEmployee() {
    return this.api.client
      .get(`/api/v1/employees/${this.employeeId}`)
      .then(res => {
        this.managerId = res.data.data.attributes.manager_id;
        return res.data.data.attributes;
      })
      .catch(throwErr);
  }

  beginShift() {
    return this.api.client
      .post(
        `/api/v1/managers/${this.managerId}/employees/${this.employeeId}/shifts`
      )
      .then(res => {
        this.shiftId = res.data.id;
        return res.data.id;
      })
      .catch(throwErr);
  }

  createCashDrop(shiftId, number, amount) {
    return this.api.client.post(this.shiftUrl(shiftId) + "/cash_drops", {
      number,
      amount
    });
  }

  createPaidOut(shiftId, company, amount) {
    return this.api.client.post(this.shiftUrl(shiftId) + "/paid_outs", {
      company,
      amount
    });
  }

  createNote(shiftId, title, message) {
    return this.api.client.post(this.shiftUrl(shiftId) + "/notes", {
      title,
      message
    });
  }

  createCheck(shiftId, { company, amount, number }) {
    return this.api.client.post(this.shiftUrl(shiftId) + "/checks", {
      company,
      amount,
      number
    });
  }

  updateChange(shiftId, change_sheet) {
    return this.api.client.put("/api/v1/shifts/" + shiftId + "/change_sheet", {
      change_sheet
    });
  }

  getInventory(shiftId) {
    return this.api.client
      .get(this.shiftUrl(shiftId) + "/inventory_items")
      .then(res => res.data);
  }

  updateInventory(itemId, params) {
    return this.api.client.put(`/api/v1/inventory_items/${itemId}`, params);
  }

  completeShift(shiftId) {
    return this.api.client.put("/api/v1/shifts/" + shiftId + "/complete");
  }

  shiftUrl(shiftId) {
    return `/api/v1/managers/${this.managerId}/employees/${
      this.employeeId
    }/shifts/${shiftId}`;
  }
}

export default new EmployeeApi();
