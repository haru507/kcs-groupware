import { createSelector } from 'reselect';

const messageSelector = (state) => state.chats;

export const getMessages = createSelector(
  [messageSelector],
  state => state.lists
);