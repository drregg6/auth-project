import {
  GET_USERS,
  GET_USER,
  CLEAR_USER,
  ADD_USER
} from './types';
import axios from 'axios';

export const fetchUsers = () => async dispatch => {
  try {
    const res = await axios.get(`/api/users`);
    dispatch({
      type: GET_USERS,
      payload: res.data
    })
  } catch (error) {
    console.error(error);
  }
}

export const getUser = (username) => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${username}`);
    console.log(res.data.user);
    dispatch({ type: CLEAR_USER });
    dispatch({
      type: GET_USER,
      payload: res.data.user
    });
  } catch (error) {
    console.error(error);
  }
}

export const addUser = ({ username, password, repeatPassword }) => async dispatch => {
  const options = {
    headers: {
      'Content-type': 'application/json'
    }
  }
  const body = JSON.stringify({ username, password, repeatPassword })
  try {
    await axios.post(`/api/users/`, body, options);
    const res = axios.get(`/api/users`);
    dispatch({
      type: ADD_USER,
      payload: res.data
    });
  } catch (error) {
    console.error(error);
  }
}