import isEmpty from "../utils/isEmpty";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";

// Types
const SET_CURRENT_EMPLOYEE = "employee/SET_CURRENT_EMPLOYEE";
const LOGOUT = "employee/LOG_OUT";
const GET_EMPLOYEE_DATA = "employee/GET_EMPLOYEE_DATA";

// Initial State
const initialState = {
  isAuthenticated: false,
  employee: {}
};

// Reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_EMPLOYEE: {
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        employee: action.payload
      };
    }
    default:
      return state;
  }
};

// Set logged in employee
export const setCurrentEmployee = decodedToken => {
  return {
    type: SET_CURRENT_EMPLOYEE,
    payload: decodedToken
  };
};

// Logout - Delete employee token
export const logoutEmployee = () => dispatch => {
  localStorage.clear();
  dispatch({
    type: LOGOUT,
    payload: {}
  });
};

// Side Effects
export const loginEmployee = (employeeData, callback) => dispatch => {
  axios
    .post(
      "http://localhost:8000/api/v1/managers/employees/authenticate",
      employeeData
    )
    .then(res => {
      // Save to local storage
      const { auth_token } = res.data;
      // Set auth_token to local storage
      _storeData = async () => {
        try {
          await AsyncStorage.setItem("jwtToken", auth_token);
        } catch (error) {
          console.log(error);
        }
      };
      // Set token to Auth Header
      setAuthToken(auth_token);
      // Decode token to getemployee Data
      const decodedToken = jwt_decode(auth_token);
      // Set Currentemployee
      axios
        .get(
          `http://localhost:8000/api/v1/employees/${decodedToken.employee_id}`
        )
        .then(res => {
          dispatch(setCurrentEmployee(res.data.data));
        })
        .catch(err => console.log(err));
    })
    .then(() => {
      callback();
    })
    .catch(err => {
      console.log(err);
    });
};
