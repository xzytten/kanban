import { ISubtask } from "./ISubtask"
import { IFilter } from "./IFilter"

export interface ITask {
    _id?: string,
    project: string,
    title: string,
    type: string,
    filters: IFilter[] | [],
    description: string,
    subtasks?: ISubtask[],
    views?: number,
    author: string,
    date: Date,
}