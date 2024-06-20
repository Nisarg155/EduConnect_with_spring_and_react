import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    User:null
}

export const loginSlice = createSlice(
    {
        name:'UserDetails',
        initialState,

        reducers:{
            AddUser:(state,action) =>
            {
                state.User = action.payload
            },
            DeleteUser:(state,action) => {
                state.User = action.payload
            }

        }
    }
)

export const {AddUser , DeleteUser} = loginSlice.actions
export default loginSlice.reducer