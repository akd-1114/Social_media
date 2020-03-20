import * as actionTypes from "../actionTypes";
import { updateObject } from "../utility";

const initialState = {
  screams: [],
  scream: {},
  loading: false
};

const loadingData = (state, action) => {
  return updateObject(state, { loading: true });
};

const setScreams = (state, action) => {
  return updateObject(state, { ...action.payload, loading: false });
};

const setScream = (state, action) => {
  return updateObject(state, { scream: action.payload });
};

const postScream = (state, action) => {
  return updateObject(state, { screams: [action.payload, ...state.screams] });
};

const submitComment = (state, action) => {
  return updateObject(state, {
    scream: updateObject(state.scream, {
      comments: [action.payload, ...state.scream.comments]
    })
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_DATA:
      return loadingData(state, action);
    case actionTypes.SET_SCREAMS:
      return setScreams(state, action);
    case actionTypes.SET_SCREAM:
      return setScream(state, action);
    case actionTypes.LIKE_SCREAM:
    case actionTypes.UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        // updateObject(state.scream, action.payload);
        state.scream = action.payload;
      }
      return {
        ...state
      };
    case actionTypes.DELETE_SCREAM:
      let index1 = state.screams.findIndex(
        scream => scream.screamId === action.payload
      );
      state.screams.splice(index1, 1);
      return {
        ...state
      };
    case actionTypes.POST_SCREAM:
      return postScream(state, action);
    case actionTypes.SUBMIT_COMMENT:
      return submitComment(state, action);
    default:
      return state;
  }
};

export default reducer;
