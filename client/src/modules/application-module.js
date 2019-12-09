export const UPDATE_AUTHENTICATED = 'application/UPDATE_AUTHENTICATED';
export const UPDATE_REGISTERED_USERS = 'application/UPDATE_REGISTERED_USERS';
export const UPDATE_LOADED = 'application/UPDATE_LOADED';
export const RESET = 'application/RESET';

const initialState = {
  isAuthenticated: false,
  registeredUsers: [],
  loaded: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload
      };
    case UPDATE_REGISTERED_USERS:
      return {
        ...state,
        registeredUsers: action.payload
      };
    case UPDATE_LOADED:
      return {
        ...state,
        loaded: action.payload
      };
    case RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export const updateAuthenticated = isAuthenticated => ({
  type: UPDATE_AUTHENTICATED,
  payload: isAuthenticated
});

export const updateRegisteredUsers = registeredUsers => ({
  type: UPDATE_REGISTERED_USERS,
  payload: registeredUsers
});

export const updateLoaded = loaded => ({
  type: UPDATE_LOADED,
  payload: loaded
});

export const reset = () => ({
  type: RESET
});
