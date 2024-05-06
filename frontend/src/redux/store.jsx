import  {configureStore} from '@reduxjs/toolkit'
import UserReducer from './reducer/loginslice.jsx'

import storage from 'redux-persist/lib/storage'
import {persistReducer} from "redux-persist";


const persistConfig = {
    key:'root',
    storage
}

const Reducer = persistReducer(persistConfig,UserReducer);

const store = configureStore(
    {
        reducer:Reducer
    }
)

export default store

