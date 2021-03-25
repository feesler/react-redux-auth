import { configureStore } from '@reduxjs/toolkit';
import loginFormSlice from './loginFormSlice';

export default configureStore({
  reducer: {
    loginForm: loginFormSlice,
  },
});
