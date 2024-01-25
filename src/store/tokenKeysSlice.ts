import { createSlice } from '@reduxjs/toolkit'

export const tokenKeysSlice = createSlice({
  name: 'tokenKeys',
  initialState: {
    value: [],
  },
  reducers: {
    updateTokenKeys(state, action) {
      state.value = action.payload
    },
  },
})

export const { updateTokenKeys } = tokenKeysSlice.actions

export default tokenKeysSlice.reducer
