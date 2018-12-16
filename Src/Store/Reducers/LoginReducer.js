import {
  LOGIN_ATTEMP,
  LOGIN_SUCCESS,
  LOGIN_FAILED
} from "../Actions/ActionTypes";

const INITIAL_STATE = {
  loading: false,
  user: null,
  error: ""
};

const LoginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_ATTEMP:
      return {
        ...INITIAL_STATE,
        loading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...INITIAL_STATE,
        user: action.user
      };
    case LOGIN_FAILED:
      return {
        ...INITIAL_STATE,
        error: action.error
      };
    default:
      return state;
  }
};
export default LoginReducer;
