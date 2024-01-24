import { createSlice } from '@reduxjs/toolkit'

export const filterKeysSlice = createSlice({
  name: 'filterKeys',
  initialState: {
    value: [],
  },
  reducers: {
    updateFilterKeys(state, action) {
      state.value = action.payload
    },
  },
})

export const { updateFilterKeys } = filterKeysSlice.actions

export default filterKeysSlice.reducer
