import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IMember } from '../../types/IMember';

import axios from '../../utils/axios'

interface IMemberState {
    member: IMember[],
    status: string,
}

interface RootState {
    auth: IMemberState;
}

const initialState: IMemberState = {
    member: [],
    status: ''
}


export const getMember = createAsyncThunk(
    'member/getMember',
    async ({ projectId }: { projectId: string }) => {
        try {
            const { data } = await axios.get(`member/getMember/${projectId}`);
            return data;
        } catch (error) {
            throw (error)
        }
    }
)



const memberSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMember.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(getMember.fulfilled, (state, action: PayloadAction<IMemberState>) => {
                state.status = 'fullfiled';
                state.member = action.payload?.member;
            })
            .addCase(getMember.rejected, (state) => {
                state.status = 'rejected';
            })
    }
})

export const { reducer } = memberSlice;

