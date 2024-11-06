import { ISubtask } from "./ISubtask"

export interface ITask {
    _id?: string,
    project: string,
    title: string,
    type: string,
    filters?: string,
    description: string,
    subtasks?: ISubtask[],
    views?: number,
    author: string,
    date: Date,
}