import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IFilter } from '../../types/IFilter';

import axios from '../../utils/axios'

interface IFilterState {
    filters: IFilter[],
    filter: IFilter | null,
    status: string,
    message: string,
}

interface RootState {
    filter: IFilterState;
}

const initialState: IFilterState = {
    filters: [],
    filter: null,
    status: "",
    message: "",
}

export const postFilter = createAsyncThunk(
    'filter/postFilter',
    async (params: { filter: IFilter, projectId: string }) => {
        try {
            console.log("Add filter params ----->", params)
            const { data } = await axios.post('filter/postFilter', params);
            console.log(data);
            return data;
        } catch (error) {
            throw (error)
        }
    }
);

export const getAllFilter = createAsyncThunk(
    'filter/getAllFilter',
    async (projectId: string) => {
        try {
            console.log("slice Project Id", projectId)
            const { data } = await axios.get(`filter/getAllFilter/${projectId}`);

            return data;
        } catch (error) {
            throw (error)
        }
    }
)


const authSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllFilter.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(getAllFilter.fulfilled, (state, action: PayloadAction<IFilterState>) => {
                state.status = 'fullfiled';
                state.filters = action.payload?.filters;
            })
            .addCase(getAllFilter.rejected, (state) => {
                state.status = 'rejected';
            })
            builder
            .addCase(postFilter.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(postFilter.fulfilled, (state, action) => {
                state.status = 'fullfiled';
                state.filters.push(action.payload.filter)
            })
            .addCase(postFilter.rejected, (state) => {
                state.status = 'rejected';
            })
    }
})

export const { reducer } = authSlice;
