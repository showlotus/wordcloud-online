import { createSlice } from '@reduxjs/toolkit'

import type { TokenType } from '@/lib/parseToken'

export const sourceTokenSlice = createSlice({
  name: 'sourceToken',
  initialState: {
    value: [] as TokenType[]
  },
  reducers: {
    updateSourceToken(state, action) {
      state.value = action.payload
    }
  }
})

export const { updateSourceToken } = sourceTokenSlice.actions

export default sourceTokenSlice.reducer
