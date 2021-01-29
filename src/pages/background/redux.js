import {
  getBackgroundReq,
  getSubjectReq,
  getGradeReq,
  getCategoryReq,
} from './api';
// Actions
const UPDATE = 'BACKGROUND_UPDATE';

// Reducer
const initState = {
  init: false,
  data: {
    listData: {},
  },
};

export const background = (state = initState, action) => {
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
export const backgroundUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const backgroundInit = (params, callback) => async (
  dispatch,
  getState,
) => {
  console.log('background params', params);
  const {listData} = getState().background.data;
  const _subject = await getSubjectReq({});
  const _category = await getCategoryReq({});
  const _grade = await getGradeReq({});
  const res = await getBackgroundReq(params || {});
  console.log('background res', res);

  let _res = {...res};

  if (!params.init && listData.data) {
    let temp = listData.data.concat(res.data);
    res.data = [...temp];
    _res = res;
  }
  console.log('background _res', _res);

  _grade.unshift({name: '全部', id: ''})
  _category.unshift({name: '全部', id: ''})

  dispatch(
    backgroundUpdate({
      init: true,
      data: {
        _subject,
        _category,
        _grade,
        listData: _res,
      },
    }),
  );
  callback && callback();
};
