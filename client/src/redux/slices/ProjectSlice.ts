import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IProject } from '../../types/IProject';

import axios from '../../utils/axios'
import { IUser } from '../../types/IAuth';

interface IProjectState {
    projects: IProject[],
    project: IProject | null,
    projectIds: string[],
    status: string,
    findProject: string,
    inviteProject: IProject | null,
    message: string,
    reqStatus: string,
    addProjectStatus: string
}

const initialState: IProjectState = {
    projects: [],
    project: null,
    projectIds: [],
    status: "",
    findProject: "",
    inviteProject: null,
    message: "",
    reqStatus: "",
    addProjectStatus: ""
}

export const addProject = createAsyncThunk(
    'project/addProject',
    async (params: { author: string, name: string }) => {
        try {
            const { data } = await axios.post('project/addProject', params);
            return data;
        } catch (error) {
            throw (error)
        }
    }
)

export const getProjects = createAsyncThunk(
    'project/getProjects',
    async (userId: string) => {
        try {
            const { data } = await axios.get(`project/getProjects/${userId}`);
            return data;
        } catch (error) {
            throw (error)
        }
    }
)


export const addProjectInvite = createAsyncThunk(
    'project/addProjectInvite',
    async (params: { token: string, user: IUser }) => {
        try {
            const { data } = await axios.post(`project/addProjectInvite/`, params);
            return data;
        } catch (error) {
            throw (error)
        }
    }
)

export const getProjectInvite = createAsyncThunk(
    'project/projectInvite',
    async ({ token, user }: { token: string; user: IUser }) => {
        try {
            const { data } = await axios.get(`project/getProjectInvite/${token}/${user._id}`);

            return data;
        } catch (error) {
            throw error;
        }
    }
);

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        chooseProject: (state, action: PayloadAction<IProject | null>) => {
            console.log(action.payload)
            state.project = action.payload;
            // localStorage.setItem('chosenProject', JSON.stringify(action.payload))
        },
        pushProjects: (state, action: PayloadAction<string[]>) => {
            if (action.payload) {
                state.projectIds = [...state.projectIds, ...action.payload];
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProjects.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(getProjects.fulfilled, (state, action: PayloadAction<IProjectState>) => {
                state.projects = action.payload?.projects;
                state.status = 'fullfiled';
            })
            .addCase(getProjects.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(addProject.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(addProject.fulfilled, (state, action: PayloadAction<IProjectState>) => {
                if (action.payload.project) {
                    state.projects.push(action.payload.project);
                }
            })
            .addCase(addProject.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(getProjectInvite.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(getProjectInvite.fulfilled, (state, action: PayloadAction<IProjectState>) => {
                if (action.payload.project !== null) {
                    state.inviteProject = action.payload.project;
                    state.message = action.payload.message;
                    state.reqStatus = action.payload.reqStatus;
                }
                state.status = 'fulfilled'
            })
            .addCase(getProjectInvite.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(addProjectInvite.pending, (state) => {
                state.addProjectStatus = 'pending';
            })
            .addCase(addProjectInvite.fulfilled, (state, action: PayloadAction<IProjectState>) => {
                console.log(action.payload.project)
                if (action.payload.project) {
                    localStorage.setItem('chosenProject', JSON.stringify(action.payload.project))
                    state.projects.push(action.payload.project);
                    state.message = action.payload.message;
                }
                state.addProjectStatus = 'fulfilled'
            })
            .addCase(addProjectInvite.rejected, (state) => {
                state.addProjectStatus = 'rejected';
            })
    }
})

export const { reducer } = projectSlice;
export const { chooseProject, pushProjects } = projectSlice.actions;
