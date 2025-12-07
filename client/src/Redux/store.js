import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/auth.slice'
import expertReducer from './slice/expert.slice'
export const store = configureStore({
  reducer: {
     auth:authReducer,
     expert:expertReducer
  },
})

