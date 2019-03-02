import axios from "axios";

const SET_SHIFT = "managerShift/SET_SHIFT";
const CLEAR_SHIFT = "managerShift/CLEAR_SHIFT";

const initialState = {
  currentShift: []
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SHIFT: {
      return {
        ...state,
        currentShift: [action.payload]
      };
    }
    default:
      return state;
  }
};

export const clearShift = () => {
  return({
    type: CLEAR_SHIFT,
  })
}
