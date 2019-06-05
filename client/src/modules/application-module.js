export const UPDATE_AUTHENTICATED = 'application/UPDATE_AUTHENTICATED';
export const UPDATE_ONLINE_USERS = 'application/UPDATE_ONLINE_USERS';
export const UPDATE_LOADED = 'application/UPDATE_LOADED';

const initialState = {
  isAuthenticated: false,
  onlineUsers: [],
  loaded: false  
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload
      };
    case UPDATE_ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.payload
      };
    case UPDATE_LOADED:
      return {
        ...state,
        loaded: action.payload
      };
    default: 
      return state;
  }
};

export const updateAuthenticated = (isAuthenticated) => ({
  type: UPDATE_AUTHENTICATED,
  payload: isAuthenticated
});

export const updateOnlineUsers = (onlineUsers) => ({
  type: UPDATE_ONLINE_USERS,
  payload: onlineUsers
});

export const updateLoaded = (loaded) => ({
  type: UPDATE_LOADED,
  payload: loaded
});


