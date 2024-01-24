import { configureStore } from '@reduxjs/toolkit'
import themeColorReducer from './themeColorSlice'
import maskImageReducer from './maskImageSlice'
import sourceDataReducer from './sourceDataSlice'

const store = configureStore({
  reducer: {
    themeColor: themeColorReducer,
    maskImage: maskImageReducer,
    sourceData: sourceDataReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
