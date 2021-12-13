import * as Actions from './actions';
import { initialState } from '../store/initialState';

export const GroupsReducer = (state = initialState.groups, action) => {
  switch(action.type) {
    case Actions.GET_GROUP:
      return {
        ...state,
        lists: action.payload
      };

    case Actions.ADD_GROUP:
      return{
        ...state,
        lists: [...state.lists, action.payload]
      }

    default:
      return state
  }
}