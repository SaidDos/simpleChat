import { 
    MESSAGE_RECIVED,
     FETCHING
     } from "../Actions/ActionTypes";

const INITIAL_STATE = {
  fetching: false,
  messages: []
};

const ChatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING:
      return {
        ...INITIAL_STATE,
        fetching: true
      };
    case MESSAGE_RECIVED: {
      return {
        ...state,
        fetching: false,
        messages: action.messages
      };
    }
    default:
      return state;
  }
};
export default ChatReducer;
