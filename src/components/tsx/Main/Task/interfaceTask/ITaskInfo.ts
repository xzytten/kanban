import { ISubtask } from "./ISubtask";

export interface ITaskItem {
    id: string,
    filter: string,
    title: string,
    description: string,
    subtask: ISubtask[] 
}