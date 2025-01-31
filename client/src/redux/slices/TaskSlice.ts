import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../types/ITask';
import { IFilter } from '../../types/IFilter';

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

export const addFilterToTask = createAsyncThunk(
    'task/addFilterToTask',
    async (params: { filter: IFilter, taskId: string }) => {
        try {
            const { data } = await axios.post('filter/addFilterToTask', params);

            return data;
        } catch (error) {
            throw (error)
        }
    }
)


export const removeFilterFromTask = createAsyncThunk(
    'task/removeFilterFromTask',
    async (params: { filterId: string, taskId: string }) => {
        try {
            const { data } = await axios.post('filter/removeFilterFromTask', params);

            return data;
        } catch (error) {
            throw (error)
        }
    }
)


export const editTask = createAsyncThunk(
    'task/editTask',
    async (params: { taskId: string, updates: Partial<Omit<ITask, 'filters'> & { filters: string[] }> }) => {
        try {
            const { data } = await axios.put('task/editTask', params);

            return data;
        } catch (error) {
            throw (error)
        }
    }
)

export const editSubtaskStatus = createAsyncThunk(
    'subtask/editStatus',
    async (params: { subtaskId: string, status: boolean, taskId: string }) => {
        try {
            const { data } = await axios.put('subtask/editStatus', params);
            return data
        } catch (error) {
            throw (error)
        }
    }
)

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        pushFilterIdToTask: (state, action: PayloadAction<{ taskId: string; filterId: string }>) => {
            // if (state.tasks) {
            //     state.tasks = state.tasks.map(task =>
            //         task._id === action.payload.taskId ? {
            //             ...task,
            //             filters: [...(task.filters || []), action.payload.filterId]

            //         }
            //             :
            //             task
            //     )
            // }
        },
        deleteFilterInTasks: (state, action: PayloadAction<{ filterId: string }>) => {
            if (state.tasks && action.payload.filterId) {
                state.tasks = state.tasks.map(task => ({
                    ...task,
                    filters: task.filters.filter(filter => filter._id !== action.payload.filterId && filter),
                }));
            }
        }
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
                state.tasks = state.tasks.map(task =>
                    task._id === action.payload.taskId ? { ...task, type: action.payload.type } : task
                );
                state.editTypeStatus = "fulfilled";
            })
            .addCase(editTypeTask.rejected, (state) => {
                state.editTypeStatus = 'rejected'
            })

            //addFilterToTask
            .addCase(addFilterToTask.pending, (state) => {
                state.editTypeStatus = "pending";
            })
            .addCase(addFilterToTask.fulfilled, (state, action) => {
                const { taskId, filter } = action.payload;

                const taskIndex = state.tasks.findIndex((task) => task._id === taskId);

                if (taskIndex !== -1) {
                    state.tasks[taskIndex].filters = [
                        ...state.tasks[taskIndex].filters,
                        filter,
                    ];
                }
            })
            .addCase(addFilterToTask.rejected, (state) => {
                state.editTypeStatus = 'rejected'
            })

            //removeFilterFromTask
            .addCase(removeFilterFromTask.pending, (state) => {
                state.editTypeStatus = "pending";
            })
            .addCase(removeFilterFromTask.fulfilled, (state, action) => {
                const { taskId, filterId } = action.payload;

                const taskIndex = state.tasks.findIndex((task) => task._id === taskId);

                if (taskIndex !== -1) {
                    state.tasks[taskIndex].filters = state.tasks[taskIndex].filters.filter(
                        (filter) => filter._id !== filterId
                    );
                }
            })
            .addCase(removeFilterFromTask.rejected, (state) => {
                state.editTypeStatus = 'rejected'
            })

            //editTask
            .addCase(editTask.pending, (state) => {
                state.editTypeStatus = "pending";
            })
            .addCase(editTask.fulfilled, (state, action) => {
                state.editTypeStatus = 'fulfilled'
                const taskIndex = state.tasks.findIndex((task) => task._id === action.payload.updatedTask._id);
                if (taskIndex !== -1) {
                    state.tasks[taskIndex] = action.payload.updatedTask;
                }
            })
            .addCase(editTask.rejected, (state) => {
                state.editTypeStatus = 'rejected'
            })

            //editSubtaskStatus 
            .addCase(editSubtaskStatus.pending, (state) => {
                state.status = 'pednging'
            })
            .addCase(editSubtaskStatus.fulfilled, (state, action) => {
                state.status = 'fullfiled'
                const subtask = action.payload.subtask 
                const taskIndex = state.tasks.findIndex((task) => task._id === action.payload.taskId);
                if(taskIndex !== -1){
                    state.tasks[taskIndex].subtasks = state.tasks[taskIndex].subtasks.map(sub => sub._id === subtask._id ? {...sub, status: subtask.status} : sub )
                }
            })
            .addCase(editSubtaskStatus.rejected, (state) => {
                state.status = 'rejected'
            })

    }
})

export const { reducer } = taskSlice;
export const { pushFilterIdToTask, deleteFilterInTasks } = taskSlice.actions;
