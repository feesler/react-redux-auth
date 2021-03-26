import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userLogin } from './authSlice';

const initialValues = {
  login: '',
  password: '',
};

const initialValidation = {
  login: true,
  password: true,
};

const initialState = {
  values: { ...initialValues },
  validation: { ...initialValidation },
  validated: false,
};

const loginFormSlice = createSlice({
  name: 'loginForm',
  initialState,
  reducers: {
    changeField(state, action) {
      const { name, value } = action.payload;
      return {
        ...state,
        values: {
          ...state.values,
          [name]: value,
        },
        validation: { ...initialValidation },
        validated: false,
      };
    },

    resetForm() {
      return { ...initialState };
    },

    invalidateField(state, action) {
      const name = action.payload;
      return {
        ...state,
        validation: {
          ...state.validation,
          [name]: false,
        },
      };
    },

    validateForm(state) {
      return {
        ...state,
        validated: true,
      };
    }
  },
  extraReducers: {
    [userLogin.fulfilled]: (state, action) => {
      console.log('[loginForm] [userLogin.rejected] payload: ', action.payload);
    },
    [userLogin.rejected]: (state, action) => {
      console.log('[loginForm] [userLogin.rejected] payload: ', action.payload);
    },
  },
});

export const { changeField, resetForm, invalidateField, validateForm } = loginFormSlice.actions;
export default loginFormSlice.reducer;
