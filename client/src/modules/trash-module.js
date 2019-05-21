import { ServiceContainer } from '../services';
import { wait } from '../helpers';

export const LOADING = 'trash/LOADING';
export const RESET = 'trash/RESET';
export const ERROR = 'trash/ERROR';
export const GET_TRASH = 'trash/GET_TRASH';
export const SELECT_ALL = 'trash/SELECT_ALL';
export const SELECT_NONE = 'trash/SELECT_NONE';
export const SELECT_SINGLE = 'trash/SELECT_SINGLE';
export const DELETE_SELECTED = 'trash/DELETE_SELECTED';

const initialState = {
  trashMessages: [],
  loading: false,
  page: null,
  totalResults: 0,
  error: false
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
    case ERROR:
      return {
        ...state,
        error: !state.error
      };      
    case GET_TRASH:
      return {
        ...action.payload,
        loading: false,
        error: false
      };
    case SELECT_ALL: 
      if (state.trashMessages.length === 0) {
        return state;
      }
      const selectAll = state.trashMessages.map(message => Object.assign(message, { selected: true }));
      return {
        ...state,
        trashMessages: selectAll    
      };
    case SELECT_NONE:
      if (state.trashMessages.length === 0) {
        return state;
      }    
      const selectNone = state.trashMessages.map(message => Object.assign(message, { selected: false }));
      return {
        ...state,
        trashMessages: selectNone    
      };      
    case SELECT_SINGLE:
      if (state.trashMessages.length === 0) {
        return state;
      };
      const selectSingle = state.trashMessages.map(message => {
        if (message.panel_id === action.payload.panelId) {
          message.selected = action.payload.isSelected;
        }
        return Object.assign({}, message);
      });
      return {
        ...state,
        trashMessages: selectSingle        
      };
    default:
      return state;
  }
};

export const getTrash = ({ page }) => {
  return async (dispatch) => {
    const api = new ServiceContainer().api();
    dispatch({ type: LOADING });
    let apiResult;
    try {
      apiResult = await api.getTrash({ page });
    } catch (e) {
      return dispatch(toggleError());
    }
    const trashMessages = apiResult.messages.map( message => Object.assign(message, { selected: false }));
    await wait(300);
    dispatch({ 
      type: GET_TRASH, 
      payload: { 
        trashMessages, 
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

export const toggleError = () => ({
  type: ERROR
});


