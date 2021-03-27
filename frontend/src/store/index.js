import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import loginFormSlice from './loginFormSlice';
import newsSlice from './newsSlice';
import { throttle } from 'lodash';
import { loadState, saveState } from './localStorage';

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