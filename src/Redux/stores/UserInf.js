import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInf: {},
        loggedIn: false,
        adminTab:"LinkTab"
    },
    reducers: {
        setInf: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.userInf = action.payload
        },
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload
        },
        setAdminTab: (state, action) => {
            state.adminTab = action.payload
        },


    },
})

// Action creators are generated for each case reducer function
export const { setInf, setLoggedIn,setAdminTab} = userSlice.actions

export default userSlice.reducer