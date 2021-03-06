import { ServiceContainer } from '../services';
import { activateToast } from '../pkg/toast/toast-module';
import { wait } from '../helpers';

export const LOADING = 'trash/LOADING';
export const RESET = 'trash/RESET';
export const ERROR = 'trash/ERROR';
export const SET_TRASH_MESSAGES = 'trash/SET_TRASH_MESSAGES';
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
    case SET_TRASH_MESSAGES: {
      return {
        ...action.payload,
        loading: false,
        error: false
      };
    }
    case SELECT_ALL: {
      if (state.trashMessages.length === 0) {
        return state;
      }
      const selectAll = state.trashMessages.map(message =>
        Object.assign(message, { selected: true })
      );
      return {
        ...state,
        trashMessages: selectAll
      };
    }
    case SELECT_NONE: {
      if (state.trashMessages.length === 0) {
        return state;
      }
      const selectNone = state.trashMessages.map(message =>
        Object.assign(message, { selected: false })
      );
      return {
        ...state,
        trashMessages: selectNone
      };
    }
    case SELECT_SINGLE: {
      if (state.trashMessages.length === 0) {
        return state;
      }
      const selectSingle = state.trashMessages.map(message => {
        const mappedMessage = Object.assign({}, message);
        if (message.panel_id === action.payload.panelId) {
          mappedMessage.selected = action.payload.isSelected;
        }
        return mappedMessage;
      });
      return {
        ...state,
        trashMessages: selectSingle
      };
    }
    default: {
      return state;
    }
  }
};

export const getTrash = ({ page, showLoader }) => {
  return async dispatch => {
    const api = ServiceContainer.api();

    if (showLoader) {
      dispatch({ type: LOADING });
    }
    let apiResult;
    try {
      const apiCall = await api.getTrash({ page });
      apiResult = await apiCall.json();
    } catch (e) {
      return dispatch(toggleError());
    }

    let trashMessages;
    if (apiResult.length > 0) {
      trashMessages = apiResult.map(message =>
        Object.assign(message, { selected: false })
      );
    } else {
      trashMessages = [];
    }
    await wait(300);
    return dispatch({
      type: SET_TRASH_MESSAGES,
      payload: {
        trashMessages,
        page,
        totalResults: apiResult.length
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

export const reset = () => ({
  type: RESET
});

export const toggleError = () => ({
  type: ERROR
});

export const softDeleteMessagesInTrash = ({ currentPage, selectedIds }) => {
  return async dispatch => {
    const api = ServiceContainer.api();

    try {
      await api.softDeleteMessages({
        messageIds: selectedIds
      });
      const result = await getTrash({ page: currentPage, showLoader: true })(
        dispatch
      );
      return result;
    } catch (e) {
      console.error(e);
      return dispatch(toggleError());
    }
  };
};

export const restoreMessagesInTrash = ({ currentPage, selectedIds }) => {
  return async dispatch => {
    const api = ServiceContainer.api();

    try {
      await api.restoreMessagesInTrash({
        messageIds: selectedIds
      });
      const result = await getTrash({ page: currentPage, showLoader: true })(
        dispatch
      );
      return dispatch(
        activateToast('success', {
          message: `${selectedIds.length} item(s) were restored into inbox`
        })
      );
    } catch (e) {
      console.error(e);
      return dispatch(toggleError());
    }
  };
};
