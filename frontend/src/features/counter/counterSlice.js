import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const incrementAsync = createAsyncThunk(
    'counter/fetchCount',
    async (amount) => {
      const response = await fetchCount(amount);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    }
  },
})


export const selectCount = (state) => state.counter.value;

export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer