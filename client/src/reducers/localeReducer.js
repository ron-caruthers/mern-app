import {
  GET_LOCALES,
  GET_LOCALE,
  ADD_LOCALE,
  EDIT_LOCALE,
  DELETE_LOCALE,
  LOCALES_LOADING
} from "../actions/types";

const initialState = {
  locales: [],
  location: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LOCALES:
      return {
        ...state,
        locales: action.payload,
        loading: false
      };
    case GET_LOCALE:
      return {
        ...state,
        location: action.payload,
        loading: false
      };
    case DELETE_LOCALE:
      return {
        ...state,
        locales: state.locales.filter(locale => locale._id !== action.payload)
      };
    case ADD_LOCALE:
      return {
        ...state,
        locales: [action.payload, ...state.locales]
      };
    case EDIT_LOCALE:
      return {
        ...state,
        locales: [action.payload, ...state.locales]
      };
    case LOCALES_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
