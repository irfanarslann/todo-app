import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import AuthReducer from './AuthReducer';
import setAuthToken from '../../utils/setAuthToken';
import { config } from '../../utils/HttpConfig';
import { EP_AUTH, EP_REGISTER } from '../endpoints';
import {
  AT_AUTH_ERROR,
  AT_CLEAR_AUTH_ERRORS,
  AT_LOGIN_FAIL,
  AT_LOGIN_SUCCESS,
  AT_LOGOUT,
  AT_USER_LOADED,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from '../types';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('token') ? true : false,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Login
  const login = async (email, password) => {
    try {
      const payload = {
        email,
        password,
      };
      const response = await axios.post(EP_AUTH, payload, config);
      dispatch({ type: AT_LOGIN_SUCCESS, payload: response.data });
      loadUser();
    } catch (err) {
      dispatch({
        type: AT_LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  //Logout
  const logout = () => dispatch({ type: AT_LOGOUT });

  //Load User
  const loadUser = async () => {
    setAuthToken(localStorage.token);
    try {
      const user = await axios.get(EP_AUTH);
      dispatch({
        type: AT_USER_LOADED,
        payload: user.data,
      });
    } catch (err) {
      dispatch({ type: AT_AUTH_ERROR });
      console.log(err);
    }
  };

  const register = async (email, password, username) => {
    try {
      const payload = {
        email,
        password,
        username,
      };
      const res = await axios.post(EP_REGISTER, payload, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  //Clear Error
  const clearError = () => {
    setTimeout(() => dispatch({ type: AT_CLEAR_AUTH_ERRORS }), 5000);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loadUser();
    }
  }, []);


  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
