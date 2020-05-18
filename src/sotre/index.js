import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';

import {home} from '../pages/home/redux';
const store = createStore(
  combineReducers({
    home,
  }),
  compose(applyMiddleware(thunk)),
);

export default store;
