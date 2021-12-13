import { createSelector } from 'reselect';

const groupListSelector = (state) => state.groups;

export const getGroupList = createSelector(
  [groupListSelector],
  state => state.lists
);