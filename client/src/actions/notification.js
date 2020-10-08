import {
  NEW_MESSAGE,
  DELETE_MESSAGE
} from './types';

export const setAlert = (msg) => dispatch => {
  dispatch({
    type: NEW_MESSAGE,
    payload: msg
  });

  setTimeout(() => dispatch({ type: DELETE_MESSAGE }), 5000);
}