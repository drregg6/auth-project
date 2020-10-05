import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_USER
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  currentUser: null,
  isAuthenticated: false,
  isLoading: true
}

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case USER_LOADED:
      return {
        ...state,
        currentUser: payload,
        isLoading: false,
        isAuthenticated: true
      }
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isLoading: false,
        isAuthenticated: true
      }
    case LOGOUT_USER:
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        currentUser: null,
        isAuthenticated: false,
        isLoading: false
      }
    default:
      return state;
  }
}