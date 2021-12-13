import { createSelector } from 'reselect';

const userSelector = (state) => state.users;

export const getSignedIn = createSelector(
  [userSelector],
  state => state.isSignedIn
);

export const getUserId = createSelector(
  [userSelector],
  state => state.user_id
);

export const getUserName = createSelector(
  [userSelector],
  state => state.name
);

export const getUser = createSelector(
  [userSelector],
  state => state
)