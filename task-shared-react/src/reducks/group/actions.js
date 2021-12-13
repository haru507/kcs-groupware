export const GET_GROUP = "GET_GROUP";
export const getGroupAction = (lists) => {
  return {
    type: 'GET_GROUP',
    payload: lists
  }
};

export const ADD_GROUP = "ADD_GROUP";
export const addGroupAction = (lists) => {
  return {
    type: 'ADD_GROUP',
    payload: lists
  }
}