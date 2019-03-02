import isEmpty from "../utils/isEmpty";
import axios from "axios";
import { AsyncStorage } from "react-native";

// Types
const SET_CURRENT_SHIFT = "employeeShift/SET_CURRENT_SHIFT ";
const ADD_PAID_OUT = "employeeShift/ADD_PAID_OUT ";
const ADD_CHECK = "employeeShift/ADD_CHECK ";
const ADD_INVENTORY_ITEM = "employeeShift/ADD_INVENTORY_ITEM ";
const ADD_NOTE = "employeeShift/ADD_NOTE ";
const ADD_CASH_DROP = "employeeShift/ADD_CASH_DROP ";
const SET_CURRENT_PAGE = "employeeShift/SET_CURRENT_PAGE ";
const GET_INVENTORY_ITEMS = "employeeShift/GET_INVENTORY_ITEMS";
const SET_INVENTORY_ITEM_FIELD = "employeeShift/SET_INVENTORY_ITEM_FIELD";
const SHOW_INVENTORY = "employeeShift/SHOW_INVENTORY";
const UNSHOW_INVENTORY = "employeeShift/UNSHOW_INVENTORY";
const SET_CHANGE_FIELDS = "employeeShift/SET_CHANGE_FIELDS";

// Initial State
const initialState = {
  id: 0,
  showInventory: true,
  inventoryItemField: "start_amount",
  changeFields: {
    start_pennies: 0,
    start_nickels: 0,
    start_dimes: 0,
    start_quarters: 0,
    start_ones: 0,
    start_fives: 0,
    start_tens: 0,
    start_twenties: 0,
    end_pennies: 0,
    end_nickels: 0,
    end_dimes: 0,
    end_quarters: 0,
    end_ones: 0,
    end_fives: 0,
    end_tens: 0,
    end_twenties: 0
  },
  paidOuts: [],
  checks: [],
  cashDrops: [],
  notes: [],
  currentPage: "CashDrops"
};

// Reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_SHIFT: {
      return {
        ...state,
        id: action.payload
      };
    }
    case ADD_PAID_OUT: {
      return {
        ...state,
        paidOuts: [...state.paidOuts, action.payload]
      };
    }
    case ADD_CHECK: {
      return {
        ...state,
        checks: [...state.checks, action.payload]
      };
    }
    case ADD_INVENTORY_ITEM: {
      return {
        ...state,
        inventory_items: [...state.inventory_items, action.payload]
      };
    }
    case ADD_NOTE: {
      return {
        ...state,
        notes: [...state.notes, action.payload]
      };
    }
    case ADD_CASH_DROP: {
      return {
        ...state,
        cashDrops: [...state.cashDrops, action.payload]
      };
    }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.payload
      };
    }
    case GET_INVENTORY_ITEMS: {
      return {
        ...state,
        inventory_items: action.payload
      };
    }
    case SET_INVENTORY_ITEM_FIELD: {
      return {
        ...state,
        inventoryItemField: action.payload
      };
    }
    case SHOW_INVENTORY: {
      return {
        ...state,
        showInventory: true
      };
    }
    case UNSHOW_INVENTORY: {
      return {
        ...state,
        showInventory: false
      };
    }
    case SET_CHANGE_FIELDS: {
      return {
        ...state,
        changeFields: {
          ...state.changeFields,
          [action.payload.field]: action.payload.value
        }
      };
    }
    default:
      return state;
  }
};

// Actions
export const setCurrentShift = id => {
  return {
    type: SET_CURRENT_SHIFT,
    payload: id
  };
};

export const addPaidOut = data => {
  return {
    type: ADD_PAID_OUT,
    payload: data
  };
};

export const addCheck = data => {
  return {
    type: ADD_CHECK,
    payload: data
  };
};

export const addCashDrop = data => {
  return {
    type: ADD_CASH_DROP,
    payload: data
  };
};

export const addNote = data => {
  return {
    type: ADD_NOTE,
    payload: data
  };
};

export const addInventoryItem = data => {
  return {
    type: ADD_INVENTORY_ITEM,
    payload: data
  };
};

export const setCurrentPage = page => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page
  };
};

export const getInventoryItems = data => {
  return {
    type: GET_INVENTORY_ITEMS,
    payload: data
  };
};

export const setInventoryItemField = field => {
  return {
    type: SET_INVENTORY_ITEM_FIELD,
    payload: field
  };
};

export const showInventory = () => {
  return {
    type: SHOW_INVENTORY
  };
};

export const unshowInventory = () => {
  return {
    type: UNSHOW_INVENTORY
  };
};

export const setChangeFields = (field, value) => {
  return {
    type: SET_CHANGE_FIELDS,
    payload: {
      field: field,
      value: value
    }
  };
};
