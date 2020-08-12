import {getUserInfoReq, submitForumReq, uploadImageFileReq} from './api';
// Actions
const UPDATE = 'GROUP_EDIT_UPDATE';

// Reducer
const initState = {
  init: false,
  data: {
    imageFileArr: [],
  },
};

export const groupEdit = (state = initState, action) => {
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
export const groupEditUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const groupEditInit = (params, callback) => async (
  dispatch,
  getState,
) => {
  const {data} = await getState().groupEdit;
  const files = [];
  console.log('dddddddddd', data);
  data.imageFileArr.map(v => {
    files.push(v.id);
  });
  params.files = files;
  params.groupId = new Date().getMilliseconds();
  if (!files.length) {
    alert('请至少上传一张图片');
    return;
  }
  console.log(params);
  const res = await submitForumReq(params || {});
  if (res.success) {
    callback && callback();
  } else {
    alert(res.error);
  }
  console.log('rrrrrrrrrr', res);
};

export const uploadFileFn = (params, callback) => async (
  dispatch,
  getState,
) => {
  const {data} = getState().groupEdit;
  const imageFile = await uploadImageFileReq(params || {});
  data.imageFileArr.push(imageFile);
  console.log(imageFile);

  dispatch(
    groupEditUpdate({
      data: {
        ...data,
        imageFileArr: [...data.imageFileArr],
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
    groupEditUpdate({
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
