import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './stores/CounterSlice'
import userReducer from './stores/UserInf'

export default configureStore({
  reducer: {
    counter: counterReducer,
    userInfo: userReducer
  },
})