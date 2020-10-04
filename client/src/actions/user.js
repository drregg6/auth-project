import {
  GET_USERS,
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