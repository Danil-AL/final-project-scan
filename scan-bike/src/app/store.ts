import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../features/auth/authSlice'
import { casesApi } from '../features/cases/casesApi'
import { officersApi } from '../features/officers/officersApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [casesApi.reducerPath]: casesApi.reducer,
    [officersApi.reducerPath]: officersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(casesApi.middleware, officersApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch