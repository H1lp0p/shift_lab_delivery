import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type User from "../../../data/models/user";
import type UserSession from "../../../data/dto/responses/user-session";
import type Authorize from "../../../data/dto/requests/user/authorize";
import type AuthorizeResponse from "../../../data/dto/responses/authorize-response";
import axios from "axios";
import { users } from "../../api-path";
import { act } from "react";
import type UserProfileUpdate from "../../../data/dto/requests/user/user-profile-update";

interface SessionInfoState{
    token: string | null,
    profile: User | null,
}

interface SessionState extends SessionInfoState{
    pendingState: "pending" | "error" | "success",
    error: string | null,
}

const initState : SessionState = {
    token: null,
    profile: null,
    error: null,
    pendingState: "pending"
}

const TOKEN_LOCAL_KEY = "deliver_token_saved"

//we will use clear axios for avoiding dependency loop from Axios instance in builder

const initSession = createAsyncThunk(
    "user-session-slice.init-session",
    async (_, {rejectWithValue, dispatch}) => {
        const localToken = localStorage.getItem(TOKEN_LOCAL_KEY)

        if (localToken){
            dispatch(getProfile())
        }
    }
)

export const authorize = createAsyncThunk<AuthorizeResponse, Authorize>(
    "user-session-slice.authorize",
    async (AuthorizeData: Authorize, {rejectWithValue}) => {
        try{
            const response = await axios.post<AuthorizeResponse>(users.authorize, AuthorizeData);
            if (!response.data.success){
                return rejectWithValue({
                    error: response.data.reason
                })
            }
            return response.data;
        }
        catch (error){
            console.error(error);
        }

        return rejectWithValue("dummy_error")
    }
)

export const getProfile = createAsyncThunk<UserSession, void>(
    "user-session-slice.get-profile",
    async (_, {rejectWithValue}) => {
        const token = localStorage.getItem(TOKEN_LOCAL_KEY)
        if (token){
            try{
                const response = await axios.get<UserSession>(users.get, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                if (!response.data.success){
                    return rejectWithValue({
                        error: response.data.reason
                    })
                }

                return response.data
            }
            catch (error) {
                return rejectWithValue(error)
            }
        }
        return rejectWithValue("Unauthorized")
    }
)

export const updateProfile = createAsyncThunk<UserSession, UserProfileUpdate>(
    "user-session-slice.update",
    async (updateData: UserProfileUpdate, {rejectWithValue}) => {
        const token = localStorage.getItem(TOKEN_LOCAL_KEY)
        if (token){
            const response = await axios.patch<UserSession>(users.update, updateData)

            if (!response.data.success){
                return rejectWithValue({
                    error: response.data.reason
                })
            }

            return response.data
        }
        return rejectWithValue("Unauthorized")
    }
)

const sessionSlice = createSlice({
    name: "user-session-slice",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        /**
         * authorization thunk configuration
         */
        builder.addCase(authorize.fulfilled, (state, action) => {
            state.error = null
            state.pendingState = "success"
            state.profile = action.payload.user
            state.token = action.payload.token

            localStorage.setItem(TOKEN_LOCAL_KEY, action.payload.token)
        })
        builder.addCase(authorize.pending, (state) => {
            state.error = null
            state.pendingState = "pending"
            state.token = null
            state.profile = null
        })
        builder.addCase(authorize.rejected, (state, action) => {
            state.pendingState = "error"
            state.error = action.error.message || "Unknown error in authorize"
        })

        /**
         * getProfile thunk configuration
         */
        builder.addCase(getProfile.pending, (state) => {
            state.error = null
            state.pendingState = "pending"
        })
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.error = null
            state.pendingState = "success"
            state.profile = action.payload.user
        })
        builder.addCase(getProfile.rejected, (state, action) => {
            state.error = action.error.message || "Unknown error in getProfile"
        })
        /**
         * updateProfile thunk configuration
         */
        builder.addCase(updateProfile.pending, (state) => {
            state.error = null
            state.pendingState = "pending"
        })
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.error = null
            state.pendingState = "success"
            state.profile = action.payload.user
        })
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.error = action.error.message || "Unknown error in updateProfile"
            state.pendingState = "error"
        })
    }
})

const session = sessionSlice.reducer
export default session