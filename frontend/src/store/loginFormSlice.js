import { createSlice } from '@reduxjs/toolkit';
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
  error: null,
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
        error: null,
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
    [userLogin.fulfilled]: () => {
      return { ...initialState };
    },
    [userLogin.rejected]: (state, action) => {
      return {
        ...state,
        error: (action.error) ? action.error.message : 'Unknown error',
      };
    },
  },
});

export const {
  changeField,
  resetForm,
  invalidateField,
  validateForm,
} = loginFormSlice.actions;
export default loginFormSlice.reducer;
