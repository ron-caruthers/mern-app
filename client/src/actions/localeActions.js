import axios from "axios";
import {
  GET_LOCALES,
  GET_LOCALE,
  ADD_LOCALE,
  EDIT_LOCALE,
  DELETE_LOCALE,
  LOCALES_LOADING
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getLocales = () => dispatch => {
  dispatch(setLocalesLoading());
  axios
    .get("/api/locales")
    .then(res =>
      dispatch({
        type: GET_LOCALES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getLocale = id => (dispatch, getState) => {
  dispatch(setLocalesLoading());
  return axios
    .get(`/api/locales/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_LOCALE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addLocale = locale => (dispatch, getState) => {
  axios
    .post("/api/locales", locale, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_LOCALE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response, err.response))
    );
};

export const editLocale = (id, key, value) => (dispatch, getState) => {
  dispatch(setLocalesLoading());
  axios
    .post(`/api/locales/${id}&${key}=${value}`, ({id, key, value}), tokenConfig(getState))
    .then(res =>
      dispatch({
        type: EDIT_LOCALE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteLocale = id => (dispatch, getState) => {
  axios
    .delete(`/api/locales/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_LOCALE,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setLocalesLoading = () => {
  return {
    type: LOCALES_LOADING
  };
};
