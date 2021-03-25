import { createSlice } from '@reduxjs/toolkit';

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
  },
});

export const { changeField, resetForm, invalidateField, validateForm } = loginFormSlice.actions;
export default loginFormSlice.reducer;
