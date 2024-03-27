import {getUser, getLoginUser, getRegisterUser, updateProfile, logoutUser, forgotPassword, resetPassword, } from "../utils/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteCookie, setCookie } from "../utils/cookie";

export const sliceName = "user";

const initialState = {
    IsAuthChecked: false,
    data: null,

    registerUserError: null,
    registerUserRequest: false,

    loginUserError: null,
    loginUserRequest: false,

    getUserError: null,
    getUserRequest: false,
};

export const checkUserAuth = createAsyncThunk(
    `${sliceName}/checkUserAuth`,
    async (_, { dispatch }) => {
        try {
            const data = await getUser();
            return data;
        } catch (error) {
            return Promise.reject(error);
        } finally {
            dispatch(authCheck());
        }
    }
);

export const registerUser = createAsyncThunk(
    `${sliceName}/registerUser`,
    async (dataUser) => {
        const data = await getRegisterUser(dataUser);
        setCookie("accessToken", data.accessToken);
        setCookie("refreshToken", data.refreshToken);
        return data;
    }
);

export const loginUser = createAsyncThunk(
    `${sliceName}/loginUser`,
    async (dataUser) => {
        const data = await getLoginUser(dataUser);
        setCookie("accessToken", data.accessToken);
        setCookie("refreshToken", data.refreshToken);
        return data;
    }
);

export const logoutUsers = createAsyncThunk(
    `${sliceName}/logoutUser`,
    async () => {
        await logoutUser();
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
    }
);

export const forgotPasswords = createAsyncThunk(
    `${sliceName}/forgotPassword`,
    async (email) => {
        const data = await forgotPassword(email);
        return data;
    }
);

export const resetPasswords = createAsyncThunk(
    `${sliceName}/resetPassword`,
    async (data) => {
        const response = await resetPassword(data);
        return response;
    }
);

export const updateUserInfo = createAsyncThunk(
    `${sliceName}/updateUserInfo`,
    async (data) => {
        const response = await updateProfile(data);
        return response;
    }
);

export const userSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
    authCheck: (state) => {
        state.IsAuthChecked = true;
    },
},
    extraReducers: (builder) => {
        builder
            .addCase(checkUserAuth.fulfilled, (state, action) => {
                state.data = action.payload;
                state.getUserRequest = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.data = action.payload;
                state.registerUserRequest = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loginUserRequest = false;
            })
            .addCase(updateUserInfo.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(logoutUsers.fulfilled, (state) => {
                state.data = null;
            })
            .addMatcher((action) => action.type.endsWith("pending") && action.type.startsWith("user"), (state, action) => {
                state[`${action.type.split("/")[1]}Request`] = true;
                state[`${action.type.split("/")[1]}Error`] = null;
            })
            .addMatcher((action) => action.type.endsWith("rejected") && action.type.startsWith("user"), (state, action) => {
                state[`${action.type.split("/")[1]}Request`] = false;
                state[`${action.type.split("/")[1]}Error`] = action.error.message;
            });
    },
});

export const { authCheck } = userSlice.actions;
export default userSlice.reducer;