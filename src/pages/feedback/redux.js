import {getFeedBackReq, uploadImageFileReq} from './api';
// Actions
const UPDATE = 'FEEDBACK_UPDATE';

// Reducer
const initState = {
  init: false,
  data: {
    imageFileArr: [],
  },
};

export const feedback = (state = initState, action) => {
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
export const feedbackUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const uploadFileFn = (params, callback) => async (
  dispatch,
  getState,
) => {
  const {data} = getState().feedback;
  const imageFile = await uploadImageFileReq(params || {});
  data.imageFileArr.push(imageFile);
  dispatch(
    feedbackUpdate({
      data: {
        ...data,
        imageFileArr: [...data.imageFileArr],
      },
    }),
  );
  callback && callback();
};

export const submitFeedback = (params, callback) => async (
  dispatch,
  getState,
) => {
  const {data} = getState().feedback;
  const files = [];
  console.log('data.imageFileArr', data);
  data.imageFileArr.map(v => {
    files.push(v.id);
  });
  params.files = files;
  console.log('params', params);
  const {success} = await getFeedBackReq(params || {});
  if (success) {
    alert('感谢您的您的反馈信息，我们会及时处理！');
  }
  dispatch(
    feedbackUpdate({
      init: false,
      data: {
        imageFileArr: [],
      },
    }),
  );
  callback && callback();
};
