import * as Actions from './actions';
import { initialState } from '../store/initialState';

export const MessageReducer = (state = initialState.chats, action) => {
  switch(action.type) {
    case Actions.GET_MESSAGE:
      return {
        ...state,
        lists: action.payload
      };
    case Actions.ADD_MESSAGE:
      return {
        lists: [...state.lists, action.payload]
      };
    case Actions.DELETE_MESSAGE:
      return {
        lists: state.lists.filter( (list) => list.id !== action.payload),
      };
    default:
      return state
  }
}