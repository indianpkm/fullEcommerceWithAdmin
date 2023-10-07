import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createUser, loginUser, signOut } from './auhtApi';

const initialState = {
  loggedInUserToken: null, // this should only contain user identity => 'id'/'role'
  status: 'idle',
  error: null,
  userChecked: false,
  mailSent: false,
  passwordReset:false
};

export const createUserAsync = createAsyncThunk(
    'user/createUser',
    async (userData) => {
      const response = await createUser(userData);
      return response;
    }
  );

  export const loginUserAsync = createAsyncThunk(
    'user/loginUser',
    async (loginInfo, { rejectWithValue }) => {
      try {
        const response = await loginUser(loginInfo);
        return response.data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error);
      }
    }
  );

  export const signOutAsync = createAsyncThunk(
    'user/signOut',
    async () => {
      const response = await signOut();
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { },
  extraReducers:(builder)=>{
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
      })
  }
})

export default authSlice.reducer