    import  {configureStore , } from '@reduxjs/toolkit'
    import UserReducer from './reducer/loginslice.jsx'

    import storage from 'redux-persist/lib/storage'
    import {persistReducer,
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,} from "redux-persist";


    const persistConfig = {
        key:'root',
        storage
    }

    const Reducer = persistReducer(persistConfig,UserReducer);

    const store = configureStore(
        {
            reducer:Reducer,
            middleware:getDefaultMiddleware =>
                getDefaultMiddleware({
                    serializableCheck: {
                        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                    },
                })
        }
    )

    export default store

