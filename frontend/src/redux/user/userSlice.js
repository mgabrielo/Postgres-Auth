import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userId: null,
    currentUser: null,
    error: null,
    loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signUpStart: (state) => {
            state.loading = true
            state.error = null
        },
        signUpSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        signUpFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.userId = action.payload
            state.loading = false
            state.error = null
        },
        signInFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        saveUserDetailsStart: (state) => {
            state.loading = true
            state.error = null
        },
        saveUserDetailsSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = null
        },
        saveUserDetailsFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        signOutUserStart: (state) => {
            state.loading = true
            state.error = null
        },
        signOutUserSuccess: (state) => {
            state.currentUser = null
            state.loading = false
            state.userId = null
            state.error = null
        },
        signOutUserFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
    }
});

export const {
    signUpStart,
    signUpSuccess,
    signUpFailure,
    signInStart,
    signInSuccess,
    signInFailure,
    saveUserDetailsStart,
    saveUserDetailsSuccess,
    saveUserDetailsFailure,
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure
} = userSlice.actions

export default userSlice.reducer