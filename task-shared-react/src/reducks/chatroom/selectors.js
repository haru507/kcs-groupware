import { createSelector } from 'reselect';

const chatroomSelector = (state) => state.chatrooms;

export const getChatRoom = createSelector(
  [chatroomSelector],
  state => state.lists
);