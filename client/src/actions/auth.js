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
    console.log('Am I trying here?')
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
    dispatch(loadUser());
  } catch (error) {
    console.error(error.response.data);
  }
}

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT_USER
  });
}