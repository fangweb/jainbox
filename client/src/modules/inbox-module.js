import { ServiceContainer } from '../services';
import { wait } from '../helpers';

export const LOADING = 'inbox/LOADING';
export const RESET = 'inbox/RESET';
export const GET_INBOX = 'inbox/GET_INBOX';
export const SELECT_ALL = 'inbox/SELECT_ALL';
export const SELECT_ALL_UNREAD ='inbox/SELECT_ALL_UNREAD';
export const SELECT_NONE = 'inbox/SELECT_NONE';
export const SELECT_SINGLE = 'inbox/SELECT_SINGLE';
export const TRASH_SELECTED = 'inbox/TRASH_SELECTED';

const initialState = {
  inboxMessages: [],
  loading: false,
  page: 1,
  totalResults: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case RESET:
      return {
        ...initialState
      };
    case GET_INBOX:
      return {
        ...action.payload,
        loading: false
      };
    case SELECT_ALL: 
      if (state.inboxMessages.length === 0) {
        return state;
      }
      const selectAll = state.inboxMessages.map(message => Object.assign(message, { selected: true }));
      return {
        inboxMessages: selectAll,
        loading: state.loading,
        page: state.page,
        totalResults: state.totalResults
      };
    case SELECT_NONE:
      if (state.inboxMessages.length === 0) {
        return state;
      }    
      const selectNone = state.inboxMessages.map(message => Object.assign(message, { selected: false }));
      return {
        inboxMessages: selectNone,
        loading: state.loading,
        page: state.page,
        totalResults: state.totalResults
      };      
    case SELECT_ALL_UNREAD:
      if (state.inboxMessages.length === 0) {
        return state;
      }
      const selectUnread = state.inboxMessages.map(message => {
        if (message.viewed === false) {
          message.selected = true;
        } else {
          message.selected = false;
        }
        return Object.assign({}, message);
      });
      return {
        inboxMessages: selectUnread,
        loading: state.loading,
        page: state.page,
        totalResults: state.totalResults
      };
    case SELECT_SINGLE:
      if (state.inboxMessages.length === 0) {
        return state;
      };
      const selectSingle = state.inboxMessages.map(message => {
        if (message.panel_id === action.payload.panelId) {
          message.selected = action.payload.isSelected;
        }
        return Object.assign({}, message);
      });
      return {
        inboxMessages: selectSingle,
        loading: state.loading,
        page: state.page,
        totalResults: state.totalResults
      };
    default:
      return state;
  }
};

export const getInbox = ({ page }) => {
  return async (dispatch) => {
    const api = new ServiceContainer().api();
    dispatch({ type: LOADING });
    const apiResult = await api.getInbox({ page });
    const inboxMessages = apiResult.messages.map( message => Object.assign(message, { selected: false }));
    await wait(300);
    dispatch({ 
      type: GET_INBOX, 
      payload: { 
        inboxMessages, 
        page: apiResult.page, 
        totalResults: apiResult.totalResults 
      }
    });
  }
};

export const selectAll = () => {
  return {
    type: SELECT_ALL
  };
};

export const selectAllUnread = () => {
  return {
    type: SELECT_ALL_UNREAD
  };
};

export const selectNone = () => {
  return {
    type: SELECT_NONE
  };
}; 

export const selectSingle = (panelId, isSelected) => {
  return {
    type: SELECT_SINGLE,
    payload: {
      panelId,
      isSelected
    }
  };
};

export const trashSelected = () => {
  return {
    type: TRASH_SELECTED
  };
};

export const reset = () => ({
  type: RESET
});




