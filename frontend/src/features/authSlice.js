import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: null,
    exp: true,
    status: 'idle',
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.token = action.payload.token;
        },
        logOut: (state, action) => {
            state.token = null
        }
    },

})

export const { setCredentials, logOut } = loginSlice.actions
export default loginSlice.reducer