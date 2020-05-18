import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';

import {home} from '../pages/home/redux';

const logger = store => next => action => {
  if (typeof action === 'function') {
    console.warn('dispatching a function');
  } else {
    console.warn('dispatching', action);
  }

  const result = next(action);
  console.warn('nextState', store.getState());
  return result;
};

const store = createStore(
  combineReducers({
    home,
  }),
  compose(applyMiddleware(thunk, logger)),
);

export default store;
