import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiCards } from "./reducers/CardsServices";
import columns from './reducers/ColumnsSlice'

const rootReducer = combineReducers({
    [apiCards.reducerPath]: apiCards.reducer,
    columns
})
export const setupStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => (getDefaultMiddleware().concat(apiCards.middleware))
    })
    return store;
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']