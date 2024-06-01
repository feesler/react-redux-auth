import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice.js';
import loginFormSlice from './loginFormSlice.js';
import newsSlice from './newsSlice.js';
import { throttle } from 'lodash';
import { loadState, saveState } from './localStorage.js';

const preloadedState = {
  auth: {
    token: loadState('token'),
    profile: loadState('profile'),
  }
};

const store = configureStore({
  reducer: {
    auth: authSlice,
    loginForm: loginFormSlice,
    news: newsSlice,
  },
  preloadedState,
});

store.subscribe(throttle(() => {
  const state = store.getState();
  saveState('token', state.auth.token);
  saveState('profile', state.auth.profile);
}, 1000));

export default store;