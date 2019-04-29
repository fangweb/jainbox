import { ServiceContainer } from '../services';
export const GET_SENT = 'sent/GET_SENT';

const initialState = {
  sentMessages: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SENT:
      return {
        sentMessages: action.payload
      };
    default:
      return state;
  }
};

export const getSent = () => {
  return async (dispatch) => {
    const api = new ServiceContainer().api();
    let sentMessages = await api.getSent();
    dispatch({ type: GET_SENT, payload: sentMessages });
  }
};



