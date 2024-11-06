import { configureStore } from '@reduxjs/toolkit'
import appReducer from '../redux/slices/appSlice'
import hastalarReducer from '../redux/slices/hastalarSlice'

export const store = configureStore({
  reducer: {
    app : appReducer,
    hastalar : hastalarReducer
  },
})