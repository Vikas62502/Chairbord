import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    userData: {},
    accessToken: null,
    refreshToken: null,
    error: null as string | null,
    status: 'idle',
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginSucess: (state, action: PayloadAction<any>) => {
            state.userData = action.payload;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.status = 'success';
        },
        loginFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.status = 'failed';
        },
        logout: (state) => {
            state.userData = {};
            state.accessToken = null;
            state.refreshToken = null;
            state.status = 'idle';
        }
    }
})

export const { loginFailed, loginSucess, logout } = loginSlice.actions

export default loginSlice.reducer