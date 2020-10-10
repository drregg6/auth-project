import {
  GET_USERS,
  GET_USER,
  CLEAR_USER,
  ADD_USER,
  UPDATE_USER,
  UPDATE_USER_PASSWORD,
  DELETE_USER
} from '../actions/types';

const initialState = {
  users: [],
  user: null,
  isLoading: true
}

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case GET_USERS:
      return {
        ...state,
        users: [...payload],
        isLoading: false
      };
    case GET_USER:
      return {
        ...state,
        isLoading: false,
        user: payload
      }
    case ADD_USER:
      return {
        ...state,
        isLoading: false,
        users: [...state.users, payload]
      }
    case UPDATE_USER:
      return {
        ...state,
        isLoading: false,
        user: payload
      }
    case UPDATE_USER_PASSWORD:
    case CLEAR_USER:
      return {
        ...state,
        isLoading: false,
        user: null
      }
    case DELETE_USER:
      return {
        ...state,
        isLoading: false,
        user: null,
        users: [...payload]
      }
    default:
      return state;
  }
}