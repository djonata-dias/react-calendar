import { configureStore } from '@reduxjs/toolkit'
import reminderReducer from './slices/reminderSlice'

 const store = configureStore({
  reducer: {
    reminders : reminderReducer
  }
})

export default store