import { createSlice } from '@reduxjs/toolkit'

import { themeColors } from '@/lib/config'

export const themeColorSlice = createSlice({
  name: 'themeColor',
  initialState: {
    value: themeColors[0]
  },
  reducers: {
    updateThemeColor(state, action) {
      state.value = action.payload
    }
  }
})

export const { updateThemeColor } = themeColorSlice.actions

export default themeColorSlice.reducer
