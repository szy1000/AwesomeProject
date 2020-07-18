import {createNoteReq, uploadImageFileReq} from './api';
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
  data.imageFileArr.map(v => {
    files.push(v.id);
  });
  console.log('submit', data);
  params.files = files;
  console.log('params', params);

  const {success} = await createNoteReq(params || {});
  if (success) {
    alert('笔记发布成功！');
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
  console.log('uploadImg', params);
  const imageFile = await uploadImageFileReq(params || {});

  dispatch(
    noteUpdate({
      data: {
        ...data,
        imageFileArr: [...data.imageFileArr.push(imageFile)],
      },
    }),
  );
  callback && callback();
};
