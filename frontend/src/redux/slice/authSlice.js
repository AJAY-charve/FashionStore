import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

// retrive user info and token form localstorage if available
const userFromStorage = localStorage.getItem("userInfo") ?
    JSON.parse(localStorage.getItem("userInfo")) : null

// check for an existing guest id in the local storage or genrate nre one
const intitalGuestId = localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", intitalGuestId)

// initial state
const initialState = {
    user: userFromStorage,
    guestId: intitalGuestId,
    loading: false,
    error: null
}

// console.log("user", userFromStorage);


// async thunk for user login
export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, userData)
        localStorage.setItem("userInfo", JSON.stringify(response.data.user))
        localStorage.setItem("userToken", response.data.token)
        localStorage.removeItem("guestId")
        return response.data.user
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

// register new user
export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, userData)
        localStorage.setItem("userInfo", JSON.stringify(response.data.user))
        localStorage.setItem("userToken", response.data.token)
        localStorage.removeItem("guestId")
        return response.data.user
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


// slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.guestId = `guest_${new Date().getTime()}`
            localStorage.removeItem("userInfo")
            localStorage.removeItem("userToken")
            localStorage.setItem("guestId", state.guestId)
        },
        genrateNewGuestId: (state) => {
            state.guestId = `guest_${new Date().getTime()}`
            localStorage.setItem("guestId", state.guestId)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
    }
})


export const { logout, genrateNewGuestId } = authSlice.actions
export default authSlice.reducer