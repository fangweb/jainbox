import { ServiceContainer } from '../services';

export const GET_SENT = 'sent/GET_SENT';
export const SELECT_ALL = 'sent/SELECT_ALL';
export const SELECT_NONE = 'sent/SELECT_NONE';
export const SELECT_SINGLE = 'sent/SELECT_SINGLE';
export const DELETE_SELECTED = 'sent/DELETE_SELECTED';

const initialState = {
  sentMessages: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SENT:
      return {
        sentMessages: action.payload
      };
    case SELECT_ALL: 
      if (state.sentMessages.length === 0) {
        return;
      }
      const selectAll = state.sentMessages.map(message => Object.assign(message, { selected: true }));
      return {
        sentMessages: selectAll
      };
    case SELECT_NONE:
      if (state.sentMessages.length === 0) {
        return;
      }    
      const selectNone = state.sentMessages.map(message => Object.assign(message, { selected: false }));
      return {
        sentMessages: selectNone
      };      
    case SELECT_SINGLE:
      if (state.sentMessages.length === 0) {
        return;
      };
      const selectSingle = state.sentMessages.map(message => {
        if (message.panel_id === action.payload.panelId) {
          message.selected = action.payload.isSelected;
        }
        return Object.assign({}, message);
      });
      return {
        sentMessages: selectSingle
      };
    default:
      return state;
  }
};

export const getSent = () => {
  return async (dispatch) => {
    const api = new ServiceContainer().api();
    let sentMessages = await api.getSent();
    sentMessages = sentMessages.map( message => Object.assign(message, { selected: false }));
    dispatch({ type: GET_SENT, payload: sentMessages });
  }
};

export const selectAll = () => {
  return {
    type: SELECT_ALL
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

export const deleteSelected = () => {
  return {
    type: DELETE_SELECTED
  };
};




