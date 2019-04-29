import { ServiceContainer } from '../services';

export const GET_INBOX = 'inbox/GET_INBOX';
export const SELECT_ALL = 'inbox/SELECT_ALL';
export const SELECT_ALL_UNREAD ='inbox/SELECT_ALL_UNREAD';
export const SELECT_NONE = 'inbox/SELECT_NONE';
export const SELECT_SINGLE = 'inbox/SELECT_SINGLE';
export const TRASH_SELECTED = 'inbox/TRASH_SELECTED';

const initialState = {
  inboxMessages: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INBOX:
      return {
        inboxMessages: action.payload
      };
    case SELECT_ALL: 
      if (state.inboxMessages.length === 0) {
        return;
      }
      const selectAll = state.inboxMessages.map(message => Object.assign(message, { selected: true }));
      return {
        inboxMessages: selectAll
      };
    case SELECT_NONE:
      if (state.inboxMessages.length === 0) {
        return;
      }    
      const selectNone = state.inboxMessages.map(message => Object.assign(message, { selected: false }));
      return {
        inboxMessages: selectNone
      };      
    case SELECT_ALL_UNREAD:
      if (state.inboxMessages.length === 0) {
        return;
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
        inboxMessages: selectUnread
      };
    case SELECT_SINGLE:
      if (state.inboxMessages.length === 0) {
        return;
      };
      const selectSingle = state.inboxMessages.map(message => {
        if (message.panel_id === action.payload.panelId) {
          message.selected = action.payload.isSelected;
        }
        return Object.assign({}, message);
      });
      return {
        inboxMessages: selectSingle
      };
    default:
      return state;
  }
};

export const getInbox = () => {
  return async (dispatch) => {
    const api = new ServiceContainer().api();
    let inboxMessages = await api.getInbox();
    inboxMessages = inboxMessages.map( message => Object.assign(message, { selected: false }));
    dispatch({ type: GET_INBOX, payload: inboxMessages });
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




