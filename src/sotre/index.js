import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';

import {home} from '../pages/home/redux';
import {register} from '../pages/register/redux';
import {bbs} from '../pages/bbs/redux';
import {find} from '../pages/find/redux';
import {message} from '../pages/message/redux';
import {my} from '../pages/my/redux';
import {findDetail} from '../pages/find-detail/redux';
import {editInfo} from '../pages/edit-info/redux';
import {join} from '../pages/join/redux';
import {joinTab} from '../pages/join/page-components/joinTab/redux';
import {manageTab} from '../pages/join/page-components/manageTab/redux';
import {publish} from '../pages/publish/redux';
import {feedback} from '../pages/feedback/redux';
import {group} from '../pages/group/redux';
import {fixedTop} from '../pages/group/page-components/fixedTop/redux';
import {groupDiscussion} from '../pages/group/page-components/discussion/redux';
import {groupDetail} from '../pages/group-detail/redux';
import {note} from '../pages/note/redux';
import {concern} from '../pages/concern/redux';

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
    joinTab,
    manageTab,
    publish,
    feedback,
    group,
    fixedTop,
    groupDiscussion,
    groupDetail,
    note,
    concern,
    message,
  }),
  compose(applyMiddleware(thunk, logger)),
);

export default store;
