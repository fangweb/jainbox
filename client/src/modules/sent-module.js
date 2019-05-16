import { ServiceContainer } from '../services';
import { wait } from '../helpers';

export const LOADING = 'inbox/LOADING';
export const RESET = 'inbox/RESET';
export const GET_SENT = 'sent/GET_SENT';
export const SELECT_ALL = 'sent/SELECT_ALL';
export const SELECT_NONE = 'sent/SELECT_NONE';
export const SELECT_SINGLE = 'sent/SELECT_SINGLE';
export const DELETE_SELECTED = 'sent/DELETE_SELECTED';

const initialState = {
  sentMessages: [],
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
    case GET_SENT:
      return {
        ...action.payload,
        loading: false
      };
    case SELECT_ALL: 
      if (state.sentMessages.length === 0) {
        return state;
      }
      const selectAll = state.sentMessages.map(message => Object.assign(message, { selected: true }));
      return {
        sentMessages: selectAll,
        loading: state.loading,
        page: state.page,
        totalResults: state.totalResults        
      };
    case SELECT_NONE:
      if (state.sentMessages.length === 0) {
        return state;
      }    
      const selectNone = state.sentMessages.map(message => Object.assign(message, { selected: false }));
      return {
        sentMessages: selectNone,
        loading: state.loading,
        page: state.page,
        totalResults: state.totalResults        
      };      
    case SELECT_SINGLE:
      if (state.sentMessages.length === 0) {
        return state;
      };
      const selectSingle = state.sentMessages.map(message => {
        if (message.panel_id === action.payload.panelId) {
          message.selected = action.payload.isSelected;
        }
        return Object.assign({}, message);
      });
      return {
        sentMessages: selectSingle,
        loading: state.loading,
        page: state.page,
        totalResults: state.totalResults        
      };
    default:
      return state;
  }
};

export const getSent = ({ page }) => {
  return async (dispatch) => {
    const api = new ServiceContainer().api();
    dispatch({ type: LOADING });
    const  apiResult = await api.getSent({ page });
    const sentMessages = apiResult.messages.map( message => Object.assign(message, { selected: false }));
    await wait(300);
    dispatch({ 
      type: GET_SENT, 
      payload: { 
        sentMessages, 
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

export const reset = () => ({
  type: RESET
});



