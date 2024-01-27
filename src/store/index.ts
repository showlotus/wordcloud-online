import { configureStore } from '@reduxjs/toolkit'
import themeColorReducer from './themeColorSlice'
import maskImageReducer from './maskImageSlice'
import filterKeysReducer from './filterKeysSlice'
import tokenKeysReducer from './tokenKeysSlice'
import sourceTokenReducer from './sourceTokenSlice'

const store = configureStore({
  reducer: {
    themeColor: themeColorReducer,
    maskImage: maskImageReducer,
    filterKeys: filterKeysReducer,
    tokenKeys: tokenKeysReducer,
    sourceToken: sourceTokenReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
