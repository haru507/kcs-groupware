import * as Actions from './actions';
import { initialState } from '../store/initialState';

export const ChatRoomReducer = (state = initialState.chatrooms, action) => {
  switch(action.type) {
    case Actions.GET_CHATROOM:
      return {
        ...state,
        lists: action.payload
      };

    default:
      return state
  }
}