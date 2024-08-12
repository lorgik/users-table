import { createAsyncThunk, createReducer, createSlice } from '@reduxjs/toolkit'
import { getError, getFilteredUsers, getUsers } from '../api/users'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return await getUsers()
})

export const fetchFilteredUsers = createAsyncThunk('users/fetchFilteredUsers', async ({ filterOption, inputValue }) => {
  return await getFilteredUsers(filterOption, inputValue)
})

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload
      })
      .addCase(fetchFilteredUsers.fulfilled, (state, action) => {
        state.users = action.payload
      })
  },
})

export default usersSlice.reducer
