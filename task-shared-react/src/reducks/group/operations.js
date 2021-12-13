import axios from 'axios';
import { hideLoadingAction, showLoadingAction} from '../loading/actions';
import {getGroupAction} from './actions';

export const getGroup = (id) => {
  return async (dispatch) => {
    dispatch(showLoadingAction('downloading...'));
    const getGroupUrl = `http://localhost/api/group/read/${id}`;
    axios.get(getGroupUrl, {headers:{"Content-Type": "application/json"}})
      .then(response => {
        console.log(response.data[0][1])
        const userLists = response.data[0][1]
        if(response.data.length === 0) {
          return;
        }
        const groups = {
          group_id: response.data[0][0][0].group_id,
          name: response.data[0][0][0].name,
        }
        console.log(groups)
        dispatch(getGroupAction([{groups, userLists}]));
        dispatch(hideLoadingAction());
      })
      .catch( () => {
        throw new Error('エラーが発生しました。');
      })
  }
}

export const createGroup = (list, id) => {
  return async (dispatch) => {
    dispatch(showLoadingAction('downloading...'));
    const createGroupUrl = `http://localhost/api/group/create/${id}`;
    axios.post(createGroupUrl, list, {headers:{"Content-Type": "application/json"}})
      .then(response => {
        console.log(response)
        if(response.data.length === 0) {
          return;
        }
        const groups = response.data;
        dispatch(getGroupAction(list));
        dispatch(hideLoadingAction());
      })
      .catch( () => {
        throw new Error('エラーが発生しました。');
      })
  }
}