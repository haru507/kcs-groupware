import { hideLoadingAction, showLoadingAction} from '../loading/actions';
import {getMessageAction, addMessageAction, deleteMessageAction} from './actions';

export const getMessage = (data) => {
  return async (dispatch) => {
    dispatch(addMessageAction({data}));
  }
}

export const initMessage = (chats) => {
  return async (dispatch) => {
    dispatch(getMessageAction(chats));
  }
}

export const deleteMessage = (id) => {
  return async (dispatch) => {
    dispatch(deleteMessageAction(id))
  }
}