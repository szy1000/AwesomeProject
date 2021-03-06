import {createNoteReq, uploadImageFileReq, getPosReq} from './api';
import {Alert} from 'react-native';
// Actions
const UPDATE = 'NOTE_UPDATE';

// Reducer
const initState = {
  init: false,
  data: {
    imageFileArr: [],
  },
};

export const note = (state = initState, action) => {
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
export const noteUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const submitNote = (params, callback) => async (dispatch, getState) => {
  const {data} = getState().note;
  const files = [];
  console.log('dddddd', data);
  data.imageFileArr.map(v => {
    files.push(v.id);
  });
  params.files = files;
  console.log('flies', files);
  if (!files.length) {
    Alert.alert('操作提示', '当前已是最新版本', [
      {
        text: '确认',
        onPress: async () => {},
      },
    ]);
    return;
  }
  const {success} = await createNoteReq(params || {});
  if (success) {
    // alert('笔记发布成功！等待后台审核');
  }
  dispatch(
    noteUpdate({
      data: {
        init: false,
        data: {
          imageFileArr: [],
        },
      },
    }),
  );
  callback && callback();
};

export const uploadFileFn = (params, callback) => async (
  dispatch,
  getState,
) => {
  const {data} = getState().note;
  let imageFile = '';
  if (params.type !== 'upVideo') {
    imageFile = await uploadImageFileReq(params || {});
  } else {
    imageFile = params.item;
  }
  data.imageFileArr.push(imageFile)
  console.log('imageFile', imageFile);
  console.log('imageFileArr======>', data);

  callback && callback();
  dispatch(
    noteUpdate({
      data: {
        ...data,
        imageFileArr: [...data.imageFileArr],
      },
    }),
  );
};

export const posInit = (params, callback) => async (dispatch, getState) => {
  const {data} = getState().note;
  const pos = await getPosReq(params);
  const {status, result} = pos;

  if (status === 0) {
    dispatch(
      noteUpdate({
        data: {
          ...data,
          currPos: result,
          currCountry: result.address_component.nation,
        },
      }),
    );
    callback && callback();
  }
};
