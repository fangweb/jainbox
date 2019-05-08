import { ServiceContainer } from '../services';

export const UPDATE_ONLINE_USERS = 'ws/UPDATE_ONLINE_USERS';

const initialState = {
  onlineUsers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ONLINE_USERS:
      return {
        onlineUsers: action.payload
      };
    default: 
      return state;
  }
};

export const updateOnlineUsers = (onlineUsers) => {
  return {
    type: UPDATE_ONLINE_USERS,
    payload: onlineUsers
  };
};

export const initialize = () => {
  return async (dispatch) => {
    const ws = new ServiceContainer().ws();
    const data = await ws.initialize();
    const { onlineUsers } = data;
    dispatch(updateOnlineUsers(onlineUsers));
  };    
};
