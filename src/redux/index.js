import { createStore, combineReducers, applyMiddleware } from 'redux';
import todosReducer from './reducers/todosReducer';
import editLocationReducer from './reducers/editLocationReducer';

const store = createStore(
  combineReducers({
    todos: todosReducer,
    editLocation: editLocationReducer
  }));

  export default store;
