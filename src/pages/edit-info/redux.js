import {getUserInfoReq, changeUserInfoReq, uploadImageFileReq} from './api';
// Actions
const UPDATE = 'EDIT_INFO_UPDATE';

// Reducer
const initState = {
  init: false,
  data: {
    personalSignature: '书写签名有助你认识更多好友',
  },
};

export const editInfo = (state = initState, action) => {
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
export const editInfoUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const editInfoInit = (params, callback) => async dispatch => {
  const userInfo = await getUserInfoReq(params || {});
  dispatch(
    editInfoUpdate({
      init: true,
      data: {
        ...userInfo,
      },
    }),
  );
  callback && callback();
};

export const uploadFileFn = (params, callback) => async (
  dispatch,
  getState,
) => {
  const {data} = getState().editInfo;
  const imageFile = await uploadImageFileReq(params || {});
  console.log(imageFile);
  dispatch(
    editInfoUpdate({
      data: {
        ...data,
        ...imageFile,
      },
    }),
  );
  callback && callback();
};

export const saveTempInfo = (params, callback) => async (
  dispatch,
  getState,
) => {
  const {data} = getState().editInfo;
  dispatch(
    editInfoUpdate({
      init: true,
      data: {
        ...data,
        ...params,
      },
    }),
  );
  callback && callback();
};

export const saveInfo = (params, callback) => async (dispatch, getState) => {
  const {data} = getState().editInfo;
  // const {id, userName, phoneNumber, personalSignature, address} = data;
  data.avatar = data.id;
  console.log('save', data);
  const res = await changeUserInfoReq(data || {});
  console.log(res);
  callback && callback();
};
