import {
  AT_USER_LOADED,
  AT_AUTH_ERROR,
  AT_LOGIN_SUCCESS,
  AT_LOGIN_FAIL,
  AT_LOGOUT,
  AT_CLEAR_AUTH_ERRORS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../types';

const AuthReducer = (state, action) => {
  switch (action.type) {
    case AT_LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case AT_USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
      
    case AT_AUTH_ERROR:
    case REGISTER_FAIL:
    case AT_LOGIN_FAIL:
    case AT_LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case AT_CLEAR_AUTH_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default AuthReducer;
