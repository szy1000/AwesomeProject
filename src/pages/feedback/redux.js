import {getFeedbackReq} from './api';
// Actions
const UPDATE = 'FEEDBACK_UPDATE';

// Reducer
const initState = {
  init: false,
  data: [],
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

export const submitFeedback = (params, callback) => async dispatch => {
  // const { init } = getState().home
  // console.log(init)
  const feedback = await getFeedbackReq(params || {});
  dispatch(
    feedbackUpdate({
      init: true,
      data: {
        feedback,
      },
    }),
  );
  callback && callback();
};
