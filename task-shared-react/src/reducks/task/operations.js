import axios from 'axios';
import {push} from 'connected-react-router';
import { hideLoadingAction, showLoadingAction} from '../loading/actions';
import {getChatroomAction} from './actions';

export const getChatRooms = (id) => {
  return async (dispatch) => {
    dispatch(showLoadingAction('downloading...'));
    const getChatUrl = `http://localhost/api/chatroom/${id}`;
    axios.get(getChatUrl, {headers:{"Content-Type": "application/json"}})
      .then(response => {
        console.log(response)
        if(response.data.length === 0) {
          return;
        }
        const chats = response.data;
        dispatch(getChatroomAction(chats));
        dispatch(hideLoadingAction());
      })
      .catch( () => {
        throw new Error('エラーが発生しました。');
      })
  }
}