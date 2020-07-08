import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';

import {home} from '../pages/home/redux';
import {register} from '../pages/register/redux';
import {bbs} from '../pages/bbs/redux';
import {find} from '../pages/find/redux';
import {my} from '../pages/my/redux';
import {findDetail} from '../pages/find-detail/redux';
import {editInfo} from '../pages/edit-info/redux';
import {join} from '../pages/join/redux';

const logger = store => next => action => {
  if (typeof action === 'function') {
    // console.warn('dispatching a function');
  } else {
    // console.warn('dispatching', action);
  }

  const result = next(action);
  // console.warn('nextState', store.getState());
  return result;
};

const store = createStore(
  combineReducers({
    home,
    register,
    bbs,
    find,
    my,
    findDetail,
    editInfo,
    join,
  }),
  compose(applyMiddleware(thunk, logger)),
);

export default store;
