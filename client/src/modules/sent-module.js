import { ServiceContainer } from '../services';
import { wait } from '../helpers';

export const LOADING = 'sent/LOADING';
export const RESET = 'sent/RESET';
export const ERROR = 'sent/ERROR';
export const GET_SENT = 'sent/GET_SENT';
export const SELECT_ALL = 'sent/SELECT_ALL';
export const SELECT_NONE = 'sent/SELECT_NONE';
export const SELECT_SINGLE = 'sent/SELECT_SINGLE';
export const DELETE_SELECTED = 'sent/DELETE_SELECTED';

const initialState = {
  sentMessages: [],
  loading: false,
  page: null,
  totalResults: 0,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case RESET: {
      return {
        ...initialState
      };
    }
    case ERROR: {
      return {
        ...state,
        error: !state.error
      };
    }
    case GET_SENT: {
      return {
        ...action.payload,
        loading: false,
        error: false
      };
    }
    case SELECT_ALL: {
      if (state.sentMessages.length === 0) {
        return state;
      }
      const selectAll = state.sentMessages.map(message =>
        Object.assign(message, { selected: true })
      );
      return {
        ...state,
        sentMessages: selectAll
      };
    }
    case SELECT_NONE: {
      if (state.sentMessages.length === 0) {
        return state;
      }
      const selectNone = state.sentMessages.map(message =>
        Object.assign(message, { selected: false })
      );
      return {
        ...state,
        sentMessages: selectNone
      };
    }
    case SELECT_SINGLE: {
      if (state.sentMessages.length === 0) {
        return state;
      }
      const selectSingle = state.sentMessages.map(message => {
        const mappedMessage = Object.assign({}, message);
        if (mappedMessage.panel_id === action.payload.panelId) {
          mappedMessage.selected = action.payload.isSelected;
        }
        return mappedMessage;
      });
      return {
        ...state,
        sentMessages: selectSingle
      };
    }
    default: {
      return state;
    }
  }
};

export const getSent = ({ page }) => {
  return async dispatch => {
    const api = new ServiceContainer().api();
    dispatch({ type: LOADING });
    let apiResult;
    try {
      apiResult = await api.getSent({ page });
    } catch (e) {
      return dispatch(toggleError());
    }
    const sentMessages = apiResult.messages.map(message =>
      Object.assign(message, { selected: false })
    );
    await wait(300);
    return dispatch({
      type: GET_SENT,
      payload: {
        sentMessages,
        page: apiResult.page,
        totalResults: apiResult.totalResults
      }
    });
  };
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
