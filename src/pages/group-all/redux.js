import {getAllCategoryReq, getGroupListReq} from './api';
// Actions
const UPDATE = 'GROUP_ALL _UPDATE';

// Reducer
const initState = {
  init: false,
  data: {
    country: [],
  },
};

export const groupAll = (state = initState, action) => {
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
export const groupAllUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const groupAllInit = (params, callback) => async (
  dispatch,
  getState,
) => {
  const allCategory = await getAllCategoryReq({});
  const groupDetail = await getGroupListReq({
    categoryId: allCategory[0].id,
    pageNumber: 1,
    pageSize: 50,
  });
  dispatch(
    groupAllUpdate({
      init: true,
      data: {
        allCategory,
        groupDetail,
      },
    }),
  );
  callback && callback();
};

export const searchGroupReq = (params, callback) => async (
  dispatch,
  getState,
) => {
  const {data} = getState().groupAll;
  const groupDetail = await getGroupListReq({
    categoryId: params.id,
    pageNumber: 1,
    pageSize: 50,
  });
  dispatch(
    groupAllUpdate({
      init: true,
      data: {
        ...data,
        groupDetail,
      },
    }),
  );
  callback && callback();
};
