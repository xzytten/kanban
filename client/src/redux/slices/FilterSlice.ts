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
            const { data } = await axios.post('filter/postFilter', params);

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
            const { data } = await axios.get(`filter/getAllFilter/${projectId}`);

            return data;
        } catch (error) {
            throw (error)
        }
    }
)

export const changeFilter = createAsyncThunk(
    'filter/ChangeFilter',
    async (params: { changedFilter: { name?: string, textColor?: string, backgroundColor?: string }, _id?: string }) => {
        try {
            const { data } = await axios.patch(`filter/ChangeFilter`, params);

            return data;
        } catch (error) {
            throw (error)
        }
    }
)


export const deleteFilter = createAsyncThunk(
    'filter/deleteFilter',
    async (params: { filterId: string, projectId: string }) => {
        try {
            const { data } = await axios.delete(`filter/deleteFilter/${params.filterId}/${params.projectId}`);

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
        builder
            .addCase(changeFilter.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(changeFilter.fulfilled, (state, action) => {
                state.status = 'fullfiled';
                const { changedFilter } = action.payload;

                const index = state.filters.findIndex((filter) => filter._id === changedFilter._id);

                if (index !== -1) {
                    state.filters[index] = { ...state.filters[index], ...changedFilter };
                }

            })
            .addCase(changeFilter.rejected, (state) => {
                state.status = 'rejected';
            })
        builder
            .addCase(deleteFilter.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(deleteFilter.fulfilled, (state, action) => {
                state.status = 'fullfiled';
                state.filters = state.filters.filter(filter => filter._id !== action.payload.deletedFilterId)
            })
            .addCase(deleteFilter.rejected, (state) => {
                state.status = 'rejected';

            })
    }
})

export const { reducer } = authSlice;
