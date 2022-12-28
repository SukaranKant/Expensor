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
    loginSuccess(state) {
      state.isAuthenticated = true;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
    },
    setUser(state, action) {
      state.user = action.payload.user;
    }
  },
})

export const signup = (userData) =>{
  
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
    dispatch(authActions.loginSuccess());
  }
}

export const login = (userData) =>{
  
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
    dispatch(authActions.loginSuccess());
  }
}

export const getUserDetails = ()=>{
  return async (dispatch) => {
    const token = Cookies.get('auth-token');

    if(!token) {
      console.log('invalid auth token')
      return ;
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/getuser`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const responseData = await response.json();
    
    if(!response.ok) {
      console.log('token invalid')
      return ;
    }

    dispatch(authActions.setUser({user: responseData.user}))
  }
}
export const authActions = authSlice.actions


export default authSlice.reducer