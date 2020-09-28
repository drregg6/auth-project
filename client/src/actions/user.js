import {
  GET_USERS
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