import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  profile: null,
};

const authURL = process.env.REACT_APP_AUTH_URL;
const profileURL = process.env.REACT_APP_PROFILE_URL;

export const userLogin = createAsyncThunk(
  'userLogin',
  async ({ login, password }, thunkAPI) => {
    console.log('userLogin() login: ', login, ' password: ', password);

    const response = await fetch(authURL, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password }),
    });

    const authResult = await response.json();
    if (!response.ok || !authResult || !authResult.token) {
      const errorMessage = (authResult && authResult.message)
        ? authResult.message
        : 'Authentication failed';

      throw new Error(errorMessage);
    }

    return authResult.token;
  },
);

export const authRequest = createAsyncThunk(
  'authRequest',
  async ({ url, opts = {} }, { dispatch, getState }) => {
    console.log('inside authRequest(): url=', url);

    const state = getState();
    const token = state.auth.token;

    if (!token) {
      throw new Error('Not authorised');
    }

    const defaultOpts = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await fetch(url, {
      ...defaultOpts,
      ...opts,
    });

    if (response.status === 401) {
      //dispatch(logOut());
      throw new Error('Not authorised');
    }

    const data = await response.json();
    if (!response.ok) {
      const errorMessage = (data && data.message)
        ? data.message
        : 'Request failed';

      throw new Error(errorMessage);
    }

    return { data };
  },
);

/** Request user profile data */
export const readProfile = createAsyncThunk(
  'readProfile',
  async (_, { dispatch }) => {
    console.log('inside readProfile thunk');

    const result = await dispatch(authRequest({ url: profileURL }));
    console.log('after ... result: ', result);
    if (!result.payload.data) {
      throw new Error((result.error) ? result.error.message : 'Unknown error');
    }

    return result.payload.data;
  },
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut() {
      return { ...initialState };
    }
  },
  extraReducers: {
    [userLogin.pending]: (state, action) => {
      console.log('[userLogin.pending] action: ', action);
      state.token = null;
      state.profile = null;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, action) => {
      console.log('[userLogin.fulfilled] action: ', action);
      state.token = action.payload;
    },
    [userLogin.rejected]: (state, action) => {
      console.log('[userLogin.rejected] action: ', action);
      state.token = null;
      state.profile = null;
      state.error = (action.error) ? action.error.message : 'Error';
    },

    [readProfile.fulfilled]: (state, action) => {
      console.log('[readProfile.fulfilled] payload: ', action.payload);
      state.profile = action.payload;
    },

    [authRequest.pending]: (state, action) => {
      console.log('[authRequest.pending] payload: ', action.payload);
    },
    [authRequest.fulfilled]: (state, action) => {
      console.log('[authRequest.fulfilled] payload: ', action.payload);
    },
    [authRequest.rejected]: (state, action) => {
      console.log('[authRequest.rejected] payload: ', action.payload);
    },
  },
});

export const {
  logOut,
} = authSlice.actions;
export default authSlice.reducer;
