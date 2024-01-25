import { configureStore } from '@reduxjs/toolkit'
import themeColorReducer from './themeColorSlice'
import maskImageReducer from './maskImageSlice'
import sourceDataReducer from './sourceDataSlice'
import filterKeysReducer from './filterKeysSlice'
import tokenKeysReducer from './tokenKeysSlice'

const store = configureStore({
  reducer: {
    themeColor: themeColorReducer,
    maskImage: maskImageReducer,
    sourceData: sourceDataReducer,
    filterKeys: filterKeysReducer,
    tokenKeys: tokenKeysReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
