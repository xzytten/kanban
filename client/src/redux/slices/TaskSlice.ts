import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../types/ITask';
import axios from '../../utils/axios'

interface ITaskState {
    tasks: ITask[],
    task: ITask | null,
    status: string,
    deleteStatus: string,
    deletedTask: string,
    editTypeStatus: string,
}

const initialState: ITaskState = {
    tasks: [],
    task: null,
    status: '',
    deleteStatus: '',
    deletedTask: '',
    editTypeStatus: ''
}


export const addTask = createAsyncThunk(
    'task/addTask',
    async (params: ITask) => {
        try {
            console.log('AddTask - ', params)
            const { data } = await axios.post('task/addTask', params);
            return data;
        } catch (error) {
            throw (error)
        }
    }
)

export const editTypeTask = createAsyncThunk(
    'task/editTypeTask',
    async (params: { taskId: string, type: string }) => {
        try {
            const { data } = await axios.patch('task/editTypeTask', params);
            return data;
        } catch (error) {
            throw (error)
        }
    }
)

export const deleteOneTask = createAsyncThunk(
    'task/deleteOneTask',
    async (params: { taskId: string }) => {
        try {
            const { data } = await axios.delete('task/deleteOneTask', { data: { taskId: params.taskId } })
            return { data }
        }
        catch (error) {
        }
    }
)

export const getAllTask = createAsyncThunk(
    'task/getAllTask',
    async (params: { projectId: string }) => {
        try {
            const { data } = await axios.post('task/getAllTask', params);
            return data;
        } catch (error) {
            throw (error)
        }
    }
)



const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(addTask.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(addTask.fulfilled, (state, action: PayloadAction<ITaskState>) => {
                state.task = action.payload.task;
                if (action.payload.task !== null) {
                    state.tasks.push(action.payload.task);
                }
                state.status = "fulfilled";
            })
            .addCase(addTask.rejected, (state) => {
                state.status = 'rejected'
            })

            //getAllTask
            .addCase(getAllTask.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getAllTask.fulfilled, (state, action: PayloadAction<ITaskState>) => {
                state.tasks = action.payload.tasks;
                state.status = "fulfilled";
            })
            .addCase(getAllTask.rejected, (state) => {
                state.status = 'rejected'
            })

            //deleteOneTask
            .addCase(deleteOneTask.pending, (state) => {
                state.deleteStatus = "pending";
            })
            .addCase(deleteOneTask.fulfilled, (state, action) => {
                state.deleteStatus = "fulfilled";
                state.deletedTask = action.payload?.data.task

            })
            .addCase(deleteOneTask.rejected, (state) => {
                state.status = 'rejected'
            })

            //editTypeTask
            .addCase(editTypeTask.pending, (state) => {
                state.editTypeStatus = "pending";
            })
            .addCase(editTypeTask.fulfilled, (state, action) => {
                console.log(action.payload)
                state.tasks = state.tasks.map(task =>
                    task._id === action.payload.task._id ? action.payload.task : task
                );
                state.editTypeStatus = "fulfilled";
            })
            .addCase(editTypeTask.rejected, (state) => {
                state.editTypeStatus = 'rejected'
            })

    }
})

export const { reducer } = taskSlice;

