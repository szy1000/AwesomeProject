import {
  getAllCategoryReq,
  getHotGroupReq,
  joinGroupReq,
  unjoinGroupReq,
} from './api';
import { Alert } from 'react-native';
// Actions
const UPDATE = 'BBS_UPDATE';

// Reducer
const initState = {
  init: false,
  data: [],
};

export const bbs = (state = initState, action) => {
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
export const bbsUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const bbsInit = (params, callback) => async dispatch => {
  // const { init } = getState().home
  // console.log(init)
  const groupCategory = await getAllCategoryReq(params || {});
  const hotGroup = await getHotGroupReq({top: 5} || {});
  dispatch(
    bbsUpdate({
      init: true,
      data: {
        groupCategory,
        hotGroup,
      },
    }),
  );
  callback && callback();
};

export const joinGroup = (params, callback) => async dispatch => {
  const {type, id} = params;
  let res = null;
  if (type) {
    res = await joinGroupReq(id);
  } else {
    res = await unjoinGroupReq(id);
  }
  const {success, error} = res;
  if (success) {
    callback && callback();
  } else {
    Alert.alert('操作提示', error, [
      {
        text: '确认',
        onPress: async () => {},
      },
    ]);
  }
};
