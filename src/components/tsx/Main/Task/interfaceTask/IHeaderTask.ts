import { ITaskItem } from "./ITaskInfo";
import { Dispatch, SetStateAction } from 'react';

export interface IHeaderTask {
    toggleTaskClass: (task: string) => void;
    count: Record<string, number>,
    totalFilter: string,
    someArray: ITaskItem[]
    setSomeArray: Dispatch<SetStateAction<ITaskItem[]>>;
}