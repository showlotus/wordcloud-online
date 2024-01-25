import { createSlice } from '@reduxjs/toolkit'

export const sourceDataSlice = createSlice({
  name: 'sourceData',
  initialState: {
    value: '' as string,
  },
  reducers: {
    updateSourceData(state, action) {
      state.value = action.payload
    },
  },
})

export const { updateSourceData } = sourceDataSlice.actions

export default sourceDataSlice.reducer
