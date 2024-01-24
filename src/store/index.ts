import { configureStore } from '@reduxjs/toolkit'
import themeColorReducer from './themeColorSlice'
import maskImageReducer from './maskImageSlice'
import sourceDataReducer from './sourceDataSlice'
import filterKeysReducer from './filterKeysSlice'

const store = configureStore({
  reducer: {
    themeColor: themeColorReducer,
    maskImage: maskImageReducer,
    sourceData: sourceDataReducer,
    filterKeys: filterKeysReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
