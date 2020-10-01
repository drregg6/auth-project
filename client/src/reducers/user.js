import {
  GET_USERS,
  ADD_USER
} from '../actions/types';

const initialState = {
  users: [],
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
    case ADD_USER:
      return {
        ...state,
        isLoading: false,
        users: [...state.users, payload]
      }
    default:
      return state;
  }
}