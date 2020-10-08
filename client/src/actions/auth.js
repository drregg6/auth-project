import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT_USER
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

import { setAlert } from './notification';

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
    console.error(error.response.data);
  }
}



export const loginUser = ({username, password}) => async dispatch => {
  const options = {
    headers: {
      'Content-type': 'application/json'
    }
  }
  const body = JSON.stringify({username, password});
  try {
    const res = await axios.post('/api/auth', body, options);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Successfully logged in. Welcome!'));
    dispatch(loadUser());
  } catch (error) {
    dispatch(setAlert(error.response.data.msg));
    console.error(error.response.data);
  }
}

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT_USER
  });
  dispatch(setAlert('Successfully logged out. See ya soon!'));
}