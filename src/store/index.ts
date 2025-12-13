import { configureStore } from '@reduxjs/toolkit'

import filterKeysReducer from './filterKeysSlice'
import maskImageReducer from './maskImageSlice'
import sourceTokenReducer from './sourceTokenSlice'
import themeColorReducer from './themeColorSlice'
import tokenKeysReducer from './tokenKeysSlice'

const store = configureStore({
  reducer: {
    themeColor: themeColorReducer,
    maskImage: maskImageReducer,
    filterKeys: filterKeysReducer,
    tokenKeys: tokenKeysReducer,
    sourceToken: sourceTokenReducer
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
