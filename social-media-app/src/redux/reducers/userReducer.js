import * as actionTypes from "../actionTypes";
import { updateObject } from "../utility";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  notifications: [],
  likes: []
};

const setAuthenticated = (state, action) => {
  return updateObject(state, { authenticated: true });
};

const setUser = (state, action) => {
  return updateObject(state, {
    authenticated: true,
    loading: false,
    ...action.payload
  });
};

const loadingUser = (state, action) => {
  return updateObject(state, { loading: true });
};

const likeScream = (state, action) => {
  return updateObject(state, {
    likes: [
      ...state.likes,
      {
        userHandle: state.credentials.handle,
        screamId: action.payload.screamId
      }
    ]
  });
};

const unlikeScream = (state, action) => {
  return updateObject(state, {
    likes: state.likes.filter(like => like.screamId !== action.payload.screamId)
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTHENTICATED:
      return setAuthenticated(state, action);
    case actionTypes.SET_USER:
      return setUser(state, action);
    case actionTypes.LOADING_USER:
      return loadingUser(state, action);
    case actionTypes.SET_UNAUTHENTICATED:
      return initialState;
    case actionTypes.LIKE_SCREAM:
      return likeScream(state, action);
    case actionTypes.UNLIKE_SCREAM:
      return unlikeScream(state, action);
    case actionTypes.MARK_NOTIFICATION_READ:
      state.notifications.forEach(not => (not.read = true));
      return {
        ...state
      };
    default:
      return state;
  }
};

export default reducer;
