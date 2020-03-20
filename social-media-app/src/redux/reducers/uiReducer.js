import * as actionTypes from "../actionTypes";
import { updateObject } from "../utility";

const initialState = {
  loading: false,
  errors: null
};

const setErrors = (state, action) => {
  return updateObject(state, { loading: false, errors: action.payload });
};

const clearErrors = (state, action) => {
  return updateObject(state, { loading: false, errors: null });
};

const loadingUI = (state, action) => {
  return updateObject(state, { loading: true });
};

const stopLoadingUi = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ERRORS:
      return setErrors(state, action);
    case actionTypes.CLEAR_ERRORS:
      return clearErrors(state, action);
    case actionTypes.LOADING_UI:
      return loadingUI(state, action);
    case actionTypes.STOP_LOADING_UI:
      return stopLoadingUi(state, action);
    default:
      return state;
  }
};

export default reducer;
