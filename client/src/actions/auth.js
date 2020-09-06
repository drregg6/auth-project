import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_USER
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    console.error(error);
  }
}

export const loginUser = (email, password) => async dispatch => {
  const options = {
    headers: {
      type: 'application/json';
    }
  }
  const body = JSON.stringify({email, password});
  
  try {
    const res = axios.post('/api/auth', body, options);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    console.error(error.message);
  }
}

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT_USER
  });
}