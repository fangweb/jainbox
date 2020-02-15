import { ServiceContainer } from '../services';
import { wait } from '../helpers';

export const LOADING = 'sent/LOADING';
export const RESET = 'sent/RESET';
export const ERROR = 'sent/ERROR';
export const SET_SENT_MESSAGES = 'sent/SET_SENT_MESSAGES';
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
    case SET_SENT_MESSAGES: {
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

export const getSent = ({ page, showLoader }) => {
  return async dispatch => {
    const api = ServiceContainer.api();
    if (showLoader) {
      dispatch({ type: LOADING });
    }
    let apiResult;
    try {
      const apiCall = await api.getSent({ page });
      apiResult = await apiCall.json();
    } catch (e) {
      return dispatch(toggleError());
    }

    let sentMessages;
    if (apiResult.length > 0) {
      sentMessages = apiResult.map(message =>
        Object.assign(message, { selected: false })
      );
    } else {
      sentMessages = [];
    }
    await wait(300);
    return dispatch({
      type: SET_SENT_MESSAGES,
      payload: {
        sentMessages,
        page,
        totalResults: apiResult.length
      }
    });
  };
};

export const softDeleteMessagesInSent = ({ currentPage, selectedIds }) => {
  return async dispatch => {
    const api = ServiceContainer.api();

    try {
      await api.softDeleteMessages({
        messageIds: selectedIds
      });
      const result = await getSent({ page: currentPage, showLoader: false })(
        dispatch
      );
      return result;
    } catch (e) {
      console.error(e);
      return dispatch(toggleError());
    }
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
