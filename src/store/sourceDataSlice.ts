import { jsonDemo } from '@/assets/data/jsonDemo'
import { txtDemo } from '@/assets/data/txtDemo'
import { createSlice } from '@reduxjs/toolkit'

export const sourceDataSlice = createSlice({
  name: 'sourceData',
  initialState: {
    value: jsonDemo,
  },
  reducers: {
    updateSourceData(state, action) {
      state.value = action.payload
    },
  },
})

export const { updateSourceData } = sourceDataSlice.actions

export default sourceDataSlice.reducer
