import { ServiceContainer } from '../services';

export const LOADING = 'application/LOADING';
export const INITIAL_SIGN_IN = 'application/INITIAL_SIGN_IN';
export const UPDATE_ONLINE_USERS = 'application/UPDATE_ONLINE_USERS';

const initialState = {
  loading: false,
  initialSignIn: false,  
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
    const Services = new ServiceContainer();
    const auth = Services.auth();
    // if (auth.isAuthenticated()) {
      const ws = Services.ws();
      const data = await ws.initialize();
      const { onlineUsers } = data;
      dispatch(updateOnlineUsers(onlineUsers));
    // }
  };    
};

export const loading = () => ({
  type: LOADING
});

export const initialSignIn = (value) => ({
  type: INITIAL_SIGN_IN,
  payload: value
});



