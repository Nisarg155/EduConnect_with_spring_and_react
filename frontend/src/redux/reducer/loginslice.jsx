import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user:null
}

export const loginSlice = createSlice(
    {
        name:'UserDetails',
        initialState,

        reducers:{
            AddUser:(state,action) =>
            {
                state.user = action.payload
            },
            DeleteUser:(state,action) => {
                state.user = action.payload
            }
        }
    }
)

export const {AddUser , DeleteUser} = loginSlice.actions
export default loginSlice.reducer