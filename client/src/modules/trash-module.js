import { ServiceContainer } from '../services';

export const GET_TRASH = 'trash/GET_TRASH';
export const SELECT_ALL = 'trash/SELECT_ALL';
export const SELECT_NONE = 'trash/SELECT_NONE';
export const SELECT_SINGLE = 'trash/SELECT_SINGLE';
export const TRASH_SELECTED = 'trash/TRASH_SELECTED';

const initialState = {
  trashMessages: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TRASH:
      return {
        trashMessages: action.payload
      };
    case SELECT_ALL: 
      if (state.trashMessages.length === 0) {
        return;
      }
      const selectAll = state.trashMessages.map(message => Object.assign(message, { selected: true }));
      return {
        trashMessages: selectAll
      };
    case SELECT_NONE:
      if (state.trashMessages.length === 0) {
        return;
      }    
      const selectNone = state.trashMessages.map(message => Object.assign(message, { selected: false }));
      return {
        trashMessages: selectNone
      };      
    case SELECT_SINGLE:
      if (state.trashMessages.length === 0) {
        return;
      };
      const selectSingle = state.trashMessages.map(message => {
        if (message.panel_id === action.payload.panelId) {
          message.selected = action.payload.isSelected;
        }
        return Object.assign({}, message);
      });
      return {
        trashMessages: selectSingle
      };
    default:
      return state;
  }
};

export const getTrash = () => {
  return async (dispatch) => {
    const api = new ServiceContainer().api();
    let trashMessages = await api.getTrash();
    trashMessages = trashMessages.map( message => Object.assign(message, { selected: false }));
    dispatch({ type: GET_TRASH, payload: trashMessages });
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

export const trashSelected = () => {
  return {
    type: TRASH_SELECTED
  };
};




