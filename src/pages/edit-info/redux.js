import {
  getUserInfoReq,
  querySexDictReq,
  changeUserInfoReq,
  uploadImageFileReq,
} from './api';
import {Alert} from 'react-native';
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
  const sexDict = await querySexDictReq({});
  const _sexDict = [];
  for (let i = 0; i < sexDict.length; i++) {
    let temp = {};
    temp.id = sexDict[i].id;
    temp.label = sexDict[i].name;
    temp.value = sexDict[i].id;
    _sexDict.push(temp);
  }
  console.log('userInfo', userInfo);
  dispatch(
    editInfoUpdate({
      init: true,
      data: {
        ...userInfo,
        _sexDict,
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
  if (data.name) {
    data.avatar = data.id;
  }
  const res = await changeUserInfoReq(data || {});
  const {success} = res;
  if (success) {
    Alert.alert('操作提示', '修改成功', [
      {
        text: '确认',
        onPress: async () => callback && callback(),
      },
    ]);
  }
};
