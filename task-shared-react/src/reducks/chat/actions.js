export const GET_MESSAGE = "GET_MESSAGE";
export const getMessageAction = (lists) => {
  return {
    type: 'GET_MESSAGE',
    payload: lists
  }
};

export const ADD_MESSAGE = "ADD_MESSAGE";
export const addMessageAction = (lists) => {
  return {
    type: 'ADD_MESSAGE',
    payload: lists
  }
};

export const DELETE_MESSAGE = "DELETE_MESSAGE";
export const deleteMessageAction = (id) => {
  return {
    type: 'DELETE_MESSAGE',
    payload: id
  }
};

