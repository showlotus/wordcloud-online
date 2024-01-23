import { configureStore } from '@reduxjs/toolkit'
import themeColorReducer from './themeColorSlice'
import maskImageReducer from './maskImageSlice'

const store = configureStore({
  reducer: {
    themeColor: themeColorReducer,
    maskImage: maskImageReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
