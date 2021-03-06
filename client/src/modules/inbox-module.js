import { ServiceContainer } from '../services';
import { activateToast } from '../pkg/toast/toast-module';
import { wait } from '../helpers';

export const LOADING = 'inbox/LOADING';
export const RESET = 'inbox/RESET';
export const ERROR = 'inbox/ERROR';
export const SET_INBOX_MESSAGES = 'inbox/SET_INBOX_MESSAGES';
export const SELECT_ALL = 'inbox/SELECT_ALL';
export const SELECT_ALL_UNREAD = 'inbox/SELECT_ALL_UNREAD';
export const SELECT_NONE = 'inbox/SELECT_NONE';
export const SELECT_SINGLE = 'inbox/SELECT_SINGLE';

const initialState = {
  inboxMessages: [],
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
        ...initialState,
        error: !state.error
      };
    }
    case SET_INBOX_MESSAGES: {
      return {
        ...action.payload,
        loading: false,
        error: false
      };
    }
    case SELECT_ALL: {
      if (state.inboxMessages.length === 0) {
        return state;
      }
      const selectAll = state.inboxMessages.map(message =>
        Object.assign(message, { selected: true })
      );
      return {
        ...state,
        inboxMessages: selectAll
      };
    }
    case SELECT_NONE: {
      if (state.inboxMessages.length === 0) {
        return state;
      }
      const selectNone = state.inboxMessages.map(message =>
        Object.assign(message, { selected: false })
      );
      return {
        ...state,
        inboxMessages: selectNone
      };
    }
    case SELECT_ALL_UNREAD: {
      if (state.inboxMessages.length === 0) {
        return state;
      }
      const selectUnread = state.inboxMessages.map(message => {
        const mappedMessage = Object.assign({}, message);
        if (mappedMessage.viewed === false) {
          mappedMessage.selected = true;
        } else {
          mappedMessage.selected = false;
        }
        return mappedMessage;
      });
      return {
        ...state,
        inboxMessages: selectUnread
      };
    }
    case SELECT_SINGLE: {
      if (state.inboxMessages.length === 0) {
        return state;
      }
      const selectSingle = state.inboxMessages.map(message => {
        const mappedMessage = Object.assign({}, message);
        if (mappedMessage.panel_id === action.payload.panelId) {
          mappedMessage.selected = action.payload.isSelected;
        }
        return mappedMessage;
      });
      return {
        ...state,
        inboxMessages: selectSingle
      };
    }
    default: {
      return state;
    }
  }
};

export const getInbox = ({ page, showLoader }) => {
  return async dispatch => {
    const api = ServiceContainer.api();
    if (showLoader) {
      dispatch({ type: LOADING });
    }
    let apiResult;
    try {
      const apiCall = await api.getInbox({ page });
      apiResult = await apiCall.json();
    } catch (e) {
      return dispatch(toggleError());
    }

    let inboxMessages;
    if (apiResult.length > 0) {
      inboxMessages = apiResult.map(message =>
        Object.assign(message, { selected: false })
      );
    } else {
      inboxMessages = [];
    }
    await wait(300);
    return dispatch({
      type: SET_INBOX_MESSAGES,
      payload: {
        inboxMessages,
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

export const moveMessagesFromInboxIntoTrash = ({
  currentPage,
  selectedIds
}) => {
  return async dispatch => {
    const api = ServiceContainer.api();

    try {
      await api.moveMessagesFromInboxIntoTrash({
        messageIds: selectedIds
      });
      const result = await getInbox({ page: currentPage, showLoader: true })(
        dispatch
      );
      return dispatch(
        activateToast('success', {
          message: `${selectedIds.length} item(s) were moved into trash`
        })
      );
    } catch (e) {
      console.error(e);
      return dispatch(toggleError());
    }
  };
};

export const reset = () => ({
  type: RESET
});

export const toggleError = () => ({
  type: ERROR
});
