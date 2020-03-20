import * as actionTypes from "../actionTypes";
import axios from "../../axios-order";
import { loadingUi, setErrors, clearErrors } from "./userAction";

export const loadingData = () => {
  return {
    type: actionTypes.LOADING_DATA
  };
};

export const setScreams = data => {
  return {
    type: actionTypes.SET_SCREAMS,
    payload: data
  };
};

export const setScream = data => {
  return {
    type: actionTypes.SET_SCREAM,
    payload: data
  };
};

export const setLikeScream = data => {
  return {
    type: actionTypes.LIKE_SCREAM,
    payload: data
  };
};

export const setUnlikeScream = data => {
  return {
    type: actionTypes.UNLIKE_SCREAM,
    payload: data
  };
};

export const setDeleteScream = screamId => {
  return {
    type: actionTypes.DELETE_SCREAM,
    payload: screamId
  };
};

export const setPostScream = data => {
  return {
    type: actionTypes.POST_SCREAM,
    payload: data
  };
};

export const stopLoadingUi = () => {
  return {
    type: actionTypes.STOP_LOADING_UI
  };
};

export const getScreams = () => {
  return dispatch => {
    dispatch(loadingData());
    axios
      .get("/screams")
      .then(res => {
        // console.log(res.data);
        dispatch(setScreams(res.data));
      })
      .catch(err => {
        console.error(err);
        dispatch(setScreams([]));
      });
  };
};

export const getScream = screamId => {
  return dispatch => {
    dispatch(loadingUi());
    axios
      .get(`/scream/${screamId}`)
      .then(res => {
        dispatch(setScream(res.data));
        dispatch(stopLoadingUi());
      })
      .catch(err => console.error(err));
  };
};

export const likeScream = screamId => {
  return dispatch => {
    axios
      .get(`/scream/${screamId}/like`)
      .then(res => {
        dispatch(setLikeScream(res.data));
      })
      .catch(err => console.error(err));
  };
};

export const unlikeScream = screamId => {
  return dispatch => {
    axios
      .get(`/scream/${screamId}/unlike`)
      .then(res => {
        dispatch(setUnlikeScream(res.data));
      })
      .catch(err => console.error(err));
  };
};

export const deleteScream = screamId => {
  return dispatch => {
    axios
      .delete(`/scream/${screamId}`)
      .then(() => {
        dispatch(setDeleteScream(screamId));
      })
      .catch(err => console.error(err));
  };
};

export const postScream = newScream => {
  return dispatch => {
    dispatch(loadingUi());
    axios
      .post("/scream", newScream)
      .then(res => {
        dispatch(setPostScream(res.data));
        dispatch(clearErrors());
      })
      .catch(err => {
        // console.log(err.response.data);
        dispatch(setErrors(err.response.data));
      });
  };
};

export const cleanErrors = () => {
  return dispatch => {
    dispatch(clearErrors());
  };
};

export const setSubmitComment = data => {
  return {
    type: actionTypes.SUBMIT_COMMENT,
    payload: data
  };
};

export const submitComment = (screamId, commentData) => {
  return dispatch => {
    axios
      .post(`/scream/${screamId}/comment`, commentData)
      .then(res => {
        dispatch(setSubmitComment(res.data));
        dispatch(cleanErrors());
      })
      .catch(err => {
        dispatch(setErrors(err.response.data));
      });
  };
};
