export const TEST_CONST = 'timeline/TEST_CONST';

const initialState = {
  username: 'intialUserName'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TEST_CONST:
      return {
        ...state,
        username: 'newNameState'
      };

    default:
      return state;
  }
};

export const testAction = () => {
  return dispatch => {
    dispatch({ type: 'TEST' });
  };
};
