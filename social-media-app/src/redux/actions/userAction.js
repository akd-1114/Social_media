import jwtDecode from "jwt-decode";

import store from "../stores";
import axios from "../../axios-order";
import * as actionTypes from "../actionTypes";
import { loadingData, setScreams } from "./dataAction";

export const loadingUi = () => {
  return {
    type: actionTypes.LOADING_UI
  };
};

export const setUser = data => {
  return {
    type: actionTypes.SET_USER,
    payload: data
  };
};

export const loadingUser = () => {
  return {
    type: actionTypes.LOADING_USER
  };
};

export const getUserData = () => {
  return dispatch => {
    dispatch(loadingUser());
    axios
      .get("/users/details")
      .then(res => {
        // console.log(res.data);
        dispatch(setUser(res.data));
      })
      .catch(err => {
        console.error(err);
      });
  };
};

export const getUserProfiles = userHandle => {
  return dispatch => {
    dispatch(loadingData());
    axios
      .get(`/users/${userHandle}`)
      .then(res => {
        dispatch(setScreams(res.data));
      })
      .catch(err => {
        console.error(err);
        dispatch(setScreams(null));
      });
  };
};

export const clearErrors = () => {
  return {
    type: actionTypes.CLEAR_ERRORS
  };
};

export const setErrors = errors => {
  return {
    type: actionTypes.SET_ERRORS,
    payload: errors
  };
};

export const setUnauthenticated = () => {
  return {
    type: actionTypes.SET_UNAUTHENTICATED
  };
};

export const setMarkNotificationRead = () => {
  return {
    type: actionTypes.MARK_NOTIFICATION_READ
  };
};

export const uploadImage = FormData => {
  return dispatch => {
    dispatch(loadingUser());
    axios
      .post("/users/image", FormData)
      .then(res => {
        dispatch(getUserData());
      })
      .catch(err => console.error(err));
  };
};

const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};

export const loginUser = (userData, history) => {
  return dispatch => {
    dispatch(loadingUi());
    axios
      .post("/users/login", userData)
      .then(res => {
        // console.log(res.data);
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch(clearErrors());
        history.push("/");
      })
      .catch(err => {
        console.log(err.response.data);
        dispatch(setErrors(err.response.data));
      });
  };
};

export const signupUser = (newUserData, history) => {
  return dispatch => {
    dispatch(loadingUi());
    axios
      .post("/users/login", newUserData)
      .then(res => {
        // console.log(res.data);
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch(clearErrors());
        history.push("/");
      })
      .catch(err => {
        console.log(err.response.data);
        dispatch(setErrors(err.response.data));
      });
  };
};

export const logOutUser = () => {
  return dispatch => {
    localStorage.removeItem("FBIdToken");
    delete axios.defaults.headers.common["Authorization"];
    dispatch(setUnauthenticated());
  };
};

const setAuthenticated = () => {
  return {
    type: actionTypes.SET_AUTHENTICATED
  };
};

export const editUserDetails = userDetails => {
  return dispatch => {
    dispatch(loadingUser());
    axios
      .post("/users/details", userDetails)
      .then(res => {
        dispatch(getUserData());
      })
      .catch(err => console.error(err));
  };
};

export const markNotificationRead = notificationIds => {
  return dispatch => {
    axios
      .post("/users/notifications", notificationIds)
      .then(res => {
        dispatch(setMarkNotificationRead());
      })
      .catch(err => console.error(err));
  };
};

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logOutUser());
    window.location.href = "/users/login";
  } else {
    // console.log(decodedToken);
    store.dispatch(setAuthenticated());
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}
