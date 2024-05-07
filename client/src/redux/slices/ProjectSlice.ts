import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IProject } from '../types/IProject';

import axios from '../../utils/axios'

interface IInitialState {
    projects: IProject[],
    project: IProject | null,
    status: string | null,
}

interface RootState {
    auth: IInitialState;
}

const initialState: IInitialState = {
    projects: [],
    project: null,
    status: null,
}


export const addProject = createAsyncThunk(
    'project/addProject',
    async (params: { author: string, name: string }) => {
        try {
            const { data } = await axios.post('project/addProject', params);
            return data;
        } catch (error) {
            throw(error)
        }
    }
)

export const getProjects = createAsyncThunk(
    'project/getProject',
    async (params: { projectIds?: string[] }) => {
        try {
            const { data } = await axios.post(`project/getProject/`, params);
            return data;
        } catch (error) {
            throw(error)
        }
    }
)

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProjects.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(getProjects.fulfilled, (state, action: PayloadAction<IInitialState>) => {
                state.projects = action.payload?.projects;
                state.status = 'fullfiled';
            })
            .addCase(getProjects.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(addProject.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(addProject.fulfilled, (state, action: PayloadAction<IInitialState>) => {
                if (action.payload.project !== null) {
                    state.projects.push(action.payload.project);
                }
            })
            .addCase(addProject.rejected, (state) => {
                state.status = 'rejected';
            })

    }
})

export const { reducer } = projectSlice;

