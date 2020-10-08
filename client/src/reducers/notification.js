import {
  NEW_MESSAGE,
  DELETE_MESSAGE
} from '../actions/types';

const initialState = {
  msg: null
}

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case NEW_MESSAGE:
      return {
        msg: payload
      }
    case DELETE_MESSAGE:
      return {
        msg: null
      }
    default:
      return state
  }
}