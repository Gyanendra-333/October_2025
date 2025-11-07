import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { connectSocket, disconnectSocket } from "../../lib/socket";
import { toast } from "react-toastify";

export const getUser = createAsyncThunk("user/me", async (_, thunkAPI) => {
    try {
        const res = await axiosInstance.get("user/me");
        connectSocket(res?.data?.user);
        // console.log("get user", res?.data);
        return res?.data;
    } catch (error) {
        return null;

    }
});

// Logout 
export const handleLogout = createAsyncThunk("user/sign-out", async (_, thunkAPI) => {
    try {
        await axiosInstance.get("/user/sign-out")
        disconnectSocket();
        toast.success("Logout Successfull")
        return null;
    } catch (error) {
        return thunkAPI.rejectWithValue("logout error");
    }
});

// Login 
export const login = createAsyncThunk("user/sign-in", async (data, thunkAPI) => {
    try {
        let res = await axiosInstance.post("/user/sign-in", data)
        connectSocket(res?.data);
        toast.success("Login Successfull")
        console.log("login res", res?.data)
        return res?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Login failed", error)
        console.log(error);
        return thunkAPI.rejectWithValue("login error");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        authUser: null,
        isSigningUp: false,
        isLoggingIn: false,
        isUpdatiingProfile: false,
        isCheckingAuth: false,
        onlineUsers: []
    },
    reducers: {
        setOnlineUsers(state, action) {
            state.onlineUsers = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.authUser = action.payload;
                state.isCheckingAuth = false;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.authUser = null;
                state.isCheckingAuth = false;
            })
            .addCase(handleLogout.fulfilled, (state) => {
                state.authUser = null;
            })
            .addCase(handleLogout.rejected, (state) => {
                state.authUser = state.authUser;
            })
            .addCase(login.pending, (state) => {
                state.isLoggingIn = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.authUser = action.payload;
                state.isLoggingIn = false;
            })
            .addCase(login.rejected, (state) => {
                state.isLoggingIn = false;
            })
    }
});


export const { setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;