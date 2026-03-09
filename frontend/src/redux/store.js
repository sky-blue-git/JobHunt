import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";

// Only persist 'auth' (for logged-in user session).
// 'job' is excluded so jobs are always fetched fresh from the API.
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['job'], // never persist job data
}

// For auth, use a nested config to persist only 'user', NOT 'loading'.
// This prevents the login button from showing "Please wait" on page open.
const authPersistConfig = {
    key: 'auth',
    storage,
    blacklist: ['loading'], // never persist loading state
}

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authSlice),
    job: jobSlice,
    company: companySlice,
    application: applicationSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export default store;