import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

const initialState = {
    isAuthenticated: false,
    user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
})

export const registerUser = (userData) =>{
  
  return async (dispatch) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();
    
    if(!response.ok) {
      console.log('could not register')
      return ;
    }

    // else set the auth token.
    Cookies.set('auth-token', responseData.authToken);
    dispatch(authActions.loginSuccess({user: responseData.user}));
  }
}

export const loginUser = (userData) =>{
  
  return async (dispatch) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();
    
    if(!response.ok) {
      console.log('could not login')
      return ;
    }

    // else set the auth token.
    Cookies.set('auth-token', responseData.authToken);
    dispatch(authActions.loginSuccess({user: responseData.user}));
  }
}

export const authActions = authSlice.actions


export default authSlice.reducer