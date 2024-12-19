import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './slice/counter'
import { loginSlice } from './slice/login'
import { tagRegistrationSlice } from './slice/tagRegistration'

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    login: loginSlice.reducer,
    savedTagRegistrationData: tagRegistrationSlice.reducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch