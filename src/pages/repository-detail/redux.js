import {queryDetailReq, queryInfoItemReq, queryItemReq} from './api';
// Actions
const UPDATE = 'REPOSITORY_DETAIL_UPDATE';

// Reducer
const initState = {
  init: false,
  data: {},
};

export const repositoryDetail = (state = initState, action) => {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

// Action Creators
export const repositoryDetailUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const repositoryDetailInit = (params, callback) => async dispatch => {
  // const { init } = getState().home
  const detail = await queryDetailReq(params.id);
  const _reqParams = {
    resource: 'university',
    resourceId: params.id,
  };

  const infoItem = await queryInfoItemReq(_reqParams);
  console.log('infoItem', infoItem);
  // if (infoItem.length > 0) {
  //   _reqParams.itemId = infoItem[0];
  //   itemContent = await queryItemReq(_reqParams);
  // }

  console.log('infoItem', infoItem);

  dispatch(
    repositoryDetailUpdate({
      init: true,
      data: {
        detail,
        infoItem,
      },
    }),
  );
  callback && callback();
};

export const queryItem = (params, callback) => async (dispatch, getState) => {
  const {data} = getState().repositoryDetail;
  const itemContent = await queryInfoItemReq(params);
  dispatch(
    repositoryDetailUpdate({
      init: true,
      data: {
        ...data,
        itemContent,
      },
    }),
  );
  callback && callback();
};
