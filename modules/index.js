import { combineReducers } from "redux";
import employee from "./employee";
import manager from "./manager";
import employeeShift from "./employeeShift";
import managerShift from './managerShift'

export default combineReducers({
  employee,
  manager,
  employeeShift,
  managerShift
});
