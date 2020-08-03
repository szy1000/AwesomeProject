import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';

import {home} from '../pages/home/redux';
import {search} from '../pages/serach/redux';
import {register} from '../pages/register/redux';
import {bbs} from '../pages/bbs/redux';
import {find} from '../pages/find/redux';
import {message} from '../pages/message/redux';
import {my} from '../pages/my/redux';
import {findDetail} from '../pages/find-detail/redux';
import {editInfo} from '../pages/edit-info/redux';
import {summer} from '../pages/summer/redux';
import {summerDetail} from '../pages/summer-detail/redux';
import {join} from '../pages/join/redux';
import {joinTab} from '../pages/join/page-components/joinTab/redux';
import {manageTab} from '../pages/join/page-components/manageTab/redux';
import {publish} from '../pages/publish/redux';
import {feedback} from '../pages/feedback/redux';
import {group} from '../pages/group/redux';
import {groupEdit} from '../pages/group-edit/redux';
import {fixedTop} from '../pages/group/page-components/fixedTop/redux';
import {groupDiscussion} from '../pages/group/page-components/discussion/redux';
import {groupDetail} from '../pages/group-detail/redux';
import {groupAll} from '../pages/group-all/redux';
import {note} from '../pages/note/redux';
import {concern} from '../pages/concern/redux';
import {repository} from '../pages/repository/redux';
import {repositoryDetail} from '../pages/repository-detail/redux';
import {caseDetail} from '../pages/case-detail/redux';
import {library} from '../pages/library/redux';
import {libraryDetail} from '../pages/library-detail/redux';
import {background} from '../pages/background/redux';
import {backgroundDetail} from '../pages/background-detail/redux';
import {cases} from '../pages/case/redux';
import {caseList} from '../pages/case-list/redux';
import {collect} from '../pages/collect/redux';

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
    search,
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
    groupAll,
    fixedTop,
    groupDiscussion,
    groupDetail,
    note,
    concern,
    groupEdit,
    message,
    repository,
    repositoryDetail,
    caseDetail,
    library,
    libraryDetail,
    summer,
    summerDetail,
    background,
    backgroundDetail,
    cases,
    caseList,
    collect,
  }),
  compose(applyMiddleware(thunk, logger)),
);

export default store;
