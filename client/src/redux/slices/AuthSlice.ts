import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../types/IAuth';

import axios from '../../utils/axios'
import { IProject } from '../types/IProject';

interface IInitialState {
    user: IUser | null,
    token: string | null,
    status: string | null,
    message: string | null,
}

interface RootState {
    auth: IInitialState;
}

const initialState: IInitialState = {
    user: null,
    token: null,
    status: null,
    message: null,
}

export const login = createAsyncThunk(
    'user/login',
    async (params: { name: string; password: string }) => {
        try {
            const { data } = await axios.post('user/login', params);

            if (data.token) {
                window.localStorage.setItem('token', data.token);
            }
            return data;
        } catch (error) {
            throw (error)
        }
    }
);

export const register = createAsyncThunk(
    'user/register',
    async (params: { name: string; password: string }) => {
        try {
            const { data } = await axios.post('user/register', params);
            if (data.token) {
                window.localStorage.setItem('token', data.token);
            }
            return data;
        } catch (error) {
            throw (error)
        }
    }
)

export const getMe = createAsyncThunk(
    'auth/getme',
    async () => {
        try {
            const { data } = await axios.get('user/getme');

            return data;
        } catch (error) {
            throw (error)
        }
    }
)



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            state.user = null
            state.token = null
            state.status = null
        }
    },
    extraReducers: (builder) => {
        builder
            //register
            .addCase(register.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<IInitialState>) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.status = 'fulfilled';
            })
            .addCase(register.rejected, (state) => {
                state.status = 'rejected';
            })
            //login
            .addCase(login.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<IInitialState>) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.status = 'fulfilled';
                state.message = action.payload?.message;
            })
            .addCase(login.rejected, (state) => {
                state.status = 'rejected';
            })
            //getMe
            .addCase(getMe.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(getMe.fulfilled, (state, action: PayloadAction<IInitialState>) => {
                state.user = action.payload?.user;
                state.token = action.payload?.token;
                state.status = 'fulfilled';
            })
            .addCase(getMe.rejected, (state, action) => {
                state.status = 'rejected';
            })
    }
})

export const { reducer } = authSlice;
export const checkIsAuth = (state: RootState) => Boolean(state.auth.token);
export const { logout } = authSlice.actions;