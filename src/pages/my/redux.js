import {getUserInfoReq, getUserStatReq} from './api';
import AsyncStorage from '@react-native-community/async-storage';

// Actions
const UPDATE = 'MY_UPDATE';

// Reducer
const initState = {
  init: false,
  data: {
    userInfo: {},
    userStat: {},
  },
};

export const my = (state = initState, action) => {
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
export const myUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const myInit = (params, callback) => async dispatch => {
  const userInfo = await getUserInfoReq(params || {});
  const userStat = await getUserStatReq(params || {});
  console.log(userInfo)
  await AsyncStorage.setItem('phoneNumber', userInfo.phoneNumber)
  dispatch(
    myUpdate({
      init: true,
      data: {
        userInfo,
        userStat,
      },
    }),
  );
  callback && callback();
};
