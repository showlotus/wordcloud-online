import { createSlice } from '@reduxjs/toolkit'

import maskImgs from '@/lib/mask'

export const maskImageSlice = createSlice({
  name: 'maskImage',
  initialState: {
    value: Object.keys(maskImgs)[0]
  },
  reducers: {
    updateMaskImage(state, action) {
      state.value = action.payload
    }
  }
})

export const { updateMaskImage } = maskImageSlice.actions

export default maskImageSlice.reducer
