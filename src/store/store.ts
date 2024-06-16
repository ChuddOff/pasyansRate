import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiCards } from "./reducers/CardsServices";
import columns from './reducers/ColumnsSlice'
import { ColumnsSlice } from "./reducers/ColumnsSlice";
import { apiProfile } from "./reducers/CardsServices";

const rootReducer = combineReducers({
    [apiCards.reducerPath]: apiCards.reducer,
    [apiProfile.reducerPath]: apiProfile.reducer,
    columns
})
export const setupStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => (getDefaultMiddleware().concat([apiCards.middleware, apiProfile.middleware]))
    })
    return store;
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']