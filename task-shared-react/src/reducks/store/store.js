import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { connectRouter, routerMiddleware } from 'connected-react-router';

//Reducers import
import { UsersReducer } from '../users/reducers';
import {LoadingReducer} from '../loading/reducers';
import { ChatRoomReducer } from '../chatroom/reducers';
import { MessageReducer } from '../chat/reducers';
import { GroupsReducer } from '../group/reducers';
import { TasksReducer } from '../task/reducers';

export default function createStore(history){

  let middleWares = [routerMiddleware(history), thunk];
  if(process.env.NODE_ENV === 'development') {
    const logger = createLogger({
      collapsed: true,
      diff: true
    });
    middleWares.push(logger);
  }

  return reduxCreateStore(
    combineReducers({
      // key: value Reducers登録
      loading: LoadingReducer,
      router: connectRouter(history),
      users: UsersReducer,
      chatRooms: ChatRoomReducer,
      chats: MessageReducer,
      tasks: TasksReducer,
      groups: GroupsReducer,
    }),
    applyMiddleware(
      ...middleWares
    )
  );
}