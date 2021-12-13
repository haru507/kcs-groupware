export const GET_CHATROOM = "GET_CHATROOM";
export const getChatroomAction = (lists) => {
  return {
    type: 'GET_CHATROOM',
    payload: lists
  }
};

